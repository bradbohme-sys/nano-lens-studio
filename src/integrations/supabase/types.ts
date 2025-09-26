export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      code_quality_insights: {
        Row: {
          complexity_score: number | null
          component_name: string | null
          documentation_quality: number | null
          file_path: string
          id: string
          improvement_suggestions: Json | null
          issues_found: Json | null
          last_analyzed: string | null
          maintainability_index: number | null
          quality_metrics: Json
          quality_score: number
          refactoring_opportunities: Json | null
          technical_debt_hours: number | null
          trend_direction: string | null
        }
        Insert: {
          complexity_score?: number | null
          component_name?: string | null
          documentation_quality?: number | null
          file_path: string
          id?: string
          improvement_suggestions?: Json | null
          issues_found?: Json | null
          last_analyzed?: string | null
          maintainability_index?: number | null
          quality_metrics: Json
          quality_score: number
          refactoring_opportunities?: Json | null
          technical_debt_hours?: number | null
          trend_direction?: string | null
        }
        Update: {
          complexity_score?: number | null
          component_name?: string | null
          documentation_quality?: number | null
          file_path?: string
          id?: string
          improvement_suggestions?: Json | null
          issues_found?: Json | null
          last_analyzed?: string | null
          maintainability_index?: number | null
          quality_metrics?: Json
          quality_score?: number
          refactoring_opportunities?: Json | null
          technical_debt_hours?: number | null
          trend_direction?: string | null
        }
        Relationships: []
      }
      healing_actions: {
        Row: {
          action_taken: Json
          after_state: Json | null
          before_state: Json
          completed_at: string | null
          component_id: string
          created_at: string | null
          execution_time_ms: number | null
          healing_strategy: string
          id: string
          impact_assessment: Json | null
          issue_description: string
          issue_type: string
          success: boolean | null
          trigger_event_id: string | null
        }
        Insert: {
          action_taken: Json
          after_state?: Json | null
          before_state: Json
          completed_at?: string | null
          component_id: string
          created_at?: string | null
          execution_time_ms?: number | null
          healing_strategy: string
          id?: string
          impact_assessment?: Json | null
          issue_description: string
          issue_type: string
          success?: boolean | null
          trigger_event_id?: string | null
        }
        Update: {
          action_taken?: Json
          after_state?: Json | null
          before_state?: Json
          completed_at?: string | null
          component_id?: string
          created_at?: string | null
          execution_time_ms?: number | null
          healing_strategy?: string
          id?: string
          impact_assessment?: Json | null
          issue_description?: string
          issue_type?: string
          success?: boolean | null
          trigger_event_id?: string | null
        }
        Relationships: []
      }
      neural_intelligence: {
        Row: {
          accuracy_score: number | null
          actual_outcome: Json | null
          analysis_target: string
          confidence_score: number
          created_at: string | null
          id: string
          model_type: string
          prediction_data: Json
          prediction_horizon: number | null
          validated_at: string | null
        }
        Insert: {
          accuracy_score?: number | null
          actual_outcome?: Json | null
          analysis_target: string
          confidence_score: number
          created_at?: string | null
          id?: string
          model_type: string
          prediction_data: Json
          prediction_horizon?: number | null
          validated_at?: string | null
        }
        Update: {
          accuracy_score?: number | null
          actual_outcome?: Json | null
          analysis_target?: string
          confidence_score?: number
          created_at?: string | null
          id?: string
          model_type?: string
          prediction_data?: Json
          prediction_horizon?: number | null
          validated_at?: string | null
        }
        Relationships: []
      }
      pattern_recognition: {
        Row: {
          confidence: number
          first_detected: string | null
          frequency: number | null
          id: string
          impact_score: number | null
          last_detected: string | null
          locations: Json | null
          pattern_data: Json
          pattern_description: string | null
          pattern_name: string
          pattern_type: string
          recommendations: Json | null
        }
        Insert: {
          confidence: number
          first_detected?: string | null
          frequency?: number | null
          id?: string
          impact_score?: number | null
          last_detected?: string | null
          locations?: Json | null
          pattern_data: Json
          pattern_description?: string | null
          pattern_name: string
          pattern_type: string
          recommendations?: Json | null
        }
        Update: {
          confidence?: number
          first_detected?: string | null
          frequency?: number | null
          id?: string
          impact_score?: number | null
          last_detected?: string | null
          locations?: Json | null
          pattern_data?: Json
          pattern_description?: string | null
          pattern_name?: string
          pattern_type?: string
          recommendations?: Json | null
        }
        Relationships: []
      }
      performance_optimizations: {
        Row: {
          actual_improvement: number | null
          applied: boolean | null
          applied_at: string | null
          created_at: string | null
          current_metrics: Json
          estimated_impact: number | null
          id: string
          implementation_complexity: number | null
          implementation_steps: Json | null
          optimization_type: string
          predicted_improvement: Json
          priority: number | null
          recommendation_details: Json
          target_component: string
        }
        Insert: {
          actual_improvement?: number | null
          applied?: boolean | null
          applied_at?: string | null
          created_at?: string | null
          current_metrics: Json
          estimated_impact?: number | null
          id?: string
          implementation_complexity?: number | null
          implementation_steps?: Json | null
          optimization_type: string
          predicted_improvement: Json
          priority?: number | null
          recommendation_details: Json
          target_component: string
        }
        Update: {
          actual_improvement?: number | null
          applied?: boolean | null
          applied_at?: string | null
          created_at?: string | null
          current_metrics?: Json
          estimated_impact?: number | null
          id?: string
          implementation_complexity?: number | null
          implementation_steps?: Json | null
          optimization_type?: string
          predicted_improvement?: Json
          priority?: number | null
          recommendation_details?: Json
          target_component?: string
        }
        Relationships: []
      }
      system_health: {
        Row: {
          component_id: string
          component_type: string
          created_at: string | null
          healing_actions: Json | null
          healing_success_rate: number | null
          health_score: number
          health_status: string
          id: string
          issues_detected: Json | null
          last_healing_attempt: string | null
          metrics: Json
          updated_at: string | null
        }
        Insert: {
          component_id: string
          component_type: string
          created_at?: string | null
          healing_actions?: Json | null
          healing_success_rate?: number | null
          health_score: number
          health_status: string
          id?: string
          issues_detected?: Json | null
          last_healing_attempt?: string | null
          metrics: Json
          updated_at?: string | null
        }
        Update: {
          component_id?: string
          component_type?: string
          created_at?: string | null
          healing_actions?: Json | null
          healing_success_rate?: number | null
          health_score?: number
          health_status?: string
          id?: string
          issues_detected?: Json | null
          last_healing_attempt?: string | null
          metrics?: Json
          updated_at?: string | null
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
