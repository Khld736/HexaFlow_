import { generateOgImage } from "@/lib/generate-og-image"

export const runtime = "edge"
export const alt = "HexaFlow Software Solutions"
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image() {
  return generateOgImage("HexaFlow Software Solutions")
}
