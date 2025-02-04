/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../../redux/features/admin/OrderManagement.api";
import { toast } from "sonner";

const ManageOrder = () => {
  const { data, refetch } = useGetAllOrdersQuery(undefined);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const orders = data?.data;
  const handleStatusChange = async (orderId: string, status: string) => {
    const toastId = toast.loading(`...updating Status`);
    try {
      const res = await updateOrderStatus({ orderId, status }).unwrap();
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      }
      toast.success(`Status updated successfully`, { id: toastId });
      refetch();
    } catch (err: any) {
      toast.error(err.message, {
        id: toastId,
      });
    }
  };
  return (
    <>
      <Box sx={{ padding: 4 }}>
        <Typography
          variant="h4"
          sx={{ marginBottom: 4 }}
          style={{
            textAlign: "center",
            color: "#393280",
            fontSize: 48,
            fontFamily: "Inter",
            fontWeight: "600",
            textTransform: "capitalize",
            wordWrap: "break-word",
          }}
        >
          Manage Orders
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#ED553B" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Order ID
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Customer
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Total Price
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Status
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order: any) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>
                    {order.customer.name}
                    <br />( {order.customer.email})
                  </TableCell>
                  <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>{order?.status}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value as string)
                      }
                      sx={{ minWidth: 120 }}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="processing">Processing</MenuItem>
                      <MenuItem value="delivered">Delivered</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default ManageOrder;
