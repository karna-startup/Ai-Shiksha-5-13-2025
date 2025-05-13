export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      enquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      learning_content: {
        Row: {
          content: string | null
          created_at: string
          id: string
          level_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          level_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          level_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_content_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "learning_levels"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_levels: {
        Row: {
          age_group: string
          created_at: string
          description: string | null
          icon: string | null
          id: string
          level_name: string
          level_number: number
          position_x: number | null
          position_y: number | null
        }
        Insert: {
          age_group: string
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          level_name: string
          level_number: number
          position_x?: number | null
          position_y?: number | null
        }
        Update: {
          age_group?: string
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          level_name?: string
          level_number?: number
          position_x?: number | null
          position_y?: number | null
        }
        Relationships: []
      }
      n8n_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      n8n_chat_histories_new: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      partner_enquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          organization: string
          partnership_type: string
          phone: string
          status: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          organization: string
          partnership_type: string
          phone: string
          status?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          organization?: string
          partnership_type?: string
          phone?: string
          status?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age_preference: string | null
          avatar_url: string | null
          badges: string[] | null
          class_level: string | null
          completed_levels: number[] | null
          created_at: string
          days_active: number | null
          display_name: string | null
          id: string
          level: number | null
          phone: string | null
          points: number | null
          role: string | null
          school_id: string | null
          test_scores: Json | null
          updated_at: string
        }
        Insert: {
          age_preference?: string | null
          avatar_url?: string | null
          badges?: string[] | null
          class_level?: string | null
          completed_levels?: number[] | null
          created_at?: string
          days_active?: number | null
          display_name?: string | null
          id: string
          level?: number | null
          phone?: string | null
          points?: number | null
          role?: string | null
          school_id?: string | null
          test_scores?: Json | null
          updated_at?: string
        }
        Update: {
          age_preference?: string | null
          avatar_url?: string | null
          badges?: string[] | null
          class_level?: string | null
          completed_levels?: number[] | null
          created_at?: string
          days_active?: number | null
          display_name?: string | null
          id?: string
          level?: number | null
          phone?: string | null
          points?: number | null
          role?: string | null
          school_id?: string | null
          test_scores?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      schools: {
        Row: {
          created_at: string
          id: string
          join_code: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          join_code: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          join_code?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_events: {
        Row: {
          actual_event: string | null
          current_page: string | null
          expected_event: string
          id: string
          is_correct: boolean | null
          timestamp: string | null
          user_id: string
        }
        Insert: {
          actual_event?: string | null
          current_page?: string | null
          expected_event: string
          id?: string
          is_correct?: boolean | null
          timestamp?: string | null
          user_id: string
        }
        Update: {
          actual_event?: string | null
          current_page?: string | null
          expected_event?: string
          id?: string
          is_correct?: boolean | null
          timestamp?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_expected_events: {
        Row: {
          actual_event: string | null
          current_page: string | null
          expected_event: string | null
          id: string
          is_correct: boolean | null
          timestamp: string | null
          user_id: string
        }
        Insert: {
          actual_event?: string | null
          current_page?: string | null
          expected_event?: string | null
          id?: string
          is_correct?: boolean | null
          timestamp?: string | null
          user_id: string
        }
        Update: {
          actual_event?: string | null
          current_page?: string | null
          expected_event?: string | null
          id?: string
          is_correct?: boolean | null
          timestamp?: string | null
          user_id?: string
        }
        Relationships: []
      }
      visitor_analytics: {
        Row: {
          browser: string | null
          city: string | null
          country: string | null
          device: string | null
          id: string
          ip_address: string | null
          page_url: string | null
          visit_timestamp: string | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country?: string | null
          device?: string | null
          id?: string
          ip_address?: string | null
          page_url?: string | null
          visit_timestamp?: string | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          country?: string | null
          device?: string | null
          id?: string
          ip_address?: string | null
          page_url?: string | null
          visit_timestamp?: string | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
