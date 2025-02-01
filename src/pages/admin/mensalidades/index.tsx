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
import { columns } from "@/components/common/columns"
import type { Payment } from "@/components/common/columns"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "react-hot-toast"

interface School {
    id: number
    name: string
    createdAt: string
    status: boolean
}

interface Student {
  id: number
  name: string
  email: string
  adress: string
  role: string
  createdAt: string
  updatedAt: string
}

const MensalidadesPage = () => {
    const [schools, setSchools] = useState<School[]>([])
    const [newUnitName, setNewUnitName] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null)
    const [editName, setEditName] = useState("")
    const [payments, setPayments] = useState<Payment[]>([])
    const [students, setStudents] = useState<Student[]>([])
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
    const [open, setOpen] = useState(false)
    const [installmentAmount, setInstallmentAmount] = useState("499")
    const [numberOfInstallments, setNumberOfInstallments] = useState("12")

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

    const fetchPayments = async () => {
        try {
            const response = await fetch('https://v1.destinify.com.br/api/payment/get-all-installments')
            const data = await response.json()
            setPayments(data)
        } catch (error) {
            console.error('Erro ao buscar mensalidades:', error)
        }
    }

    useEffect(() => {
        fetchPayments()
    }, [])

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('https://v1.destinify.com.br/api/user/students')
                if (!response.ok) {
                    throw new Error('Falha ao buscar estudantes')
                }
                const data = await response.json()
                const studentsList = Array.isArray(data) ? data.filter(user => user.role === 'STUDENT') : []
                setStudents(studentsList)
            } catch (error) {
                console.error('Erro ao buscar estudantes:', error)
                setStudents([])
            }
        }

        fetchStudents()
    }, [])


    const handleCreateInstallments = async () => {
        if (!selectedStudent) {
            toast.error("Selecione um estudante")
            return
        }

        try {
            const response = await fetch('https://v1.destinify.com.br/api/payment/create-installments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: selectedStudent.id,
                    amount: installmentAmount,
                    numberOfInstallments: numberOfInstallments
                }),
            })

            if (response.ok) {
                toast.success("Mensalidades criadas com sucesso!")
                setIsDialogOpen(false)
                setSelectedStudent(null)
                fetchPayments() // Recarrega a lista de mensalidades
            } else {
                toast.error("Erro ao criar mensalidades")
            }
        } catch (error) {
            console.error('Erro ao criar mensalidades:', error)
            toast.error("Erro ao criar mensalidades")
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
                                    <BreadcrumbLink href="#">Financeiro</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Mensalidades</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <UserProfile />
                </header>
                <main className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Mensalidades</h2>
                        {/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-brand hover:bg-brand/90">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Cadastrar mensalidade
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Cadastrar Mensalidade</DialogTitle>
                                    <DialogDescription>
                                        Selecione o estudante e configure as mensalidades.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label>Estudante</Label>
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={open}
                                                    className="justify-between"
                                                >
                                                    {selectedStudent ? selectedStudent.name : "Selecione um estudante..."}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[400px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Buscar estudante..." />
                                                    <CommandEmpty>Nenhum estudante encontrado.</CommandEmpty>
                                                    <CommandGroup>
                                                        {Array.isArray(students) && students.length > 0 ? (
                                                            students.map((student) => (
                                                                <CommandItem
                                                                    key={student.id}
                                                                    onSelect={() => {
                                                                        setSelectedStudent(student)
                                                                        setOpen(false)
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            selectedStudent?.id === student.id ? "opacity-100" : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {student.name}
                                                                </CommandItem>
                                                            ))
                                                        ) : (
                                                            <CommandItem disabled>Nenhum estudante encontrado</CommandItem>
                                                        )}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Valor da Mensalidade</Label>
                                        <Input
                                            type="number"
                                            value={installmentAmount}
                                            onChange={(e) => setInstallmentAmount(e.target.value)}
                                            placeholder="Valor da mensalidade"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Número de Parcelas</Label>
                                        <Input
                                            type="number"
                                            value={numberOfInstallments}
                                            onChange={(e) => setNumberOfInstallments(e.target.value)}
                                            placeholder="Número de parcelas"
                                        />
                                    </div>
                                </div>
                                <Button onClick={handleCreateInstallments}>
                                    Cadastrar Mensalidades
                                </Button>
                            </DialogContent>
                        </Dialog> */}
                    </div>
                    <div>
                        <DataTable columns={columns} data={payments} />
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default MensalidadesPage
