"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"

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
      const pendingInstallments = row.getValue("pendingInstallments")
      return (
        <Badge variant={pendingInstallments > 0 ? "destructive" : "success"}>
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
] 