import NextLink from "next/link";
import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ShopLayouts } from "components/layouts";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullName", headerName: "Nombre Completo", width: 300 },

  {
    field: "paid",
    headerName: "Pagada",
    description: "Muestra información sobre si la orden esta pagada o no",
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No pagada" variant="outlined" />
      );
    },
  },

  {
    field: "orden",
    headerName: "Ver orden",
    width: 200,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${ params.row.id}`} passHref>
          <Link underline="always">
            <Typography variant="body1">Ver orden</Typography>
          </Link>
        </NextLink>
      )
    },
  },

];

const rows = [
  { id: 1, paid: true, fullName: "Jhon Abou Mahmoud" },
  { id: 2, paid: true, fullName: "Juan Perez" },
  { id: 3, paid: true, fullName: "Adrian Perez" },
  { id: 4, paid: false, fullName: "Aquiles Perez" },
  { id: 5, paid: true, fullName: "Rogelio Perez" },
  { id: 6, paid: true, fullName: "Angy Perez" },
  { id: 7, paid: true, fullName: "Maria Perez" },
  { id: 8, paid: true, fullName: "Juan Perez" },
  { id: 9, paid: false, fullName: "Cleopatra Perez" },
  { id: 10, paid: true, fullName: "Juan Reyes" },
  { id: 11, paid: true, fullName: "Adnan Perez" },
  { id: 12, paid: true, fullName: "Aquiles Perez" },
  { id: 13, paid: true, fullName: "Rodrigo Perez" },
  { id: 14, paid: false, fullName: "Umberto Perez" },
  { id: 15, paid: true, fullName: "Damian Perez" },
];

const HistoryPage = () => {
  return (
    <ShopLayouts
      title={"Historial de ordenes"}
      pageDescription={"Historial de ordenes del cliente"}
    >
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>

      <Grid container mt={4}>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50, 100]}
          />
        </Grid>
      </Grid>
    </ShopLayouts>
  );
};

export default HistoryPage;
