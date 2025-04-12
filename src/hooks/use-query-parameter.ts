"use client"

import { useEffect, useState } from "react"

type QueryParameter = {
    course: string
    session: string
}

export function useQueryParameter() {
    const [ parameter, setParameter ] = useState<QueryParameter | null>(null)

    useEffect(() => {
        try {
            const searchParams = new URLSearchParams(window.location.search)
            const parsedParams = Object.fromEntries(searchParams) as QueryParameter

            if (parsedParams.course && parsedParams.session) {
                setParameter(parsedParams)
            }
        } catch (error) {
            setParameter(null)
        }
    }, [])

    return { parameter }
}

