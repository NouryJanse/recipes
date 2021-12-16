import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addRecipe } from '../redux/reducers/recipes/recipeSlice';
import { useNavigate } from 'react-router-dom';

import { 
    Textfield, 
    Button 
} from '../components';

const CreateRecipe = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    if (errors) {
        // console.error(errors, new Error(errors));
    }

    const onSubmit = async (data) => {
        await dispatch(addRecipe(
            data,
        ));

        navigate('/recipes');;
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <Textfield
                type="text"
                label="Recipe title*" 
                name="title" 
                placeholder="Fill in a title"
                validation={{ 
                    required: 'Did you forget to name your recipe?'
                }} 
                register={register}
                errors={errors.title?.type === 'required' && "Title is required"}
            />

            <Textfield
                type="text"
                label="Recipe description*" 
                name="description" 
                placeholder="Fill in a description"
                validation={{ 
                    required: 'Did you forget to fill in the description of your recipe?'
                }} 
                register={register}
                errors={errors.description?.type === 'required' && "Description is required"}
            />

            <Button
                type="submit"
                label="Save recipe"
            />
        </form>
    );
}

export default CreateRecipe;