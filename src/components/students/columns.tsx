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
import { EditUserDialog } from "./EditUserDialog"

export type Student = {
  id: number
  name: string
  email: string
  phone: string
  adress: string
  birthday: string
  passport: string | null
  name_family: string | null
  gender: string
  level_school: string
  unit_school: 'BRASIL' | 'EUA'
  createdAt: string
  updatedAt: string
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
    accessorKey: "birthday",
    header: "Data de Nascimento",
    cell: ({ row }) => {
      const birthday = row.getValue("birthday") as string
      return birthday ? new Date(birthday).toLocaleDateString('pt-BR') : '-'
    },
  },
  {
    accessorKey: "passport",
    header: "Passaporte/RG",
    cell: ({ row }) => {
      const passport = row.getValue("passport") as string | null
      return passport || "-"
    },
  },
  {
    accessorKey: "name_family",
    header: "Nome do Responsável",
    cell: ({ row }) => {
      const nameFamily = row.getValue("name_family") as string | null
      return nameFamily || "-"
    },
  },
  {
    accessorKey: "unit_school",
    header: "Unidade",
    cell: ({ row }) => {
        const unit = row.getValue("unit_school") as string
        return unit === 'EUA' ? '🇺🇸 EUA' : '🇧🇷 Brasil'
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
      const [editDialogOpen, setEditDialogOpen] = useState(false)
      const [isDeleting, setIsDeleting] = useState(false)

      const handleDelete = async () => {
        setIsDeleting(true)
        try {
          const response = await fetch(`https://v5.destinify.com.br/api/user/student/${student.id}`, {
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
              <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
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

          <EditUserDialog
            isOpen={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            user={student}
            onUserUpdated={(table.options.meta as TableMeta).refetch}
          />

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