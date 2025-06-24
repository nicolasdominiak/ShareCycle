"use client"

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Loader2, ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ImageUpload } from '@/components/ui/image-upload'
import { useToast } from '@/hooks/use-toast'
import { donationSchema, categoryLabels, conditionOptions, type DonationInput } from '@/lib/validations/donation'
import { createDonation } from '@/lib/actions/donations'
import { useUpdateDonation, type Donation } from '@/hooks/use-donations'

interface DonationFormProps {
  donation?: Donation
  mode?: 'create' | 'edit'
}

export function DonationForm({ donation, mode = 'create' }: DonationFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const isEditMode = mode === 'edit'
  
  const updateDonationMutation = useUpdateDonation()

  const form = useForm<DonationInput>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      title: '',
      description: '',
      quantity: 1,
      condition: 'novo',
      images: [],
      pickup_address: '',
      pickup_city: '',
      pickup_state: '',
      pickup_zip_code: '',
      pickup_instructions: '',
      expiry_date: '',
    },
  })

  // Preencher o formulário com dados existentes quando em modo de edição
  useEffect(() => {
    if (isEditMode && donation) {
      const formData = {
        title: donation.title || '',
        description: donation.description || '',
        category: donation.category,
        quantity: donation.quantity || 1,
        condition: (donation.condition as 'novo' | 'usado_bom_estado' | 'usado_regular' | 'precisa_reparo') || 'novo',
        images: donation.images || [],
        pickup_address: donation.pickup_address || '',
        pickup_city: donation.pickup_city || '',
        pickup_state: donation.pickup_state || '',
        pickup_zip_code: donation.pickup_zip_code || '',
        pickup_instructions: donation.pickup_instructions || '',
        expiry_date: donation.expiry_date || '',
      }
      
      // Aguardar um tick para garantir que o componente foi renderizado
      setTimeout(() => {
        form.reset(formData)
      }, 0)
    }
  }, [donation, isEditMode, form])

  const onSubmit = async (data: DonationInput) => {
    try {
      setIsLoading(true)
      
      if (isEditMode && donation) {
        const result = await updateDonationMutation.mutateAsync({
          id: donation.id,
          data
        })
        
        if (result.success) {
          toast({
            title: "Doação atualizada com sucesso!",
            description: "Suas alterações foram salvas com sucesso.",
          })
          router.push('/donations/my-donations')
        } else {
          toast({
            title: "Erro ao atualizar doação",
            description: result.error || "Ocorreu um erro inesperado. Tente novamente.",
            variant: "destructive",
          })
        }
      } else {
        const result = await createDonation(data)
        
        if (result.success) {
          toast({
            title: "Doação cadastrada com sucesso!",
            description: "Sua doação foi publicada e está disponível para solicitações.",
          })
          router.push('/donations/my-donations')
        } else {
          toast({
            title: "Erro ao cadastrar doação",
            description: result.error || "Ocorreu um erro inesperado. Tente novamente.",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      console.error('Erro ao salvar doação:', error)
      toast({
        title: isEditMode ? "Erro ao atualizar doação" : "Erro ao cadastrar doação",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>
            {isEditMode ? 'Editar Doação' : 'Informações da Doação'}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Informações Básicas */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informações Básicas</h3>
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título da Doação</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Roupas infantis em bom estado"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva os itens que você está doando, incluindo detalhes como tamanho, cor, marca, etc."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(categoryLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="1000"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condição dos Itens</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a condição" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {conditionOptions.map(({ value, label }) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiry_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Validade (Opcional)</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Imagens da Doação */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Imagens da Doação</h3>
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adicione fotos dos itens</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value || []}
                        onChange={field.onChange}
                        maxFiles={5}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Informações de Retirada */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Local de Retirada</h3>
              
              <FormField
                control={form.control}
                name="pickup_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Rua das Flores, 123, Centro"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="pickup_city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: São Paulo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pickup_state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: SP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pickup_zip_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 01234-567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="pickup_instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instruções para Retirada (Opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: Portaria do prédio, apartamento 123. Melhor horário: manhã."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isLoading || updateDonationMutation.isPending}
                className="flex-1"
              >
                {(isLoading || updateDonationMutation.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditMode ? 'Atualizar Doação' : 'Cadastrar Doação'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 