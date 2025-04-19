import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const toIsoWithOffset = (date: Date, offsetMinutes: number) => {
    const pad = (n: number) => String(n).padStart(2, "0")

    const localDate = new Date(date.getTime() + offsetMinutes * 60000)

    const year = localDate.getUTCFullYear()
    const month = pad(localDate.getUTCMonth() + 1)
    const day = pad(localDate.getUTCDate())
    const hours = pad(localDate.getUTCHours())
    const minutes = pad(localDate.getUTCMinutes())
    const seconds = pad(localDate.getUTCSeconds())

    const offsetH = Math.floor(Math.abs(offsetMinutes) / 60)
    const offsetM = Math.abs(offsetMinutes) % 60
    const sign = offsetMinutes >= 0 ? "+" : "-"
    const offset = `${ sign }${ pad(offsetH) }:${ pad(offsetM) }`

    return `${ year }-${ month }-${ day }T${ hours }:${ minutes }:${ seconds }${ offset }`
}