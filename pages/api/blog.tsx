/* eslint-disable react/no-unknown-property */
import { ImageResponse } from "@vercel/og";
import { blogParams } from "utils/zodParams";
import { fetchFont } from "../../utils/fetchFont";

export const config = {
  runtime: "edge",
};

export default async (req: Request) => {
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

  const parsed = blogParams.decodeRequest(req);
  if (!parsed.success) {
    return new Response(parsed.error.toString(), { status: 400 });
  }

  const props = parsed.data.input;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "630px",
          width: "1200px",
          flexDirection: "column",
          overflow: "hidden",
          backgroundColor: "hsl(15,35%,5%)",
          backgroundSize: "cover",
          padding: "64px",
          color: "hsl(15,15%,90%)",
          fontFamily: "Inter",
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
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "64px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img
                style={{ zIndex: "4", borderRadius: "50%" }}
                src="https://www.c-ehrlich.dev/og/avatar.jpg"
                width="160px"
                height="160px"
                alt="Christopher Ehrlich Avatar"
              />
              <p style={{ fontSize: "36px", lineHeight: "40px" }}>
                Christopher Ehrlich
              </p>
            </div>
            <h1
              style={{
                marginTop: "0",
                marginBottom: "0",
                paddingTop: "0",
                paddingBottom: "0",
                fontSize: "72px",
                lineHeight: "90px",
                fontWeight: "800",
              }}
            >
              {props.title}
            </h1>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "36px",
              lineHeight: "40px",
            }}
          >
            <p style={{ color: "rgb(253 186 116 / 0.9)" }}>
              {props.minRead} minute {props.isVideo ? "video" : "read"}
            </p>
          </div>
        </div>
      </div>
    ),
    {
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
