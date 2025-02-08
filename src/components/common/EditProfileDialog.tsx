import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface EditProfileDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    user: { name: string; email: string };
}

export function EditProfileDialog({ isOpen, onOpenChange, user }: EditProfileDialogProps) {
    const [newPassword, setNewPassword] = useState("");

    const handleUpdatePassword = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch('https://v1.destinify.com.br/api/user/update-password', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ password: newPassword })
            });

            if (response.ok) {
                toast.success("Senha atualizada com sucesso!");
                onOpenChange(false);
            } else {
                toast.error("Erro ao atualizar a senha.");
            }
        } catch (error) {
            console.error("Erro ao atualizar a senha:", error);
            toast.error("Erro ao atualizar a senha.");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Perfil</DialogTitle>
                    <DialogDescription>
                        Altere sua senha abaixo.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div>
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" value={user.name} readOnly />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={user.email} readOnly />
                    </div>
                    <div>
                        <Label htmlFor="new-password">Nova Senha</Label>
                        <Input
                            id="new-password"
                            type="password"
                            placeholder="Digite sua nova senha"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                </div>
                <Button onClick={handleUpdatePassword} className="bg-brand hover:bg-brand/90">
                    Atualizar Senha
                </Button>
            </DialogContent>
        </Dialog>
    );
} 