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
    PostgrestVersion: "13.0.4"
  }
  public: {
  Tables: {
  onboarding_forms: {
    Row: {
      id: string;

      legal_business_name: string;
      industry: string | null;
      email: string;
      phone: string | null;
      preferred_contact_method: string | null;
      address: string | null;

      facebook: string | null;
      facebook_password: string | null;
      instagram: string | null;
      instagram_password: string | null;
      gmail: string | null;
      gmail_password: string | null;

      main_contact_name: string | null;
      role: string | null;
      contact_phone: string | null;
      contact_email: string | null;
      logo_url: string | null;

      calendar_email: string | null;
      calendar_password: string | null;

      domain_provider: string | null;
      domain_username: string | null;
      domain_password: string | null;
      email_provider: string | null;

      crm_platform: string | null;
      crm_login_url: string | null;
      crm_username: string | null;
      crm_password: string | null;
      billing_contact_name: string | null;

      main_service: string | null;
      benefits: string | null;
      unique_value: string | null;
      guarantees: string | null;
      customer_pain_points: string | null;
      target_customer_description: string | null;
      ideal_clients: string | null;
      customer_titles: string | null;
      partnership_value: string | null;
      client_services: string | null;
      company_size: string | null;
      additional_info: string | null;
      prospect_questions: string | null;

      created_at: string;
      updated_at: string;
    };

    Insert: {
      id?: string;

      legal_business_name: string;
      industry?: string | null;
      email: string;
      phone?: string | null;
      preferred_contact_method?: string | null;
      address?: string | null;

      facebook?: string | null;
      facebook_password?: string | null;
      instagram?: string | null;
      instagram_password?: string | null;
      gmail?: string | null;
      gmail_password?: string | null;

      main_contact_name?: string | null;
      role?: string | null;
      contact_phone?: string | null;
      contact_email?: string | null;
      logo_url?: string | null;

      calendar_email?: string | null;
      calendar_password?: string | null;

      domain_provider?: string | null;
      domain_username?: string | null;
      domain_password?: string | null;
      email_provider?: string | null;

      crm_platform?: string | null;
      crm_login_url?: string | null;
      crm_username?: string | null;
      crm_password?: string | null;
      billing_contact_name?: string | null;

      main_service?: string | null;
      benefits?: string | null;
      unique_value?: string | null;
      guarantees?: string | null;
      customer_pain_points?: string | null;
      target_customer_description?: string | null;
      ideal_clients?: string | null;
      customer_titles?: string | null;
      partnership_value?: string | null;
      client_services?: string | null;
      company_size?: string | null;
      additional_info?: string | null;
      prospect_questions?: string | null;

      created_at?: string;
      updated_at?: string;
    };

    Update: {
      id?: string;

      legal_business_name?: string;
      industry?: string | null;
      email?: string;
      phone?: string | null;
      preferred_contact_method?: string | null;
      address?: string | null;

      facebook?: string | null;
      facebook_password?: string | null;
      instagram?: string | null;
      instagram_password?: string | null;
      gmail?: string | null;
      gmail_password?: string | null;

      main_contact_name?: string | null;
      role?: string | null;
      contact_phone?: string | null;
      contact_email?: string | null;
      logo_url?: string | null;

      calendar_email?: string | null;
      calendar_password?: string | null;

      domain_provider?: string | null;
      domain_username?: string | null;
      domain_password?: string | null;
      email_provider?: string | null;

      crm_platform?: string | null;
      crm_login_url?: string | null;
      crm_username?: string | null;
      crm_password?: string | null;
      billing_contact_name?: string | null;

      main_service?: string | null;
      benefits?: string | null;
      unique_value?: string | null;
      guarantees?: string | null;
      customer_pain_points?: string | null;
      target_customer_description?: string | null;
      ideal_clients?: string | null;
      customer_titles?: string | null;
      partnership_value?: string | null;
      client_services?: string | null;
      company_size?: string | null;
      additional_info?: string | null;
      prospect_questions?: string | null;

      created_at?: string;
      updated_at?: string;
    };
  };
};

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
