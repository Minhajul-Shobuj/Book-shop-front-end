/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import {
  TextField,
  Button,
  Avatar,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import {
  useGetMeQuery,
  useUpdatePasswordMutation,
} from "../redux/features/auth/AuthApi";
import { toast } from "sonner";
import { TResponse } from "../types/global";
import NavBar from "../components/Home/TopBar/Navbar";
import { Person } from "@mui/icons-material";
import Footer from "../components/Home/Footer/Footer";

const MyProfile = () => {
  const { data: myProfileInfo, isLoading } = useGetMeQuery(undefined);
  const [setNewPassword] = useUpdatePasswordMutation();
  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordError },
    reset,
  } = useForm();

  const updatePassword: SubmitHandler<FieldValues> = async (data) => {
    reset();
    const toastId = toast.loading("....updating");
    try {
      const res = (await setNewPassword(data)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("Successfully Updated Your password", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    }
  };

  return (
    <>
      <NavBar />
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <Box
          sx={{
            maxWidth: 500,
            mx: "auto",
            mt: 5,
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: "white",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mb: 2,
                mx: "auto",
                bgcolor: "#393280",
                fontSize: "2rem",
              }}
            >
              <Person />
            </Avatar>
            <Typography variant="h5" fontWeight="bold" color="#ED553B">
              My Profile
            </Typography>
          </Box>
          <Paper
            sx={{
              p: 3,
              mb: 3,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              boxShadow: 2,
              bgcolor: "#fafafa",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
              color="#393280"
              sx={{ textAlign: "center" }}
            >
              Profile Information
            </Typography>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body1" mb={1}>
                <strong>Name:</strong> {myProfileInfo?.data?.name}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {myProfileInfo?.data?.email}
              </Typography>
            </Box>
          </Paper>
          <Paper
            component="form"
            onSubmit={handlePasswordSubmit(updatePassword)}
            sx={{
              p: 3,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              boxShadow: 2,
              bgcolor: "#fafafa",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
              color="#393280"
              sx={{ textAlign: "center" }}
            >
              Update Your Password
            </Typography>
            <Controller
              name="oldPassword"
              control={passwordControl}
              rules={{
                required: "Old Password is required",
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Old Password"
                  type="password"
                  fullWidth
                  error={!!passwordError.oldPassword}
                  helperText={fieldState.error?.message}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              )}
            />
            <Controller
              name="newPassword"
              control={passwordControl}
              rules={{
                required: "New Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="New Password"
                  type="password"
                  fullWidth
                  error={!!passwordError.newPassword}
                  helperText={fieldState.error?.message}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                background: "#ED553B",
                "&:hover": { bgcolor: "primary.dark" },
                fontSize: "1rem",
                fontWeight: "bold",
                padding: "12px 0",
              }}
            >
              Update Password
            </Button>
          </Paper>
        </Box>
      )}
      <Footer />
    </>
  );
};

export default MyProfile;
