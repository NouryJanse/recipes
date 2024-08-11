import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
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
            valueGetter: (value, row) => `${row.createdAt ? formatNLDateTime(row.createdAt) : ''}`,
        },
        {
            field: 'updatedAt',
            headerName: 'Updated At',
            type: 'date',
            width: 200,
            valueGetter: (value, row) => new Date(row.updatedAt), //`${row.updatedAt ? formatNLDateTime(row.updatedAt) : ''}`,
        },
        {
            field: 'published',
            headerName: 'Published',
            width: 100,
            valueGetter: (value, row) => `${row.published ? 'Yes' : 'No'}`,
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
            <DataGrid
                rows={ingredients}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
        </div>
    )
}

export default IngredientsTable
