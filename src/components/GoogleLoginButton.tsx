import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "../styles/global.css";

const GOOGLE_CLIENT_ID = "1066255782432-u6d2o570gts2eurkcsuscf644npdq61r.apps.googleusercontent.com";

export default function GoogleAuth() {
    const [ user, setUser ] = useState(null);

    const handleSuccess = (credentialResponse) => {
        const decodedUser = jwtDecode(credentialResponse.credential);
        setUser(decodedUser);
    };

    const handleError = () => {
        console.error("Google login failed");
    };

    return (
        <GoogleOAuthProvider clientId={ GOOGLE_CLIENT_ID }>
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
                                onClick={ () => setUser(null) }
                                className="w-full py-2 mt-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <GoogleLogin onSuccess={ handleSuccess } onError={ handleError }/>
                    ) }
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}
