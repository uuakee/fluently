import { AppSidebar } from "@/components/common/app-sidebar"
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppBreadcrumb } from "@/components/common/app-breadcrumb";

const Declaracoes = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 justify-between">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <AppBreadcrumb uiLink="Financeiro" uiName="Declarações" />
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

                <div>
                    
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
};

export default Declaracoes