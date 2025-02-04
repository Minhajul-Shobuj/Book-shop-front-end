/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { TResponse } from "../types/global";
import { useRegisterMutation } from "../redux/features/auth/AuthApi";
import { Link, useNavigate } from "react-router-dom";

type TUser = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const { handleSubmit, control } = useForm();
  const [userRegister] = useRegisterMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("....Registering");
    try {
      const res = (await userRegister(data)) as TResponse<TUser>;
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("Successfully Registered", { id: toastId });
      }
      navigate("/login");
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    }
  };
  return (
    <>
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
            Register
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters long",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
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
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  type="password"
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
              Register
            </Button>
            <Typography
              variant="body2"
              sx={{ marginTop: 2, textAlign: "center" }}
            >
              Already Registered? <Link to={"/login"}>Login</Link>
            </Typography>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Register;
