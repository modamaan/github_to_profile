"use client"

import Script from "next/script"

export function AdSenseScript() {
    const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
    const isEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true"

    if (!isEnabled || !clientId) {
        return null
    }

    return (
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    )
}
