"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaStore, FaSync, FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";
import Image from "next/image";

interface Product {
    id: string;
    name: string;
    description: string | null;
    price: number | null;
    shortUrl: string;
    thumbnailUrl: string | null;
    salesCount: number | null;
    isVisible: boolean;
    displayOrder: number;
}

export default function ProductsPage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/");
        }
    }, [session, isPending, router]);

    useEffect(() => {
        if (session) {
            fetchProducts();
        }
    }, [session]);

    const fetchProducts = async () => {
        try {
            const response = await fetch("/api/gumroad/products");
            if (response.ok) {
                const data = await response.json();
                setProducts(data.products || []);
                setIsConnected(data.products && data.products.length > 0);
            }
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    const handleConnect = async () => {
        if (!username.trim()) {
            setError("Please enter your Gumroad username");
            return;
        }

        setIsConnecting(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch("/api/gumroad/connect", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username.trim() }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(`Successfully connected! Synced ${data.productsCount} products.`);
                setIsConnected(true);
                setUsername("");
                await fetchProducts();
            } else {
                setError(data.error || "Failed to connect Gumroad account");
            }
        } catch {
            setError("An error occurred while connecting");
        } finally {
            setIsConnecting(false);
        }
    };

    const handleSync = async () => {
        setIsSyncing(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch("/api/gumroad/sync", {
                method: "POST",
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(`Synced ${data.productsCount} products successfully!`);
                await fetchProducts();
            } else {
                setError(data.error || "Failed to sync products");
            }
        } catch {
            setError("An error occurred while syncing");
        } finally {
            setIsSyncing(false);
        }
    };

    const handleToggleVisibility = async (productId: string, currentVisibility: boolean) => {
        try {
            const response = await fetch("/api/gumroad/products", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId,
                    isVisible: !currentVisibility,
                }),
            });

            if (response.ok) {
                await fetchProducts();
            }
        } catch (err) {
            console.error("Error toggling visibility:", err);
        }
    };

    const handleDisconnect = async () => {
        if (!confirm("Are you sure you want to disconnect your Gumroad account? This will remove all products.")) {
            return;
        }

        try {
            const response = await fetch("/api/gumroad/connect", {
                method: "DELETE",
            });

            if (response.ok) {
                setIsConnected(false);
                setProducts([]);
                setSuccess("Gumroad account disconnected successfully");
            }
        } catch {
            setError("Failed to disconnect Gumroad account");
        }
    };

    if (isPending) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Products & Monetization</h1>
                    <p className="text-zinc-400">Connect your Gumroad account to sell products on your portfolio</p>
                </div>

                {/* Alerts */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400">
                        {success}
                    </div>
                )}

                {/* Connect Gumroad */}
                {!isConnected && (
                    <Card className="mb-8 bg-zinc-900 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FaStore className="h-5 w-5 text-cyan-400" />
                                Connect Gumroad
                            </CardTitle>
                            <CardDescription>
                                Enter your Gumroad username to display your products on your portfolio
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Gumroad Username</label>
                                    <Input
                                        type="text"
                                        placeholder="your-username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="bg-zinc-800 border-zinc-700"
                                    />
                                    <p className="text-xs text-zinc-500 mt-2">
                                        Enter your Gumroad username (e.g., if your profile is{" "}
                                        <code className="text-cyan-400">yourname.gumroad.com</code>, enter{" "}
                                        <code className="text-cyan-400">yourname</code>)
                                    </p>
                                </div>
                                <Button
                                    onClick={handleConnect}
                                    disabled={isConnecting || !username.trim()}
                                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                                >
                                    {isConnecting ? "Connecting..." : "Connect Gumroad"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Products List */}
                {isConnected && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Your Products</h2>
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleSync}
                                    disabled={isSyncing}
                                    variant="outline"
                                    className="border-zinc-700"
                                >
                                    <FaSync className={`h-4 w-4 mr-2 ${isSyncing ? "animate-spin" : ""}`} />
                                    {isSyncing ? "Syncing..." : "Sync"}
                                </Button>
                                <Button
                                    onClick={handleDisconnect}
                                    variant="outline"
                                    className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                                >
                                    <FaTrash className="h-4 w-4 mr-2" />
                                    Disconnect
                                </Button>
                            </div>
                        </div>

                        {products.length === 0 ? (
                            <Card className="bg-zinc-900 border-zinc-800">
                                <CardContent className="py-12 text-center text-zinc-400">
                                    No products found. Create products on Gumroad and sync them here.
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-4">
                                {products.map((product) => (
                                    <Card key={product.id} className="bg-zinc-900 border-zinc-800">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                {product.thumbnailUrl && (
                                                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                                                        <Image
                                                            src={product.thumbnailUrl}
                                                            alt={product.name}
                                                            width={96}
                                                            height={96}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                                                    {product.description && (
                                                        <p className="text-sm text-zinc-400 mb-2 line-clamp-2">
                                                            {product.description}
                                                        </p>
                                                    )}
                                                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                                                        <span className="font-semibold text-cyan-400">
                                                            ${product.price ? (product.price / 100).toFixed(2) : "0.00"}
                                                        </span>
                                                        {product.salesCount !== null && (
                                                            <span>{product.salesCount} sales</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <Button
                                                    onClick={() => handleToggleVisibility(product.id, product.isVisible)}
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-zinc-700"
                                                >
                                                    {product.isVisible ? (
                                                        <>
                                                            <FaEye className="h-4 w-4 mr-2" />
                                                            Visible
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaEyeSlash className="h-4 w-4 mr-2" />
                                                            Hidden
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
