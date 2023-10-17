import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid'
import { formatNLDateTime } from '../../../../helpers/DateHelper'
import { Button } from '../../..'
import { useDispatch } from 'react-redux'
import { deleteIngredient, getIngredients } from '../../../../redux/reducers/ingredients/ingredientSlice'

type IngredientsTableProps = {
  ingredients: Ingredient[]
}

const IngredientsTable: React.FC<IngredientsTableProps> = ({ ingredients }): ReactElement => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.updatedAt ? formatNLDateTime(params.row.updatedAt) : ''}`,
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
              // @ts-ignore:next-line
              await dispatch(deleteIngredient(cellValues.row.id))
              // @ts-ignore:next-line
              await dispatch(getIngredients())
            }}
            label="Delete"
          />
        )
      },
    },
  ]

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid rows={ingredients} columns={columns} pageSize={15} rowsPerPageOptions={[20]} />
    </div>
  )
}

export default IngredientsTable
