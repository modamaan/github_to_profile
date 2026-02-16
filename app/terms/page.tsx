import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Terms of Service - DevTree",
    description: "Terms of Service for DevTree - Read our terms and conditions for using our service.",
}

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border">
                <div className="container mx-auto px-4 py-4 max-w-4xl">
                    <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
                        DevTree
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
                <p className="text-muted-foreground mb-8">Last updated: February 16, 2026</p>

                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
                        <p className="mb-4">
                            By accessing or using DevTree ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
                        <p className="mb-4">
                            DevTree is a portfolio generation service that creates professional developer portfolios using publicly available GitHub data.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">3. Acceptable Use</h2>
                        <p className="mb-4">You agree NOT to:</p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Use the Service for any illegal purpose or in violation of any laws</li>
                            <li>Attempt to gain unauthorized access to the Service or related systems</li>
                            <li>Interfere with or disrupt the Service or servers</li>
                            <li>Use automated tools to scrape or harvest data from the Service</li>
                            <li>Impersonate another person or misrepresent your affiliation</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
                        <p className="mb-4">
                            The Service integrates with third-party services including GitHub, Google AdSense, and Groq AI. Your use of these third-party services is subject to their respective terms and privacy policies.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">5. Disclaimer of Warranties</h2>
                        <p className="mb-4">
                            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">6. Contact Information</h2>
                        <p className="mb-4">
                            For questions about these Terms, please contact us:
                        </p>
                        <ul className="list-none mb-4 space-y-2">
                            <li><strong>Email:</strong> support@devtree.com</li>
                            <li><strong>Website:</strong> <a href="https://devtree.site" className="text-primary hover:underline">https://devtree.site</a></li>
                        </ul>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-border mt-16">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                        <p>© 2026 DevTree. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link href="/privacy" className="hover:text-foreground transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="hover:text-foreground transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
