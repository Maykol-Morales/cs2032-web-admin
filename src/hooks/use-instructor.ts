"use client"

import { useCallback } from "react"

const url = import.meta.env.PUBLIC_BACK_END_URL! as string
const key = import.meta.env.PUBLIC_BACK_END_KEY! as string;

export function useInstructor() {
    const checkInstructor = useCallback(async (email: string): Promise<boolean> => {
        console.log(email)
        if (!email) return false

        try {
            const response = await fetch(`${ url }/instructor/${ email }`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": key
                },
            })

            return response.status === 200;
        } catch (error) {
            console.error(error)
            return false
        }
    }, [])

    return { checkInstructor }
}
