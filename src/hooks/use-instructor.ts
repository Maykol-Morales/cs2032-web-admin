"use client"

import { useCallback } from "react"

const url = import.meta.env.PUBLIC_BACK_END_URL! as string
const key = import.meta.env.PUBLIC_BACK_END_KEY! as string;

export function useInstructor() {
    const checkInstructor = useCallback(async (email: string): Promise<boolean> => {
        if (!email) return false

        try {
            const response = await fetch(`${ url }/instructor/${ email }`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Internal-Secret": key
                },
            })

            return response.status === 200;
        } catch (error) {
            return false
        }
    }, [])

    return { checkInstructor }
}
