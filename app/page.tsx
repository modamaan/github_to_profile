"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { FaGithub, FaMapMarkerAlt, FaBuilding, FaUsers, FaStar, FaRocket, FaPalette, FaChartLine, FaSearch, FaLink, FaBrain, FaCheck, FaLinkedin, FaCoffee } from "react-icons/fa"
import Link from "next/link"
import { trackEvent } from "@/lib/utils/analytics"
import { useDebounce } from "@/lib/utils/debounce"
import { GitHubLoginButton } from "@/components/auth/github-login-button"
import { UserMenu } from "@/components/auth/user-menu"
import { useSession } from "@/lib/auth-client"
import type { NormalizedProfile } from "@/types/github"
import { BuyMeCoffeeButton } from "@/components/buy-me-coffee-button"

export default function LandingPage() {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [previewUser, setPreviewUser] = useState<NormalizedProfile | null>(null)
  const [isFetchingPreview, setIsFetchingPreview] = useState(false)
  const [starCount, setStarCount] = useState(0)
  const [displayedStars, setDisplayedStars] = useState(0)
  const router = useRouter()
  const pathname = usePathname()
  const { data: session, isPending: isSessionPending } = useSession()

  useEffect(() => {
    const fetchStarCount = async () => {
      try {
        const response = await fetch('/api/github/stars')
        if (response.ok) {
          const data = await response.json()
          setStarCount(data.stars || 0)
        }
      } catch {
        setStarCount(0)
      }
    }

    fetchStarCount()
  }, [])

  useEffect(() => {
    if (!session?.user || isSessionPending) {
      return;
    }

    if (pathname !== "/") {
      return;
    }

    const redirectToPortfolio = async () => {
      try {
        const response = await fetch("/api/auth/get-github-username");
        if (response.ok) {
          const data = await response.json();
          if (data.username) {
            router.push(`/${data.username}`);
          }
        }
      } catch {
      }
    };

    const timeoutId = setTimeout(() => {
      redirectToPortfolio();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [session, isSessionPending, router, pathname])

  useEffect(() => {
    if (starCount === 0) return

    const duration = 500
    const steps = 40
    const increment = starCount / steps
    const stepDuration = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const nextValue = Math.min(Math.floor(increment * currentStep), starCount)
      setDisplayedStars(nextValue)

      if (currentStep >= steps) {
        setDisplayedStars(starCount)
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [starCount])

  const debouncedUsername = useDebounce(username.trim(), 500)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    if (!debouncedUsername || debouncedUsername.length < 1) {
      setPreviewUser(null)
      setIsFetchingPreview(false)
      return
    }

    const abortController = new AbortController()
    abortControllerRef.current = abortController

    setIsFetchingPreview(true)

    const fetchPreview = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${debouncedUsername}`, {
          headers: {
            Accept: "application/vnd.github+json",
          },
          signal: abortController.signal,
        })

        if (abortController.signal.aborted) {
          return
        }

        if (response.ok) {
          const data = await response.json()
          setPreviewUser({
            username: data.login,
            name: data.name,
            bio: data.bio,
            avatar_url: data.avatar_url,
            location: data.location,
            email: data.email,
            website: data.blog || null,
            twitter_username: data.twitter_username,
            company: data.company,
            followers: data.followers,
            following: data.following,
            public_repos: data.public_repos,
            created_at: data.created_at,
          })
        } else {
          setPreviewUser(null)
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return
        }
        setPreviewUser(null)
      } finally {
        if (!abortController.signal.aborted) {
          setIsFetchingPreview(false)
        }
      }
    }

    fetchPreview()

    return () => {
      abortController.abort()
    }
  }, [debouncedUsername])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return

    trackEvent('portfolio-generation-started', {
      username: username.trim(),
    })

    setIsLoading(true)
    router.push(`/${username.trim()}`)
  }

  const features = [
    {
      icon: <FaBrain className="h-8 w-8" />,
      title: "AI-Powered Content",
      description: "Advanced AI generates professional summaries and highlights from your GitHub activity"
    },
    {
      icon: <FaGithub className="h-8 w-8" />,
      title: "GitHub Integration",
      description: "Seamlessly sync your repos, contributions, and stats in real-time"
    },
    {
      icon: <FaLink className="h-8 w-8" />,
      title: "Custom Share URLs",
      description: "Create memorable custom URLs for easy sharing and branding"
    },
    {
      icon: <FaPalette className="h-8 w-8" />,
      title: "Beautiful Templates",
      description: "Choose from stunning, responsive templates that showcase your work"
    },
    {
      icon: <FaSearch className="h-8 w-8" />,
      title: "SEO Optimized",
      description: "Built-in SEO optimization to help recruiters and clients find you"
    },
    {
      icon: <FaChartLine className="h-8 w-8" />,
      title: "Analytics & Insights",
      description: "Track views and engagement to understand your portfolio's impact"
    }
  ]

  const steps = [
    {
      number: "01",
      title: "Enter GitHub Username",
      description: "Simply provide your GitHub username to get started"
    },
    {
      number: "02",
      title: "AI Analyzes Profile",
      description: "Our AI processes your repos, contributions, and activity"
    },
    {
      number: "03",
      title: "Customize Portfolio",
      description: "Choose templates, colors, and personalize your content"
    },
    {
      number: "04",
      title: "Share Your DevTree",
      description: "Get a custom URL and share your professional portfolio"
    }
  ]

  return (
    <div className="min-h-screen text-foreground flex flex-col bg-black">
      {/* Floating Buy Me a Coffee Button */}
      <BuyMeCoffeeButton />
      {/* Floating Header */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[826px] px-4">
        <div className="flex w-full flex-row items-center justify-between gap-3 rounded-full border border-white/10 px-3 py-2.5 backdrop-blur-xl bg-zinc-900/80 transition-colors duration-300 md:gap-4 md:px-3.5 md:py-3">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity ml-2.5 md:ml-3">
            <span className="text-lg md:text-xl text-white font-bold">
              <span className="text-white">DevTree</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <UserMenu />
            <Link
              href="https://www.linkedin.com/in/mohamedamaan319/"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center justify-center gap-1.5 outline-none transition-colors border border-transparent text-white px-2.5 py-1.5 rounded-full bg-[#0077B5] hover:bg-[#006399] active:bg-[#005582] text-xs md:text-sm lg:px-4 lg:py-2.5 lg:text-base tracking-normal whitespace-nowrap cursor-pointer relative group overflow-visible"
            >
              <FaLinkedin className="h-4 w-4 relative z-10 transition-transform group-hover:scale-110" />
              <span className="relative z-10">LinkedIn</span>
              <FaStar className="absolute h-3 w-3 text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -top-1 -right-1 animate-sparkle" />
              <FaStar className="absolute h-2 w-2 text-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -bottom-0.5 -left-0.5 animate-sparkle-float" style={{ animationDelay: '0.2s' }} />
              <FaStar className="absolute h-2.5 w-2.5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 top-1/2 -left-2 animate-sparkle" style={{ animationDelay: '0.4s' }} />
              <FaStar className="absolute h-2 w-2 text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 top-1/2 -right-2 animate-sparkle-float" style={{ animationDelay: '0.6s' }} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/mohamedamaan319/"
              target="_blank"
              rel="noreferrer"
              className="md:hidden flex items-center justify-center gap-1 outline-none transition-colors border border-transparent text-white px-2.5 py-1.5 rounded-full bg-[#0077B5] hover:bg-[#006399] active:bg-[#005582] text-xs tracking-normal whitespace-nowrap cursor-pointer relative group overflow-visible"
            >
              <FaLinkedin className="h-4 w-4 relative z-10 transition-transform group-hover:scale-110" />
              <FaStar className="absolute h-2.5 w-2.5 text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -top-1 -right-1 animate-sparkle" />
              <FaStar className="absolute h-2 w-2 text-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -bottom-0.5 -left-0.5 animate-sparkle-float" style={{ animationDelay: '0.2s' }} />
              <FaStar className="absolute h-2 w-2 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 top-1/2 -left-2 animate-sparkle" style={{ animationDelay: '0.4s' }} />
              <FaStar className="absolute h-2 w-2 text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 top-1/2 -right-2 animate-sparkle-float" style={{ animationDelay: '0.6s' }} />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative mx-auto min-h-screen w-full flex items-center justify-center px-5 md:px-[50px] pt-20 pb-20">
          {/* Subtle Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 to-transparent" />
          </div>

          <div className="relative flex min-h-[80vh] w-full items-center justify-center top-0 md:top-16">
            <div className="flex w-full flex-col items-center justify-center">
              <div className="z-10 flex w-full max-w-[826px] flex-col items-center justify-center gap-8 md:gap-12">
                {/* Logo and Description */}
                <div className="flex w-full flex-col items-center justify-center text-center">
                  <div className="flex flex-col items-center gap-4 md:gap-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 mb-2">
                      <FaRocket className="h-4 w-4 text-zinc-400" />
                      <span className="text-sm text-zinc-300">Portfolio Builder for Developers</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                      DevTree
                    </h1>

                    <p className="text-xl md:text-3xl px-5 md:px-10 font-medium text-white tracking-normal max-w-3xl leading-relaxed">
                      Turn your GitHub into a stunning portfolio. Powered by AI, zero coding required.
                    </p>

                    <p className="text-base md:text-lg px-5 md:px-10 font-normal text-zinc-400 tracking-normal max-w-2xl">
                      Create a professional developer portfolio in seconds. Just enter your GitHub username and let AI do the magic.
                    </p>
                  </div>
                </div>

                {/* Form */}
                <div className="max-w-md mx-auto relative group w-full">
                  <div className="absolute -inset-1 bg-zinc-800/50 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300" />
                  <form onSubmit={handleSubmit} className="relative flex gap-2 p-2 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl">
                    <div className="relative flex-1">
                      <FaGithub className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                      <Input
                        placeholder="github-username"
                        className="pl-9 border-0 shadow-none focus-visible:ring-0 bg-transparent h-12 text-white placeholder:text-zinc-500 text-base"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="rounded-lg h-12 px-6 bg-white text-black hover:bg-zinc-100 font-semibold shadow-lg transition-colors"
                      disabled={!username || isLoading}
                    >
                      {isLoading ? "Generating..." : "Generate Free"}
                    </Button>
                  </form>
                </div>

                {/* Preview User Card */}
                {previewUser && (
                  <div className="max-w-md mx-auto pt-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <Card className="border-white/20 shadow-lg bg-white/5 backdrop-blur-md">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Image
                            src={previewUser.avatar_url}
                            alt={previewUser.username}
                            width={64}
                            height={64}
                            className="rounded-full border-2 border-purple-400/50 shadow-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg truncate text-white">
                                {previewUser.name || previewUser.username}
                              </h3>
                              {previewUser.name && (
                                <span className="text-sm text-white/70 truncate">
                                  @{previewUser.username}
                                </span>
                              )}
                            </div>
                            {previewUser.bio && (
                              <p className="text-sm text-white/70 line-clamp-2 mb-3">
                                {previewUser.bio}
                              </p>
                            )}
                            <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
                              {previewUser.location && (
                                <div className="flex items-center gap-1">
                                  <FaMapMarkerAlt className="h-3 w-3" />
                                  <span>{previewUser.location}</span>
                                </div>
                              )}
                              {previewUser.company && (
                                <div className="flex items-center gap-1">
                                  <FaBuilding className="h-3 w-3" />
                                  <span>{previewUser.company}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <FaUsers className="h-3 w-3" />
                                <span>{previewUser.followers} followers</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FaGithub className="h-3 w-3" />
                                <span>{previewUser.public_repos} repos</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {isFetchingPreview && username.trim() && (
                  <div className="max-w-md mx-auto pt-6 text-center text-sm text-white/80">
                    Checking GitHub profile...
                  </div>
                )}

                {/* Example Portfolios Showcase */}
                <div className="pt-8 w-full max-w-4xl mx-auto">
                  <h3 className="text-center text-lg md:text-xl text-white font-semibold mb-6">
                    ✨ Explore Example Portfolios
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        username: "liyasthomas",
                        name: "Liyas Thomas",
                        role: "CEO @ Hoppscotch",
                        avatar: "https://avatars.githubusercontent.com/u/10395817?v=4",
                        gradient: "from-blue-500 to-cyan-500"
                      },
                      {
                        username: "bodhish",
                        name: "Bodhish Thomas",
                        role: "CEO @ OHC",
                        avatar: "https://avatars.githubusercontent.com/u/14979190?v=4",
                        gradient: "from-yellow-500 to-orange-500"
                      },
                      {
                        username: "modamaan",
                        name: "Mohamed Amaan",
                        role: "CEO @ DevTree",
                        avatar: "https://avatars.githubusercontent.com/u/121436543?v=4",
                        gradient: "from-purple-500 to-pink-500"
                      }
                    ].map((example, index) => (
                      <button
                        key={example.username}
                        onClick={() => router.push(`/${example.username}`)}
                        className="group relative p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl text-left"
                      >
                        <div className="absolute inset-0 bg-zinc-800/50 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
                        <div className="relative flex items-center gap-3">
                          <div className="relative">
                            <Image
                              src={example.avatar}
                              alt={example.name}
                              width={48}
                              height={48}
                              className="rounded-full border-2 border-zinc-700 group-hover:border-zinc-600 transition-colors"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-black" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white text-sm md:text-base truncate group-hover:text-zinc-100 transition-colors">
                              {example.name}
                            </h4>
                            <p className="text-xs text-white/60 truncate">
                              {example.role}
                            </p>
                          </div>
                          <FaRocket className="h-4 w-4 text-white/40 group-hover:text-cyan-400 transition-colors opacity-0 group-hover:opacity-100" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-20 md:py-32 px-5 md:px-[50px] bg-gradient-to-b from-transparent to-black/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Everything You Need to <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Stand Out</span>
              </h2>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
                Powerful features designed to showcase your developer journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="relative py-20 md:py-32 px-5 md:px-[50px]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Get Started in <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">4 Simple Steps</span>
              </h2>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
                From GitHub username to professional portfolio in minutes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {step.number}
                      </div>
                      {index < steps.length - 1 && (
                        <div className="hidden lg:block absolute top-10 left-20 w-full h-0.5 bg-gradient-to-r from-purple-500 to-transparent" />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="relative py-20 md:py-32 px-5 md:px-[50px] bg-gradient-to-b from-black/20 to-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
              <FaStar className="h-5 w-5 text-yellow-400" />
              <span className="text-white font-semibold">
                Trusted by developers worldwide
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Thousands of Developers
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              DevTree helps developers create stunning portfolios that get noticed by recruiters and clients
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {displayedStars > 0 ? displayedStars.toLocaleString() : "1000+"}
                </div>
                <div className="text-white/70">GitHub Stars</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  10k+
                </div>
                <div className="text-white/70">Portfolios Created</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  98%
                </div>
                <div className="text-white/70">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative py-20 md:py-32 px-5 md:px-[50px]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-md border border-white/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 animate-pulse" style={{ animationDuration: '4s' }} />

              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Ready to Build Your <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">DevTree</span>?
                </h2>
                <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                  Create your professional developer portfolio in seconds. No credit card required.
                </p>

                <div className="max-w-md mx-auto relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg blur opacity-40 group-hover:opacity-70 transition duration-1000 animate-pulse" />
                  <form onSubmit={handleSubmit} className="relative flex gap-2 p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg">
                    <div className="relative flex-1">
                      <FaGithub className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                      <Input
                        placeholder="your-github-username"
                        className="pl-9 border-0 shadow-none focus-visible:ring-0 bg-transparent h-12 text-white placeholder:text-white/50 text-base"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="rounded-lg h-12 px-6 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold shadow-lg"
                      disabled={!username || isLoading}
                    >
                      {isLoading ? "Creating..." : "Get Started Free"}
                    </Button>
                  </form>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    <FaCheck className="h-4 w-4 text-green-400" />
                    <span>Free forever</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheck className="h-4 w-4 text-green-400" />
                    <span>No credit card</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheck className="h-4 w-4 text-green-400" />
                    <span>Setup in 60 seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative min-h-[400px] border-t border-zinc-800 bg-black">
        <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-wrap justify-between items-start gap-10 md:gap-[40px]">
            <div className="flex flex-col gap-4">
              <Link href="/" className="hover:opacity-80 transition-opacity">
                <span className="text-2xl md:text-3xl font-bold">
                  <span className="text-white">DevTree</span>
                </span>
              </Link>
              <p className="text-zinc-400 max-w-xs">
                Turn your GitHub into a stunning portfolio. Powered by AI, zero coding required.
              </p>
            </div>
            <div className="flex justify-center w-full">
              <a
                href="https://www.buymeacoffee.com/modamaan"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <FaCoffee className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Buy Me a Coffee</span>
                <FaStar className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-sm text-zinc-500">
            <p>© 2026 DevTree. Built with ❤️ for developers.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
