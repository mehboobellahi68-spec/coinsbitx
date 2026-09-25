"use client";

import { motion } from "framer-motion";
import { Container, Title, Text, Group, Card, Stack, Button, Avatar, Space, Badge, Center } from "@mantine/core";
import {
  User,
  Mail,
  Shield,
  Key,
  Calendar,
  Settings,
  Bell,
  Wallet,
  Globe,
  Moon,
  Sun,
  Edit,
  Trash,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <Container size="lg" className="py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Title order={2} mb="xl">Profile</Title>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card withBorder radius="xl" className="glass" style={{ background: "rgba(26, 26, 46, 0.9)", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
            <Center>
              <Avatar size={80} radius="xl" style={{ background: "linear-gradient(135deg, #7c3aed 0%, #22d3ee 100%)" }}>
                <User size={40} />
              </Avatar>
            </Center>
            <Center>
              <Title order={3} mt="sm">John Doe</Title>
            </Center>
            <Center>
              <Text c="dimmed" size="sm">john@example.com</Text>
            </Center>
            <Center>
              <Badge color="green" variant="light" size="sm" mt="xs">
                <Shield className="w-3 h-3 inline mr-1" />Verified
              </Badge>
            </Center>

            <Space h="md" />

            <Stack gap={0}>
              {[
                { icon: <Calendar className="w-4 h-4" />, label: "Member Since", value: "March 15, 2024" },
                { icon: <Globe className="w-4 h-4" />, label: "Region", value: "United States" },
                { icon: <Wallet className="w-4 h-4" />, label: "Level", value: "Gold Trader" },
                { icon: <Bell className="w-4 h-4" />, label: "24h Trades", value: "12" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-purple-800/20 last:border-0">
                  <div className="flex items-center gap-2 text-slate-400">{item.icon}<Text size="sm">{item.label}</Text></div>
                  <Text size="sm" fw={600}>{item.value}</Text>
                </div>
              ))}
            </Stack>
          </Card>

          {/* Settings */}
          <div className="lg:col-span-2 space-y-4">
            <Card withBorder radius="xl" className="glass" style={{ background: "rgba(26, 26, 46, 0.9)", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
              <Group justify="space-between" mb="md">
                <Title order={4}>Account Settings</Title>
                <Button variant="default" size="sm" leftSection={<Edit className="w-4 h-4" />}>Edit Profile</Button>
              </Group>
              <Stack gap="md">
                {[
                  { icon: <User className="w-4 h-4" />, label: "Full Name", value: "John Doe" },
                  { icon: <Mail className="w-4 h-4" />, label: "Email", value: "john@example.com" },
                  { icon: <Key className="w-4 h-4" />, label: "Two-Factor Auth", value: "Enabled" },
                  { icon: <Shield className="w-4 h-4" />, label: "API Access", value: "Restricted" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-purple-800/20 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400">{item.icon}</div>
                      <div>
                        <Text size="sm" fw={600}>{item.label}</Text>
                        <Text size="xs" c="dimmed">{item.value}</Text>
                      </div>
                    </div>
                  </div>
                ))}
              </Stack>
            </Card>

            <Card withBorder radius="xl" className="glass" style={{ background: "rgba(26, 26, 46, 0.9)", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
              <Title order={4} mb="md">Security</Title>
              <Stack gap="sm">
                {["Change Password", "Enable 2FA", "Manage API Keys", "Login History"].map((item) => (
                  <button key={item} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <Text size="sm">{item}</Text>
                    <Text size="sm" c="dimmed">→</Text>
                  </button>
                ))}
              </Stack>
            </Card>
          </div>
        </div>
      </motion.div>
    </Container>
  );
}