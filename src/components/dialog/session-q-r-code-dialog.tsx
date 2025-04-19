import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import type { Session } from "../views/admin-view"

interface SessionQRCodeDialogProps {
    session: Session | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function SessionQRCodeDialog({ session, open, onOpenChange }: SessionQRCodeDialogProps) {
    if (!session) return null

    const qrCodeDataUrl = session.qr_code ? `data:image/png;base64,${ session.qr_code }` : null

    return (
        <Dialog open={ open } onOpenChange={ onOpenChange }>
            <DialogTitle>
                <DialogContent className="max-h-[120vh] p-4 flex items-center justify-center">
                    { qrCodeDataUrl && (
                        <div className="flex flex-col items-center">
                            <img
                                src={ qrCodeDataUrl || "/placeholder.svg" }
                                alt="QR Code de la sesión"
                                className="w-full h-full max-w-[80vh] max-h-[80vh] object-contain"
                            />
                            <div className="mt-2 text-center text-sm text-muted-foreground">
                                { session.course_name } ({ session.id })
                            </div>
                        </div>
                    ) }
                </DialogContent>
            </DialogTitle>
        </Dialog>
    )
}
