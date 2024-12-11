import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params } : { params: Promise<{ routeId: string }> }
) {
  const { routeId } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_V1}/routes/${routeId}`, {
    cache: "force-cache", //default
    next: {
      revalidate: 10, // 1 dia
      // revalidate: 1 * 60 * 60 * 24, // 1 dia
    },
  });

  return NextResponse.json(await response.json());
};