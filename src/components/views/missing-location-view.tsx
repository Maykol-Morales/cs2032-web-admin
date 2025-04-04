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
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-[350px] shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle>Checking Location</CardTitle>
                    <CardDescription>Please allow location access when prompted</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    <MapPin className="h-12 w-12 text-blue-500 animate-pulse mb-4"/>
                    <p className="text-sm text-gray-500">We need your <b>location</b> for the attendance</p>

                    <br/>
                    <Button onClick={ getLocation } className="w-full" disabled={ loading }>
                        { loading ? (
                            <>
                                <RefreshCcw className="mr-2 h-4 w-4 animate-spin"/>
                                Checking location...
                            </>
                        ) : (
                            <>
                                <MapPin className="mr-2 h-4 w-4"/>
                                Retry Location Access
                            </>
                        ) }
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

