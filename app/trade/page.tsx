"use client";

import { useState } from "react";
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
  TextInput,
  NumberInput,
  Select,
  Slider,
} from "@mantine/core";
import {
  ChartLine,
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeftRight,
  TrendingUp,
  Book,
  Settings2,
  Search,
  Filter,
  Plus,
} from "lucide-react";
import { formatCurrency, formatNumber, formatPercentage, getChangeColor } from "../../lib/utils";
import { MOCK_ORDERBOOK_DATA } from "../../lib/data";
import { motion } from "framer-motion";

export default function TradePage() {
  const { isAuthenticated } = useAuth();
  const { wallet } = useCoinBitXStore();
  const [tab, setTab] = useState("exchange");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("103456.78");
  const [pair, setPair] = useState("BTC/USD");

  if (!isAuthenticated) {
    return (
      <Container size="lg" className="flex items-center justify-center min-h-screen">
        <Card withBorder radius="xl" p="xl" className="glass" style={{ background: "rgba(26, 26, 46, 0.9)", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
          <Center>
            <Stack align="center">
              <ChartLine className="w-12 h-12 text-brand-400" />
              <Title order={3}>Authentication Required</Title>
              <Text c="dimmed" ta="center">Please sign in to start trading</Text>
            </Stack>
          </Center>
        </Card>
      </Container>
    );
  }

  return (
    <Container size="lg" className="py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Title order={2}>Trade</Title>
            <Text c="dimmed">Buy and sell cryptocurrencies</Text>
          </div>
          <Group>
            <TextInput placeholder="Search..." leftSection={<Search className="w-4 h-4" />} w={200} size="sm" />
            <Button variant="default" size="sm" leftSection={<Filter className="w-4 h-4" />}>
              Filters
            </Button>
          </Group>
        </div>

        <Tabs value={tab} onChange={(v) => setTab(v!)} mb="xl">
          <Tabs.List>
            <Tabs.Tab value="exchange">Exchange</Tabs.Tab>
            <Tabs.Tab value="buy">Buy Crypto</Tabs.Tab>
            <Tabs.Tab value="sell">Sell Crypto</Tabs.Tab>
            <Tabs.Tab value="convert">Convert</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Area */}
          <div className="lg:col-span-2 space-y-4">
            {/* Price Chart */}
            <Card withBorder radius="xl" className="trading-chart" style={{ background: "rgba(124, 58, 237, 0.05)", border: "1px solid rgba(124, 58, 237, 0.2)" }}>
              <Group justify="space-between" mb="sm">
                <div>
                  <Text fw={700} size="xl">{pair}</Text>
                  <Text c="dimmed" size="sm">Bitcoin / US Dollar</Text>
                </div>
                <div className="text-right">
                  <Text fw={700} size="xl">$103,456.78</Text>
                  <Text c="green.400" size="sm">+2.43% (24h)</Text>
                </div>
              </Group>
              <div className="h-80 flex items-center justify-center">
                <svg className="w-full h-full p-4" viewBox="0 0 800 300" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,200 L50,180 L100,190 L150,170 L200,175 L250,160 L300,155 L350,165 L400,150 L450,145 L500,140 L550,148 L600,135 L650,130 L700,125 L750,128 L800,120 L800,300 L0,300 Z" fill="url(#chartGrad2)" />
                  <path d="M0,200 L50,180 L100,190 L150,170 L200,175 L250,160 L300,155 L350,165 L400,150 L450,145 L500,140 L550,148 L600,135 L650,130 L700,125 L750,128 L800,120" fill="none" stroke="#7c3aed" strokeWidth="2" />
                </svg>
              </div>
            </Card>

            {/* Order Book */}
            <Card withBorder radius="xl" className="glass" style={{ background: "rgba(26, 26, 46, 0.9)", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
              <Group justify="space-between" mb="md">
                <Title order={4}>Order Book</Title>
                <Group gap={4}>
                  <Badge color="green" variant="light">Bid</Badge>
                  <Badge color="red" variant="light">Ask</Badge>
                </Group>
              </Group>
              <ScrollArea h={200}>
                <Table>
                  <Table.Tbody>
                    {MOCK_ORDERBOOK_DATA.asks.map((ask, i) => (
                      <Table.Tr key={`ask-${i}`} className="order-book-row">
                        <Table.Td><Text c="red.400">{formatCurrency(ask.price)}</Text></Table.Td>
                        <Table.Td><Text>{formatNumber(ask.amount)}</Text></Table.Td>
                        <Table.Td><Text>{formatCurrency(ask.total)}</Text></Table.Td>
                        <Table.Td>
                          <div className="w-full bg-red-500/10 rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(ask.total / 240000) * 100}%` }} />
                          </div>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                    <Table.Tr className="bg-brand-500/10">
                      <Table.Td colSpan={4} className="text-center py-2">
                        <Text fw={700} c="brand.4">Spread: $10.00 (0.01%)</Text>
                      </Table.Td>
                    </Table.Tr>
                    {MOCK_ORDERBOOK_DATA.bids.map((bid, i) => (
                      <Table.Tr key={`bid-${i}`} className="order-book-row">
                        <Table.Td><Text c="green.400">{formatCurrency(bid.price)}</Text></Table.Td>
                        <Table.Td><Text>{formatNumber(bid.amount)}</Text></Table.Td>
                        <Table.Td><Text>{formatCurrency(bid.total)}</Text></Table.Td>
                        <Table.Td>
                          <div className="w-full bg-green-500/10 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(bid.total / 240000) * 100}%` }} />
                          </div>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
            </Card>
          </div>

          {/* Trade Panel */}
          <div className="space-y-4">
            <Card withBorder radius="xl" className="glass" style={{ background: "rgba(26, 26, 46, 0.9)", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
              <Group justify="space-between" mb="md">
                <Title order={4}>Order Panel</Title>
                <Group gap={2}>
                  <Button size="xs" variant="default" className="tab-active" onClick={() => setTab("exchange")}>Buy</Button>
                  <Button size="xs" variant="default" onClick={() => setTab("exchange")}>Sell</Button>
                </Group>
              </Group>

              <Stack gap="sm">
                <div>
                  <Text size="sm" c="dimmed" mb={2}>Trading Pair</Text>
                  <Select data={["BTC/USD", "ETH/USD", "SOL/USD", "BNB/USD", "XRP/USD"]} value={pair} onChange={(v) => setPair(v!)} size="sm" />
                </div>

                <div>
                  <Text size="sm" c="dimmed" mb={2}>Price</Text>
                  <TextInput value={price} onChange={(e) => setPrice(e.target.value)} size="sm" rightSection={<Text component="span" size="sm">USD</Text>} />
                </div>

                <div>
                  <Text size="sm" c="dimmed" mb={2}>Amount</Text>
                  <NumberInput value={amount} onChange={(v) => setAmount(v?.toString() || "")} size="sm" placeholder="0.0000" min={0} step={0.0001} />
                </div>

                <div>
                  <Text size="sm" c="dimmed" mb={2}>Total</Text>
                  <Text fw={600} size="lg">
                    {amount ? formatCurrency(parseFloat(amount) * parseFloat(price || "0")) : "$0.00"}
                  </Text>
                </div>

                <div>
                  <Text size="sm" c="dimmed" mb={2}>Fee: 0.10%</Text>
                  <Text size="sm">~${amount ? (parseFloat(amount) * parseFloat(price || "0") * 0.001).toFixed(2) : "0.00"}</Text>
                </div>

                <Space h="sm" />

                <Button
                  variant="gradient"
                  gradient={{ from: "green", to: "emerald", deg: 90 }}
                  size="lg"
                  fullWidth
                  radius="md"
                >
                  <ArrowUpRight className="w-5 h-5 mr-2" />
                  Buy BTC
                </Button>

                <Button
                  variant="gradient"
                  gradient={{ from: "red", to: "orange", deg: 90 }}
                  size="lg"
                  fullWidth
                  radius="md"
                >
                  <ArrowDownRight className="w-5 h-5 mr-2" />
                  Sell BTC
                </Button>
              </Stack>
            </Card>

            {/* Quick Percentages */}
            <Card withBorder radius="xl" className="glass" style={{ background: "rgba(26, 26, 46, 0.9)", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
              <Text fw={600} mb="sm">Available Balance</Text>
              <Text fw={700} size="lg" mb="md">{formatCurrency(wallet.balance)}</Text>
              <div className="grid grid-cols-4 gap-2">
                {[25, 50, 75, 100].map((pct) => (
                  <button key={pct} className="p-2 rounded-lg bg-white/5 hover:bg-brand-500/20 text-xs font-medium transition-colors text-center">
                    {pct}%
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </Container>
  );
}