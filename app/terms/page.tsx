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
                            DevTree is a portfolio generation service that creates professional developer portfolios using publicly available GitHub data. The Service allows users to:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Generate portfolios from GitHub usernames</li>
                            <li>Customize portfolio layouts (Classic or Bento)</li>
                            <li>Register custom URLs for portfolios</li>
                            <li>Authenticate via GitHub OAuth</li>
                            <li>View analytics and portfolio statistics</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>

                        <h3 className="text-xl font-semibold mb-3">3.1 Account Creation</h3>
                        <p className="mb-4">
                            To access certain features, you may need to create an account via GitHub OAuth. You are responsible for:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Maintaining the security of your account</li>
                            <li>All activities that occur under your account</li>
                            <li>Notifying us immediately of any unauthorized use</li>
                        </ul>

                        <h3 className="text-xl font-semibold mb-3">3.2 Account Termination</h3>
                        <p className="mb-4">
                            We reserve the right to suspend or terminate your account if you violate these Terms or engage in fraudulent, abusive, or illegal activity.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
                        <p className="mb-4">You agree NOT to:</p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Use the Service for any illegal purpose or in violation of any laws</li>
                            <li>Attempt to gain unauthorized access to the Service or related systems</li>
                            <li>Interfere with or disrupt the Service or servers</li>
                            <li>Use automated tools to scrape or harvest data from the Service</li>
                            <li>Impersonate another person or misrepresent your affiliation</li>
                            <li>Upload malicious code, viruses, or harmful content</li>
                            <li>Abuse the API or exceed rate limits</li>
                            <li>Generate portfolios for GitHub users without their consent (for commercial purposes)</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>

                        <h3 className="text-xl font-semibold mb-3">5.1 Service Content</h3>
                        <p className="mb-4">
                            The Service and its original content (excluding user-generated content) are owned by DevTree and are protected by copyright, trademark, and other intellectual property laws.
                        </p>

                        <h3 className="text-xl font-semibold mb-3">5.2 User Content</h3>
                        <p className="mb-4">
                            Portfolios generated using DevTree display publicly available GitHub data. You retain all rights to your GitHub content. By using the Service, you grant us a license to:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Cache and display your GitHub data</li>
                            <li>Process your data to generate portfolios</li>
                            <li>Use AI to generate professional summaries</li>
                        </ul>

                        <h3 className="text-xl font-semibold mb-3">5.3 GitHub Data</h3>
                        <p className="mb-4">
                            All GitHub data displayed on DevTree is subject to GitHub's Terms of Service. We fetch data from the GitHub API and display it in accordance with GitHub's policies.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">6. Custom URLs</h2>
                        <p className="mb-4">
                            Users may register custom URLs (e.g., devtree.site/yourname) subject to availability. Custom URLs:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Must not infringe on trademarks or impersonate others</li>
                            <li>Must not contain offensive or inappropriate content</li>
                            <li>Are subject to our approval and may be revoked</li>
                            <li>Cannot be transferred or sold</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">7. Third-Party Services</h2>
                        <p className="mb-4">
                            The Service integrates with third-party services including:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li><strong>GitHub:</strong> For authentication and data fetching</li>
                            <li><strong>Google AdSense:</strong> For displaying advertisements</li>
                            <li><strong>Groq AI:</strong> For generating content summaries</li>
                            <li><strong>Analytics Services:</strong> For usage tracking</li>
                        </ul>
                        <p className="mb-4">
                            Your use of these third-party services is subject to their respective terms and privacy policies.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">8. Advertisements</h2>
                        <p className="mb-4">
                            The Service displays advertisements via Google AdSense. We do not control the content of these advertisements. By using the Service, you acknowledge that:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Ads may be displayed on your portfolio pages</li>
                            <li>Ad content is determined by Google's algorithms</li>
                            <li>We are not responsible for the content of third-party ads</li>
                            <li>You may use ad blockers, though this may affect functionality</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">9. Disclaimer of Warranties</h2>
                        <p className="mb-4">
                            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Warranties of merchantability or fitness for a particular purpose</li>
                            <li>Warranties that the Service will be uninterrupted or error-free</li>
                            <li>Warranties regarding the accuracy or reliability of data</li>
                            <li>Warranties that defects will be corrected</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
                        <p className="mb-4">
                            TO THE MAXIMUM EXTENT PERMITTED BY LAW, DEVTREE SHALL NOT BE LIABLE FOR:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Any indirect, incidental, special, or consequential damages</li>
                            <li>Loss of profits, data, or goodwill</li>
                            <li>Service interruptions or data loss</li>
                            <li>Third-party content or actions</li>
                            <li>Unauthorized access to your data</li>
                        </ul>
                        <p className="mb-4">
                            Our total liability shall not exceed the amount you paid us in the past 12 months (if any).
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">11. Indemnification</h2>
                        <p className="mb-4">
                            You agree to indemnify and hold harmless DevTree and its affiliates from any claims, damages, losses, or expenses arising from:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Your use of the Service</li>
                            <li>Your violation of these Terms</li>
                            <li>Your violation of any third-party rights</li>
                            <li>Your user-generated content</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">12. Data and Privacy</h2>
                        <p className="mb-4">
                            Your use of the Service is also governed by our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>. By using the Service, you consent to our collection and use of data as described in the Privacy Policy.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">13. Service Modifications</h2>
                        <p className="mb-4">
                            We reserve the right to:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Modify or discontinue the Service at any time</li>
                            <li>Change pricing or introduce fees for features</li>
                            <li>Update features and functionality</li>
                            <li>Impose usage limits or restrictions</li>
                        </ul>
                        <p className="mb-4">
                            We will provide reasonable notice of significant changes when possible.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">14. Changes to Terms</h2>
                        <p className="mb-4">
                            We may update these Terms from time to time. We will notify you of material changes by:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Posting the new Terms on this page</li>
                            <li>Updating the "Last updated" date</li>
                            <li>Sending an email notification (if you have an account)</li>
                        </ul>
                        <p className="mb-4">
                            Your continued use of the Service after changes constitutes acceptance of the new Terms.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">15. Governing Law</h2>
                        <p className="mb-4">
                            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which DevTree operates, without regard to conflict of law provisions.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">16. Dispute Resolution</h2>
                        <p className="mb-4">
                            Any disputes arising from these Terms or the Service shall be resolved through:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Good faith negotiation between the parties</li>
                            <li>Mediation if negotiation fails</li>
                            <li>Binding arbitration as a last resort</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">17. Severability</h2>
                        <p className="mb-4">
                            If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">18. Contact Information</h2>
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
