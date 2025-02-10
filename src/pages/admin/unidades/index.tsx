import { useState, useEffect } from "react"
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
import { Table, TableCaption, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { UserProfile } from "@/components/common/user-profile"

interface School {
    id: number
    name: string
    createdAt: string
    status: boolean
}

const UnidadesPage = () => {
    const [schools, setSchools] = useState<School[]>([])
    const [newUnitName, setNewUnitName] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null)
    const [editName, setEditName] = useState("")

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await fetch('https://v5.destinify.com.br/api/school/list')
                const data = await response.json()
                setSchools(data)
            } catch (error) {
                console.error('Erro ao buscar unidades:', error)
            }
        }

        fetchSchools()
    }, [])

    const handleAddUnit = async () => {
        if (!newUnitName.trim()) return

        try {
            const response = await fetch('https://v5.destinify.com.br/api/school/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newUnitName.trim(),
                }),
            })

            if (response.ok) {
                const newSchool = await response.json()
                setSchools([...schools, newSchool])
                setNewUnitName("")
                setIsDialogOpen(false)
            }
        } catch (error) {
            console.error('Erro ao criar unidade:', error)
        }
    }

    const handleEdit = (school: School) => {
        setSelectedSchool(school)
        setEditName(school.name)
        setIsEditDialogOpen(true)
    }

    const handleUpdate = async () => {
        if (!selectedSchool) return

        try {
            const response = await fetch(`https://v5.destinify.com.br/api/school/edit/${selectedSchool.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: editName,
                }),
            })

            if (response.ok) {
                const updatedSchools = schools.map(school => 
                    school.id === selectedSchool.id 
                        ? { ...school, name: editName }
                        : school
                )
                setSchools(updatedSchools)
                setIsEditDialogOpen(false)
            }
        } catch (error) {
            console.error('Erro ao atualizar unidade:', error)
        }
    }

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
                    <UserProfile />
                </header>
                <main className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Unidades</h2>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-brand hover:bg-brand/90">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Adicionar Unidade
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Adicionar Nova Unidade</DialogTitle>
                                    <DialogDescription>Por favor, insira o nome da unidade.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-1 items-center gap-4">
                                        <Input
                                            id="name"
                                            placeholder="Nome da unidade"
                                            value={newUnitName}
                                            onChange={(e) => setNewUnitName(e.target.value)}
                                            className="col-span-3"
                                        />
                                    </div>
                                </div>
                                <Button onClick={handleAddUnit}>Adicionar</Button>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="">
                        <Table>
                            <TableCaption></TableCaption>
                            <TableHeader>
                                <TableRow className="mx-4">
                                    <TableHead className="md:w-[300px]">Data de criação</TableHead>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Ação</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {schools.map((school) => (
                                    <TableRow key={school.id}>
                                        <TableCell>
                                            {new Date(school.createdAt).toLocaleDateString('pt-BR')}
                                        </TableCell>
                                        <TableCell>{school.name}</TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="sm" onClick={() => handleEdit(school)}>
                                                Editar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </main>
            </SidebarInset>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Unidade</DialogTitle>
                        <DialogDescription>Edite as informações da unidade.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 items-center gap-4">
                            <Input
                                id="edit-name"
                                placeholder="Nome da unidade"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <Button onClick={handleUpdate}>Salvar alterações</Button>
                </DialogContent>
            </Dialog>
        </SidebarProvider>
    )
}

export default UnidadesPage
