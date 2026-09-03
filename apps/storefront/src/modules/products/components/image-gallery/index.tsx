"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"

type Badge = { label: string; tone: "purple" | "emerald" }

const ImageGallery = ({
  images,
  badges = [],
}: {
  images: HttpTypes.StoreProductImage[]
  badges?: Badge[]
}) => {
  const [active, setActive] = useState(0)
  const shown = images[active] || images[0]

  return (
    <div className="w-full">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0d14]">
        {shown?.url && (
          <img src={shown.url} alt="" className="h-full w-full object-cover" />
        )}

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <div className="flex flex-wrap gap-1.5">
            {badges.map((b) => (
              <span
                key={b.label}
                className={`rounded-lg border px-2.5 py-1 text-[11px] font-bold backdrop-blur ${
                  b.tone === "purple"
                    ? "border-purple-300/25 bg-purple-600/80 text-white"
                    : "border-emerald-300/25 bg-emerald-600/80 text-white"
                }`}
              >
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
          {images.map((image, i) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActive(i)}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border transition ${
                i === active ? "border-purple-400" : "border-white/10 opacity-60 hover:opacity-100"
              }`}
            >
              {image.url && <img src={image.url} alt="" className="h-full w-full object-cover" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
