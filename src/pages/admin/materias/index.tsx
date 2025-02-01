import { useState } from "react"
import { AdmSidebar } from "@/components/common/adm-sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from 'lucide-react'
import { Table, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const MateriasPage = () => {
    const [newUnitName, setNewUnitName] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)


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
                                    <BreadcrumbLink href="#">Administração</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Unidades</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="flex items-center gap-2 mr-4">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarFallback className="rounded-lg bg-brand text-white font-extralight">JD</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <h3 className="text-sm font-semibold">John Doe</h3>
                            <a className="cursor-pointer text-[10px] text-muted-foreground">Editar perfil</a>
                        </div>
                    </div>
                </header>
                <main className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Materias</h2>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-brand hover:bg-brand/90">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Adicionar materia
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Adicionar materia</DialogTitle>
                                    <DialogDescription>Por favor, insira o nome da nova materia.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-1 items-center gap-4">
                                        <Input
                                            id="name"
                                            placeholder="Nome da materia"
                                            value={newUnitName}
                                            onChange={(e) => setNewUnitName(e.target.value)}
                                            className="col-span-3"
                                        />
                                    </div>
                                </div>
                                <Button >Adicionar</Button>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="">
                        <Table>
                            <TableCaption>Lista de Materias</TableCaption>
                            <TableHeader >
                                <TableRow className="mx-4">
                                    <TableHead className="md:w-[300px]">Data de criação</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Ação</TableHead>
                                </TableRow>
                                
                            </TableHeader>
                        </Table>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default MateriasPage
