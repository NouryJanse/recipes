import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { editRecipeById } from '../redux/reducers/recipes/recipeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link, onChange } from 'react-router-dom';
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
                console.log(value, name, type);                
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);
    
    const onChangeTitle = async (val) => {
        console.log(val);
        // if (isNaN(recipeId)) return;
        
        
        // navigate('/');
    }
    
    const onSave = async (data) => {
        console.log(data, recipe);
        
        await dispatch(
            editRecipeById({id: recipe.id, currentRecipe: recipe, newRecipe: data})
        );
    }
        
    if (!recipe) return (<p>Error</p>);

    return (
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
                onChange={(e) => onChangeTitle(e)}
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
                Back to home
            </Link>
        </form>
    )
}

export default EditRecipe;