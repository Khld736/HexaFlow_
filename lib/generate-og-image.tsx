import { ImageResponse } from "next/og"

export async function generateOgImage(title: string) {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        backgroundImage: "linear-gradient(to bottom right, #000, #111)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        {/* Logo would be here */}
      </div>
      <div
        style={{
          fontSize: 60,
          fontWeight: 700,
          letterSpacing: -1,
          background: "linear-gradient(to bottom right, #19F6E8, #19F6E8)",
          backgroundClip: "text",
          color: "transparent",
          marginBottom: 20,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 30,
          color: "white",
        }}
      >
        HexaFlow Software Solutions
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  )
}
