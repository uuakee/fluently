"use client"

import * as React from "react"
import {
  BookOpen,
  BookText,
  Bot,
  Command,
  Frame,
  GraduationCap,
  LifeBuoy,
  Map,
  PieChart,
  PiggyBank,
  Send,
  Settings2,
  SquareTerminal,
  Users2,
} from "lucide-react"

import { NavMain } from "@/components/common/nav-main"
import { NavSecondary } from "@/components/common/nav-secondary"
import { NavUser } from "@/components/common/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Administrativo",
      url: "#",
      icon: Settings2,
      isActive: true,
      items: [
        {
          title: "Financeiro",
          url: "/admin/mensalidades",
        },
        {
          title: "Gráfico de desempenho",
          url: "/admin",
        },
        {
          title: "Funcionários (Em breve)",
          url: "/admin/funcionarios",
        },
        {
          title: "Unidades",
          url: "/admin/unidades",
        },
        {
          title: "Material (Em breve)",
          url: "/admin/material",
        },
        {
          title: "Livros (Em breve)",
          url: "/admin/declaracoes",
        },
      ],
    },
    {
        title: "Alunos",
        url: "#",
        icon: Users2,
        isActive: false,
        items: [
            {
                title: "Matrículas",
                url: "/admin/alunos",
            },
            {
                title: "Contratos",
                url: "/admin/contratos",
            },
            {
              title: "Certificados",
              url: "/admin/certificados",
          },
          {
            title: "Notas",
            url: "/admin/notas",
          },
          {
            title: "Presenças",
            url: "/admin/presencas",
          },
          {
            title: "Declarações",
            url: "/admin/declaracoes",
          },
          {
            title: "Mensalidades",
            url: "/admin/mensalidades",
          },
          ]
    },
    {
      title: "Professores",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Cadastro",
          url: "/admin/professores",
        },
        {
          title: "Pagamentos",
          url: "/admin/pagamentos-professores",
        },
        {
          title: "Material",
          url: "/admin/material-professores",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Suporte",
      url: "https://api.whatsapp.com/send?phone=5561935001090",
      icon: LifeBuoy,
    },
  ],
}

export function AdmSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-brand/80 text-secundarybrand">
                  <Image src="/logotype.png" alt="Logo" width={40} height={40} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Issenguel Idiomas LLC</span>
                  <span className="truncate text-xs text-muted-foreground">v1.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  )
}
