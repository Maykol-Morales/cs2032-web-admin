import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import "../styles/global.css";

export default function GoogleAuth() {
    const [ user, setUser ] = useState(null);

    const [ params, setParams ] = useState<{ [key: string]: string }>({});
    const [ location, setLocation ] = useState<{ lat: number | null; lon: number | null }>({
        lat: null,
        lon: null,
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const paramsObject: { [key: string]: string } = {};

        searchParams.forEach((value, key) => {
            paramsObject[key] = value;
        });

        setParams(paramsObject);
    }, []);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                },
                (err) => {
                    console.log(err.message);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    const handleSuccess = (credentialResponse: { credential: string; }) => {
        const decodedUser = jwtDecode(credentialResponse.credential);
        console.log(decodedUser);
        setUser(decodedUser);
    };

    const sendRequest = async () => {
        if (!user) return;

        try {
            console.log("POST");
        } catch (error) {
            console.error("Error in POST request:", error);
        }
    };

    const handleError = () => {
        console.error("Google login failed");
    };

    return (
        <GoogleOAuthProvider clientId={ import.meta.env.PUBLIC_GOOGLE_CLIENT_ID }>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                        { user ? `Welcome, ${ user.name }!` : "Login with Google" }
                    </h2>

                    { user ? (
                        <>
                            <img
                                src={ user.picture }
                                alt="Profile"
                                className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-gray-300"
                            />
                            <button
                                onClick={ sendRequest }
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                            >
                                Send POST Request
                            </button>
                            <button
                                onClick={ () => setUser(null) }
                                className="w-full py-2 mt-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <GoogleLogin onSuccess={ handleSuccess } onError={ handleError }/>
                    ) }
                    <p>Name: { params.course || "Not provided" }</p>
                    <p>Age: { params.session || "Not provided" }</p>
                    { location.lat && location.lon ?
                        <p>Latitude: { location.lat }, Longitude: { location.lon }</p>
                        : <p>Getting location...</p>
                    }
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}