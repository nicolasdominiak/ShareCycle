'use client'

import { useState } from 'react'
import { MessageCircle, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { createRequest } from '@/lib/actions/requests'

const requestSchema = z.object({
  message: z.string().optional(),
  requested_quantity: z.number().min(1, 'Quantidade deve ser maior que zero').optional()
})

type RequestFormData = z.infer<typeof requestSchema>

interface RequestDonationButtonProps {
  donationId: string
  donationTitle: string
  maxQuantity?: number
  isOwner: boolean
}

export function RequestDonationButton({ 
  donationId, 
  donationTitle, 
  maxQuantity,
  isOwner 
}: RequestDonationButtonProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      message: '',
      requested_quantity: 1
    }
  })

  // Não mostrar o botão se for o próprio doador
  if (isOwner) {
    return null
  }

  const onSubmit = async (data: RequestFormData) => {
    setIsLoading(true)
    
    try {
      const result = await createRequest({
        donation_id: donationId,
        message: data.message || undefined,
        requested_quantity: data.requested_quantity || 1
      })

      if (result.success) {
        toast({
          title: 'Solicitação enviada!',
          description: 'Sua solicitação foi enviada ao doador. Você será notificado quando houver uma resposta.'
        })
        setOpen(false)
        form.reset()
        router.refresh()
      } else {
        toast({
          title: 'Erro ao enviar solicitação',
          description: result.error,
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Erro ao criar solicitação:', error)
      toast({
        title: 'Erro inesperado',
        description: 'Ocorreu um erro inesperado. Tente novamente.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full">
          <MessageCircle className="h-4 w-4 mr-2" />
          Solicitar Doação
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Solicitar Doação</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Você está solicitando: <span className="font-medium">{donationTitle}</span>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {maxQuantity && maxQuantity > 1 && (
                <FormField
                  control={form.control}
                  name="requested_quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade desejada</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={maxQuantity}
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                      <FormMessage />
                      {maxQuantity && (
                        <div className="text-xs text-gray-500">
                          Máximo disponível: {maxQuantity}
                        </div>
                      )}
                    </FormItem>
                  )}
                />
              )}
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensagem (opcional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Deixe uma mensagem para o doador explicando por que você precisa desta doação..."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Enviar Solicitação
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
} 