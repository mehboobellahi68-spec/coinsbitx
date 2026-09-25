// not-found.tsx - Custom 404 page
import { Button, Center, Container, Title, Text } from "@mantine/core";
import { Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container size="md" className="flex items-center justify-center min-h-screen">
      <Center>
        <div className="text-center">
          <Title order={1} className="gradient-text" size={100}>404</Title>
          <Title order={3} mt="sm">Page Not Found</Title>
          <Text c="dimmed" mt="md">The page you're looking for doesn't exist or has been moved.</Text>
          <Link href="/">
            <Button variant="gradient" gradient={{ from: "violet", to: "cyan", deg: 90 }} mt="xl" leftSection={<Home className="w-4 h-4" />}>
              Go Home
            </Button>
          </Link>
        </div>
      </Center>
    </Container>
  );
}