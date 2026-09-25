"use client";

import { motion } from "framer-motion";
import { Container, Title, Text, Group, Center, Card, Button } from "@mantine/core";
import { ChartLine, TrendingUp, Zap } from "lucide-react";

export default function MarketsPage() {
  return (
    <Container size="lg" className="py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <Title order={2}>Markets</Title>
            <Text c="dimmed">Browse all cryptocurrency markets</Text>
          </div>
          <div className="flex items-center gap-2 glass rounded-lg px-4 py-2">
            <Zap className="w-4 h-4 text-brand-400" />
            <Text size="sm" fw={600}>Live</Text>
            <span className="pulse-dot" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card withBorder radius="xl" className="glass card-glow" style={{ background: "rgba(26, 26, 46, 0.9)", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
                <Group justify="space-between" mb="md">
                  <Group gap={3}>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-xl font-bold">
                      {["₿", "Ξ", "◎", "BN", "✕", "₳"][i - 1]}
                    </div>
                    <div>
                      <Text fw={700}>BTC</Text>
                      <Text size="sm" c="dimmed">Bitcoin</Text>
                    </div>
                  </Group>
                  <Text c="green.400" fw={600}>+2.43%</Text>
                </Group>
                <div className="trading-chart h-32 mb-4 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
                    <path d="M0,50 L20,45 L40,48 L60,40 L80,42 L100,35 L120,38 L140,30 L160,32 L180,25 L200,22" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
                    <path d="M0,50 L20,45 L40,48 L60,40 L80,42 L100,35 L120,38 L140,30 L160,32 L180,25 L200,22 L200,60 L0,60 Z" fill="rgba(124,58,237,0.1)" />
                  </svg>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Text fw={700} size="lg">$103,456.78</Text>
                    <Text size="sm" c="dimmed">Vol: $28.5B</Text>
                  </div>
                  <Button variant="gradient" gradient={{ from: "violet", to: "cyan", deg: 90 }} size="sm" radius="md">
                    Trade
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Container>
  );
}