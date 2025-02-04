/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch } from "../redux/hook";
import { useLoginMutation } from "../redux/features/auth/AuthApi";
import { jwtDecode } from "jwt-decode";
import { setUser, TUser } from "../redux/features/auth/AuthSlice";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();
  const location = useLocation();
  const from = (location.state as any)?.from || "/";

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("...logging in");
    try {
      const res = await login(data).unwrap();
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        const user = jwtDecode(res.data.accessToken) as TUser;
        dispatch(
          setUser({
            user: user,
            token: res.data.accessToken,
          })
        );
        toast.success("logged in", { id: toastId });
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      toast.error(err?.message, { id: toastId });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontWeight: "bold",
            color: "#393280",
            fontSize: "3rem",
            marginBottom: 2,
          }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email address",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              background: "#ED553B",
              color: "white",
              fontWeight: "bold",
              textTransform: "uppercase",
              padding: "10px 0",
              width: "100%",
              borderRadius: 1,
              boxShadow: "none",
              "&:hover": {
                background: "#D84331",
              },
            }}
          >
            Login
          </Button>
          <Typography
            variant="body2"
            sx={{ marginTop: 2, textAlign: "center" }}
          >
            Don't have an account? <Link to={"/register"}>Register here</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
