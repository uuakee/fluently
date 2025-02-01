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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from 'lucide-react'
import { UserProfile } from "@/components/common/user-profile"
import { DataTable } from "@/components/common/data-table"
import { columns } from "@/components/students/columns"
import type { Student } from "@/components/students/columns"
import { toast } from "sonner"

interface CreateStudentData {
    name: string
    email: string
    password: string
    adress: string
    amount: string
    numberOfInstallments: string
}

const AlunosPage = () => {
    const [students, setStudents] = useState<Student[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [formData, setFormData] = useState<CreateStudentData>({
        name: "",
        email: "",
        password: "",
        adress: "",
        amount: "",
        numberOfInstallments: ""
    })

    const fetchStudents = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('https://v1.destinify.com.br/api/user/students')
            if (!response.ok) {
                throw new Error('Falha ao buscar alunos')
            }
            const data = await response.json()
            const studentsList = Array.isArray(data) ? data.filter(user => user.role === 'STUDENT') : []
            setStudents(studentsList)
        } catch (error) {
            console.error('Erro ao buscar alunos:', error)
            setStudents([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchStudents()
    }, [])

    const handleCreateStudent = async () => {
        try {
            const studentResponse = await fetch('https://v1.destinify.com.br/api/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    adress: formData.adress,
                    role: "STUDENT"
                }),
            })

            if (studentResponse.ok) {
                const newStudent = await studentResponse.json()
                
                const installmentsResponse = await fetch('https://v1.destinify.com.br/api/payment/create-installments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: newStudent.userId,
                        amount: formData.amount,
                        numberOfInstallments: formData.numberOfInstallments
                    }),
                })

                if (installmentsResponse.ok) {
                    toast.success("Aluno e mensalidades cadastrados com sucesso!")
                    setIsDialogOpen(false)
                    setFormData({
                        name: "", 
                        email: "", 
                        password: "", 
                        adress: "",
                        amount: "",
                        numberOfInstallments: ""
                    })
                    fetchStudents()
                } else {
                    toast.error("Erro ao criar mensalidades")
                }
            } else {
                toast.error("Erro ao cadastrar aluno")
            }
        } catch (error) {
            console.error('Erro ao cadastrar:', error)
            toast.error("Erro ao cadastrar aluno")
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
                                    <BreadcrumbPage>Alunos</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <UserProfile />
                </header>
                <main className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Alunos</h2>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-brand hover:bg-brand/90">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Cadastrar aluno
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Cadastrar Aluno</DialogTitle>
                                    <DialogDescription>
                                        Preencha os dados do aluno e configure as mensalidades.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="space-y-4">
                                        <h4 className="font-medium">Dados do Aluno</h4>
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Nome completo</Label>
                                            <Input
                                                id="name"
                                                placeholder="Nome do aluno"
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
                                    <div className="space-y-4">
                                        <h4 className="font-medium">Configuração das Mensalidades</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="amount">Valor da Mensalidade</Label>
                                                <Input
                                                    id="amount"
                                                    type="number"
                                                    placeholder="Digite o valor"
                                                    value={formData.amount}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="installments">Nº de Parcelas</Label>
                                                <Input
                                                    id="installments"
                                                    type="number"
                                                    placeholder="Digite o número de parcelas"
                                                    value={formData.numberOfInstallments}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, numberOfInstallments: e.target.value }))}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button onClick={handleCreateStudent}>
                                    Cadastrar Aluno
                                </Button>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div>
                        <DataTable 
                            columns={columns} 
                            data={students}
                            meta={{ refetch: fetchStudents }}
                            state={{ isLoading }}
                        />
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default AlunosPage
