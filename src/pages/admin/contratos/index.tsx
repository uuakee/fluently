"use client"

import { useState, useEffect } from "react"
import { AdmSidebar } from "@/components/common/adm-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { UserProfile } from "@/components/common/user-profile"
import { DataTable } from "@/components/common/data-table"
import { columns, type Contract } from "@/components/contracts/columns"
import { DialogContract } from "@/components/contracts/dialog-contract"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contratos | Fluently",
  description: "Gerenciamento de contratos dos alunos",
}

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const fetchContracts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('https://v5.destinify.com.br/api/contract')
      if (response.ok) {
        const data = await response.json()
        setContracts(data)
      }
    } catch (error) {
      console.error('Erro ao buscar contratos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchContracts()
  }, [])

  return (
    <SidebarProvider>
      <AdmSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Gestão</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Contratos</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <UserProfile />
        </header>
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Contratos</h2>
            <Button onClick={() => setIsDialogOpen(true)} className="bg-brand hover:bg-brand/90">
              <Plus className="mr-2 h-4 w-4" />
              Novo Contrato
            </Button>
          </div>
          <div>
            <DataTable 
              columns={columns} 
              data={contracts}
              meta={{ refetch: fetchContracts }}
              state={{ isLoading }}
            />
          </div>
          <DialogContract
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onContractCreated={fetchContracts}
          />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
} 