/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  useBlockUserMutation,
  useGetAllUsersQuery,
} from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";

const ManageUser = () => {
  const { data, isFetching, refetch } = useGetAllUsersQuery(undefined);
  const [blockUser] = useBlockUserMutation();

  const userData = data?.data?.map((user: any) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isBlocked: user.isBlocked,
  }));
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "isBlocked",
      headerName: "Blocked Status",
      width: 150,
      renderCell: (params) => (params.value ? "Blocked" : "Active"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          color={params.row.isBlocked ? "secondary" : "primary"}
          disabled={params.row.isBlocked}
          onClick={() => handleBlockUser(params.row)}
        >
          {params.row.isBlocked ? "Blocked" : "Block User"}
        </Button>
      ),
    },
  ];
  const handleBlockUser = async (row: any) => {
    const toastId = toast.loading(`...Blocking ${row.name}`);
    try {
      const res = await blockUser({ userId: row.id }).unwrap();
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      }
      toast.success(`${row.name} is blocked successfully`, { id: toastId });
      refetch();
    } catch (err: any) {
      toast.error(`Failed to block ${row.name}: ${err.message}`, {
        id: toastId,
      });
    }
  };
  return (
    <>
      <Box sx={{ height: 400, width: "100%", mt: 2 }}>
        <DataGrid
          loading={isFetching}
          rows={userData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Box>
    </>
  );
};

export default ManageUser;
