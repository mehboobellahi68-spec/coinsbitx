"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import {
  Text,
  Title,
  Group,
  Button,
  PasswordInput,
  TextInput,
  Card,
  Anchor,
  Checkbox,
  Space,
  Center,
  Container,
  Stack,
} from "@mantine/core";
import {
  LogIn,
  Shield,
  Mail,
  User as UserIcon,
  Lock,
  ArrowRight,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(username, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg grid-pattern flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Center>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500 to-cyan-400 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <Title order={2} className="gradient-text">CoinBitX</Title>
          </div>
        </Center>

        <Card
          withBorder
          radius="xl"
          p="xl"
          className="glass"
          style={{
            background: "rgba(26, 26, 46, 0.9)",
            border: "1px solid rgba(124, 58, 237, 0.3)",
            maxWidth: 400,
            margin: "0 auto",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <Center>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-4">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
              </Center>

              <Title order={3} ta="center" c="white">
                Welcome Back
              </Title>
              <Text ta="center" c="dimmed" size="sm">
                Sign in to your CoinBitX account
              </Text>

              {error && (
                <Text ta="center" c="red.400" size="sm">
                  {error}
                </Text>
              )}

              <TextInput
                label="Username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                leftSection={<UserIcon className="w-4 h-4" />}
                size="md"
              />

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                leftSection={<Lock className="w-4 h-4" />}
                size="md"
              />

              <Group justify="space-between">
                <Checkbox label="Remember me" />
                <Anchor component="button" size="sm" c="brand.4">
                  Forgot password?
                </Anchor>
              </Group>

              <Button
                type="submit"
                loading={loading}
                variant="gradient"
                gradient={{ from: "violet", to: "cyan", deg: 90 }}
                size="lg"
                fullWidth
                radius="md"
              >
                Sign In
              </Button>

              <Text ta="center" size="sm" c="dimmed">
                Don't have an account?{" "}
                <Anchor
                  component="button"
                  onClick={() => router.push("/register")}
                  c="brand.4"
                >
                  Create one
                </Anchor>
              </Text>

              <Space h="sm" />

              <Button
                variant="default"
                size="md"
                fullWidth
                radius="md"
                leftSection={<Shield className="w-4 h-4" />}
                c="dimmed"
              >
                Continue with Google
              </Button>
            </Stack>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}