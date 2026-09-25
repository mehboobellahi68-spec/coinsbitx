"use client";

import { useAuth } from "../../context/AuthContext";
import { useCoinBitXStore } from "../../lib/store";
import {
  Text,
  Title,
  Group,
  Card,
  Stack,
  Container,
  Space,
  Button,
  Tabs,
  Table,
  Badge,
  ScrollArea,
  Paper,
  Center,
  rem,
} from "@mantine/core";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeftRight,
  TrendingUp,
  History,
  Settings2,
  CreditCard,
  Plus,
  Send,
  
  RefreshCw,
  Shield,
  Key,
} from "lucide-react";
import { formatCurrency, formatNumber, formatPercentage, getChangeColor } from "../../lib/utils";
import { motion } from "framer-motion";

export default function WalletPage() {
  const { isAuthenticated } = useAuth();
  const { wallet, cryptoBalance } = useCoinBitXStore();

  if (!isAuthenticated) {
    return (
      <Container size="md" className="flex items-center justify-center min-h-screen">
        <Card withBorder radius="xl" p="xl" className="glass" style={{ background: "rgba(26, 26, 46, 0.9)", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
          <Center>
            <Stack align="center">
              <Wallet className="w-12 h-12 text-brand-400" />
              <Title order={3}>Authentication Required</Title>
              <Text c="dimmed" ta="center">Please sign in to access your wallet</Text>
            </Stack>
          </Center>
        </Card>
      </Container>
    );
  }

  const coins = [
    { symbol: "BTC", name: "Bitcoin", amount: cryptoBalance.BTC || 0, price: 103456.78, icon: "₿" },
    { symbol: "ETH", name: "Ethereum", amount: cryptoBalance.ETH || 0, price: 3456.23, icon: "Ξ" },
    { symbol: "SOL", name: "Solana", amount: cryptoBalance.SOL || 0, price: 178.45, icon: "◎" },
    { symbol: "BNB", name: "BNB", amount: 0, price: 654.32, icon: "BN" },
    { symbol: "XRP", name: "XRP", amount: 0, price: 2.45, icon: "✕" },
  ];

  return (
    <Container size="lg" className="py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Title order={2}>Wallet</Title>
            <Text c="dimmed">Manage your crypto assets</Text>
          </div>
          <Group>
            <Button variant="default" leftSection={<RefreshCw className="w-4 h-4" />}>
              Refresh
            </Button>
            <Button variant="default" leftSection={<Settings2 className="w-4 h-4" />}>
              Settings
            </Button>
          </Group>
        </div>

        {/* Balance Card */}
        <Card withBorder radius="xl" p="xl" mb="xl" className="glow-border" style={{ background: "linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(34, 211, 238, 0.05) 100%)", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
          <Group justify="space-between">
            <div>
              <Text c="dimmed" size="sm">Total Balance</Text>
              <Title order={1} className="gradient-text mt-1">
                {formatCurrency(wallet.balance)}
              </Title>
            </div>
            <div className="text-right">
              <Text c="dimmed" size="sm">Crypto Value</Text>
              <Title order={3} className="mt-1">$15,842.30</Title>
              <Badge color="green" variant="light">+3.2%</Badge>
            </div>
          </Group>
          <Space h="md" />
          <Group>
            {[
              { icon: <Plus className="w-5 h-5" />, label: "Buy", color: "green" },
              { icon: <Send className="w-5 h-5" />, label: "Send", color: "brand" },
              { icon: <ArrowDownRight className="w-5 h-5" />, label: "Receive", color: "cyan" },
              { icon: <ArrowLeftRight className="w-5 h-5" />, label: "Swap", color: "violet" },
            ].map((action) => (
              <button key={action.label} className="flex-1 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center">
                <Center className="mb-2">{action.icon}</Center>
                <Text size="sm" fw={600}>{action.label}</Text>
              </button>
            ))}
          </Group>
        </Card>

        {/* Holdings Table */}
        <Card withBorder radius="xl" className="glass" style={{ background: "rgba(26, 26, 46, 0.9)", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
          <Group justify="space-between" mb="md">
            <Title order={4}>Holdings</Title>
            <Tabs defaultValue="all" size="sm">
              <Tabs.List>
                <Tabs.Tab value="all">All</Tabs.Tab>
                <Tabs.Tab value="crypto">Crypto</Tabs.Tab>
                <Tabs.Tab value="fiat">Fiat</Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Group>

          <ScrollArea>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Asset</Table.Th>
                  <Table.Th>Balance</Table.Th>
                  <Table.Th>Price</Table.Th>
                  <Table.Th>Value</Table.Th>
                  <Table.Th>24h Change</Table.Th>
                  <Table.Th>P&L</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {coins.map((coin) => (
                  <Table.Tr key={coin.symbol} className="hover:bg-white/5 cursor-pointer transition-colors">
                    <Table.Td>
                      <Group gap={2}>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                          {coin.icon}
                        </div>
                        <div>
                          <Text fw={600} size="sm">{coin.symbol}</Text>
                          <Text size="xs" c="dimmed">{coin.name}</Text>
                        </div>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Text fw={600}>{coin.amount.toFixed(coin.amount < 1 ? 6 : 4)}</Text>
                    </Table.Td>
                    <Table.Td><Text>{formatCurrency(coin.price)}</Text></Table.Td>
                    <Table.Td><Text fw={600}>{formatCurrency(coin.amount * coin.price)}</Text></Table.Td>
                    <Table.Td>
                      <Badge color="green" variant="light">+2.1%</Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text c="green.400" fw={600}>+$245.30</Text>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Card>

        {/* Transaction History */}
        <Card withBorder radius="xl" mt="xl" className="glass" style={{ background: "rgba(26, 26, 46, 0.9)", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
          <Group justify="space-between" mb="md">
            <Title order={4}>Recent Transactions</Title>
            <Button variant="subtle" size="sm" rightSection={<History className="w-4 h-4" />}>
              View All
            </Button>
          </Group>
          <Stack gap={0}>
            {[
              { type: "received", coin: "BTC", amount: "0.05", value: "$5,172.84", time: "2 min ago" },
              { type: "sent", coin: "ETH", amount: "1.2", value: "-$4,147.48", time: "1 hr ago" },
              { type: "trade", coin: "SOL", amount: "10", value: "+$178.45", time: "3 hrs ago" },
            ].map((tx, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-purple-800/20 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === "received" ? "bg-green-500/20" : tx.type === "sent" ? "bg-red-500/20" : "bg-brand-500/20"}`}>
                    {tx.type === "received" ? <ArrowDownRight className="w-5 h-5 text-green-400" /> : tx.type === "sent" ? <ArrowUpRight className="w-5 h-5 text-red-400" /> : <TrendingUp className="w-5 h-5 text-brand-400" />}
                  </div>
                  <div>
                    <Text fw={600} size="sm">{tx.type === "received" ? "Received" : tx.type === "sent" ? "Sent" : "Trade"} {tx.coin}</Text>
                    <Text size="xs" c="dimmed">{tx.time}</Text>
                  </div>
                </div>
                <Text fw={600} c={tx.type === "sent" ? "red.400" : "green.400"}>
                  {tx.value}
                </Text>
              </div>
            ))}
          </Stack>
        </Card>
      </motion.div>
    </Container>
  );
}