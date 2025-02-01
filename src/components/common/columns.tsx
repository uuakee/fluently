"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { InstallmentsDialog } from "./installments-dialog"

export type Payment = {
  user: {
    id: number
    name: string
    email: string
  }
  totalInstallments: number
  pendingInstallments: number
  totalPendingAmount: number
  totalPaidAmount: number
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "user.name",
    header: "Nome do Aluno",
  },
  {
    accessorKey: "user.email",
    header: "Email",
  },
  {
    accessorKey: "totalInstallments",
    header: "Total de Parcelas",
  },
  {
    accessorKey: "pendingInstallments",
    header: "Parcelas Pendentes",
    cell: ({ row }) => {
      const pendingInstallments = row.getValue("pendingInstallments") as number
      return (
        <Badge variant={pendingInstallments > 0 ? "destructive" : "secondary"}>
          {pendingInstallments}
        </Badge>
      )
    },
  },
  {
    accessorKey: "totalPendingAmount",
    header: "Valor Pendente",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPendingAmount"))
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "totalPaidAmount",
    header: "Valor Pago",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPaidAmount"))
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <InstallmentsDialog userId={payment.user.id}>
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
        </InstallmentsDialog>
      )
    },
  },
] 