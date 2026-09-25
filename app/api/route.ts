// Next.js 14 doesn't support dynamic API routes the same way
// This file represents the API structure
// The actual API routes are in the route.ts files above

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    message: "CoinBitX API",
    endpoints: {
      auth: "/api/auth",
      admin: "/api/admin",
      markets: "/api/markets",
      orders: "/api/orders",
      wallet: "/api/wallet",
    },
  });
}