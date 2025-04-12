import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { MapPin, RefreshCcw } from "lucide-react"
import { Button } from "../ui/button.tsx"

interface LocationViewData {
    loading?: boolean
    getLocation?: () => void
}

export function MissingLocationView(
    {
        loading = false,
        getLocation
    }: LocationViewData
) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <Card className="w-full max-w-[350px] shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl sm:text-2xl">Verificando Ubicación.</CardTitle>
                    <CardDescription>Por favor, permite el acceso a la ubicación cuando se te solicite.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    <MapPin className="h-10 w-10 sm:h-12 sm:w-12 text-blue-500 animate-pulse mb-4"/>
                    <p className="text-xs sm:text-sm text-gray-500 text-center">
                        Necesitamos tu <b>ubicación</b> para registrar la asistencia.
                    </p>

                    <div className="w-full mt-6">
                        <Button onClick={ getLocation } className="w-full" disabled={ loading }>
                            { loading ? (
                                <>
                                    <RefreshCcw className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin"/>
                                    Verificando Ubicación...
                                </>
                            ) : (
                                <>
                                    <MapPin className="mr-2 h-3 w-3 sm:h-4 sm:w-4"/>
                                    Reintentar acceso a la Ubicación.
                                </>
                            ) }
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

