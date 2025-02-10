"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Upload } from "lucide-react"

interface Student {
  id: number
  name: string
}

interface DialogContractProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onContractCreated: () => Promise<void>
}

export function DialogContract({ isOpen, onOpenChange, onContractCreated }: DialogContractProps) {
  const [students, setStudents] = useState<Student[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    userId: "",
    startDate: "",
    endDate: "",
  })

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('https://v5.destinify.com.br/api/user/students')
        if (response.ok) {
          const data = await response.json()
          setStudents(data)
        }
      } catch (error) {
        console.error('Erro ao buscar alunos:', error)
      }
    }

    if (isOpen) {
      fetchStudents()
    }
  }, [isOpen])

  const handleSubmit = async () => {
    if (!formData.userId || !formData.startDate || !formData.endDate || !selectedFile) {
      toast.error("Todos os campos são obrigatórios")
      return
    }

    const formDataToSend = new FormData()
    formDataToSend.append('userId', formData.userId)
    formDataToSend.append('startDate', formData.startDate)
    formDataToSend.append('endDate', formData.endDate)
    formDataToSend.append('file', selectedFile)

    try {
      const response = await fetch('https://v5.destinify.com.br/api/contract/create', {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        toast.success("Contrato criado com sucesso!")
        onContractCreated()
        onOpenChange(false)
      } else {
        toast.error("Erro ao criar contrato")
      }
    } catch (error) {
      console.error('Erro ao criar contrato:', error)
      toast.error("Erro ao criar contrato")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Contrato</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Aluno</Label>
            <Select
              value={formData.userId}
              onValueChange={(value) => setFormData(prev => ({ ...prev, userId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um aluno" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id.toString()}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Data de Início</Label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label>Data de Término</Label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Contrato (PDF)</Label>
            <Input
              type="file"
              accept=".pdf"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>
        <Button onClick={handleSubmit} className="bg-brand hover:bg-brand/90">
          <Upload className="mr-2 h-4 w-4" />
          Criar Contrato
        </Button>
      </DialogContent>
    </Dialog>
  )
} 