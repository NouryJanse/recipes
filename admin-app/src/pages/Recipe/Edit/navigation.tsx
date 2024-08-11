import React, { ReactElement } from 'react'
import { Button } from '../../../components'
import { useNavigate, useParams } from 'react-router-dom'
import { FieldValues, UseFormHandleSubmit } from 'react-hook-form'

type NavigationProps = {
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>
    btnClasses: string
    recipe: Recipe
    onSave: (formData: any) => Promise<void>
}

const Navigation: React.FC<NavigationProps> = ({ recipe, handleSubmit, onSave }): ReactElement => {
    const params = useParams()
    const navigate = useNavigate()

    return (
        <div className="flex flex-row">
            <Button
                onClick={(): void => navigate('/recipes')}
                type="button"
                label="To recipes"
                classes={`self-center mr-3`}
                buttonStyle="tertiary"
            />
            {params.recipeId && (
                <Button
                    onClick={(): void => navigate(`/recipes/${params.recipeId}`)}
                    type="button"
                    label={`To ${recipe.name}`}
                    classes={`self-center mr-3`}
                    buttonStyle="secondary"
                />
            )}
            <Button
                onClick={(): Promise<void> => handleSubmit(onSave)()}
                type="button"
                label="Save"
                classes={`self-center`}
                buttonStyle="primary"
            />
        </div>
    )
}

export default Navigation
