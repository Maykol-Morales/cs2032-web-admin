import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, LogOut, RefreshCcw } from "lucide-react"

type UserData = {
    email: string
    name: string
    picture: string
}

interface PostUserViewData {
    user: UserData
    status: "idle" | "loading" | "success" | "error"
    attendanceFunction: () => void
    logOutFunction: () => void
}

export function PostUserView({ user, status, attendanceFunction, logOutFunction }: PostUserViewData) {
    return (
        <Card className="w-full max-w-[350px] shadow-lg">
            <CardHeader className="text-center">
                <CardTitle className="text-xl sm:text-2xl">¡Bienvenido, { user.name.split(" ")[0] }!</CardTitle>
                <CardDescription>Marca tu asistencia para esta sesión.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                <div className="mb-4 sm:mb-6 text-center">
                    <img
                        src={ user.picture || "/placeholder.svg" }
                        alt="Profile"
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-2 border-2 border-gray-200"
                    />
                    <p className="text-xs sm:text-sm text-gray-500 mt-2 break-all">{ user.email }</p>
                </div>

                <Button onClick={ attendanceFunction } className="w-full" disabled={ status === "loading" || status === "success" }>
                    { status === "loading" ? (
                        <>
                            <RefreshCcw className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin"/>
                            Procesando...
                        </>
                    ) : status === "success" ? (
                        <>
                            <Check className="mr-2 h-3 w-3 sm:h-4 sm:w-4"/>
                            Asistencia registrada.
                        </>
                    ) : (
                        "Registrar Asistencia."
                    ) }
                </Button>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={ logOutFunction }
                    variant="outline"
                    className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                    <LogOut className="mr-2 h-3 w-3 sm:h-4 sm:w-4"/>
                    Cerrar Sesión.
                </Button>
            </CardFooter>
        </Card>
    )
}