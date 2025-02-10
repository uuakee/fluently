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
import { UserProfile } from "@/components/common/user-profile"

interface Course {
    id: number
    name: string
    description: string
    createdAt: string
}

const MateriasPage = () => {
    const [newUnitName, setNewUnitName] = useState("")
    const [newUnitDescription, setNewUnitDescription] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [courses, setCourses] = useState<Course[]>([])
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
    const [editName, setEditName] = useState("")
    const [editDescription, setEditDescription] = useState("")

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('https://v5.destinify.com.br/api/course/list')
                const data = await response.json()
                setCourses(data)
            } catch (error) {
                console.error('Erro ao buscar cursos:', error)
            }
        }

        fetchCourses()
    }, [])

    const handleEdit = (course: Course) => {
        setSelectedCourse(course)
        setEditName(course.name)
        setEditDescription(course.description)
        setIsEditDialogOpen(true)
    }

    const handleUpdate = async () => {
        if (!selectedCourse) return

        try {
            const response = await fetch(`https://v5.destinify.com.br/api/course/edit/${selectedCourse.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: editName,
                    description: editDescription,
                }),
            })

            if (response.ok) {
                // Atualiza a lista de cursos
                const updatedCourses = courses.map(course => 
                    course.id === selectedCourse.id 
                        ? { ...course, name: editName, description: editDescription }
                        : course
                )
                setCourses(updatedCourses)
                setIsEditDialogOpen(false)
            }
        } catch (error) {
            console.error('Erro ao atualizar curso:', error)
        }
    }

    const handleCreate = async () => {
        try {
            const response = await fetch('https://v5.destinify.com.br/api/course/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newUnitName,
                    description: newUnitDescription,
                }),
            })

            if (response.ok) {
                const newCourse = await response.json()
                setCourses([...courses, newCourse])
                setNewUnitName("")
                setNewUnitDescription("")
                setIsDialogOpen(false)
            }
        } catch (error) {
            console.error('Erro ao criar curso:', error)
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
                                    <DialogTitle>Adicionar matéria</DialogTitle>
                                    <DialogDescription>Por favor, insira o nome e descrição da nova matéria.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-1 items-center gap-4">
                                        <Input
                                            id="name"
                                            placeholder="Nome da matéria"
                                            value={newUnitName}
                                            onChange={(e) => setNewUnitName(e.target.value)}
                                            className="col-span-3"
                                        />
                                        <Input
                                            id="desc"
                                            placeholder="Descrição da matéria"
                                            value={newUnitDescription}
                                            onChange={(e) => setNewUnitDescription(e.target.value)}
                                            className="col-span-3 h-16"
                                        />
                                    </div>
                                </div>
                                <Button onClick={handleCreate}>Adicionar</Button>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="">
                        <Table>
                            <TableCaption></TableCaption>
                            <TableHeader>
                                <TableRow className="mx-4">
                                    <TableHead className="md:w-[250px]">Data de criação</TableHead>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Descrição</TableHead>
                                    <TableHead>Ação</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {courses.map((course) => (
                                    <TableRow key={course.id}>
                                        <TableCell>{new Date(course.createdAt).toLocaleDateString('pt-BR')}</TableCell>
                                        <TableCell>{course.name}</TableCell>
                                        <TableCell>{course.description}</TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="sm" onClick={() => handleEdit(course)}>
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
                        <DialogTitle>Editar matéria</DialogTitle>
                        <DialogDescription>Edite as informações da matéria.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 items-center gap-4">
                            <Input
                                id="edit-name"
                                placeholder="Nome da matéria"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="col-span-3"
                            />
                            <Input
                                id="edit-desc"
                                placeholder="Descrição da matéria"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className="col-span-3 h-16"
                            />
                        </div>
                    </div>
                    <Button onClick={handleUpdate}>Salvar alterações</Button>
                </DialogContent>
            </Dialog>
        </SidebarProvider>
    )
}

export default MateriasPage
