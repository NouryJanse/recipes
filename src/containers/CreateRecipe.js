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
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    if (errors) {
        console.error(errors, new Error(errors));
    }

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
                type="text"
                label="Recipe title*" 
                name="title" 
                placeholder="Fill in a title"
                validation={{ 
                    required: 'Did you forget to name your recipe?'
                }} 
                register={register}
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
            />

            <Button
                type="delete"
                label="X"
            />

            <Button
                type="submit"
                label="Save recipe"
            />
        </form>
    );
}

export default CreateRecipe;