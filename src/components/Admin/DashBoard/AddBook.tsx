/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useAddBookMutation } from "../../../redux/features/admin/productManagement.api";
import { toast } from "sonner";
import { useState } from "react";

export type TBook = {
  title: string;
  author: string;
  bookImg: File | null;
  publishedDate: Date;
  price: number;
  stock: number;
  description: string;
};

const AddBook = () => {
  const [addBook] = useAddBookMutation();
  const [uploading, setUploading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TBook>();

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_book_img");
    formData.append("cloud_name", "dazztziwj");
    setUploading(true);

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dazztziwj/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setUploading(false);
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
      return null;
    }
  };

  const onSubmit = async (data: TBook) => {
    const toastId = toast.loading("....Creating");

    if (!data.bookImg || typeof data.bookImg !== "string") {
      toast.error("Please upload a valid book image", { id: toastId });
      return;
    }

    const bookData = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
    };

    try {
      const res = await addBook(bookData).unwrap();
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("Book created successfully", { id: toastId });
        reset();
      }
    } catch (err: any) {
      toast.error(err?.message, { id: toastId });
    }
  };

  return (
    <>
      <Typography
        sx={{ marginBottom: 3 }}
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
        Add a New Book Here
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 500,
          margin: "0 auto",
          padding: "4",
        }}
      >
        <Controller
          name="title"
          control={control}
          rules={{
            required: "Title is required",
            minLength: {
              value: 7,
              message: "Title must be at least 7 characters",
            },
            maxLength: {
              value: 50,
              message: "Title must be at most 50 characters",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              error={!!errors.title}
              helperText={errors.title?.message}
              variant="outlined"
            />
          )}
        />
        <Controller
          name="author"
          control={control}
          rules={{
            required: "Author is required",
            minLength: {
              value: 7,
              message: "Author must be at least 7 characters",
            },
            maxLength: {
              value: 30,
              message: "Author must be at most 20 characters",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Author"
              error={!!errors.author}
              helperText={errors.author?.message}
              variant="outlined"
            />
          )}
        />
        <Controller
          name="bookImg"
          control={control}
          rules={{
            required: "Book image is required",
          }}
          render={({ field, fieldState }) => (
            <Box>
              <label htmlFor="bookImg" style={{ cursor: "pointer" }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  Upload Book Image
                </Typography>
              </label>
              <input
                id="bookImg"
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0] || null;
                  field.onChange(file);

                  if (file) {
                    const imageUrl = await uploadImageToCloudinary(file);
                    if (imageUrl) {
                      field.onChange(imageUrl);
                    }
                  }
                }}
                ref={field.ref}
                style={{ display: "block" }}
              />
              {uploading && <p>Uploading...</p>}
              {field.value && typeof field.value === "string" && (
                <img
                  src={field.value}
                  alt="Uploaded Preview"
                  style={{ width: "100px", marginTop: "10px" }}
                />
              )}
              {fieldState?.error && <span>{fieldState?.error.message}</span>}
            </Box>
          )}
        />

        <Controller
          name="publishedDate"
          control={control}
          rules={{
            required: "Published date is required",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Published Date"
              type="date"
              error={!!errors.publishedDate}
              helperText={errors.publishedDate?.message}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          rules={{
            required: "Price is required",
            min: { value: 0, message: "Price must be a positive number" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Price"
              type="number"
              error={!!errors.price}
              helperText={errors.price?.message}
              variant="outlined"
            />
          )}
        />
        <Controller
          name="stock"
          control={control}
          rules={{
            required: "Stock is required",
            min: { value: 0, message: "Stock must be a positive number" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Stock"
              type="number"
              error={!!errors.stock}
              helperText={errors.stock?.message}
              variant="outlined"
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{
            required: "Description is required",
            minLength: {
              value: 20,
              message: "Description must be at least 20 characters",
            },
            maxLength: {
              value: 500,
              message: "Description must be at most 500 characters",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              error={!!errors.description}
              helperText={errors.description?.message}
              variant="outlined"
              multiline
              rows={3}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </>
  );
};

export default AddBook;
