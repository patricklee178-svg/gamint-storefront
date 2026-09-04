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
  const { handle } = params
  const region = await getRegion(params.countryCode)

  console.error("[RUNTIME-DEBUG meta]", JSON.stringify({
    handle,
    handleCharCodes: handle ? Array.from(handle).map(c => c.codePointAt(0)) : null,
    countryCode: params.countryCode,
    hasRegion: !!region,
  }))

  if (!region) {
    notFound()
  }

  const product = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle, fields: PRODUCT_DETAIL_FIELDS },
  }).then(({ response }) => response.products[0])

  console.error("[RUNTIME-DEBUG meta] found:", !!product)

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

  console.error("[RUNTIME-DEBUG]", JSON.stringify({
    handle: params.handle,
    handleCharCodes: params.handle ? Array.from(params.handle).map(c => c.codePointAt(0)) : null,
    countryCode: params.countryCode,
    hasRegion: !!region,
  }))

  if (!region) {
    notFound()
  }

  const pricedProduct = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle: params.handle, fields: PRODUCT_DETAIL_FIELDS },
  }).then(({ response }) => response.products[0])

  console.error("[RUNTIME-DEBUG] found:", !!pricedProduct)

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
