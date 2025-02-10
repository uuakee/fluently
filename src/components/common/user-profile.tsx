import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { EditProfileDialog } from "./EditProfileDialog"

interface User {
    name: string
    email: string
}

export function UserProfile() {
    const [user, setUser] = useState<User | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('auth_token')
                if (!token) return

                const response = await fetch('https://v5.destinify.com.br/api/auth/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (response.ok) {
                    const userData = await response.json()
                    setUser(userData)
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error)
            }
        }

        fetchUserProfile()
    }, [])

    if (!user) return null

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <div className="flex items-center gap-2 mr-4">
            <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg bg-brand text-white font-extralight">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <h3 className="text-sm font-semibold">{user.name}</h3>
                <a
                    className="cursor-pointer text-[10px] text-muted-foreground"
                    onClick={() => setIsDialogOpen(true)}
                >
                    Editar perfil
                </a>
            </div>
            <EditProfileDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                user={user}
            />
        </div>
    )
} 