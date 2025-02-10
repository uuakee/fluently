// src/components/students/dialog-register.tsx

"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface CreateStudentData {
    userId: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    adress: string;
    amount: string;
    numberOfInstallments: string;
    birthday: string;
    name_family: string;
    passport: string;
    gender: string;
    level_school: string;
}

interface DialogRegisterProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onStudentCreated: (student: CreateStudentData) => void;
}

const DialogRegister: React.FC<DialogRegisterProps> = ({ isOpen, onOpenChange, onStudentCreated }) => {
    const [formData, setFormData] = useState<CreateStudentData>({
        userId: 0,
        name: "",
        email: "",
        password: "",
        phone: "",
        adress: "",
        amount: "",
        numberOfInstallments: "",
        birthday: "",
        name_family: "",
        passport: "",
        gender: "",
        level_school: ""
    });

    const handleCreateStudent = async () => {
        if (!formData.name || !formData.email || !formData.password || !formData.phone || !formData.birthday || !formData.gender || !formData.level_school) {
            toast.error("Nome, email, senha, telefone, data de nascimento, gênero e nível escolar são obrigatórios");
            return;
        }

        try {
            const studentResponse = await fetch('https://v5.destinify.com.br/api/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                    adress: formData.adress,
                    birthday: formData.birthday,
                    passport: formData.passport,
                    name_family: formData.name_family,
                    gender: formData.gender,
                    level_school: formData.level_school,
                    role: "STUDENT"
                }),
            });

            if (studentResponse.ok) {
                const newStudent = await studentResponse.json();
                onStudentCreated(newStudent);
                onOpenChange(false);
            } else {
                toast.error("Erro ao cadastrar aluno");
            }
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            toast.error("Erro ao cadastrar aluno");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cadastrar Aluno</DialogTitle>
                    <DialogDescription>
                        Preencha os dados do aluno e configure as mensalidades.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nome completo</Label>
                            <Input
                                id="name"
                                placeholder="Nome do aluno"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="email@exemplo.com"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                placeholder="Digite a senha"
                                value={formData.password}
                                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Telefone</Label>
                            <Input
                                id="phone"
                                type="phone"
                                placeholder="Digite o telefone"
                                value={formData.phone}
                                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="adress">Endereço</Label>
                            <Input
                                id="adress"
                                placeholder="Endereço completo"
                                value={formData.adress}
                                onChange={(e) => setFormData(prev => ({ ...prev, adress: e.target.value }))}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name_family">Nome do Responsável</Label>
                            <Input
                                id="name_family"
                                placeholder="Nome do Responsável, caso não tenha, deixe em branco"
                                value={formData.name_family}
                                onChange={(e) => setFormData(prev => ({ ...prev, name_family: e.target.value }))}
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
                                    type="text"
                                    value={formData.passport}
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
                                        <SelectValue placeholder="Selecionar..." />
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
                                        <SelectValue placeholder="Selecionar..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="FUNDAMENTAL">Fundamental</SelectItem>
                                        <SelectItem value="MEDIO">Médio</SelectItem>
                                        <SelectItem value="SUPERIOR">Superior</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
                <Button onClick={handleCreateStudent} className="bg-brand hover:bg-brand/90">
                    Próximo
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default DialogRegister;

