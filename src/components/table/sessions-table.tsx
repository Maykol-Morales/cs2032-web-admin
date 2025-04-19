"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, Download, MapPin, RefreshCcw, Users } from "lucide-react"
import type { Session } from "../views/admin-view"

interface SessionsTableProps {
    sessions: Session[]
    loading: boolean
    onViewQRCode: (session: Session) => void
}

export function SessionsTable({ sessions, loading, onViewQRCode }: SessionsTableProps) {
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString)

            if (isNaN(date.getTime())) {
                return dateString
            }

            const dateOptions: Intl.DateTimeFormatOptions = {
                year: "numeric",
                month: "long",
                day: "numeric",
            }

            const timeOptions: Intl.DateTimeFormatOptions = {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            }

            const formattedDate = date.toLocaleDateString("es-ES", dateOptions)
            const formattedTime = date.toLocaleTimeString("es-ES", timeOptions)

            return `${ formattedDate } a las ${ formattedTime }`
        } catch (e) {
            return dateString
        }
    }

    const formatDateForFilename = (dateString: string) => {
        try {
            const date = new Date(dateString)

            if (isNaN(date.getTime())) {
                return new Date().toISOString().split("T")[0]
            }

            return date.toISOString().split("T")[0]
        } catch (e) {
            return new Date().toISOString().split("T")[0]
        }
    }

    const exportAttendeesToCSV = (session: Session) => {
        const csvContent = session.attendees.join("\n")

        const dateForFilename = formatDateForFilename(session.expire_at)
        const filename = `attendee-${ dateForFilename }.csv`

        const blob = new Blob([ csvContent ], { type: "text/csv;charset=utf-8;" })

        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")

        link.setAttribute("href", url)
        link.setAttribute("download", filename)

        document.body.appendChild(link)
        link.click()

        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                <RefreshCcw className="h-8 w-8 animate-spin text-gray-400"/>
            </div>
        )
    }

    if (sessions.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                No hay sesiones disponibles. Crea una nueva sesión para comenzar.
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Curso</TableHead>
                        <TableHead>Ubicación</TableHead>
                        <TableHead>Expira</TableHead>
                        <TableHead>Asistentes</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { sessions.map((session) => (
                        <TableRow key={ session.id }>
                            <TableCell className="font-medium">
                                <div>{ session.course_name }</div>
                                <div className="text-xs text-gray-500">{ session.course_id }</div>
                            </TableCell>
                            <TableCell>
                                <Badge variant={ session.in_campus ? "default" : "outline" }>
                                    <MapPin className="h-3 w-3 mr-1"/>
                                    { session.in_campus ? "En Campus" : "Virtual" }
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1 text-gray-500"/>
                                    { formatDate(session.expire_at) }
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center">
                                    <Users className="h-3 w-3 mr-1 text-gray-500"/>
                                    { session.attendees.length }
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" size="sm" onClick={ () => onViewQRCode(session) }>
                                        QR Code
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={ () => exportAttendeesToCSV(session) }
                                        className="text-green-600 border-green-600 hover:bg-green-50"
                                    >
                                        <Download className="h-4 w-4 mr-1"/>
                                        CSV
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    )) }
                </TableBody>
            </Table>
        </div>
    )
}
