import { AppSidebar } from "@/components/common/app-sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, GraduationCap, BarChart, Calendar } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Course {
  id: string
  title: string
  level: string
  progress: number
  totalClasses: number
  completedClasses: number
  nextClass: string
  status: "em_andamento" | "concluido" | "pendente"
}

const courses: Course[] = [
  {
    id: "1",
    title: "Inglês A1",
    level: "Básico",
    progress: 75,
    totalClasses: 32,
    completedClasses: 24,
    nextClass: "2024-01-22",
    status: "em_andamento"
  },
  {
    id: "2",
    title: "Inglês A2",
    level: "Intermediário",
    progress: 30,
    totalClasses: 32,
    completedClasses: 10,
    nextClass: "2024-01-23",
    status: "em_andamento"
  },
  {
    id: "3",
    title: "Inglês A3",
    level: "Avançado",
    progress: 0,
    totalClasses: 64,
    completedClasses: 0,
    nextClass: "2024-02-01",
    status: "pendente"
  }
]

export default function DisciplinasPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Aprendizagem</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Disciplinas</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2 mr-4">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarFallback className="rounded-lg bg-primary text-primary-foreground font-extralight">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold">John Doe</h3>
              <a className="cursor-pointer text-[10px] text-muted-foreground hover:underline">
                Editar perfil
              </a>
            </div>
          </div>
        </header>
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Minhas Disciplinas</h1>
            <p className="text-muted-foreground">Gerencie seus cursos e acompanhe seu progresso</p>
          </div>
          <Tabs defaultValue="em_andamento" className="space-y-6">
            <TabsList>
              <TabsTrigger  value="em_andamento">Em Andamento</TabsTrigger>
              <TabsTrigger value="concluidos">Concluídos</TabsTrigger>
              <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
            </TabsList>
            <TabsContent value="em_andamento" className="space-y-4">
              {courses
                .filter((course) => course.status === "em_andamento")
                .map((course) => (
                  <Card key={course.id} className="hover:bg-muted/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className="p-2 h-fit rounded-lg bg-primary/10">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div className="">
                            <h2 className="font-semibold text-xl mb-1">{course.title}</h2>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                              <GraduationCap className="h-4 w-4" />
                              <span>{course.level}</span>
                              <Separator orientation="vertical" className="h-4" />
                              <BarChart className="h-4 w-4" />
                              <span>
                                {course.completedClasses} de {course.totalClasses} aulas
                              </span>
                            </div>
                            <Progress value={course.progress} className="w-[120px] md:w-[300px] " />
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant={course.status === "em_andamento" ? "default" : "secondary"}>
                            Em andamento
                          </Badge>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>Próxima aula: {new Date(course.nextClass).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
            <TabsContent value="concluidos">
              <Card>
                <CardHeader>
                  <CardDescription>Você ainda não possui disciplinas concluídas.</CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
            <TabsContent value="pendentes">
              {courses
                .filter((course) => course.status === "pendente")
                .map((course) => (
                  <Card key={course.id} className="hover:bg-muted/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h2 className="font-semibold text-xl mb-1">{course.title}</h2>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <GraduationCap className="h-4 w-4" />
                              <span>{course.level}</span>
                              <Separator orientation="vertical" className="h-4" />
                              <Calendar className="h-4 w-4" />
                              <span>Início: {new Date(course.nextClass).toLocaleDateString('pt-BR')}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary">Pendente</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

