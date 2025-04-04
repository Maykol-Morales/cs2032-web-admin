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

export function PostUserView(
    {
        user,
        status,
        attendanceFunction,
        logOutFunction,
    }: PostUserViewData
) {
    return (
        <Card className="w-[350px] shadow-lg">
            <CardHeader className="text-center">
                <CardTitle>Welcome, { user.name.split(" ")[0] }!</CardTitle>
                <CardDescription>Mark your attendance for this session</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                <div className="mb-6 text-center">
                    <img
                        src={ user.picture }
                        alt="Profile"
                        className="w-20 h-20 rounded-full mx-auto mb-2 border-2 border-gray-200"
                    />
                    <p className="text-sm text-gray-500 mt-2">{ user.email }</p>
                </div>

                <Button onClick={ attendanceFunction } className="w-full" disabled={ status === "loading" || status === "success" }>
                    { status === "loading" ? (
                        <>
                            <RefreshCcw className="mr-2 h-4 w-4 animate-spin"/>
                            Processing...
                        </>
                    ) : status === "success" ? (
                        <>
                            <Check className="mr-2 h-4 w-4"/>
                            Attendance Marked
                        </>
                    ) : (
                        "Mark Attendance"
                    ) }
                </Button>
            </CardContent>
            <CardFooter>
                <Button onClick={ logOutFunction } variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50">
                    <LogOut className="mr-2 h-4 w-4"/>
                    Sign Out
                </Button>
            </CardFooter>
        </Card>
    )
}