export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ad_analytics: {
        Row: {
          ad_id: string
          created_at: string
          event_type: string
          id: string
          ip_address: unknown | null
          user_agent: string | null
          user_location: string | null
        }
        Insert: {
          ad_id: string
          created_at?: string
          event_type: string
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_location?: string | null
        }
        Update: {
          ad_id?: string
          created_at?: string
          event_type?: string
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_location?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_analytics_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
        ]
      }
      ads: {
        Row: {
          ad_type: string
          advertiser_email: string
          advertiser_name: string
          budget_limit: number | null
          budget_spent: number | null
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          location_filter: string[] | null
          position: string
          price_per_click: number | null
          price_per_impression: number | null
          start_date: string
          target_url: string
          title: string
          updated_at: string
        }
        Insert: {
          ad_type: string
          advertiser_email: string
          advertiser_name: string
          budget_limit?: number | null
          budget_spent?: number | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          location_filter?: string[] | null
          position: string
          price_per_click?: number | null
          price_per_impression?: number | null
          start_date?: string
          target_url: string
          title: string
          updated_at?: string
        }
        Update: {
          ad_type?: string
          advertiser_email?: string
          advertiser_name?: string
          budget_limit?: number | null
          budget_spent?: number | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          location_filter?: string[] | null
          position?: string
          price_per_click?: number | null
          price_per_impression?: number | null
          start_date?: string
          target_url?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      hotel_analytics: {
        Row: {
          bookings: number | null
          created_at: string
          date: string
          hotel_id: string | null
          id: string
          revenue: number | null
          views: number | null
        }
        Insert: {
          bookings?: number | null
          created_at?: string
          date?: string
          hotel_id?: string | null
          id?: string
          revenue?: number | null
          views?: number | null
        }
        Update: {
          bookings?: number | null
          created_at?: string
          date?: string
          hotel_id?: string | null
          id?: string
          revenue?: number | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "hotel_analytics_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      hotels: {
        Row: {
          address: string | null
          admin_notes: string | null
          amenities: string[] | null
          approved_at: string | null
          approved_by: string | null
          created_at: string
          description: string | null
          email: string | null
          id: string
          images: string[] | null
          location: string
          name: string
          owner_id: string | null
          phone: string | null
          pricing: Json | null
          rating: number | null
          review_count: number | null
          room_types: Json | null
          status: string
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          admin_notes?: string | null
          amenities?: string[] | null
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          images?: string[] | null
          location: string
          name: string
          owner_id?: string | null
          phone?: string | null
          pricing?: Json | null
          rating?: number | null
          review_count?: number | null
          room_types?: Json | null
          status?: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          admin_notes?: string | null
          amenities?: string[] | null
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          images?: string[] | null
          location?: string
          name?: string
          owner_id?: string | null
          phone?: string | null
          pricing?: Json | null
          rating?: number | null
          review_count?: number | null
          room_types?: Json | null
          status?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      subscription_notifications: {
        Row: {
          created_at: string
          email_sent: boolean | null
          id: string
          sent_at: string | null
          subscription_id: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email_sent?: boolean | null
          id?: string
          sent_at?: string | null
          subscription_id?: string | null
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email_sent?: boolean | null
          id?: string
          sent_at?: string | null
          subscription_id?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscription_notifications_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          auto_renew: boolean | null
          created_at: string
          end_date: string | null
          id: string
          plan_type: string
          start_date: string
          status: string
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          auto_renew?: boolean | null
          created_at?: string
          end_date?: string | null
          id?: string
          plan_type: string
          start_date?: string
          status?: string
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          auto_renew?: boolean | null
          created_at?: string
          end_date?: string | null
          id?: string
          plan_type?: string
          start_date?: string
          status?: string
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
