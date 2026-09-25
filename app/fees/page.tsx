"use client";

import { motion } from "framer-motion";
import { Container, Title, Text, Group, Center, Table, ScrollArea, Card, Stack, TextInput, Select, Button } from "@mantine/core";
import { FileText, Calculator, Clock, TrendingUp } from "lucide-react";

export default function FeesPage() {
  return (
    <Container size="lg" className="py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <Title order={2}>Fees</Title>
            <Text c="dimmed">Transparent fee structure</Text>
          </div>
        </div>

        <Card withBorder radius="xl" className="glass" style={{ background: "rgba(26, 26, 46, 0.9)", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
          <Title order={4} mb="md">Trading Fees</Title>
          <ScrollArea>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Volume (30d)</Table.Th>
                  <Table.Th>Maker Fee</Table.Th>
                  <Table.Th>Taker Fee</Table.Th>
                  <Table.Th>Discount (VIP)</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {[
                  { volume: "< $10K", maker: "0.10%", taker: "0.15%", vip: "-" },
                  { volume: "$10K - $50K", maker: "0.08%", taker: "0.12%", vip: "-5%" },
                  { volume: "$50K - $250K", maker: "0.06%", taker: "0.10%", vip: "-10%" },
                  { volume: "$250K - $1M", maker: "0.04%", taker: "0.08%", vip: "-15%" },
                  { volume: "$1M - $5M", maker: "0.02%", taker: "0.06%", vip: "-20%" },
                  { volume: "> $5M", maker: "0.00%", taker: "0.04%", vip: "-25%" },
                ].map((tier, i) => (
                  <Table.Tr key={i} className="hover:bg-white/5">
                    <Table.Td><Text size="sm">{tier.volume}</Text></Table.Td>
                    <Table.Td><Text c="green.400">{tier.maker}</Text></Table.Td>
                    <Table.Td><Text c="red.400">{tier.taker}</Text></Table.Td>
                    <Table.Td><Text>{tier.vip}</Text></Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card withBorder radius="xl" className="glass" style={{ background: "rgba(26, 26, 46, 0.9)", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
            <Clock className="w-8 h-8 text-brand-400 mb-3" />
            <Title order={5}>Deposit Fees</Title>
            <Text size="sm" c="dimmed">Free for all cryptocurrency deposits</Text>
            <Text size="sm" c="dimmed">Bank transfers: 0.5% (min $5)</Text>
          </Card>
          <Card withBorder radius="xl" className="glass" style={{ background: "rgba(26, 26, 46, 0.9)", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
            <Calculator className="w-8 h-8 text-brand-400 mb-3" />
            <Title order={5}>Withdrawal Fees</Title>
            <Text size="sm" c="dimmed">Varies by cryptocurrency</Text>
            <Text size="sm" c="dimmed">Network fees included</Text>
          </Card>
          <Card withBorder radius="xl" className="glass" style={{ background: "rgba(26, 26, 46, 0.9)", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
            <TrendingUp className="w-8 h-8 text-brand-400 mb-3" />
            <Title order={5}>Fee Discounts</Title>
            <Text size="sm" c="dimmed">Hold CBBX token for up to 50% off</Text>
            <Text size="sm" c="dimmed">VIP tiers available</Text>
          </Card>
        </div>
      </motion.div>
    </Container>
  );
}