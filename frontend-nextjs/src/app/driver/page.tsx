import { RouteModel } from "../../utils/models";
import { MapDriver } from "./MapDriver";

export async function getRoutes() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_V1}/routes`, {
    cache: "force-cache", //default
    next: {
      revalidate: 10, // 1 dia
      // revalidate: 1 * 60 * 60 * 24, // 1 dia
    },
  });

  return response.json();
}

export async function getRoute(route_id: string): Promise<{output: RouteModel}> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_V1}/routes/${route_id}`, {
    cache: "force-cache", //default
    next: {
      revalidate: 10, // 1 dia
      // revalidate: 1 * 60 * 60 * 24, // 1 dia
    },
  });

  return response.json();
}

export async function DriverPage({
  searchParams
} : {
  searchParams: Promise<{route_id: string}>
}) {
  const { route_id } = await searchParams;
  const routes = await getRoutes();

  let start_location = null;
  let end_location = null;

  if (route_id) {
    const route = await getRoute(route_id);

    start_location = route.output.directions.routes[0].legs[0].start_location;
    end_location = route.output.directions.routes[0].legs[0].end_location;
  }

  return (
    <div className="flex flex-1 w-full h-full absolute">
      <div className="w-1/3 p-2 h-full">
        <h4 className="text-3xl text-contrast mb-2">Inicie uma rota</h4>
        <div className="flex flex-col">
          <form className="flex flex-col space-y-4" method="get">
            <select name="route_id" className="mb-2 p-2 border rounded bg-default text-contrast">
              {routes.output.map((route: RouteModel) => (
                <option key={route.id} value={route.id}>
                  {route.name}
                </option>
              ))}
            </select>
            <button
              className="bg-main text-primary p-2 rounded text-xl font-bold"
              style={{ width: "100%" }}
            >
              Iniciar a viagem
            </button>
          </form>
        </div>
      </div>
      <MapDriver route_id={route_id} start_location={start_location} end_location={end_location} />
    </div>
  );
}

export default DriverPage;