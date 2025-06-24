"use client"

import { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { X, Upload, ImageIcon, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Button } from './button'
import { Card } from './card'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

interface ImageFile {
  file: File
  preview: string
  id: string
}

interface UploadedImage {
  url: string
  path: string
  id: string
}

interface ImageUploadProps {
  value?: string[]
  onChange: (urls: string[]) => void
  maxFiles?: number
  maxSize?: number
  className?: string
  disabled?: boolean
}

export function ImageUpload({
  value = [],
  onChange,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB
  className,
  disabled = false
}: ImageUploadProps) {
  const [files, setFiles] = useState<ImageFile[]>([])
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>(() => {
    // Inicializar com imagens existentes se houver
    return value.map((url, index) => ({
      url,
      path: url.split('/').pop() || '',
      id: `existing-${index}`
    }))
  })
  const [uploading, setUploading] = useState(false)

  const supabase = createClient()
  const { toast } = useToast()

  // Sincronizar com mudanças no valor prop
  useEffect(() => {
    const currentUrls = uploadedImages.map(img => img.url).sort()
    const newUrls = [...value].sort()
    
    // Só atualiza se as URLs realmente mudaram
    if (JSON.stringify(currentUrls) !== JSON.stringify(newUrls)) {
      setUploadedImages(value.map((url, index) => ({
        url,
        path: url.split('/').pop() || '',
        id: `existing-${index}`
      })))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]) // uploadedImages intencionalmente omitido para evitar loop

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substring(7)
    }))

    setFiles(prev => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxSize,
    maxFiles: maxFiles - files.length - uploadedImages.length,
    disabled: disabled || uploading
  })



  const removeUploadedImage = async (id: string, path: string) => {
    try {
      // Remove do storage
      await supabase.storage
        .from('donation_images')
        .remove([path])

      // Remove do estado e atualiza o valor
      setUploadedImages(prev => {
        const updated = prev.filter(img => img.id !== id)
        const newUrls = updated.map(img => img.url)
        onChange(newUrls)
        return updated
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro ao remover imagem:', error)
    }
  }

  const uploadFiles = useCallback(async () => {
    if (files.length === 0) return

    setUploading(true)
    const newUploadedImages: UploadedImage[] = []



    try {
      for (const fileData of files) {
        const fileExt = fileData.file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        // Get user ID for RLS policy compliance
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          console.error('Usuário não autenticado para upload')
          continue
        }
        
        // RLS policy requires user_id as first folder
        const filePath = `${user.id}/${fileName}`





        const { error } = await supabase.storage
          .from('donation_images')
          .upload(filePath, fileData.file, {
            cacheControl: '3600',
            upsert: false
          })

        if (error) {
          // eslint-disable-next-line no-console
          console.error('Erro no upload:', error)
          
          toast({
            title: "Erro no upload",
            description: `Erro ao enviar ${fileData.file.name}: ${error.message}`,
            variant: "destructive"
          })
          

          continue
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('donation_images')
          .getPublicUrl(filePath)



        newUploadedImages.push({
          url: publicUrl,
          path: filePath,
          id: fileData.id
        })


      }

      // Atualiza o estado
      setUploadedImages(prev => [...prev, ...newUploadedImages])
      
      // Atualiza o valor do formulário após o state update
      const allUploadedImages = [...uploadedImages, ...newUploadedImages]
      const allUrls = allUploadedImages.map(img => img.url)
      onChange(allUrls)

      // Limpa os arquivos temporários
      setFiles([])


      // Feedback de sucesso
      if (newUploadedImages.length > 0) {
        toast({
          title: "Upload concluído",
          description: `${newUploadedImages.length} imagem${newUploadedImages.length > 1 ? 's' : ''} enviada${newUploadedImages.length > 1 ? 's' : ''} com sucesso!`
        })
      }

    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro durante upload:', error)
    } finally {
      setUploading(false)
    }
  }, [files, uploadedImages, onChange, supabase, toast])

  // Upload automático quando arquivos são adicionados
  useEffect(() => {
    if (files.length > 0 && !uploading) {
      const timer = setTimeout(() => {
        uploadFiles()
      }, 500) // Delay para permitir múltiplos arquivos

      return () => clearTimeout(timer)
    }
  }, [files.length, uploading, uploadFiles])

  const totalImages = files.length + uploadedImages.length
  const canUploadMore = totalImages < maxFiles

  return (
    <div className={cn("space-y-4", className)}>
      {/* Dropzone */}
      {canUploadMore && (
        <Card
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed p-6 cursor-pointer transition-colors",
            isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center text-center">
            <Upload className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-sm font-medium">
              {isDragActive
                ? "Solte as imagens aqui..."
                : "Arraste imagens ou clique para selecionar"
              }
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              PNG, JPG, WEBP até {Math.round(maxSize / 1024 / 1024)}MB
            </p>
            <p className="text-xs text-muted-foreground">
              Máximo {maxFiles} imagens ({maxFiles - totalImages} restantes)
            </p>
            <p className="text-xs text-muted-foreground mt-1 italic">
              Upload automático após seleção
            </p>
          </div>
        </Card>
      )}

      {/* Indicador de upload em progresso */}
      {uploading && (
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 p-4">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm font-medium">
              Enviando {files.length} imagem{files.length > 1 ? 's' : ''}...
            </span>
          </div>
        </div>
      )}

      {/* Imagens já enviadas */}
      {uploadedImages.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Imagens enviadas</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedImages.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square relative overflow-hidden rounded-lg border">
                  <Image
                    src={image.url}
                    alt="Imagem da doação"
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeUploadedImage(image.id, image.path)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estado vazio */}
      {totalImages === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-sm">Nenhuma imagem adicionada</p>
        </div>
      )}
    </div>
  )
} 