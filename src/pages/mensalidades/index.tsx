// src/pages/mensalidades/index.tsx

import { AppBreadcrumb } from "@/components/common/app-breadcrumb"
import { AppSidebar } from "@/components/common/app-sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, User, MapPin, Phone, CreditCard, AlertCircle, CheckCircle2, Clock } from "lucide-react"

const Mensalidades = () => {
    // Dados mockados para exemplo
    const aluno = {
        nome: "John Doe",
        endereco: "Rua Exemplo, 123 - Bairro - Cidade/UF",
        cpf: "123.456.789-00",
        telefone: "(11) 98765-4321"
    }

    const mensalidades = [
        { mes: "Janeiro", vencimento: "05/01/2025", valor: "R$ 500,00", status: "Pago" },
        { mes: "Fevereiro", vencimento: "05/02/2025", valor: "R$ 500,00", status: "Pago" },
        { mes: "Março", vencimento: "05/03/2025", valor: "R$ 500,00", status: "Pendente" },
        { mes: "Abril", vencimento: "05/04/2025", valor: "R$ 500,00", status: "Em atraso" },
    ]

    const mensalidadesPendentes = mensalidades.filter(m => m.status === "Pendente" || m.status === "Em atraso").length

    const handleDownload = (mensalidade: any) => {
        // Implemente a lógica para baixar o boleto
        console.log("Baixando boleto:", mensalidade)
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 justify-between">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <AppBreadcrumb uiLink="Financeiro" uiName="Mensalidades" />
                    </div>
                    <div className="flex items-center gap-2 mr-4">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src="https://img.freepik.com/premium-photo/cartoon-character-with-glasses-backpack_865278-77871.jpg" alt="John Doe" />
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Informações do Aluno */}
                            <Card className="col-span-1 md:col-span-2">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        Informações do Aluno
                                    </CardTitle>
                                    <CardDescription>
                                        Em caso de alteração nos dados, atualize o perfil.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="grid gap-4">
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                            <User className="h-5 w-5 text-muted-foreground" />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm text-muted-foreground">Nome</p>
                                                <p className="font-medium truncate">{aluno.nome}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                            <MapPin className="h-5 w-5 text-muted-foreground" />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm text-muted-foreground">Endereço</p>
                                                <p className="font-medium break-words">{aluno.endereco}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                                <CreditCard className="h-5 w-5 text-muted-foreground" />
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm text-muted-foreground">CPF</p>
                                                    <p className="font-medium truncate">{aluno.cpf}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                                <Phone className="h-5 w-5 text-muted-foreground" />
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm text-muted-foreground">Telefone</p>
                                                    <p className="font-medium truncate">{aluno.telefone}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Status de Pagamentos */}
                            <Card className="col-span-1">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <AlertCircle className="h-5 w-5 text-primary" />
                                        Status de Pagamentos
                                    </CardTitle>
                                    <CardDescription>Resumo das mensalidades</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="flex flex-col sm:flex-row md:flex-col items-center justify-center gap-6 md:gap-4">
                                        <div className="relative flex items-center justify-center">
                                            <svg className="h-24 w-24">
                                                <circle
                                                    className="text-muted stroke-current"
                                                    strokeWidth="5"
                                                    fill="transparent"
                                                    r="38"
                                                    cx="48"
                                                    cy="48"
                                                />
                                                <circle
                                                    className="text-brand stroke-current"
                                                    strokeWidth="5"
                                                    strokeLinecap="round"
                                                    fill="transparent"
                                                    r="38"
                                                    cx="48"
                                                    cy="48"
                                                    strokeDasharray={`${(mensalidadesPendentes / mensalidades.length) * 239} 239`}
                                                    transform="rotate(-90 48 48)"
                                                />
                                            </svg>
                                            <div className="absolute flex flex-col items-center">
                                                <span className="text-3xl font-bold">{mensalidadesPendentes}</span>
                                                <span className="text-[10px] text-muted-foreground">pendentes</span>
                                            </div>
                                        </div>
                                        
                                        <div className="w-full max-w-[300px] sm:max-w-none space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <span>Pagas</span>
                                                </div>
                                                <span className="font-medium">{mensalidades.filter(m => m.status === "Pago").length}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-yellow-500" />
                                                    <span>Pendentes</span>
                                                </div>
                                                <span className="font-medium">{mensalidades.filter(m => m.status === "Pendente").length}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <AlertCircle className="h-4 w-4 text-red-500" />
                                                    <span>Em atraso</span>
                                                </div>
                                                <span className="font-medium">{mensalidades.filter(m => m.status === "Em atraso").length}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Lista de Mensalidades */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Mensalidades do Ano</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Mês</TableHead>
                                            <TableHead>Vencimento</TableHead>
                                            <TableHead>Valor</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Ação</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {mensalidades.map((mensalidade, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{mensalidade.mes}</TableCell>
                                                <TableCell>{mensalidade.vencimento}</TableCell>
                                                <TableCell>{mensalidade.valor}</TableCell>
                                                <TableCell>
                                                    <Badge variant={
                                                        mensalidade.status === "Pago" 
                                                            ? "secondary" 
                                                            : mensalidade.status === "Pendente" 
                                                                ? "outline" 
                                                                : "destructive"
                                                    }>
                                                        {mensalidade.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <button onClick={() => handleDownload(mensalidade)}>
                                                        {/* Substitua pelo ícone desejado */}
                                                        <Download className="h-4 w-4" />
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
};

export default Mensalidades