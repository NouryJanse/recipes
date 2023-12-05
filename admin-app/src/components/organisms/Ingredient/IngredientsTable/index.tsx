import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid'
import { formatNLDateTime } from '../../../../helpers/DateHelper'
import { Button } from '../../..'
import { useDeleteIngredientMutation } from '../../../../redux/reducers/ingredients/ingredients'

type IngredientsTableProps = {
  ingredients: Ingredient[]
}

const IngredientsTable: React.FC<IngredientsTableProps> = ({ ingredients }): ReactElement => {
  const navigate = useNavigate()
  const [deleteIngredient] = useDeleteIngredientMutation()

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Ingredient name', width: 200 },
    { field: 'calorieCount', headerName: 'Calories', width: 80 },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.createdAt ? formatNLDateTime(params.row.createdAt) : ''}`,
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      type: 'date',
      width: 200,
      valueGetter: (params: GridValueGetterParams) => new Date(params.row.updatedAt), //`${params.row.updatedAt ? formatNLDateTime(params.row.updatedAt) : ''}`,
    },
    {
      field: 'published',
      headerName: 'Published',
      width: 100,
      valueGetter: (params: GridValueGetterParams) => `${params.row.published ? 'Yes' : 'No'}`,
    },
    {
      field: 'Edit',
      sortable: false,
      hideSortIcons: true,
      disableColumnMenu: true,
      renderCell: (cellValues: GridRenderCellParams): ReactElement => {
        return (
          <Button
            type="button"
            buttonStyle="secondary"
            onClick={(): void => {
              navigate(`/ingredients/${cellValues.row.id}/edit`)
            }}
            label="Edit"
          />
        )
      },
    },
    {
      field: 'Delete',
      sortable: false,
      hideSortIcons: true,
      disableColumnMenu: true,
      renderCell: (cellValues: GridRenderCellParams): ReactElement => {
        return (
          <Button
            type="button"
            buttonStyle="secondary"
            onClick={async (e): Promise<void> => {
              e.preventDefault()
              await deleteIngredient(cellValues.row.id)
            }}
            label="Delete"
          />
        )
      },
    },
  ]

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid rows={ingredients} columns={columns} pageSizeOptions={[5, 10, 25]} />
    </div>
  )
}

export default IngredientsTable
