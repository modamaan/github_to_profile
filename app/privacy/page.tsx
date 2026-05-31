import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Privacy Policy - DevTree",
    description: "Privacy Policy for DevTree - Learn how we collect, use, and protect your information.",
}

export default function PrivacyPolicyPage() {
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
                <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-muted-foreground mb-8">Last updated: February 16, 2026</p>

                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                        <p className="mb-4">
                            Welcome to DevTree (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                        </p>
                        <p className="mb-4">
                            By using DevTree, you agree to the collection and use of information in accordance with this policy.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>

                        <h3 className="text-xl font-semibold mb-3">2.1 Information You Provide</h3>
                        <p className="mb-4">
                            When you use DevTree, we may collect the following information:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li><strong>GitHub Username:</strong> When you generate a portfolio, you provide a GitHub username.</li>
                            <li><strong>Account Information:</strong> If you create an account via GitHub OAuth, we collect your GitHub profile information (name, email, avatar, username).</li>
                            <li><strong>Custom URL:</strong> If you register a custom URL for your portfolio.</li>
                        </ul>

                        <h3 className="text-xl font-semibold mb-3">2.2 Automatically Collected Information</h3>
                        <p className="mb-4">
                            We automatically collect certain information when you visit our website:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li><strong>Usage Data:</strong> IP address, browser type, device information, pages visited, time spent on pages.</li>
                            <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity and store certain information.</li>
                            <li><strong>Analytics:</strong> We use Umami Analytics and Vercel Analytics to understand how users interact with our site.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                        <p className="mb-4">We use the collected information for the following purposes:</p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>To generate and display your developer portfolio</li>
                            <li>To provide, maintain, and improve our services</li>
                            <li>To authenticate users via GitHub OAuth</li>
                            <li>To manage custom URLs and user preferences</li>
                            <li>To analyze usage patterns and improve user experience</li>
                            <li>To communicate with you about service updates</li>
                            <li>To comply with legal obligations</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>

                        <h3 className="text-xl font-semibold mb-3">4.1 GitHub API</h3>
                        <p className="mb-4">
                            We use the GitHub API to fetch public profile information and repository data. Please review GitHub&apos;s Privacy Policy for information on how they handle your data.
                        </p>

                        <h3 className="text-xl font-semibold mb-3">4.2 Google AdSense</h3>
                        <p className="mb-4">
                            We use Google AdSense to display advertisements on our website. Google uses cookies to serve ads based on your prior visits to our website or other websites. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google&apos;s Ads Settings</a>.
                        </p>
                        <p className="mb-4">
                            Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet. For more information, visit <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google&apos;s Advertising & Privacy page</a>.
                        </p>

                        <h3 className="text-xl font-semibold mb-3">4.3 Analytics Services</h3>
                        <p className="mb-4">
                            We use Umami Analytics and Vercel Analytics to collect anonymous usage statistics. These services do not use cookies and respect user privacy.
                        </p>

                        <h3 className="text-xl font-semibold mb-3">4.4 Groq AI</h3>
                        <p className="mb-4">
                            We use Groq AI to generate professional summaries and content for portfolios. Only publicly available GitHub data is sent to Groq for processing.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking Technologies</h2>
                        <p className="mb-4">
                            We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
                        </p>
                        <p className="mb-4">Types of cookies we use:</p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li><strong>Essential Cookies:</strong> Required for authentication and core functionality</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                            <li><strong>Advertising Cookies:</strong> Used by Google AdSense to display relevant ads</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
                        <p className="mb-4">
                            If you have any questions about this Privacy Policy, please contact us:
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
