import { json, LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData, useFetcher } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { FunctionComponent } from "react";

import type { ContactRecord } from "../data";
import { getContact, updateContact } from "../data";
import fetchURL from "~/helpers/fetchURL";
import { Recipe } from "@nouryjanse/recipe-types";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.recipeId, "Missing recipeId param");
  const API_URL: string = process.env.API_URL as string;
  const recipesData: any = await fetchURL(`${API_URL}/recipes/${params.recipeId}`);
  const recipe: Recipe = await recipesData.json();
  if (!recipe) {
    throw new Response("Not Found", { status: 404 });
  }
  return { recipe };
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
};

export default function RecipePage() {
  const { recipe } = useLoaderData<typeof loader>();

  return (
    <div className="p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6">
      {/* <div>
          <img alt={`${recipe.first} ${recipe.last} avatar`} key={recipe.avatar} src={recipe.avatar} />
        </div> */}
      <h1 className="text-xl">
        {recipe.name ? <>{recipe.name}</> : <i>No Name</i>}
        {/* <Favorite recipe={recipe} /> */}
      </h1>

      {/* {recipe.twitter ? (
          <p>
            <a href={`https://twitter.com/${recipe.twitter}`}>{recipe.twitter}</a>
          </p>
        ) : null}

        {recipe.notes ? <p>{recipe.notes}</p> : null} */}

      {/* <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>

          <Form
            action="destroy"
            method="post"
            onSubmit={(event) => {
              const response = confirm("Please confirm you want to delete this record.");
              if (!response) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div> */}
    </div>
  );
}

// const Favorite: FunctionComponent<{
//   contact: Pick<ContactRecord, "favorite">;
// }> = ({ contact }) => {
//   const fetcher = useFetcher();
//   const favorite = fetcher.formData ? fetcher.formData.get("favorite") === "true" : contact.favorite;

//   return (
//     <fetcher.Form method="post">
//       <button
//         aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
//         name="favorite"
//         value={favorite ? "false" : "true"}
//       >
//         {favorite ? "★" : "☆"}
//       </button>
//     </fetcher.Form>
//   );
// };
