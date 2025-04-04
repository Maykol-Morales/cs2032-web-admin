"use client"

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

    const handleSuccess = (credentialResponse: CredentialResponse) => {
        if (!credentialResponse || !credentialResponse.credential) {
            setUser(null)
            toast.error("Authentication Failed")
            return
        }

        try {
            const decodedUser = jwtDecode(credentialResponse.credential) as UserData

            // if (!decodedUser.email.endsWith("@utec.edu.pe")) {
            //     toast.error("Invalid email domain", {
            //         description: "Please use your UTEC email account"
            //     })
            //     return
            // }

            setUser(decodedUser)
            toast.success("Logged In")
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

