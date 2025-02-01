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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Calendar, GraduationCap, Users, Award } from "lucide-react"
import Image from "next/image"
import { Bar, BarChart } from "recharts"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "USA - Boston",
    color: "#2563eb",
  },
  mobile: {
    label: "USA - NYC",
    color: "#60a5fa",
  },
} satisfies ChartConfig

const importantDates = [
  {
    title: "Início das Aulas",
    date: "05 Fev, 2025",
    time: "08:00",
    icon: GraduationCap,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Reunião de Professores",
    date: "07 Fev, 2025",
    time: "14:30",
    icon: Users,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Entrega de Certificados",
    date: "15 Fev, 2025",
    time: "16:00",
    icon: Award,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Planejamento Semestral",
    date: "20 Fev, 2025",
    time: "09:00",
    icon: Calendar,
    color: "bg-orange-100 text-orange-600",
  },
]

const AdminPage = () => {
  return (
    <SidebarProvider>
      <AdmSidebar />
      <SidebarInset className="">
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
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
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
        <div className="p-4 mt-4">
          <div className="w-full flex gap-2 p-4 md:p-0 bg-brand/5 h-36 rounded-lg items-center">
            <Image src="/book.png" alt="" width={250} height={250} className="hidden md:block" />
            <div className="flex flex-col">
              <h3 className="text-2xl font-semibold">Seja bem-vindo (a) ao portal do administrador</h3>
              <p className="text-sm text-muted-foreground">
                Visualizar e gerenciar todo sistema de suas unidades acadêmicas em um só lugar.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:mt-8 p-4 gap-4 h-max">
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Faturamento mensal</CardTitle>
              <CardDescription>Veja o faturamento mensal de suas unidades acadêmicas</CardDescription>
            </CardHeader>
            <CardContent className="">
              <ChartContainer config={chartConfig} id="chart-1">
                <BarChart accessibilityLayer data={chartData}>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Calendário Acadêmico</CardTitle>
              <CardDescription>Visualize e gerencie eventos importantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {importantDates.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${event.color}`}>
                      <event.icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {event.date} às {event.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminPage

