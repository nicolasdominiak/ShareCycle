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
      donations: {
        Row: {
          category: Database["public"]["Enums"]["donation_category"]
          condition: string | null
          created_at: string | null
          description: string
          donor_id: string
          expiry_date: string | null
          id: string
          images: string[] | null
          is_active: boolean | null
          pickup_address: string | null
          pickup_city: string | null
          pickup_instructions: string | null
          pickup_latitude: number | null
          pickup_longitude: number | null
          pickup_state: string | null
          pickup_zip_code: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["donation_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["donation_category"]
          condition?: string | null
          created_at?: string | null
          description: string
          donor_id: string
          expiry_date?: string | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          pickup_address?: string | null
          pickup_city?: string | null
          pickup_instructions?: string | null
          pickup_latitude?: number | null
          pickup_longitude?: number | null
          pickup_state?: string | null
          pickup_zip_code?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["donation_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["donation_category"]
          condition?: string | null
          created_at?: string | null
          description?: string
          donor_id?: string
          expiry_date?: string | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          pickup_address?: string | null
          pickup_city?: string | null
          pickup_instructions?: string | null
          pickup_latitude?: number | null
          pickup_longitude?: number | null
          pickup_state?: string | null
          pickup_zip_code?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["donation_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "user_stats"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_read: boolean | null
          receiver_id: string
          request_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          receiver_id: string
          request_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          receiver_id?: string
          request_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "user_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "requests_with_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "user_stats"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_stats"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          bio: string | null
          city: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          latitude: number | null
          longitude: number | null
          phone: string | null
          state: string | null
          updated_at: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      requests: {
        Row: {
          approved_quantity: number | null
          created_at: string | null
          donation_id: string
          donor_id: string
          id: string
          message: string | null
          pickup_completed_at: string | null
          pickup_scheduled_at: string | null
          rejection_reason: string | null
          requested_quantity: number | null
          requester_id: string
          status: Database["public"]["Enums"]["request_status"] | null
          updated_at: string | null
        }
        Insert: {
          approved_quantity?: number | null
          created_at?: string | null
          donation_id: string
          donor_id: string
          id?: string
          message?: string | null
          pickup_completed_at?: string | null
          pickup_scheduled_at?: string | null
          rejection_reason?: string | null
          requested_quantity?: number | null
          requester_id: string
          status?: Database["public"]["Enums"]["request_status"] | null
          updated_at?: string | null
        }
        Update: {
          approved_quantity?: number | null
          created_at?: string | null
          donation_id?: string
          donor_id?: string
          id?: string
          message?: string | null
          pickup_completed_at?: string | null
          pickup_scheduled_at?: string | null
          rejection_reason?: string | null
          requested_quantity?: number | null
          requester_id?: string
          status?: Database["public"]["Enums"]["request_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "requests_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requests_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations_with_donor"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requests_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requests_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "user_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requests_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requests_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "user_stats"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      donations_with_donor: {
        Row: {
          approved_requests_count: number | null
          category: Database["public"]["Enums"]["donation_category"] | null
          condition: string | null
          created_at: string | null
          description: string | null
          donor_avatar: string | null
          donor_city: string | null
          donor_id: string | null
          donor_name: string | null
          donor_state: string | null
          expiry_date: string | null
          id: string | null
          images: string[] | null
          is_active: boolean | null
          pending_requests_count: number | null
          pickup_address: string | null
          pickup_city: string | null
          pickup_instructions: string | null
          pickup_latitude: number | null
          pickup_longitude: number | null
          pickup_state: string | null
          pickup_zip_code: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["donation_status"] | null
          title: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "user_stats"
            referencedColumns: ["id"]
          },
        ]
      }
      requests_with_details: {
        Row: {
          approved_quantity: number | null
          created_at: string | null
          donation_category:
            | Database["public"]["Enums"]["donation_category"]
            | null
          donation_description: string | null
          donation_id: string | null
          donation_images: string[] | null
          donation_title: string | null
          donor_avatar: string | null
          donor_city: string | null
          donor_id: string | null
          donor_name: string | null
          id: string | null
          message: string | null
          messages_count: number | null
          pickup_completed_at: string | null
          pickup_scheduled_at: string | null
          rejection_reason: string | null
          requested_quantity: number | null
          requester_avatar: string | null
          requester_city: string | null
          requester_id: string | null
          requester_name: string | null
          status: Database["public"]["Enums"]["request_status"] | null
          unread_messages_count: number | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "requests_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requests_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations_with_donor"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requests_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requests_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "user_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requests_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requests_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "user_stats"
            referencedColumns: ["id"]
          },
        ]
      }
      user_stats: {
        Row: {
          active_donations_count: number | null
          avatar_url: string | null
          completed_donations_count: number | null
          created_at: string | null
          donations_count: number | null
          email: string | null
          full_name: string | null
          id: string | null
          requests_approved_count: number | null
          requests_made_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_notification: {
        Args: {
          p_user_id: string
          p_type: Database["public"]["Enums"]["notification_type"]
          p_title: string
          p_message: string
          p_data?: Json
        }
        Returns: string
      }
      search_donations_by_location: {
        Args: {
          user_lat: number
          user_lng: number
          max_distance_km?: number
          search_category?: Database["public"]["Enums"]["donation_category"]
          search_term?: string
        }
        Returns: {
          id: string
          title: string
          description: string
          category: Database["public"]["Enums"]["donation_category"]
          condition: string
          images: string[]
          donor_name: string
          donor_avatar: string
          distance_km: number
          created_at: string
        }[]
      }
    }
    Enums: {
      donation_category:
        | "alimentos"
        | "roupas"
        | "eletronicos"
        | "moveis"
        | "livros"
        | "brinquedos"
        | "utensílios_domésticos"
        | "medicamentos"
        | "produtos_higiene"
        | "outros"
      donation_status: "disponível" | "reservado" | "entregue" | "cancelado"
      notification_type:
        | "nova_solicitacao"
        | "solicitacao_aprovada"
        | "solicitacao_rejeitada"
        | "nova_mensagem"
        | "doacao_entregue"
        | "doacao_cancelada"
        | "lembrete_pickup"
      request_status:
        | "pendente"
        | "aprovada"
        | "rejeitada"
        | "cancelada"
        | "entregue"
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
    Enums: {
      donation_category: [
        "alimentos",
        "roupas",
        "eletronicos",
        "moveis",
        "livros",
        "brinquedos",
        "utensílios_domésticos",
        "medicamentos",
        "produtos_higiene",
        "outros",
      ],
      donation_status: ["disponível", "reservado", "entregue", "cancelado"],
      notification_type: [
        "nova_solicitacao",
        "solicitacao_aprovada",
        "solicitacao_rejeitada",
        "nova_mensagem",
        "doacao_entregue",
        "doacao_cancelada",
        "lembrete_pickup",
      ],
      request_status: [
        "pendente",
        "aprovada",
        "rejeitada",
        "cancelada",
        "entregue",
      ],
    },
  },
} as const 