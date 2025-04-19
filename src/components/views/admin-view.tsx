"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSessionCreate } from "@/hooks/use-session-create"
import { useSessionsFetch } from "@/hooks/use-sessions-fetch"
import { Plus, RefreshCcw } from "lucide-react"
import { useEffect, useState } from "react"
import { CreateSessionDialog } from "../dialog/create-session-dialog"
import { SessionQRCodeDialog } from "../dialog/session-q-r-code-dialog.tsx"
import { SessionsTable } from "../table/sessions-table"

export interface Session {
    id: string
    course_id: string
    course_name: string
    qr_code: string
    in_campus: boolean
    expire_at: string
    attendees: string[]
}

export function AdminView() {
    const [ selectedSession, setSelectedSession ] = useState<Session | null>(null)
    const [ isCreateDialogOpen, setIsCreateDialogOpen ] = useState(false)
    const [ isQRCodeDialogOpen, setIsQRCodeDialogOpen ] = useState(false)

    const { sessions, loading, fetchSessions } = useSessionsFetch()
    const { createSession } = useSessionCreate(fetchSessions)

    useEffect(() => {
        fetchSessions()
    }, [ fetchSessions ])

    const handleCreateSession = async (newSession: Omit<Session, "course_id" | "course_name" | "id" | "qr_code" | "attendees">) => {
        const result = await createSession(newSession)

        if (result.success) {
            setIsCreateDialogOpen(false)
        }
    }

    const handleViewQRCode = (session: Session) => {
        setSelectedSession(session)
        setIsQRCodeDialogOpen(true)
    }

    return (
        <div className="container mx-auto py-6">
            <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl">Administración de Sesiones</CardTitle>
                        <CardDescription>Gestiona las sesiones de asistencia para tus cursos</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={ fetchSessions } disabled={ loading }>
                            <RefreshCcw className={ `h-4 w-4 mr-2 ${ loading ? "animate-spin" : "" }` }/>
                            Actualizar
                        </Button>
                        <Button size="sm" onClick={ () => setIsCreateDialogOpen(true) }>
                            <Plus className="h-4 w-4 mr-2"/>
                            Nueva Sesión
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <SessionsTable
                        sessions={ sessions }
                        loading={ loading }
                        onViewQRCode={ handleViewQRCode }
                    />
                </CardContent>
            </Card>

            <CreateSessionDialog
                open={ isCreateDialogOpen }
                onOpenChange={ setIsCreateDialogOpen }
                onCreateSession={ handleCreateSession }
            />

            <SessionQRCodeDialog
                session={ selectedSession }
                open={ isQRCodeDialogOpen }
                onOpenChange={ setIsQRCodeDialogOpen }
            />
        </div>
    )
}
