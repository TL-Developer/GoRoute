import { RouteModel } from "../../utils/models";
import { MapDriver } from "./MapDriver";
import { StartRouteForm } from "./StartRouteForm";

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

export async function DriverPage() {
  const routes = await getRoutes();

  return (
    <div className="flex flex-1 w-full h-full absolute">
      <div className="w-1/3 p-2 h-full">
        <h4 className="text-3xl text-contrast mb-2">Inicie uma rota</h4>
        <div className="flex flex-col">
          <StartRouteForm>
            <select id="route_id" name="route_id" className="mb-2 p-2 border rounded bg-default text-contrast">
              <option key="0" value="">
                Selecione uma rota
              </option>
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
          </StartRouteForm>
        </div>
      </div>
      <MapDriver routeIdElementId={"route_id"} />
    </div>
  );
}

export default DriverPage;