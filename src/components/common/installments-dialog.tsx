"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Installment {
  id: number
  userId: number
  amount: number
  status: string
  createdAt: string
}

interface InstallmentsDialogProps {
  children: React.ReactNode
  userId: number
}

export function InstallmentsDialog({ children, userId }: InstallmentsDialogProps) {
  const [installments, setInstallments] = useState<Installment[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState<number | null>(null)

  useEffect(() => {
    if (open) {
      fetchInstallments()
    }
  }, [open])

  const fetchInstallments = async () => {
    try {
      const response = await fetch(`https://v1.destinify.com.br/api/payment/get-installments/${userId}`)
      const data = await response.json()
      setInstallments(data)
    } catch (error) {
      console.error('Erro ao buscar mensalidades:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const formatStatus = (status: string) => {
    const statusMap = {
      'PENDING': { label: 'Pendente', variant: 'destructive' as const },
      'PAID': { label: 'Pago', variant: 'secondary' as const },
    }
    return statusMap[status as keyof typeof statusMap] || { label: status, variant: 'default' as const }
  }

  const handlePayment = async (installmentId: number) => {
    setLoading(installmentId)
    try {
      const response = await fetch(`https://v1.destinify.com.br/api/payment/${installmentId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'PAID'
        })
      })

      if (response.ok) {
        await fetchInstallments() // Recarrega os dados
        toast.success("Mensalidade marcada como paga!")
      } else {
        toast.error("Erro ao atualizar o status da mensalidade")
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      toast.error("Erro ao atualizar o status da mensalidade")
    } finally {
      setLoading(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-3xl p-0 md:p-6">
        <DialogHeader className="p-4 md:p-0">
          <DialogTitle>Histórico de Mensalidades</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] md:h-auto">
          <div className="p-4 md:p-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Nº</TableHead>
                    <TableHead className="hidden md:table-cell">Data</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[70px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {installments.map((installment, index) => (
                    <TableRow key={installment.id}>
                      <TableCell className="font-medium">
                        {index + 1}ª
                        <div className="md:hidden text-xs text-muted-foreground">
                          {formatDate(installment.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatDate(installment.createdAt)}
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(installment.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={formatStatus(installment.status).variant}
                          className="whitespace-nowrap"
                        >
                          {formatStatus(installment.status).label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {installment.status === 'PENDING' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handlePayment(installment.id)}
                            disabled={loading === installment.id}
                            className="h-8 w-8"
                          >
                            <Check className="h-4 w-4 text-green-500" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
} 