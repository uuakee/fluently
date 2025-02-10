import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";
import { Save } from "lucide-react";

interface EditUserDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    user: {
        id: number;
        name: string;
        email: string;
        phone: string;
        adress: string;
        birthday: string;
        passport: string | null;
        name_family: string | null;
        gender: string;
        level_school: string;
        unit_school: string;
    };
    onUserUpdated: () => Promise<void>;
}

export function EditUserDialog({ isOpen, onOpenChange, user, onUserUpdated }: EditUserDialogProps) {
    const [formData, setFormData] = useState(user);

    const handleUpdateUser = async () => {
        try {
            const response = await fetch(`https://v5.destinify.com.br/api/user/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    adress: formData.adress,
                    birthday: formData.birthday,
                    passport: formData.passport,
                    name_family: formData.name_family,
                    gender: formData.gender,
                    level_school: formData.level_school,
                    unit_school: formData.unit_school,
                }),
            });

            if (response.ok) {
                toast.success("Usuário atualizado com sucesso!");
                onUserUpdated();
                onOpenChange(false);
            } else {
                toast.error("Erro ao atualizar usuário");
            }
        } catch (error) {
            console.error('Erro ao atualizar:', error);
            toast.error("Erro ao atualizar usuário");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Aluno</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nome completo</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Telefone</Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="adress">Endereço</Label>
                            <Input
                                id="adress"
                                value={formData.adress}
                                onChange={(e) => setFormData(prev => ({ ...prev, adress: e.target.value }))}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="birthday">Data de Nascimento</Label>
                                <Input
                                    id="birthday"
                                    type="date"
                                    value={formData.birthday}
                                    onChange={(e) => setFormData(prev => ({ ...prev, birthday: e.target.value }))}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="passport">Passaporte ou RG</Label>
                                <Input
                                    id="passport"
                                    value={formData.passport || ''}
                                    onChange={(e) => setFormData(prev => ({ ...prev, passport: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="gender">Gênero</Label>
                                <Select
                                    value={formData.gender}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="HOMEM">Homem</SelectItem>
                                        <SelectItem value="MULHER">Mulher</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="level_school">Nível de Escolaridade</Label>
                                <Select
                                    value={formData.level_school}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, level_school: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="FUNDAMENTAL">Fundamental</SelectItem>
                                        <SelectItem value="MEDIO">Médio</SelectItem>
                                        <SelectItem value="SUPERIOR">Superior</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name_family">Nome do Responsável</Label>
                                <Input
                                    id="name_family"
                                    value={formData.name_family || ''}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name_family: e.target.value }))}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="unit_school">Unidade</Label>
                                <Select
                                    value={formData.unit_school}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, unit_school: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="EUA">🇺🇸 EUA</SelectItem>
                                        <SelectItem value="BRASIL">🇧🇷 Brasil</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
                <Button onClick={handleUpdateUser} className="bg-brand hover:bg-brand/90">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Alterações
                </Button>
            </DialogContent>
        </Dialog>
    );
} 