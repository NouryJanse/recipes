import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateRecipe } from '../redux/reducers/recipes/recipeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Textfield, Textarea, Dropdown } from '../components/index';
import { useState } from 'react';
import { useRef } from 'react';

import styled from 'styled-components';

const EditRecipeContainer = styled.div`
  margin-bottom: 32px;
`;

// shoudld be moved to fixed constants externally
const options = [
  { title: 'Make a choice', name: 'choice' },
  { title: 'Breakfast', name: 'breakfast' },
  { title: 'Lunch', name: 'lunch' },
  { title: 'Aperitivo', name: 'aperitivo' },
  { title: 'Dinner', name: 'dinner' },
];

const EditRecipe = (data) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [recipe, setRecipe] = useState(data.recipe);
  let [id, setId] = useState();
  let params = useParams();
  const hasURLParams = useRef(false);
  const recipes = useSelector((state) => state.recipeSlice.data.recipes);

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

  const recipeCourse = () => {
    return options.find((option) => option?.name === recipe.course)?.title;
  };

  useEffect(() => {
    if (hasURLParams.current === false || !recipe || !id) {
      if (!typeof params.recipeId !== undefined) {
        setId(params.recipeId);
      }

      if (id !== undefined) {
        setRecipe(
          recipes.find((recipe) => {
            return recipe.id === Number.parseInt(id);
          }),
        );
      }
      hasURLParams.current = true;
    }

    const subscription = watch((value, { name, type }) => {
      setRecipe({ ...recipe, ...value });
    });
    return () => subscription.unsubscribe();
  }, [watch, recipe, id, recipes]);

  if (!recipe) return <p>Error, no recipe found.</p>;

  return (
    <EditRecipeContainer>
      <form onSubmit={handleSubmit(onSave)}>
        <h2>
          Editing {recipe.name} - {recipeCourse()}
        </h2>

        <Textfield
          type="text"
          label="Recipe name*"
          name="name"
          defaultValue={recipe.name}
          placeholder="Fill in a name"
          validation={{
            required: 'Did you forget to name your recipe?',
          }}
          register={register}
          errors={errors.title?.type === 'required' && 'Title is required'}
        />

        <Textarea
          label="Recipe description*"
          name="description"
          defaultValue={recipe.description}
          placeholder="Fill in a description"
          validation={{
            required: 'Did you forget to name your recipe?',
          }}
          register={register}
          errors={errors.title?.type === 'required' && 'Title is required'}
        />

        <Dropdown
          label="Course*"
          name="course"
          placeholder="Fill in the course"
          defaultValue={recipe.course}
          validation={{
            required: 'Did you forget to fill in the course of your recipe?',
          }}
          register={register}
          errors={errors.description?.type === 'required' && 'Course is required'}
          options={options}
        />

        <Button type="submit" label="Save recipe" />

        {params.recipeId && (
          <Link to={`/recipes/${params.recipeId}`}>Back to recipe {recipe.name}</Link>
        )}
        <Link to={`/recipes`}>Back to recipes</Link>
      </form>
    </EditRecipeContainer>
  );
};

export default EditRecipe;
