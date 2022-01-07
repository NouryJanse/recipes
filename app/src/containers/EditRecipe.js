import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateRecipe } from "../redux/reducers/recipes/recipeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { RecipeContainer } from "../components/Recipe/styled";
import { Button, Textfield } from "../components/index";

const EditRecipe = (data) => {
  let recipe = data.recipe;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let params = useParams();
  const recipes = useSelector((state) => state.recipeSlice.data.recipes);

  if (params.recipeId) {
    recipe = recipes.find((recipe) => {
      return recipe.id === Number.parseInt(params.recipeId);
    });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const dispatchEdit = async (data, recipe) => {
    const payload = { id: recipe.id, ...recipe, ...data };
    await dispatch(updateRecipe(payload));
    navigate(`/recipes/${recipe.id}`);
  };

  const onSave = async (data) => {
    dispatchEdit(data, recipe);
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "name") {
        // dispatchEdit(value, recipe);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, recipe]);

  if (!recipe) return <p>Error, no recipe found.</p>;

  return (
    <RecipeContainer>
      <form onSubmit={handleSubmit(onSave)}>
        <h2>Editing recipe {recipe.title}</h2>

        <Textfield
          type="text"
          label="Recipe name*"
          name="name"
          defaultValue={recipe.name}
          placeholder="Fill in a name"
          validation={{
            required: "Did you forget to name your recipe?",
          }}
          register={register}
          errors={errors.title?.type === "required" && "Title is required"}
        />

        <Textfield
          type="text"
          label="Recipe description*"
          name="description"
          defaultValue={recipe.description}
          placeholder="Fill in a description"
          validation={{
            required: "Did you forget to name your recipe?",
          }}
          register={register}
          errors={errors.title?.type === "required" && "Title is required"}
        />

        <Button type="submit" label="Save recipe" />

        {params.recipeId && (
          <Link to={`/recipes/${params.recipeId}`}>
            Back to recipe {recipe.name}
          </Link>
        )}
        <Link to={`/recipes`}>Back to recipes</Link>
      </form>
    </RecipeContainer>
  );
};

export default EditRecipe;
