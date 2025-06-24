import { z } from "zod"

export const donationSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .min(3, "Título deve ter pelo menos 3 caracteres")
    .max(100, "Título deve ter no máximo 100 caracteres"),
  description: z
    .string()
    .min(1, "Descrição é obrigatória")
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(1000, "Descrição deve ter no máximo 1000 caracteres"),
  category: z.enum([
    "alimentos",
    "roupas", 
    "eletronicos",
    "moveis",
    "livros",
    "brinquedos",
    "utensílios_domésticos",
    "medicamentos",
    "produtos_higiene",
    "outros"
  ], {
    required_error: "Categoria é obrigatória",
    invalid_type_error: "Categoria inválida"
  }),
  quantity: z
    .number({
      required_error: "Quantidade é obrigatória",
      invalid_type_error: "Quantidade deve ser um número"
    })
    .min(1, "Quantidade deve ser pelo menos 1")
    .max(1000, "Quantidade deve ser no máximo 1000"),
  condition: z.enum([
    "novo",
    "usado_bom_estado", 
    "usado_regular",
    "precisa_reparo"
  ], {
    required_error: "Condição do item é obrigatória",
    invalid_type_error: "Condição inválida"
  }),
  images: z
    .array(z.string().url("URL da imagem inválida"))
    .max(5, "Máximo 5 imagens permitidas")
    .optional(),
  pickup_address: z
    .string()
    .min(1, "Endereço para retirada é obrigatório")
    .max(300, "Endereço deve ter no máximo 300 caracteres"),
  pickup_city: z
    .string()
    .min(1, "Cidade é obrigatória")
    .max(100, "Cidade deve ter no máximo 100 caracteres"),
  pickup_state: z
    .string()
    .min(2, "Estado deve ter pelo menos 2 caracteres")
    .max(50, "Estado deve ter no máximo 50 caracteres"),
  pickup_zip_code: z
    .string()
    .min(1, "CEP é obrigatório")
    .regex(/^\d{5}-?\d{3}$/, "CEP deve estar no formato 00000-000"),
  pickup_instructions: z
    .string()
    .max(500, "Instruções devem ter no máximo 500 caracteres")
    .optional(),
  expiry_date: z
    .string()
    .optional()
    .refine((date) => {
      if (!date) return true
      const selectedDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selectedDate >= today
    }, "Data de validade não pode ser no passado")
})

export type DonationInput = z.infer<typeof donationSchema>

// Schema para categorias - útil para selects
export const categoryLabels = {
  alimentos: "Alimentos",
  roupas: "Roupas",
  eletronicos: "Eletrônicos", 
  moveis: "Móveis",
  livros: "Livros",
  brinquedos: "Brinquedos",
  utensílios_domésticos: "Utensílios Domésticos",
  medicamentos: "Medicamentos",
  produtos_higiene: "Produtos de Higiene",
  outros: "Outros"
} as const

export const conditionOptions = [
  { value: "novo", label: "Novo" },
  { value: "usado_bom_estado", label: "Usado - Bom estado" },
  { value: "usado_regular", label: "Usado - Estado regular" },
  { value: "precisa_reparo", label: "Precisa de reparo" }
] as const 