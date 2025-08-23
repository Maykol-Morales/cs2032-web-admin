"use client"

import { useInstructor } from "@/hooks/use-instructor.ts";
import type { CredentialResponse } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import { useState } from "react"
import { toast } from "sonner"

type UserData = {
    email: string
    name: string
    picture: string
}

export function useGoogleAuth() {
    const [ user, setUser ] = useState<UserData | null>(null)
    const { checkInstructor } = useInstructor();

    const handleSuccess = async (credentialResponse: CredentialResponse) => {
        if (!credentialResponse || !credentialResponse.credential) {
            setUser(null)
            toast.error("Authentication Failed")
            return
        }

        try {
            const decodedUser = jwtDecode(credentialResponse.credential) as UserData
            const valid = await checkInstructor(decodedUser.email)

            if (valid) {
                setUser(decodedUser)
                toast.success("Logged In")
            } else {
                setUser(null)
                toast.error("Authentication Error | Not Validated")
            }
        } catch (error) {
            setUser(null)
            toast.error("Authentication Error")
        }
    }

    const handleError = () => {
        toast.error("Login Failed")
    }

    const handleLogOut = () => {
        setUser(null)
        toast.info("Logged Out")
    }

    return { user, handleSuccess, handleError, handleLogOut }
}
