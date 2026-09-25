"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useCoinBitXStore } from "../lib/store";
import { MOCK_CRYPTO_DATA } from "../lib/data";
import { cn, formatCurrency, formatNumber, formatPercentage, getChangeColor } from "../lib/utils";
import {
  Table,
  Text,
  Title,
  Group,
  Badge,
  Space,
  ScrollArea,
  rem,
} from "@mantine/core";
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  TrendingUp,
  Shield,
  Settings,
  Menu,
  LogOut,
  User,
  Zap,
  Activity,
  ArrowLeftRight,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const { isAuthenticated, user, logout } = useAuth();
  const { wallet } = useCoinBitXStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTrade = () => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      router.push("/trade");
    }
  };

  return (
    <div className="min-h-screen gradient-bg grid-pattern">
      {/* Navbar */}
      <nav className="border-b border-purple-800/30 glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-cyan-400 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">CoinBitX</span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {["Trade", "Markets", "Wallet", "Orders", "Profile"].map((item) => (
                <button
                  key={item}
                  onClick={() => item === "Trade" && handleTrade()}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full" />
              </button>
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <button onClick={logout} className="text-sm text-slate-400 hover:text-red-400 transition-colors hidden sm:block">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => router.push("/login")}
                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => router.push("/register")}
                    className="gradient-btn px-4 py-2 text-sm"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <Badge className="mx-auto mb-6" variant="light" color="brand" size="sm">
                <Activity className="w-3 h-3 mr-1" /> Next Gen Trading Platform
              </Badge>
              <Title order={1} className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 mt-4">
                Trade Crypto with{" "}
                <span className="gradient-text">Precision</span>
              </Title>
              <Text size="lg" c="dimmed" className="max-w-2xl mx-auto mb-10">
                Lightning-fast execution, deep liquidity, and institutional-grade security. 
                Trade Bitcoin, Ethereum, and 100+ cryptocurrencies on the world's most advanced platform.
              </Text>
              <Group justify="center" gap="md">
                <button onClick={handleTrade} className="gradient-btn px-8 py-3 text-lg">
                  Start Trading
                </button>
                <button
                  onClick={() => router.push("/wallet")}
                  className="px-8 py-3 text-lg border border-purple-500/30 rounded-lg text-white hover:bg-purple-500/10 transition-colors"
                >
                  <Wallet className="w-5 h-5 inline mr-2" />
                  Open Wallet
                </button>
              </Group>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
              {[
                { label: "24h Volume", value: "$28.5B", change: "+12.3%" },
                { label: "Active Traders", value: "1.2M+", change: "+8.7%" },
                { label: "Cryptocurrencies", value: "150+", change: "+5" },
                { label: "Uptime", value: "99.99%", change: "0.01%" },
              ].map((stat, i) => (
                <div key={i} className="card-glass text-center">
                  <Text size="sm" c="dimmed">{stat.label}</Text>
                  <Title order={3} className="mt-1 gradient-text">{stat.value}</Title>
                  <Text size="xs" c="green.400">{stat.change}</Text>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Markets Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Title order={2}>Markets</Title>
            <Text c="dimmed">Top cryptocurrencies by market cap</Text>
          </div>
          <div className="hidden sm:flex items-center gap-2 glass rounded-lg px-4 py-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-40 text-white placeholder-slate-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Placeholder */}
          <div className="lg:col-span-2 card-glass">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <span className="text-orange-400 font-bold">₿</span>
                </div>
                <div>
                  <Text fw={600}>BTC / USD</Text>
                  <Text size="sm" c="dimmed">Bitcoin</Text>
                </div>
              </div>
              <div className="text-right">
                <Text fw={700} size="xl">$103,456.78</Text>
                <Text c="green.400" size="sm">+2.43%</Text>
              </div>
            </div>
            <div className="trading-chart h-64 flex items-center justify-center">
              <div className="w-full h-full p-4 grid-pattern opacity-50">
                <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,150 L50,140 L100,145 L150,130 L200,135 L250,120 L300,115 L350,125 L400,110 L450,105 L500,100 L550,108 L600,95 L650,90 L700,85 L750,88 L800,80 L800,200 L0,200 Z" fill="url(#chartGrad)" />
                  <path d="M0,150 L50,140 L100,145 L150,130 L200,135 L250,120 L300,115 L350,125 L400,110 L450,105 L500,100 L550,108 L600,95 L650,90 L700,85 L750,88 L800,80" fill="none" stroke="#7c3aed" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="card-glass">
              <Text fw={600} mb={4}>Portfolio</Text>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Text size="sm">Balance</Text>
                  <Text fw={600}>{formatCurrency(wallet.balance)}</Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text size="sm">BTC</Text>
                  <Text fw={600}>{wallet.cryptoBalance.BTC || 0} BTC</Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text size="sm">ETH</Text>
                  <Text fw={600}>{wallet.cryptoBalance.ETH || 0} ETH</Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text size="sm">SOL</Text>
                  <Text fw={600}>{wallet.cryptoBalance.SOL || 0} SOL</Text>
                </div>
              </div>
            </div>

            <div className="card-glass">
              <Text fw={600} mb={3}>Quick Trade</Text>
              <div className="space-y-2">
                {["BTC", "ETH", "SOL"].map((coin) => (
                  <button
                    key={coin}
                    onClick={() => handleTrade()}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{coin}</span>
                      <span className="text-xs text-slate-400">{coin === "BTC" ? "Bitcoin" : coin === "ETH" ? "Ethereum" : "Solana"}</span>
                    </div>
                    <Text size="sm" fw={600}>
                      {coin === "BTC" ? "$103,456" : coin === "ETH" ? "$3,456" : "$178.45"}
                    </Text>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Markets Table */}
        <div className="card-glass mt-6 overflow-hidden">
          <ScrollArea>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>#</Table.Th>
                  <Table.Th>Coin</Table.Th>
                  <Table.Th>Price</Table.Th>
                  <Table.Th>24h Change</Table.Th>
                  <Table.Th>24h High</Table.Th>
                  <Table.Th>24h Low</Table.Th>
                  <Table.Th>Volume</Table.Th>
                  <Table.Th>Market Cap</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {MOCK_CRYPTO_DATA.map((crypto, i) => (
                  <Table.Tr key={crypto.id} className="hover:bg-white/5 cursor-pointer transition-colors">
                    <Table.Td>{i + 1}</Table.Td>
                    <Table.Td>
                      <Group gap={2}>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                          {crypto.symbol.charAt(0)}
                        </div>
                        <div>
                          <Text fw={600} size="sm">{crypto.symbol}</Text>
                          <Text size="xs" c="dimmed">{crypto.name}</Text>
                        </div>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Text fw={600}>{formatCurrency(crypto.price)}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        color={crypto.change24h >= 0 ? "green" : "red"}
                        variant="light"
                        size="sm"
                      >
                        {formatPercentage(crypto.changePercent24h)}
                      </Badge>
                    </Table.Td>
                    <Table.Td><Text size="sm">{formatCurrency(crypto.high24h)}</Text></Table.Td>
                    <Table.Td><Text size="sm">{formatCurrency(crypto.low24h)}</Text></Table.Td>
                    <Table.Td><Text size="sm">{formatNumber(crypto.volume24h)}</Text></Table.Td>
                    <Table.Td><Text size="sm">{formatNumber(crypto.marketCap)}</Text></Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-800/30 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <Text fw={700} size="lg" className="gradient-text mb-4">CoinBitX</Text>
              <Text size="sm" c="dimmed">The next generation cryptocurrency trading platform.</Text>
            </div>
            {[
              ["Trade", "/trade"],
              ["Markets", "/markets"],
              ["Wallet", "/wallet"],
              ["Orders", "/orders"],
            ].map(([label, href]) => (
              <div key={label}>
                <Text fw={600} mb={3}>Navigation</Text>
                <a href={href} className="block text-sm text-slate-400 hover:text-white transition-colors mb-2">{label}</a>
              </div>
            ))}
            <div>
              <Text fw={600} mb={3}>Support</Text>
              <a href="#" className="block text-sm text-slate-400 hover:text-white transition-colors mb-2">Help Center</a>
              <a href="#" className="block text-sm text-slate-400 hover:text-white transition-colors mb-2">Contact</a>
              <a href="#" className="block text-sm text-slate-400 hover:text-white transition-colors mb-2">API Docs</a>
            </div>
            <div>
              <Text fw={600} mb={3}>Legal</Text>
              <a href="#" className="block text-sm text-slate-400 hover:text-white transition-colors mb-2">Terms</a>
              <a href="#" className="block text-sm text-slate-400 hover:text-white transition-colors mb-2">Privacy</a>
              <a href="#" className="block text-sm text-slate-400 hover:text-white transition-colors mb-2">Cookies</a>
            </div>
          </div>
          <div className="border-t border-purple-800/30 mt-8 pt-8 flex items-center justify-between">
            <Text size="sm" c="dimmed">© 2025 CoinBitX. All rights reserved.</Text>
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-purple-500" />
              <Shield className="w-5 h-5 text-purple-500" />
              <Shield className="w-5 h-5 text-purple-500" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}