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
import Sidebar from "./components/Sidebar";
import { createEmptyContact, getContacts } from "./data";
export const links: LinksFunction = () => [{ rel: "stylesheet", href: appStylesHref }];

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return json({ contacts, q });
};

const App = () => {
  const { contacts, q } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <Meta />
        <Links />
      </head>

      <body>
        <div id="detail" className={navigation.state === "loading" && !searching ? "loading" : ""}>
          <Outlet />
        </div>

        <div id="sidebar">
          <Sidebar contacts={contacts} q={q} searching={searching} />
        </div>

        <ScrollRestoration />

        <Scripts />

        <LiveReload />
      </body>
    </html>
  );
};

export default App;
