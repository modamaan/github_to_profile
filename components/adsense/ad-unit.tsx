"use client"

import { useEffect, useRef } from "react"

interface AdUnitProps {
    slot: string
    format?: "auto" | "fluid" | "rectangle"
    responsive?: boolean
    className?: string
}

declare global {
    interface Window {
        adsbygoogle: unknown[]
    }
}

export function AdUnit({
    slot,
    format = "auto",
    responsive = true,
    className = ""
}: AdUnitProps) {
    const adRef = useRef<HTMLModElement>(null)
    const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
    const isEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true"

    useEffect(() => {
        if (!isEnabled || !clientId || !adRef.current) {
            return
        }

        try {
            // Initialize AdSense
            if (typeof window !== "undefined") {
                (window.adsbygoogle = window.adsbygoogle || []).push({})
            }
        } catch (error) {
            console.error("AdSense error:", error)
        }
    }, [isEnabled, clientId])

    if (!isEnabled || !clientId) {
        return null
    }

    return (
        <div className={`ad-container my-8 flex justify-center ${className}`}>
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client={clientId}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive ? "true" : "false"}
            />
        </div>
    )
}
