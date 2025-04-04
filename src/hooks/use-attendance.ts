"use client"

import { useState } from "react"
import { toast } from "sonner"

type UserData = {
    email: string
    name: string
    picture: string
}

type QueryParameter = {
    course: string
    session: string
}

type LocationData = {
    latitude: number
    longitude: number
}

type AttendanceStatus = "idle" | "loading" | "success" | "error"

export function useAttendance() {
    const [ status, setStatus ] = useState<AttendanceStatus>("idle")

    const markAttendance = async (user: UserData, parameter: QueryParameter, location: LocationData) => {
        if (!user || !parameter || !location) return

        setStatus("loading")

        try {
            const response = await fetch(import.meta.env.PUBLIC_BACK_END_URL!, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": import.meta.env.PUBLIC_BACK_END_KEY!,
                },
                body: JSON.stringify({
                    course_id: parameter.course,
                    session_id: parameter.session,
                    student_email: user.email,
                    student_latitude: location.latitude,
                    student_longitude: location.longitude,
                }),
            })

            const status = response.status;

            switch (status) {
                case 200:
                    setStatus("success")
                    toast.success("Attendance marked successfully")
                    break;
                default:
                    break;

            }

            await response.json()

        } catch (error) {
            setStatus("error")

            toast.error("Failed to mark attendance", {
                description: error instanceof Error ? error.message : "An unknown error occurred"
            })
        }
    }

    const resetStatus = () => {
        setStatus("idle")
    }

    return { status, markAttendance, resetStatus }
}

