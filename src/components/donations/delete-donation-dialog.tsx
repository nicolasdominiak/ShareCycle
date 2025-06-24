"use client"

import { useState } from 'react'
import { Loader2, Trash2, AlertTriangle } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { deleteDonation } from '@/lib/actions/donations'
import { useToast } from '@/hooks/use-toast'

interface DeleteDonationDialogProps {
  isOpen: boolean
  onClose: () => void
  donationId: string
  donationTitle: string
  onDeleted?: () => void
}

export function DeleteDonationDialog({ 
  isOpen, 
  onClose, 
  donationId, 
  donationTitle,
  onDeleted 
}: DeleteDonationDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      
      const result = await deleteDonation(donationId)
      
      if (result.success) {
        toast({
          title: "Doação excluída",
          description: result.message,
        })
        onDeleted?.()
        onClose()
      } else {
        toast({
          title: "Erro ao excluir doação",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Erro ao excluir doação:', error)
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro ao excluir a doação. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Confirmar Exclusão
          </DialogTitle>
          <DialogDescription className="text-left">
            Tem certeza que deseja excluir a doação{' '}
            <span className="font-semibold">&ldquo;{donationTitle}&rdquo;</span>?
            <br />
            <br />
            Esta ação não pode ser desfeita e a doação será removida permanentemente.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="gap-2"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            {isDeleting ? 'Excluindo...' : 'Excluir Doação'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 