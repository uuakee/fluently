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
import DialogRegister from "@/components/students/dialog-register"

interface CreateStudentData {
    userId: number
    name: string
    email: string
    password: string
    phone: string
    adress: string
    amount: string
    numberOfInstallments: string
    birthday: string,
    passport: string
}

interface School {
    id: number;
    name: string;
}

interface Subject {
    id: number;
    name: string;
}

const AlunosPage = () => {
    const [students, setStudents] = useState<Student[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isSchoolSubjectDialogOpen, setIsSchoolSubjectDialogOpen] = useState(false)
    const [selectedSchools, setSelectedSchools] = useState<number[]>([])
    const [selectedSubjects, setSelectedSubjects] = useState<number[]>([])
    const [formData, setFormData] = useState<CreateStudentData>({
        userId: 0,
        name: "",
        email: "",
        password: "",
        phone: "",
        adress: "",
        amount: "",
        numberOfInstallments: "",
        birthday: "",
        passport: ""
    })
    const [schools, setSchools] = useState<School[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [studentData, setStudentData] = useState<CreateStudentData | null>(null);

    const fetchStudents = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('https://v5.destinify.com.br/api/user/students')
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

    useEffect(() => {
        const fetchSchoolsAndSubjects = async () => {
            const schoolsResponse = await fetch('https://v5.destinify.com.br/api/school/list');
            const subjectsResponse = await fetch('https://v5.destinify.com.br/api/course/list');
            
            if (schoolsResponse.ok) {
                const schoolsData = await schoolsResponse.json();
                setSchools(schoolsData);
            }

            if (subjectsResponse.ok) {
                const subjectsData = await subjectsResponse.json();
                setSubjects(subjectsData);
            }
        };

        fetchSchoolsAndSubjects();
    }, []);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleStudentCreated = (newStudent: CreateStudentData) => {
        setStudentData(newStudent);
        fetchStudents();
    };

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
                        <Button className="bg-brand hover:bg-brand/90" onClick={handleOpenDialog}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Cadastrar aluno
                        </Button>
                    </div>
                    <DialogRegister 
                        isOpen={isDialogOpen} 
                        onOpenChange={setIsDialogOpen} 
                        onStudentCreated={handleStudentCreated} 
                    />
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
