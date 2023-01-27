/* eslint-disable react/no-unknown-property */
import { ImageResponse } from "@vercel/og";
import { fetchFont } from "../../utils/fetchFont";

export const config = {
  runtime: "edge",
};

export default async (_req: Request) => {
  const [
    inter900,
    inter800,
    inter700,
    inter600,
    inter500,
    inter400,
    inter300,
    inter200,
    inter100,
  ] = await Promise.all([
    // TODO: add back specific text
    fetchFont("Inter", 900),
    fetchFont("Inter", 800),
    fetchFont("Inter", 700),
    fetchFont("Inter", 600),
    fetchFont("Inter", 500),
    fetchFont("Inter", 400),
    fetchFont("Inter", 300),
    fetchFont("Inter", 200),
    fetchFont("Inter", 100),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "630px",
          width: "1200px",
          flexDirection: "column",
          overflow: "hidden",
          fontFamily: "Inter",
          backgroundColor: "hsl(15,35%,5%)",
          color: "hsl(15,15%,90%)",
          padding: "64px",
        }}
      >
        <div style={{ display: "flex", position: "absolute" }}>
          <div
            style={{
              display: "flex",
              position: "relative",
              right: "40px",
              top: "0px",
              zIndex: "0",
              height: "16px",
              width: "16px",
              borderRadius: "50%",
              backgroundColor: "transparent",
              boxShadow: "1030px 600px 800px 800px rgba(255,140,100,0.12)",
            }}
          />
        </div>
        <div
          style={{
            zIndex: "100",
            display: "flex",
            flexDirection: "column",
            gap: "64px",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <img
            style={{
              zIndex: "4",
              borderRadius: "50%",
            }}
            src="https://www.c-ehrlich.dev/og/avatar.jpg"
            width="224px"
            height="224px"
            alt="Christopher Ehrlich Avatar"
          />
          <h1
            style={{
              marginBottom: "16px",
              fontSize: "72px",
              fontWeight: "700",
            }}
          >
            Christopher Ehrlich
          </h1>
        </div>
      </div>
    ),
    {
      headers: {
        "Cache-Control": "s-maxage=86400, stale-while-revalidate",
      },
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: inter900, weight: 900 },
        { name: "Inter", data: inter800, weight: 800 },
        { name: "Inter", data: inter700, weight: 700 },
        { name: "Inter", data: inter600, weight: 600 },
        { name: "Inter", data: inter500, weight: 500 },
        { name: "Inter", data: inter400, weight: 400 },
        { name: "Inter", data: inter300, weight: 300 },
        { name: "Inter", data: inter200, weight: 200 },
        { name: "Inter", data: inter100, weight: 100 },
      ],
    },
  );
};
