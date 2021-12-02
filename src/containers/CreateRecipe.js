import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addRecipe } from '../redux/reducers/recipes/recipeSlice';

import { 
    Textfield, 
    Button 
} from '../components';

const CreateRecipe = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const onSubmit = (data) => {
        dispatch(addRecipe(
            data,
        ))
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <Textfield 
                // name="recipeTitle" 
                // defaultValue="test"
                type="text"
                label="Recipe title*" 
                name="title" 
                placeholder="Fill in a title"
                validation={{ 
                    required: 'Did you forget to name your bundle? Did.. you..?'
                }} 
                register={register}
            />

            <Textfield 
                // name="recipeTitle" 
                // defaultValue="test"
                type="text"
                label="Recipe description*" 
                name="description" 
                placeholder="Fill in a description"
                validation={{ 
                    required: 'Did you forget to name your bundle? Did.. you..?'
                }} 
                register={register}
            />

            <Button
                type="submit"
                label="Save recipe"
            />
        </form>
    );
}

export default CreateRecipe;