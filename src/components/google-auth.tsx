"use client"

import { MissingLocationView } from "@/components/views/missing-location-view.tsx";
import { MissingParameterView } from "@/components/views/missing-parameter-view.tsx";
import { PreUserView } from "@/components/views/pre-user-view.tsx";
import { useAttendance } from "@/hooks/use-attendance"
import { useGeoLocation } from "@/hooks/use-geo-location"
import { useGoogleAuth } from "@/hooks/use-google-auth"
import { useQueryParameter } from "@/hooks/use-query-parameter.ts";
import { GoogleOAuthProvider } from "@react-oauth/google"
import { Toaster } from "sonner";
import { MentionView } from "./views/mention-view.tsx"
import "../styles/global.css"
import { PostUserView } from "./views/post-user-view.tsx";

export default function GoogleAuth() {
    const { parameter } = useQueryParameter()
    const { loading, location, getLocation } = useGeoLocation()

    const { user, handleSuccess, handleError, handleLogOut } = useGoogleAuth()
    const { status, markAttendance, resetStatus } = useAttendance()

    const onLogOut = () => {
        handleLogOut()
        resetStatus()
    }

    const onMarkAttendance = () => {
        if (user && parameter && location) {
            markAttendance(user, parameter, location).then()
        }
    }

    if (!parameter) {
        return (
            <>
                <MissingParameterView/>
                <MentionView/>
                <Toaster/>
            </>
        )
    }

    if (!location) {
        return (
            <>
                <MissingLocationView getLocation={ getLocation } loading={ loading }/>
                <MentionView/>
                <Toaster/>
            </>
        )
    }

    return (
        <GoogleOAuthProvider clientId={ import.meta.env.PUBLIC_GOOGLE_CLIENT_ID! }>
            <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
                { user ? (
                    <PostUserView user={ user } status={ status } attendanceFunction={ onMarkAttendance } logOutFunction={ onLogOut }/>
                ) : (
                    <PreUserView onSuccess={ handleSuccess } onError={ handleError }/>
                ) }
            </div>
            <MentionView/>
            <Toaster/>
        </GoogleOAuthProvider>
    )
}

