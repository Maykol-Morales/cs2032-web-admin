import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import React from 'react';

export function MissingParameterView() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <Card className="w-full max-w-[350px] shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-red-600 text-xl sm:text-2xl">Link Invalido</CardTitle>
                    <CardDescription>El enlace de asistencia no es válido.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-xs sm:text-sm text-gray-500 text-center">
                        Por favor, verifica que estés usando el enlace correcto proporcionado por tu instructor.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
