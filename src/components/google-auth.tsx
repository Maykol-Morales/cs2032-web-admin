"use client"

import { AdminView } from "@/components/views/admin-view.tsx";
import { useGoogleAuth } from "@/hooks/use-google-auth.ts";
import { GoogleOAuthProvider } from "@react-oauth/google"
import { Toaster } from "sonner";
import { MentionView } from "./views/mention-view.tsx"
import "../styles/global.css"
import { PreUserView } from "./views/pre-user-view.tsx";

export default function GoogleAuth() {
    const { user, handleSuccess, handleError, handleLogOut } = useGoogleAuth()

    return (
        <GoogleOAuthProvider clientId={ import.meta.env.PUBLIC_GOOGLE_CLIENT_ID! }>
            <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
                { user ? (
                    <AdminView/>
                ) : (
                    <PreUserView onSuccess={ handleSuccess } onError={ handleError }/>
                ) }
            </div>
            <MentionView/>
            <Toaster/>
        </GoogleOAuthProvider>
    )
}

