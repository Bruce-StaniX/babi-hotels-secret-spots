import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function for logging
const logStep = (step: string, details?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${step}${details ? `: ${JSON.stringify(details)}` : ''}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep('Starting subscription check process');

    // Create Supabase client with service role key for admin access
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    logStep('Checking for expired subscriptions');

    // 1. Find and update expired subscriptions
    const { data: expiredSubs, error: expiredError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('status', 'active')
      .lt('end_date', now.toISOString());

    if (expiredError) {
      logStep('Error fetching expired subscriptions', expiredError);
      throw expiredError;
    }

    logStep(`Found ${expiredSubs?.length || 0} expired subscriptions`);

    // Update expired subscriptions to 'expired' status
    if (expiredSubs && expiredSubs.length > 0) {
      const { error: updateError } = await supabase
        .from('subscriptions')
        .update({ status: 'expired' })
        .in('id', expiredSubs.map(sub => sub.id));

      if (updateError) {
        logStep('Error updating expired subscriptions', updateError);
        throw updateError;
      }

      // Create notification records for expired subscriptions
      for (const sub of expiredSubs) {
        const { error: notificationError } = await supabase
          .from('subscription_notifications')
          .insert({
            user_id: sub.user_id,
            subscription_id: sub.id,
            type: 'expired',
            email_sent: false
          });

        if (notificationError) {
          logStep(`Error creating notification for subscription ${sub.id}`, notificationError);
        }
      }

      logStep(`Updated ${expiredSubs.length} subscriptions to expired status`);
    }

    // 2. Find subscriptions expiring in 7 days
    const { data: expiringSubs, error: expiringError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('status', 'active')
      .gte('end_date', now.toISOString())
      .lte('end_date', sevenDaysFromNow.toISOString());

    if (expiringError) {
      logStep('Error fetching expiring subscriptions', expiringError);
      throw expiringError;
    }

    logStep(`Found ${expiringSubs?.length || 0} subscriptions expiring in 7 days`);

    // Create 7-day warning notifications for subscriptions that don't already have them
    if (expiringSubs && expiringSubs.length > 0) {
      for (const sub of expiringSubs) {
        // Check if we already sent a 7-day warning
        const { data: existingNotification } = await supabase
          .from('subscription_notifications')
          .select('id')
          .eq('subscription_id', sub.id)
          .eq('type', 'expiry_warning_7d')
          .single();

        if (!existingNotification) {
          const { error: notificationError } = await supabase
            .from('subscription_notifications')
            .insert({
              user_id: sub.user_id,
              subscription_id: sub.id,
              type: 'expiry_warning_7d',
              email_sent: false
            });

          if (notificationError) {
            logStep(`Error creating 7-day warning for subscription ${sub.id}`, notificationError);
          }
        }
      }
    }

    // 3. Find subscriptions expiring in 1 day
    const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    const { data: expiring1Day, error: expiring1DayError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('status', 'active')
      .gte('end_date', now.toISOString())
      .lte('end_date', oneDayFromNow.toISOString());

    if (expiring1DayError) {
      logStep('Error fetching subscriptions expiring in 1 day', expiring1DayError);
      throw expiring1DayError;
    }

    logStep(`Found ${expiring1Day?.length || 0} subscriptions expiring in 1 day`);

    // Create 1-day warning notifications
    if (expiring1Day && expiring1Day.length > 0) {
      for (const sub of expiring1Day) {
        // Check if we already sent a 1-day warning
        const { data: existingNotification } = await supabase
          .from('subscription_notifications')
          .select('id')
          .eq('subscription_id', sub.id)
          .eq('type', 'expiry_warning_1d')
          .single();

        if (!existingNotification) {
          const { error: notificationError } = await supabase
            .from('subscription_notifications')
            .insert({
              user_id: sub.user_id,
              subscription_id: sub.id,
              type: 'expiry_warning_1d',
              email_sent: false
            });

          if (notificationError) {
            logStep(`Error creating 1-day warning for subscription ${sub.id}`, notificationError);
          }
        }
      }
    }

    // 4. Get summary of pending notifications
    const { data: pendingNotifications, error: pendingError } = await supabase
      .from('subscription_notifications')
      .select('type, email_sent')
      .eq('email_sent', false);

    if (pendingError) {
      logStep('Error fetching pending notifications', pendingError);
    }

    const summary = {
      expired_subscriptions: expiredSubs?.length || 0,
      expiring_7_days: expiringSubs?.length || 0,
      expiring_1_day: expiring1Day?.length || 0,
      pending_notifications: pendingNotifications?.length || 0,
      notification_breakdown: pendingNotifications?.reduce((acc, notif) => {
        acc[notif.type] = (acc[notif.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {}
    };

    logStep('Subscription check completed successfully', summary);

    return new Response(JSON.stringify({
      success: true,
      timestamp: now.toISOString(),
      summary
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logStep('Error in subscription check', { error: errorMessage });
    
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});