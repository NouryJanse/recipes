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
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
]

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
]

const IngredientsTable: React.FC<IngredientsTableProps> = ({ ingredients }): ReactElement => {
  // const dispatch = useDispatch()
  // const navigate = useNavigate()
  // const [isHovering, setIsHovering] = useState(false)

  return (
    <div style={{ height: 600, width: '100%' }}>
      {/* <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[15]} /> */}
      <DataGrid rows={ingredients} columns={columns} pageSize={15} rowsPerPageOptions={[20]} />
    </div>
  )
}

export default IngredientsTable
