"use client"

import { useState } from "react"
import { ColumnDef, Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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

export type Student = {
  id: number
  name: string
  email: string
  adress: string
  role: string
  createdAt: string
  updatedAt: string
  pendingPayments: number
}

interface DeleteStudentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  studentId: number
  studentName: string
  onConfirm: () => void
}

function DeleteStudentDialog({ 
  open, 
  onOpenChange, 
  studentId, 
  studentName,
  onConfirm 
}: DeleteStudentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Aluno</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir o aluno {studentName}? Esta ação não pode ser desfeita.
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
  refetch: () => Promise<void>
}

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "adress",
    header: "Endereço",
  },
  {
    accessorKey: "pendingPayments",
    header: "Mensalidades Pendentes",
    cell: ({ row }) => {
      const pendingPayments = row.getValue("pendingPayments") as number
      return (
        <Badge variant={pendingPayments > 0 ? "destructive" : "secondary"}>
          {pendingPayments}
        </Badge>
      )
    },
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
      const student = row.original
      const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
      const [isDeleting, setIsDeleting] = useState(false)

      const handleDelete = async () => {
        setIsDeleting(true)
        try {
          const response = await fetch(`https://v1.destinify.com.br/api/user/student/${student.id}`, {
            method: 'DELETE',
          })

          if (response.ok) {
            toast.success("Aluno excluído com sucesso!")
            await (table.options.meta as TableMeta).refetch()
          } else {
            toast.error("Erro ao excluir aluno")
          }
        } catch (error) {
          console.error('Erro ao excluir aluno:', error)
          toast.error("Erro ao excluir aluno")
        } finally {
          setIsDeleting(false)
          setDeleteDialogOpen(false)
        }
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
              <DropdownMenuItem disabled={isDeleting}>
                <Pencil className="mr-2 h-4 w-4" />
                Editar
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

          <DeleteStudentDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            studentId={student.id}
            studentName={student.name}
            onConfirm={handleDelete}
          />
        </>
      )
    },
  },
] 