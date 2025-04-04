import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import React from 'react';

export function MissingParameterView() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-[350px] shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-red-600">Invalid Link</CardTitle>
                    <CardDescription>The attendance link is invalid</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-500 text-center">
                        Please check that you're using the correct link provided by your Instructor.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
