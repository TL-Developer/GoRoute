"use server";

import { revalidateTag } from "next/cache";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createRouteAction(state: any, formData: FormData) {
  const { sourceId, destinationId } = Object.fromEntries(formData);

  const directionsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_V1}/directions?originId=${sourceId}&destinationid=${destinationId}`,
    {
      // cache: "force-cache", //default
      // next: {
      //   revalidate: 1 * 60 * 60 * 24, // 1 dia
      // }
    }
  );

  if (!directionsResponse.ok) {
    console.error(await directionsResponse.text());
    return { error: "Failed to fetch directions" };
  }

  const directionsData = await directionsResponse.json();

  const startAddress = directionsData.output.routes[0].legs[0].start_address;
  const endAddress = directionsData.output.routes[0].legs[0].end_address;

  const data = {
    name: `${startAddress} - ${endAddress}`,
    source_id: directionsData.output.request.origin.place_id.replace(
      "place_id:",
      ""
    ),
    destination_id: directionsData.output.request.destination.place_id.replace(
      "place_id:",
      ""
    ),
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_V1}/routes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.error(await response.text());
    return { error: "Failed to create route" };
  }

  revalidateTag("routes");

  return { success: true };
}