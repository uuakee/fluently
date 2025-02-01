import { AppSidebar } from "@/components/common/app-sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BreadcrumbItem, BreadcrumbPage, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AppBreadcrumb } from "@/components/common/app-breadcrumb";

const Notas = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 justify-between">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <AppBreadcrumb uiLink="Aprendizagem" uiName="Notas" />
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
                <div className="p-6">
                    <div className="grid gap-6">
                        {/* Cards de Resumo */}
                        <div className="grid gap-4 md:grid-cols-3">
                            <Card className="bg-gradient-to-br from-blue-50 to-white">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Nível Atual</CardTitle>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 h-4 w-4"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="text-3xl font-bold text-blue-600">B1</div>
                                    <p className="text-xs text-muted-foreground">
                                        Nível Intermediário
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="bg-gradient-to-br from-green-50 to-white">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Pontuação Geral</CardTitle>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 h-4 w-4"><path d="m6 9 6 6 6-6"/></svg>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="text-3xl font-bold text-green-600">85,5</div>
                                    <p className="text-xs text-muted-foreground">
                                        +12,8 pontos este mês
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="bg-gradient-to-br from-purple-50 to-white">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Próxima Avaliação</CardTitle>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 h-4 w-4"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="text-2xl font-bold text-purple-600">Teste de Gramática</div>
                                    <p className="text-xs text-muted-foreground">
                                        Em 3 dias
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Tabela de Notas */}
                        <Card className="overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-blue-50 via-white to-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Avaliações</CardTitle>
                                        <p className="text-sm text-muted-foreground mt-1">Acompanhe seu progresso em diferentes habilidades</p>
                                    </div>
                                    <Select defaultValue="current">
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Selecione o Nível" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="current">Nível Atual (B1)</SelectItem>
                                            <SelectItem value="a1">Nível A1</SelectItem>
                                            <SelectItem value="a2">Nível A2</SelectItem>
                                            <SelectItem value="b1">Nível B1</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Tipo de Avaliação</TableHead>
                                            <TableHead>Habilidade</TableHead>
                                            <TableHead className="text-center">Nota</TableHead>
                                            <TableHead className="text-center">Nível CEFR</TableHead>
                                            <TableHead className="text-center">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium">Prova Mensal</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12 20v-6M12 14l-4-4M12 14l4-4M12 4v6"/></svg>
                                                    Conversação
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">85</TableCell>
                                            <TableCell className="text-center">
                                                <span className="font-semibold text-blue-600">B1</span>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                                                    Concluído
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Redação</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                                                    Escrita
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">78</TableCell>
                                            <TableCell className="text-center">
                                                <span className="font-semibold text-blue-600">B1</span>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                                                    Concluído
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Teste de Áudio</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-500"><path d="M12 20v-6M12 14l-4-4M12 14l4-4M12 4v6"/></svg>
                                                    Compreensão
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">--</TableCell>
                                            <TableCell className="text-center">
                                                <span className="font-semibold text-blue-600">B1</span>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    Agendado
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>

                                <div className="mt-6 flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M12 20v-6M12 14l-4-4M12 14l4-4M12 4v6"/></svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Avaliação para Próximo Nível</h4>
                                            <p className="text-sm text-muted-foreground">Você está próximo do nível B2! Complete todas as avaliações pendentes.</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-blue-600">82%</div>
                                        <div className="text-sm text-muted-foreground">Progresso para B2</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
};

export default Notas