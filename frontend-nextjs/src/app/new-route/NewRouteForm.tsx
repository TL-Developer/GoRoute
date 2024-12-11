"use client";

import { PropsWithChildren, useActionState } from "react";
import { createRouteAction } from "./create-route.action";

interface INewRouteFormAction {
  error?: string;
  success?: boolean;
}

const NewRouteForm = (props: PropsWithChildren) => {
  const [state, formAction] = useActionState<INewRouteFormAction | null, FormData>(createRouteAction, null);

  return (
    <form action={formAction}>
      {state?.error && (
        <div className="p-4 border rounded text-contrast bg-error">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="p-4 border rounded text-contrast bg-success">
          Rota criada com sucesso!
        </div>
      )}
      {props.children}
    </form>
  );
}

export default NewRouteForm;