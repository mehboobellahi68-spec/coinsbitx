"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import {
  Text,
  Title,
  Group,
  Button,
  PasswordInput,
  TextInput,
  Card,
  Anchor,
  Space,
  Center,
  Container,
  Stack,
  Badge,
} from "@mantine/core";
import {
  LogIn,
  Shield,
  Mail,
  User as UserIcon,
  Lock,
  ArrowRight,
  Zap,
  Crown,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg grid-pattern flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Center className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500 to-cyan-400 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <Title order={2} className="gradient-text">CoinBitX</Title>
            <Crown className="w-6 h-6 text-yellow-500" />
          </div>
        </Center>

        <Card
          withBorder
          radius="xl"
          p="xl"
          className="glass"
          style={{ background: "rgba(26, 26, 46, 0.9)", border: "1px solid rgba(124, 58, 237, 0.3)", maxWidth: 400, margin: "0 auto" }}
        >
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <Center>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </Center>

              <Title order={3} ta="center" c="white">Admin Panel</Title>
              <Text ta="center" c="dimmed" size="sm">Sign in with your admin credentials</Text>

              {error && <Text ta="center" c="red.400" size="sm">{error}</Text>}

              <TextInput label="Username" placeholder="admin" value={username} onChange={(e) => setUsername(e.target.value)} required leftSection={<UserIcon className="w-4 h-4" />} />
              <PasswordInput label="Password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} required leftSection={<Lock className="w-4 h-4" />} />

              <Button type="submit" loading={loading} variant="gradient" gradient={{ from: "violet", to: "cyan", deg: 90 }} size="lg" fullWidth radius="md">Sign In</Button>

              <Group justify="center">
                <Badge color="red" variant="light" size="sm"><Lock className="w-3 h-3 inline mr-1" />Authorized personnel only</Badge>
              </Group>
            </Stack>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}