"use client"

import type { Session } from "@/components/views/admin-view"
import { useCallback, useState } from "react"

const url = import.meta.env.PUBLIC_BACK_END_URL! as string
const key = import.meta.env.PUBLIC_BACK_END_KEY! as string

export function useSessionsFetch() {
    const [ sessions, setSessions ] = useState<Session[]>([])
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState<string | null>(null)

    const fetchSessions = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`${ url }/session/all?course=499e28e8-148a-4101-bbf7-e7cf700d0c2c`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Internal-Secret": key
                }
            })

            if (!response.ok) {
                throw new Error(`Error: ${ response.status }`)
            }

            const data = await response.json()
            setSessions(data)
        } catch (err) {
            console.error("Error fetching sessions:", err)
            setError(err instanceof Error ? err.message : "Failed to fetch sessions")
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        sessions,
        loading,
        error,
        fetchSessions,
    }
}
