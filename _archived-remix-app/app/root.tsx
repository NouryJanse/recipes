import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";

import { LinksFunction, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import appStylesHref from "./app.css";
import { createEmptyContact } from "./data";
import Menu from "./components/Menu";
import fetchURL from "./helpers/fetchURL";
export const links: LinksFunction = () => [{ rel: "stylesheet", href: appStylesHref }];

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

export const loader = async ({}: LoaderFunctionArgs) => {
  const API_URL: string = process.env.API_URL as string;
  const recipesData: any = await fetchURL(`${API_URL}/recipes`);
  const recipes = await recipesData.json();
  return json({ recipes });
};

const App = () => {
  const { recipes } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");
  const loadingState = navigation.state === "loading" && !searching ? "loading" : "";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <Meta />
        <Links />
      </head>

      <body className="flex flex-col lg:flex-row lg:max-h-screen bg-gray-100">
        <Menu recipes={recipes} searching={searching} />

        <div className={`w-full ${loadingState}`}>
          <Outlet />
        </div>

        <ScrollRestoration />

        <Scripts />

        <LiveReload />
      </body>
    </html>
  );
};

export default App;
