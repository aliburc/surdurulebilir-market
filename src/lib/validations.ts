import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const quoteRequestSchema = z.object({
  catalogItemId: z.string().min(1),
  type: z.enum(["QUOTE", "SAMPLE"]),
  quantity: z.coerce.number().int().positive(),
  message: z.string().max(1000).optional(),
});

export const requestStatusUpdateSchema = z.object({
  requestId: z.string().min(1),
  status: z.enum(["PENDING", "RESPONDED", "ACCEPTED", "DECLINED"]),
});

export const supplierRegisterSchema = z.object({
  companyName: z.string().min(2).max(120),
  city: z.string().min(2).max(60),
  region: z.string().min(2).max(60),
  description: z.string().min(10).max(600),
  contactName: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8, "Şifre en az 8 karakter olmalı"),
});

export const CATALOG_CATEGORIES = [
  "Karton Kutu",
  "Cam Şişe / Kavanoz",
  "Kağıt Poşet",
  "Biyobozunur Plastik Film",
  "Geri Dönüştürülmüş PET Şişe",
  "Mantar Tıpa",
  "Dolgu Malzemesi",
  "Bambu Ambalaj",
] as const;

export const catalogItemCreateSchema = z.object({
  name: z.string().min(3).max(120),
  category: z.enum(CATALOG_CATEGORIES),
  material: z.string().min(2).max(120),
  dimensions: z.string().min(1).max(60),
  minOrderQuantity: z.coerce.number().int().positive(),
  leadTimeDays: z.coerce.number().int().positive(),
  unitPriceMinTRY: z.coerce.number().positive().optional(),
  unitPriceMaxTRY: z.coerce.number().positive().optional(),
  recycledContentPercent: z.coerce.number().int().min(0).max(100).optional(),
  sustainabilityTags: z.string().min(2).max(200),
  description: z.string().min(10).max(600),
});
