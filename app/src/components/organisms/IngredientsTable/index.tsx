import { ReactElement } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { formatNLDateTime } from '../../../helpers/DateHelper'

type IngredientsTableProps = {
  ingredients: Ingredient[]
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Ingredient name', width: 150 },
  { field: 'calorieCount', headerName: 'Calories', width: 90 },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 220,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.createdAt ? formatNLDateTime(params.row.createdAt) : ''}`,
  },
  {
    field: 'updatedAt',
    headerName: 'Updated At',
    type: 'date',
    width: 220,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.updatedAt ? formatNLDateTime(params.row.updatedAt) : ''}`,
  },
  {
    field: 'published',
    headerName: 'Published',
    width: 100,
    valueGetter: (params: GridValueGetterParams) => `${params.row.published ? 'Yes' : 'No'}`,
  },
]

const IngredientsTable: React.FC<IngredientsTableProps> = ({ ingredients }): ReactElement => {
  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid rows={ingredients} columns={columns} pageSize={15} rowsPerPageOptions={[20]} />
    </div>
  )
}

export default IngredientsTable
