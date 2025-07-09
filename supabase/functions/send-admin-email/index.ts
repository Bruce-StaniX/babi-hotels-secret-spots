import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function for logging
const logStep = (step: string, details?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ADMIN-EMAIL: ${step}${details ? `: ${JSON.stringify(details)}` : ''}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep('Starting admin email send process');

    // Verify admin authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header provided');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get the request body
    const { 
      targetUserId, 
      targetEmail, 
      subject, 
      message, 
      priority = 'normal',
      context = 'general',
      contextId 
    } = await req.json();

    logStep('Processing email request', { 
      targetUserId: targetUserId?.slice(0, 8), 
      targetEmail, 
      subject, 
      priority, 
      context 
    });

    // Validate required fields
    if (!targetUserId && !targetEmail) {
      throw new Error('Either targetUserId or targetEmail must be provided');
    }

    if (!subject || !message) {
      throw new Error('Subject and message are required');
    }

    // Get user email if not provided
    let emailAddress = targetEmail;
    if (!emailAddress && targetUserId) {
      const { data: userData, error: userError } = await supabase.auth.admin.getUserById(targetUserId);
      if (userError) {
        logStep('Error fetching user data', userError);
        throw new Error('Failed to fetch user email');
      }
      emailAddress = userData.user?.email;
    }

    if (!emailAddress) {
      throw new Error('No email address found for user');
    }

    logStep('Email address resolved', { emailAddress });

    // Initialize Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const resend = new Resend(resendApiKey);

    // Prepare email content
    const priorityEmoji = {
      low: '🔵',
      normal: '🟢',
      high: '🟡',
      urgent: '🔴'
    };

    const emailSubject = `${priorityEmoji[priority as keyof typeof priorityEmoji] || '🟢'} ${subject}`;
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #FF8C42, #FFA726); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
            .priority { padding: 8px 12px; border-radius: 4px; display: inline-block; margin-bottom: 15px; }
            .priority.low { background: #e3f2fd; color: #1976d2; }
            .priority.normal { background: #e8f5e8; color: #388e3c; }
            .priority.high { background: #fff3e0; color: #f57c00; }
            .priority.urgent { background: #ffebee; color: #d32f2f; }
            .message { background: white; padding: 20px; border-radius: 4px; border-left: 4px solid #FF8C42; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Message from Admin Team</h1>
            </div>
            <div class="content">
              <div class="priority ${priority}">
                Priority: ${priority.toUpperCase()} ${priorityEmoji[priority as keyof typeof priorityEmoji]}
              </div>
              ${context !== 'general' ? `<p><strong>Context:</strong> ${context.charAt(0).toUpperCase() + context.slice(1)}</p>` : ''}
              <div class="message">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <div class="footer">
              <p>This message was sent by the administration team.<br>
              If you have any questions, please contact our support team.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email
    logStep('Sending email via Resend');
    const emailResponse = await resend.emails.send({
      from: 'Admin Team <admin@yourdomain.com>',
      to: [emailAddress],
      subject: emailSubject,
      html: emailHtml
    });

    if (emailResponse.error) {
      logStep('Resend error', emailResponse.error);
      throw new Error(`Failed to send email: ${emailResponse.error.message}`);
    }

    logStep('Email sent successfully', { emailId: emailResponse.data?.id });

    // Log the email in database (optional)
    try {
      await supabase
        .from('admin_email_logs')
        .insert({
          target_user_id: targetUserId,
          target_email: emailAddress,
          subject,
          message,
          priority,
          context,
          context_id: contextId,
          sent_at: new Date().toISOString(),
          email_id: emailResponse.data?.id
        });
      logStep('Email logged in database');
    } catch (logError) {
      logStep('Failed to log email in database', logError);
      // Don't fail the whole request if logging fails
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Email sent successfully',
      emailId: emailResponse.data?.id,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logStep('Error in admin email send', { error: errorMessage });
    
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