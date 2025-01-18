// src/pages/dashboard/index.tsx
import { AppSidebar } from "@/components/common/app-sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Book, BookOpen, Calendar1, CheckCircle2, ChevronRight, Clock } from "lucide-react";
import Image from "next/image";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";

interface Course {
    id: number
    title: string
    semesters: number
    level: string
  }
  
  const courses: Course[] = [
    {
      id: 1,
      title: "Inglês A1",
      semesters: 2,
      level: "Básico"
    },
    {
      id: 2,
      title: "Inglês A2",
      semesters: 2,
      level: "Intermediário"
    },
    {
      id: 3,
      title: "Inglês A3",
      semesters: 4,
      level: "Avançado"
    }
  ]

interface Activity {
    id: number
    title: string
    subject: string
    dueDate: string
    status: "pending" | "completed"
    type: "homework" | "quiz" | "practice"
  }

  const activities: Activity[] = [
    {
      id: 1,
      title: "Vocabulary Practice",
      subject: "Inglês A1",
      dueDate: "2024-01-20",
      status: "pending",
      type: "homework"
    },
    {
      id: 2,
      title: "Grammar Quiz",
      subject: "Inglês A1",
      dueDate: "2024-01-19",
      status: "completed",
      type: "quiz"
    },
    {
      id: 3,
      title: "Speaking Exercise",
      subject: "Inglês A1",
      dueDate: "2024-01-21",
      status: "pending",
      type: "practice"
    }
  ]

const DashboardPage = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="">
            <header className="flex h-16 shrink-0 items-center gap-2 justify-between">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">
                            Portal do Aluno
                        </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="flex items-center gap-2 mr-4">
                    <Avatar className="h-8 w-8 rounded-lg" >
                        <AvatarFallback className="rounded-lg bg-brand text-white font-extralight">JD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <h3 className="text-sm font-semibold">John Doe</h3>
                        <a className="cursor-pointer text-[10px] text-muted-foreground">Editar perfil</a>
                    </div>
                </div>
            </header>
            <div className="p-4 mt-4">
                <div className="w-full flex gap-2 p-4 md:p-0 bg-brand/5 h-36 rounded-lg items-center">
                    <Image src='/book.png' alt="" width={250} height={250} className="hidden md:block" />
                    <div className="flex flex-col">
                        <h3 className="text-2xl font-semibold">Seja bem-vindo (a) ao portal do aluno!</h3>
                        <p className="text-sm text-muted-foreground">Por aqui você consegue acessar as suas notas, faltas e disciplinas de todo semestre.</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:mt-8 p-4 gap-2 h-max">
                <div>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Disciplinas</CardTitle>
                        <CardDescription>
                        Seus cursos em andamento
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                        {courses.map((course) => (
                            <Button
                            key={course.id}
                            variant="ghost"
                            className="w-full h-auto p-3 justify-between hover:bg-muted/50"
                            >
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10">
                                <BookOpen className="h-5 w-5 text-primary" />
                                </div>
                                <div className="text-left">
                                <h3 className="font-medium text-base">{course.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {course.semesters} {course.semesters === 1 ? 'semestre' : 'semestres'}
                                </p>
                                </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </Button>
                        ))}
                        </div>
                    </CardContent>
                </Card>
                </div>
                <div>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Atividades</CardTitle>
                        <CardDescription>
                        Veja as atividades pendentes dos últimos 7 dias
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[300px] pr-4">
                        <div className="space-y-4">
                            {activities.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-start space-x-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                            >
                                <div className="rounded-full bg-primary/10 p-2">
                                {activity.type === "homework" && <Book className="h-4 w-4 text-primary" />}
                                {activity.type === "quiz" && <CheckCircle2 className="h-4 w-4 text-primary" />}
                                {activity.type === "practice" && <Clock className="h-4 w-4 text-primary" />}
                                </div>
                                <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <p className="font-medium">{activity.title}</p>
                                    <Badge variant={activity.status === "completed" ? "secondary" : "default"}>
                                    {activity.status === "completed" ? "Concluído" : "Pendente"}
                                    </Badge>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Calendar1 className="mr-1 h-3 w-3" />
                                    {new Date(activity.dueDate).toLocaleDateString('pt-BR')}
                                    <span className="mx-2">•</span>
                                    {activity.subject}
                                </div>
                                </div>
                            </div>
                            ))}
                        </div>
                        </ScrollArea>
                    </CardContent>
                    </Card>
                </div>
            </div>
            </SidebarInset>
        </SidebarProvider>
    )
};

export default DashboardPage