import React, { ReactElement } from 'react'
import { IoChevronBackOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { Button } from '../../../components'

type NavigationProps = {
  recipe: Recipe
  onDelete: any
}

const Navigation: React.FC<NavigationProps> = ({ recipe, onDelete }): ReactElement => {
  return (
    <div className="flex flex-row justify-between items-center">
      <Link to="/recipes" className="flex items-center mr-4">
        <IoChevronBackOutline />
        Back to Recipes
      </Link>

      <div className="flex flex-row">
        <Link to={`/recipes/${recipe.id}/edit`}>
          <Button type="button" label="Edit" buttonStyle="secondary" classes="mr-2" />
        </Link>

        <Button type="button" label="Delete" onClick={(): Promise<boolean> => onDelete(recipe.id)} />
      </div>
    </div>
  )
}

export default Navigation
