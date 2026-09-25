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
  Stack,
  Center,
  Container,
} from "@mantine/core";
import {
  UserPlus,
  Shield,
  Mail,
  User as UserIcon,
  Lock,
  Zap,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await register(username, email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Registration failed");
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
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center mb-4">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
              </Center>

              <Title order={3} ta="center" c="white">
                Create Account
              </Title>
              <Text ta="center" c="dimmed" size="sm">
                Join CoinBitX and start trading
              </Text>

              {error && (
                <Text ta="center" c="red.400" size="sm">
                  {error}
                </Text>
              )}

              <TextInput
                label="Username"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                leftSection={<UserIcon className="w-4 h-4" />}
              />

              <TextInput
                label="Email"
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                leftSection={<Mail className="w-4 h-4" />}
              />

              <PasswordInput
                label="Password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                leftSection={<Lock className="w-4 h-4" />}
              />

              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                leftSection={<Lock className="w-4 h-4" />}
              />

              <Button
                type="submit"
                loading={loading}
                variant="gradient"
                gradient={{ from: "violet", to: "cyan", deg: 90 }}
                size="lg"
                fullWidth
                radius="md"
              >
                Create Account
              </Button>

              <Text ta="center" size="sm" c="dimmed">
                Already have an account?{" "}
                <Anchor
                  component="button"
                  onClick={() => router.push("/login")}
                  c="brand.4"
                >
                  Sign in
                </Anchor>
              </Text>

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