"use client"

import { useState, useEffect } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Download, Trash, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export type Contract = {
  id: number
  userId: number
  startDate: string
  endDate: string
  fileName: string
  createdAt: string
}

// Componente para mostrar o nome do usuário
function UserNameCell({ userId }: { userId: number }) {
  const [userName, setUserName] = useState<string>('Carregando...')

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch(`https://v5.destinify.com.br/api/user/${userId}`)
        if (response.ok) {
          const user = await response.json()
          setUserName(user.name)
        } else {
          setUserName('Usuário não encontrado')
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error)
        setUserName('Erro ao carregar')
      }
    }

    fetchUserName()
  }, [userId])

  return userName
}

interface DeleteContractDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  contractId: number
  fileName: string
  onConfirm: () => void
}

function DeleteContractDialog({ 
  open, 
  onOpenChange, 
  contractId,
  fileName,
  onConfirm 
}: DeleteContractDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Contrato</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir o contrato {fileName}? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

type TableMeta = {
  refetch?: () => Promise<void>
}

export const columns: ColumnDef<Contract>[] = [
  {
    accessorKey: "userId",
    header: "Aluno",
    cell: ({ row }) => {
      const userId = row.getValue("userId") as number
      return <UserNameCell userId={userId} />
    }
  },
  {
    accessorKey: "startDate",
    header: "Data de Início",
    cell: ({ row }) => {
      return new Date(row.getValue("startDate")).toLocaleDateString('pt-BR')
    },
  },
  {
    accessorKey: "endDate",
    header: "Data de Término",
    cell: ({ row }) => {
      return new Date(row.getValue("endDate")).toLocaleDateString('pt-BR')
    },
  },
  {
    accessorKey: "fileName",
    header: "Arquivo",
  },
  {
    accessorKey: "createdAt",
    header: "Data de Cadastro",
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleDateString('pt-BR')
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const contract = row.original
      const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
      const [isDeleting, setIsDeleting] = useState(false)

      const handleDelete = async () => {
        setIsDeleting(true)
        try {
          const response = await fetch(`https://v5.destinify.com.br/api/contract/${contract.id}`, {
            method: 'DELETE',
          })

          if (response.ok) {
            toast.success("Contrato excluído com sucesso!")
            await (table.options.meta as TableMeta)?.refetch?.()
            window.location.reload()
          } else {
            toast.error("Erro ao excluir contrato")
          }
        } catch (error) {
          console.error('Erro ao excluir contrato:', error)
          toast.error("Erro ao excluir contrato")
        } finally {
          setIsDeleting(false)
          setDeleteDialogOpen(false)
        }
      }

      const handleDownload = async () => {
        window.open(`https://v5.destinify.com.br/api/contract/${contract.id}/download`, '_blank')
      }

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0" disabled={isDeleting}>
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MoreHorizontal className="h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setDeleteDialogOpen(true)}
                disabled={isDeleting}
              >
                <Trash className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DeleteContractDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            contractId={contract.id}
            fileName={contract.fileName}
            onConfirm={handleDelete}
          />
        </>
      )
    },
  },
] 