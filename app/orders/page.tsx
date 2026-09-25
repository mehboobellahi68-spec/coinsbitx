"use client";

import { motion } from "framer-motion";
import { Container, Title, Text, Group, Center, Table, ScrollArea, Card, Badge } from "@mantine/core";
import { Clock, CheckCircle, XCircle, Timer } from "lucide-react";

export default function OrdersPage() {
  const orders = [
    { id: "ORD-001", type: "buy", pair: "BTC/USD", price: 103000, amount: 0.1, total: 10300, status: "filled", time: "2025-01-15 14:30" },
    { id: "ORD-002", type: "sell", pair: "ETH/USD", price: 3500, amount: 2, total: 7000, status: "filled", time: "2025-01-15 13:00" },
    { id: "ORD-003", type: "buy", pair: "SOL/USD", price: 180, amount: 10, total: 1800, status: "pending", time: "2025-01-15 15:45" },
    { id: "ORD-004", type: "sell", pair: "BTC/USD", price: 105000, amount: 0.05, total: 5250, status: "cancelled", time: "2025-01-15 10:00" },
  ];

  return (
    <Container size="lg" className="py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <Title order={2}>Orders</Title>
            <Text c="dimmed">Your order history and current orders</Text>
          </div>
        </div>

        <Card withBorder radius="xl" className="glass" style={{ background: "rgba(26, 26, 46, 0.9)", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
          <ScrollArea>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Order ID</Table.Th>
                  <Table.Th>Type</Table.Th>
                  <Table.Th>Pair</Table.Th>
                  <Table.Th>Price</Table.Th>
                  <Table.Th>Amount</Table.Th>
                  <Table.Th>Total</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Time</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {orders.map((order) => (
                  <Table.Tr key={order.id}>
                    <Table.Td><Text fw={600} size="sm">{order.id}</Text></Table.Td>
                    <Table.Td>
                      <Badge color={order.type === "buy" ? "green" : "red"} variant="light">
                        {order.type === "buy" ? "Buy" : "Sell"}
                      </Badge>
                    </Table.Td>
                    <Table.Td><Text size="sm">{order.pair}</Text></Table.Td>
                    <Table.Td><Text>${order.price.toLocaleString()}</Text></Table.Td>
                    <Table.Td><Text>{order.amount}</Text></Table.Td>
                    <Table.Td><Text>${order.total.toLocaleString()}</Text></Table.Td>
                    <Table.Td>
                      {order.status === "filled" ? (
                        <Badge color="green" variant="light"><CheckCircle className="w-3 h-3 inline mr-1" />Filled</Badge>
                      ) : order.status === "pending" ? (
                        <Badge color="yellow" variant="light"><Timer className="w-3 h-3 inline mr-1" />Pending</Badge>
                      ) : (
                        <Badge color="red" variant="light"><XCircle className="w-3 h-3 inline mr-1" />Cancelled</Badge>
                      )}
                    </Table.Td>
                    <Table.Td><Text size="sm" c="dimmed">{order.time}</Text></Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Card>
      </motion.div>
    </Container>
  );
}
