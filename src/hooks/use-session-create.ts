"use client"

import type { Session } from "@/components/views/admin-view"
import { useCallback, useState } from "react"

type NewSessionData = Omit<Session, "course_id" | "course_name" | "id" | "qr_code" | "attendees">
type CreateSessionResult = {
    success: boolean
    error?: string
}

const url = import.meta.env.PUBLIC_BACK_END_URL! as string
const key = import.meta.env.PUBLIC_BACK_END_KEY! as string

export function useSessionCreate(onSuccess?: () => void) {
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState<string | null>(null)

    const createSession = useCallback(
        async (newSession: NewSessionData): Promise<CreateSessionResult> => {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch(`${ url }/session`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Internal-Secret": key
                    },
                    body: JSON.stringify(newSession),
                })

                if (!response.ok) {
                    throw new Error(`Error: ${ response.status }`)
                }

                if (onSuccess) {
                    onSuccess()
                }

                return { success: true }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Failed to create session"
                console.error("Error creating session:", errorMessage)
                setError(errorMessage)
                return { success: false, error: errorMessage }
            } finally {
                setLoading(false)
            }
        },
        [ onSuccess ],
    )

    return {
        createSession,
        loading,
        error,
    }
}
