export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    data: [
      { id: "BTC", symbol: "BTC", name: "Bitcoin", price: 103456.78, change24h: 2.43 },
      { id: "ETH", symbol: "ETH", name: "Ethereum", price: 3456.23, change24h: -0.04 },
      { id: "SOL", symbol: "SOL", name: "Solana", price: 178.45, change24h: 3.28 },
      { id: "BNB", symbol: "BNB", name: "BNB", price: 654.32, change24h: 0.17 },
    ],
    timestamp: new Date().toISOString(),
  });
}