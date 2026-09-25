"use client";

import { useAuth } from "../../../context/AuthContext";
import {
  Text,
  Title,
  Group,
  Card,
  Stack,
  Space,
  Button,
  Table,
  ScrollArea,
  Badge,
  Avatar,
  Center,
  Grid,
  Paper,
  Divider,
} from "@mantine/core";
import {
  Users,
  ShoppingCart,
  DollarSign,
  Activity,
  Shield,
  Settings,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Bell,
  Server,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();

  const stats = [
    { label: "Total Users", value: "12,847", change: "+5.2%", icon: Users, color: "brand" },
    { label: "24h Volume", value: "$28.5M", change: "+12.3%", icon: DollarSign, color: "green" },
    { label: "Active Orders", value: "1,423", change: "-2.1%", icon: Activity, color: "cyan" },
    { label: "Revenue", value: "$342K", change: "+8.7%", icon: TrendingUp, color: "violet" },
  ];

  const recentUsers = [
    { id: 1, username: "alice_crypto", email: "alice@example.com", role: "user", status: "active", joined: "2025-01-14" },
    { id: 2, username: "bob_trader", email: "bob@example.com", role: "user", status: "active", joined: "2025-01-13" },
    { id: 3, username: "charlie_99", email: "charlie@example.com", role: "user", status: "suspended", joined: "2025-01-12" },
    { id: 4, username: "diana_x", email: "diana@example.com", role: "moderator", status: "active", joined: "2025-01-11" },
  ];

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Group gap={2}>
              <Title order={2}>Admin Dashboard</Title>
              <Badge color="red" variant="filled">Admin</Badge>
            </Group>
            <Text c="dimmed">Welcome back, {user?.username}</Text>
          </div>
          <Group>
            <Button variant="default" leftSection={<Bell className="w-4 h-4" />}>Notifications</Button>
            <Button variant="default" leftSection={<Settings className="w-4 h-4" />}>Settings</Button>
            <Button variant="default" onClick={logout} leftSection={<XCircle className="w-4 h-4" />} c="red">Logout</Button>
          </Group>
        </div>

        {/* Stats Grid */}
        <Grid gutter="md" mb="xl">
          {stats.map((stat, i) => (
            <Grid.Col span={3} key={i}>
              <Card withBorder radius="xl" className="glass" style={{ background: "rgba(26, 26, 46, 0.9)", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
                <Group justify="space-between">
                  <div>
                    <Text c="dimmed" size="sm">{stat.label}</Text>
                    <Title order={3} className="mt-1">{stat.value}</Title>
                    <Text size="xs" c="green.400">{stat.change}</Text>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-brand-400" />
                  </div>
                </Group>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        <Grid gutter="md">
          {/* Users Table */}
          <Grid.Col span={8}>
            <Card withBorder radius="xl" className="glass" style={{ background: "rgba(26, 26, 46, 0.9)", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
              <Group justify="space-between" mb="md">
                <Title order={4}>Recent Users</Title>
                <Button size="sm" variant="default">View All</Button>
              </Group>
              <ScrollArea>
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>User</Table.Th>
                      <Table.Th>Email</Table.Th>
                      <Table.Th>Role</Table.Th>
                      <Table.Th>Status</Table.Th>
                      <Table.Th>Joined</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {recentUsers.map((u) => (
                      <Table.Tr key={u.id}>
                        <Table.Td>
                          <Group gap={2}>
                            <Avatar size={28} radius="xl" style={{ background: "linear-gradient(135deg, #7c3aed, #22d3ee)" }} />
                            <Text fw={600} size="sm">{u.username}</Text>
                          </Group>
                        </Table.Td>
                        <Table.Td><Text size="sm" c="dimmed">{u.email}</Text></Table.Td>
                        <Table.Td><Badge color={u.role === "admin" ? "red" : u.role === "moderator" ? "brand" : "blue"} variant="light">{u.role}</Badge></Table.Td>
                        <Table.Td>
                          <Badge color={u.status === "active" ? "green" : "orange"} variant="light">
                            {u.status === "active" ? <CheckCircle className="w-3 h-3 inline mr-1" /> : <AlertCircle className="w-3 h-3 inline mr-1" />}
                            {u.status}
                          </Badge>
                        </Table.Td>
                        <Table.Td><Text size="sm" c="dimmed">{u.joined}</Text></Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
            </Card>
          </Grid.Col>

          {/* System Status */}
          <Grid.Col span={4}>
            <Card withBorder radius="xl" className="glass" style={{ background: "rgba(26, 26, 46, 0.9)", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
              <Title order={4} mb="md">System Status</Title>
              <Stack gap="sm">
                {[
                  { icon: <Server className="w-4 h-4 text-green-400" />, label: "API Server", status: "Online" },
                  { icon: <Server className="w-4 h-4 text-green-400" />, label: "Database", status: "Online" },
                  { icon: <Server className="w-4 h-4 text-green-400" />, label: "WebSocket", status: "Connected" },
                  { icon: <Server className="w-4 h-4 text-yellow-400" />, label: "Cache", status: "Degraded" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                    <div className="flex items-center gap-2">{item.icon}<Text size="sm">{item.label}</Text></div>
                    <Badge color={item.status === "Online" || item.status === "Connected" ? "green" : "yellow"} size="sm">{item.status}</Badge>
                  </div>
                ))}
              </Stack>

              <Divider my="md" />
              <Title order={5} mb="md">Quick Actions</Title>
              <Stack gap="sm">
                {["Manage Users", "View Orders", "Check Fees", "System Logs", "API Settings"].map((action) => (
                  <Button key={action} variant="default" size="sm" leftSection={<Settings className="w-4 h-4" />} fullWidth>
                    {action}
                  </Button>
                ))}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </motion.div>
    </div>
  );
}