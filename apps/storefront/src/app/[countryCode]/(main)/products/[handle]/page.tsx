import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion, listRegions } from "@lib/data/regions"
import ProductTemplate from "@modules/products/templates"
import { HttpTypes } from "@medusajs/types"

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
  searchParams: Promise<{ v_id?: string }>
}

const PRODUCT_DETAIL_FIELDS =
  "*variants.calculated_price,+variants.inventory_quantity,*variants.images,*variants.options,*variants.options.option,+metadata,+tags,*categories,*options.values,*images"

export async function generateStaticParams() {
  try {
    const countryCodes = await listRegions().then((regions) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    )

    if (!countryCodes) {
      return []
    }

    const promises = countryCodes.map(async (country) => {
      const { response } = await listProducts({
        countryCode: country,
        queryParams: { limit: 100, fields: "handle" },
      })

      return {
        country,
        products: response.products,
      }
    })

    const countryProducts = await Promise.all(promises)

    return countryProducts
      .flatMap((countryData) =>
        countryData.products.map((product) => ({
          countryCode: countryData.country,
          handle: product.handle,
        }))
      )
      // Next.js mis-encodes non-ASCII handles (e.g. "ragnarök") when baking
      // them into a static page at build time: the literal percent-escaped
      // string ends up as params.handle instead of the decoded character,
      // so the prerendered page permanently 404s. Skip static generation
      // for these handles — they still work fine, they just render on
      // demand instead, where Next's normal request-URL decoding is used.
      .filter((param) => param.handle && /^[\x00-\x7F]*$/.test(param.handle))
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${
        error instanceof Error ? error.message : "Unknown error"
      }.`
    )
    return []
  }
}

// Non-ASCII dynamic segments (e.g. "ragnarök") arrive at this route with
// literal percent-escapes still in params.handle instead of being decoded
// by Next.js — this happens specifically for requests that reach here via
// the middleware's internal rewrite (see middleware.ts), which bypasses
// the normal incoming-request URL decoding. Decoding here is a no-op for
// already-correct handles (nothing to unescape) and fixes the mis-encoded
// ones either way.
function decodeHandle(handle: string): string {
  try {
    return decodeURIComponent(handle)
  } catch {
    return handle
  }
}

function getImagesForVariant(
  product: HttpTypes.StoreProduct,
  selectedVariantId?: string
) {
  if (!selectedVariantId || !product.variants) {
    return product.images
  }

  const variant = product.variants!.find((v) => v.id === selectedVariantId)
  if (!variant || !variant.images?.length) {
    return product.images
  }

  const imageIdsMap = new Map(variant.images!.map((i) => [i.id, true]))
  return product.images?.filter((i) => imageIdsMap.has(i.id)) ?? null
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const handle = decodeHandle(params.handle)
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const product = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle, fields: PRODUCT_DETAIL_FIELDS },
  }).then(({ response }) => response.products[0])

  if (!product) {
    notFound()
  }

  const description = product.description || `خرید ${product.title} از گیمینت`

  return {
    title: `${product.title} | گیمینت`,
    description,
    openGraph: {
      title: `${product.title} | گیمینت`,
      description,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const region = await getRegion(params.countryCode)
  const searchParams = await props.searchParams

  const selectedVariantId = searchParams.v_id

  if (!region) {
    notFound()
  }

  const pricedProduct = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle: decodeHandle(params.handle), fields: PRODUCT_DETAIL_FIELDS },
  }).then(({ response }) => response.products[0])

  if (!pricedProduct) {
    notFound()
  }

  const images = getImagesForVariant(pricedProduct, selectedVariantId)

  return (
    <ProductTemplate
      product={pricedProduct}
      region={region}
      countryCode={params.countryCode}
      images={images ?? []}
    />
  )
}
