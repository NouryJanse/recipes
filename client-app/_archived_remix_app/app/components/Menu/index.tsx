import { Recipe } from "@nouryjanse/recipe-types";
import { NavLink } from "@remix-run/react";
import React, { ReactElement } from "react";

type MenuProps = {
  recipes: Recipe[];
  searching: boolean | undefined;
};

const Menu: React.FC<MenuProps> = ({ recipes, searching }): ReactElement => {
  return (
    <div className="menu hidden xl:flex flex-col max-h-screen md:py-5">
      <NavLink className={({ isActive, isPending }) => (isActive ? "active" : isPending ? "pending" : "")} to={``}>
        <h2 className="text-sm sm:text-md md:text-lg m-4 font-bold">Manage shopping list</h2>
      </NavLink>

      <h2 className="text-sm sm:text-md md:text-lg m-4 font-bold">Recipes</h2>
      <nav>
        <ul>
          {recipes.length ? (
            <>
              {recipes.map((recipe: any) => (
                <li key={recipe.id}>
                  <NavLink
                    className={({ isActive, isPending }) => (isActive ? "active" : isPending ? "pending" : "")}
                    to={`recipes/${recipe.id}`}
                  >
                    {recipe.name ? <>{recipe.name}</> : <i>No Name</i>}
                    {recipe.favorite ? <span>★</span> : null}
                  </NavLink>
                </li>
              ))}
            </>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
