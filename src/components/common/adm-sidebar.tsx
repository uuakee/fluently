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
          title: "Dashboard",
          url: "/admin",
        },
        {
          title: "Unidades",
          url: "/admin/unidades",
        },
        {
          title: "Materias",
          url: "/admin/materias",
        },
      ],
    },
    {
      title: "Financeiro",
      url: "#",
      icon: PiggyBank,
      items: [
        {
          title: "Mensalidades",
          url: "/admin/mensalidades",
        },
        {
          title: "Declarações",
          url: "/admin/declaracoes",
        },
      ],
    },
    {
        title: "Gestão",
        url: "#",
        icon: Users2,
        isActive: false,
        items: [
            {
              title: "Professores",
              url: "/admin/professores",
            },
            {
                title: "Alunos",
                url: "/admin/professores",
            },
            {
                title: "Turmas",
                url: "/admin/turmas",
            },
          ]
    },
    {
      title: "Materiais didáticos",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Apostilas",
          url: "/admin/apostilas",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Suporte",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
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
                  <GraduationCap className="size-4" />
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
