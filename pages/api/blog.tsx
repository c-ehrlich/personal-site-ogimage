/* eslint-disable react/no-unknown-property */
import { ImageResponse } from "@vercel/og";
import { blogParams } from "utils/zodParams";
import { fetchFont } from "../../utils/fetchFont";

export const config = {
  runtime: "edge",
};

export default async (req: Request) => {
  const [inter900, inter700, inter400] = await Promise.all([
    fetchFont("Inter", 900),
    fetchFont("Inter", 700),
    fetchFont("Inter", 400),
  ]);

  const parsed = blogParams.decodeRequest(req);
  if (!parsed.success) {
    return new Response(parsed.error.toString(), { status: 400 });
  }

  const props = parsed.data.input;

  return new ImageResponse(
    (
      <div tw="flex h-[630px] w-[1200px] flex-col overflow-clip bg-[hsl(15,35%,5%)] bg-cover p-16 text-[hsl(15,15%,90%)]">
        <div tw="sticky right-10 top-0 z-0 h-4 w-4 rounded-full bg-transparent shadow-[1030px_600px_800px_800px_rgba(255,180,100,0.12)]" />
        <div tw="z-100 flex h-full w-full flex-col justify-between">
          <div tw="flex flex-col gap-16">
            <div tw="flex justify-between">
              <img
                tw="z-4 rounded-full"
                src="https://www.c-ehrlich.dev/og/avatar.jpg"
                width="160px"
                height="160px"
                alt="Christopher Ehrlich Avatar"
              />
              <p tw="text-4xl">Christopher Ehrlich</p>
            </div>
            <h1 tw="my-0 py-0 text-7xl font-extrabold leading-tight">
              {props.title}
            </h1>
          </div>
          <div tw="flex justify-between text-4xl">
            <p tw="text-orange-300/90">
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
        { name: "Inter", data: inter700, weight: 700 },
        { name: "Inter", data: inter400, weight: 400 },
      ],
    },
  );
};
