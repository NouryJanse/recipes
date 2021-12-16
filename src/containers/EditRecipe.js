import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { editRecipeById } from '../redux/reducers/recipes/recipeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link, onChange } from 'react-router-dom';
import { RecipeContainer } from '../components/Recipe/styled';
import {
    Button,
    Textfield
} from '../components/index';

const EditRecipe = (data) => {
    let recipe = data.recipe;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let params = useParams();
    const recipes = useSelector((state) => state.recipeSlice.data.recipes);

    if (params.recipeId) {
        recipe = recipes.find(recipe => {
            return recipe.id === params.recipeId;
        });
    }
    
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (name === 'title') {
                disPatchEdit(value, recipe);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, recipe]);

    const disPatchEdit = (data, recipe) => {
        dispatch(
            editRecipeById({id: recipe.id, currentRecipe: recipe, newRecipe: data})
        )
    }

    const onSave = async (data) => {
        disPatchEdit(data, recipe);
    }
        
    if (!recipe) return (<p>Error, no recipe found.</p>);

    return (
        <RecipeContainer>
            <form onSubmit={handleSubmit(onSave)}>
                <h2>
                    Editing recipe {recipe.title}
                </h2>

                <Textfield
                    type="text"
                    label="Recipe title*" 
                    name="title"
                    defaultValue={recipe.title}
                    placeholder="Fill in a title"
                    validation={{ 
                        required: 'Did you forget to name your recipe?'
                    }} 
                    register={register}
                    errors={errors.title?.type === 'required' && "Title is required"}
                />
                
                <Textfield
                    type="text"
                    label="Recipe title*" 
                    name="description"
                    defaultValue={recipe.description}
                    placeholder="Fill in a title"
                    validation={{ 
                        required: 'Did you forget to name your recipe?'
                    }} 
                    register={register}
                    errors={errors.title?.type === 'required' && "Title is required"}
                />

                <Button
                    type="submit"
                    label="Save recipe"
                />
                
                <Link 
                    to={`/recipes`}
                >
                    Back to recipes
                </Link>
            </form>
        </RecipeContainer>
    )
}

export default EditRecipe;