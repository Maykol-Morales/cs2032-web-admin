"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toIsoWithOffset } from "@/lib/utils.ts";
import { useState } from "react"
import type { Session } from "../views/admin-view"

interface CreateSessionDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onCreateSession: (newSession: Omit<Session, "course_name" | "course_id" | "id" | "qr_code" | "attendees">) => void
}

export function CreateSessionDialog({ open, onOpenChange, onCreateSession }: CreateSessionDialogProps) {
    const [ newSession, setNewSession ] = useState({
        course_name: "Teoría 1",
        course_id: "499e28e8-148a-4101-bbf7-e7cf700d0c2c",
        in_campus: true,
        expire_at: toIsoWithOffset(new Date(Date.now()), -300),
    })

    const resetForm = () => {
        setNewSession({
            course_name: "Teoría 1",
            course_id: "499e28e8-148a-4101-bbf7-e7cf700d0c2c",
            in_campus: true,
            expire_at: toIsoWithOffset(new Date(Date.now()), -300),
        })
    }


    const handleSubmit = () => {
        onCreateSession(newSession)
        resetForm()
    }

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            resetForm()
        }
        onOpenChange(newOpen)
    }

    return (
        <Dialog open={ open } onOpenChange={ handleOpenChange }>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Crear Nueva Sesión</DialogTitle>
                    <DialogDescription>Completa los detalles para crear una nueva sesión de asistencia.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="expire_at" className="text-right">
                            Expira en
                        </Label>
                        <Input
                            id="expire_at"
                            type="datetime-local"
                            value={ newSession.expire_at.slice(0, 16) }
                            onChange={ (e) => {
                                setNewSession({
                                    ...newSession,
                                    expire_at: toIsoWithOffset(new Date(e.target.value), -300),
                                })
                            }
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="in_campus" className="text-right">
                            En UTEC
                        </Label>
                        <div className="col-span-3 flex items-center space-x-2">
                            <Checkbox
                                id="in_campus"
                                checked={ newSession.in_campus }
                                onCheckedChange={ (checked) => setNewSession({ ...newSession, in_campus: checked as boolean }) }
                            />
                            <label
                                htmlFor="in_campus"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                La sesión requiere presencia en UTEC
                            </label>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={ handleSubmit }>Crear Sesión</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
