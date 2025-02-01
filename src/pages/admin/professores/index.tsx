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
import { DataTable } from "@/components/common/data-table"
import { columns } from "@/components/teachers/columns"
import type { Teacher } from "@/components/teachers/columns"
import { toast } from "sonner"

interface School {
    id: number
    name: string
    createdAt: string
    status: boolean
}

interface CreateTeacherData {
    name: string
    email: string
    password: string
    adress: string
}

const ProfessoresPage = () => {
    const [schools, setSchools] = useState<School[]>([])
    const [newUnitName, setNewUnitName] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null)
    const [editName, setEditName] = useState("")
    const [teachers, setTeachers] = useState<Teacher[]>([])
    const [formData, setFormData] = useState<CreateTeacherData>({
        name: "",
        email: "",
        password: "",
        adress: ""
    })

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await fetch('https://v1.destinify.com.br/api/school/list')
                const data = await response.json()
                setSchools(data)
            } catch (error) {
                console.error('Erro ao buscar unidades:', error)
            }
        }

        fetchSchools()
    }, [])

    const fetchTeachers = async () => {
        try {
            const response = await fetch('https://v1.destinify.com.br/api/user/teachers')
            if (!response.ok) {
                throw new Error('Falha ao buscar professores')
            }
            const data = await response.json()
            const teachersList = Array.isArray(data) ? data.filter(user => user.role === 'TEACHER') : []
            setTeachers(teachersList)
        } catch (error) {
            console.error('Erro ao buscar professores:', error)
            setTeachers([])
        }
    }

    useEffect(() => {
        fetchTeachers()
    }, [])

    const handleAddUnit = async () => {
        if (!newUnitName.trim()) return

        try {
            const response = await fetch('https://v1.destinify.com.br/api/school/create', {
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
            const response = await fetch(`https://v1.destinify.com.br/api/school/edit/${selectedSchool.id}`, {
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

    const handleCreateTeacher = async () => {
        try {
            const response = await fetch('https://v1.destinify.com.br/api/user/create-teacher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    role: "TEACHER"
                }),
            })

            if (response.ok) {
                toast.success("Professor cadastrado com sucesso!")
                setIsDialogOpen(false)
                setFormData({ name: "", email: "", password: "", adress: "" })
                // Recarrega a lista de professores
                fetchTeachers()
            } else {
                toast.error("Erro ao cadastrar professor")
            }
        } catch (error) {
            console.error('Erro ao cadastrar professor:', error)
            toast.error("Erro ao cadastrar professor")
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
                                    <BreadcrumbLink href="#">Gestão</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Professores</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <UserProfile />
                </header>
                <main className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Professores</h2>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-brand hover:bg-brand/90">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Cadastrar professor
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Cadastrar Professor</DialogTitle>
                                    <DialogDescription>
                                        Preencha os dados do professor para cadastrá-lo no sistema.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Nome completo</Label>
                                        <Input
                                            id="name"
                                            placeholder="Nome do professor"
                                            value={formData.name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="email@exemplo.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Senha</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Digite a senha"
                                            value={formData.password}
                                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="adress">Endereço</Label>
                                        <Input
                                            id="adress"
                                            placeholder="Endereço completo"
                                            value={formData.adress}
                                            onChange={(e) => setFormData(prev => ({ ...prev, adress: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                <Button onClick={handleCreateTeacher}>
                                    Cadastrar Professor
                                </Button>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div>
                        <DataTable columns={columns} data={teachers} />
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

export default ProfessoresPage
