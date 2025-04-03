import { type CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import "../styles/global.css";

export default function GoogleAuth() {
    const [ user, setUser ] = useState<{ email: string; name: string; picture: string; } | null>(null);
    const [ params, setParams ] = useState<{ course: string; session: string; } | null>(null);
    const [ location, setLocation ] = useState<{ latitude: number; longitude: number; } | null>(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const parsedParams = Object.fromEntries(searchParams) as { course: string; session: string };

        if (parsedParams.course && parsedParams.session) {
            setParams(parsedParams);
        }
    }, []);

    useEffect(() => {
        if (!navigator.geolocation) {
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            () => {
                setLocation(null)
            }
        );
    }, []);

    // Handle Google Login Success
    const handleSuccess = (credentialResponse: CredentialResponse) => {
        if (!credentialResponse || !credentialResponse.credential) return;

        try {
            setUser(jwtDecode(credentialResponse.credential));
        } catch (error) {
            // ignored
        }
    };

    // Send Mark Attendance
    const markAttendance = async () => {
        if (!user || !params || !location) return;

        try {
            const response = await fetch(import.meta.env.PUBLIC_BACK_END_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": import.meta.env.PUBLIC_BACK_END_KEY
                },
                body: JSON.stringify({
                    course_id: params.course,
                    session_id: params.session,
                    student_email: user.email,
                    student_latitude: location.latitude,
                    student_longitude: location.longitude
                })
            })
        } catch (error) {
            // ignore
        }
    };

    if (!params) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
                    <h2 className="text-xl font-semibold text-red-600">Malformed URL parameters</h2>
                    <p className="text-gray-700">Please check the link and try again.</p>
                </div>
            </div>
        );
    }

    if (!location) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
                    <h2 className="text-xl font-semibold text-red-600">Cannot track location</h2>
                    <p className="text-gray-700">Ensure location services are enabled and refresh the page.</p>
                </div>
            </div>
        );
    }

    return (
        <GoogleOAuthProvider clientId={ import.meta.env.PUBLIC_GOOGLE_CLIENT_ID }>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="p-8 rounded-2xl shadow-xl w-96 text-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                        { user ? `Welcome, ${ user.name }!` : "Log-In with UTEC Google Account" }
                    </h2>

                    { user ? (
                        <>
                            <img
                                src={ user.picture }
                                alt="Profile"
                                className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-gray-300"
                            />
                            <button
                                onClick={ markAttendance }
                                className="w-full px-6 py-3 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                            >
                                Mark Attendance
                            </button>
                            <button
                                onClick={ () => setUser(null) }
                                className="w-full py-2 mt-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <GoogleLogin onSuccess={ handleSuccess }/>
                    ) }
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}
