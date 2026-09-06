import { MetadataRoute } from "next"
import { getBaseURL } from "@lib/util/env"

export const revalidate = 3600

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

const STATIC_PATHS: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "daily" },
  { path: "/store", priority: 0.8, changeFrequency: "daily" },
  { path: "/categories/games", priority: 0.9, changeFrequency: "daily" },
  { path: "/preorders", priority: 0.8, changeFrequency: "daily" },
  { path: "/gift-cards", priority: 0.8, changeFrequency: "weekly" },
  { path: "/ps-plus", priority: 0.8, changeFrequency: "weekly" },
  { path: "/playstation", priority: 0.6, changeFrequency: "weekly" },
  { path: "/shared-accounts", priority: 0.6, changeFrequency: "weekly" },
  { path: "/ps4-games", priority: 0.6, changeFrequency: "weekly" },
  { path: "/ps5-games", priority: 0.6, changeFrequency: "weekly" },
  { path: "/buying-guide", priority: 0.4, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.4, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.3, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
]

type SitemapProduct = {
  handle: string
  updated_at?: string
}

async function fetchAllProducts(): Promise<SitemapProduct[]> {
  if (!BACKEND_URL || !PUBLISHABLE_KEY) {
    return []
  }

  try {
    const response = await fetch(
      `${BACKEND_URL}/store/products?limit=1000&fields=handle,updated_at`,
      {
        headers: { "x-publishable-api-key": PUBLISHABLE_KEY },
        next: { revalidate: 3600 },
      }
    )

    if (!response.ok) {
      return []
    }

    const { products } = (await response.json()) as { products: SitemapProduct[] }
    return products.filter((p) => p.handle)
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseURL()

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    changeFrequency,
    priority,
  }))

  const products = await fetchAllProducts()

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.handle}`,
    lastModified: product.updated_at ? new Date(product.updated_at) : undefined,
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  return [...staticEntries, ...productEntries]
}
