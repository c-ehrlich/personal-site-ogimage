/* eslint-disable react/no-unknown-property */
import { ImageResponse } from "@vercel/og";
import { fetchFont } from "../../utils/fetchFont";

export const config = {
  runtime: "edge",
};

export default async (_req: Request) => {
  const [inter800, inter700] = await Promise.all([
    fetchFont("Inter", 800, "tRPC   Move Fast and Break Nothing"),
    fetchFont("Inter", 700, "End-to-end typesafe APIs made easy. 0123456789,"),
  ]);

  return new ImageResponse(
    (
      <div tw="flex h-[630px] w-[1200px] flex-col overflow-clip bg-[hsl(15,35%,5%)] bg-cover p-16 text-[hsl(15,15%,90%)]">
        <div tw="sticky right-10 top-0 z-0 h-4 w-4 rounded-full bg-transparent shadow-[1030px_600px_800px_800px_rgba(255,180,100,0.12)]" />
        <div tw="z-100 flex h-full w-full flex-col items-center justify-center gap-16">
          <img
            tw="z-4 rounded-full"
            src="https://www.c-ehrlich.dev/og/avatar.jpg"
            width="224px"
            height="224px"
            alt="Christopher Ehrlich Avatar"
          />
          <h1 tw="mb-4 text-7xl font-bold">Christopher Ehrlich</h1>
        </div>
      </div>
    ),
    {
      headers: {
        "Cache-Control": "s-maxage=86400, stale-while-revalidate",
      },
      width: 1200,
      height: 600,
      fonts: [
        { name: "Inter", data: inter800, weight: 800 },
        { name: "Inter", data: inter700, weight: 700 },
      ],
    },
  );
};
