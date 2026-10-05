import { PrismaClient } from "@prisma/client";

// Supabase's session pooler (5432) caps at 15 clients and exhausts quickly;
// force the transaction pooler (6543) with a small connection limit no matter
// what DATABASE_URL the host environment provides.
function normalizeDatabaseUrl(raw: string | undefined) {
  if (!raw) return raw;
  try {
    const url = new URL(raw);
    if (url.hostname.endsWith("pooler.supabase.com")) {
      url.port = "6543";
      url.searchParams.set("pgbouncer", "true");
      if (!url.searchParams.has("connection_limit")) {
        url.searchParams.set("connection_limit", "3");
      }
      return url.toString();
    }
  } catch {
    // fall through to the raw value
  }
  return raw;
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({ datasourceUrl: normalizeDatabaseUrl(process.env.DATABASE_URL) });

globalForPrisma.prisma = db;
