"use client"

import { useCallback, useEffect, useState } from "react"

type LocationData = {
    latitude: number
    longitude: number
}

export function useGeoLocation() {
    const [ loading, setLoading ] = useState(true)
    const [ location, setLocation ] = useState<LocationData | null>(null)

    const getLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setLoading(false)
            return
        }

        setLoading(true)

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLoading(false)
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            },
            () => {
                setLoading(false)
                setLocation(null)
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
        )
    }, [])

    useEffect(() => {
        getLocation()
    }, [ getLocation ])

    return { loading, location, getLocation }
}

