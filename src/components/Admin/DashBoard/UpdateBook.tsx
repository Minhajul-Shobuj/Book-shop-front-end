import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetAllbooksQuery,
} from "../../../redux/features/admin/productManagement.api";
import { useState } from "react";
import UpdateBookModal from "./UpdateBookModal";

const UpdateBook = () => {
  const { data: bookData, refetch } = useGetAllbooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookId, setBookId] = useState("");
  const cardItems = bookData?.data;
  const handleOpenModal = (bookId: string) => {
    setIsModalOpen(true);
    setBookId(bookId);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const hadleDelete = async (id: string) => {
    console.log(id);
    await deleteBook(id);
    refetch();
  };
  return (
    <>
      <div style={{ width: "100%", height: "100%", background: "#FCECEC" }}>
        <div>
          <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={2}>
              {cardItems?.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={index}
                  sx={{ display: "flex", justifyContent: "flex-start" }}
                >
                  <Link
                    to={`/details/${item._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      sx={{
                        width: 320,
                        height: 450,
                        background: "white",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                        border: "1px solid #EAE8DF",
                        borderRadius: 2,
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.25)",
                        },
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="60%"
                        style={{
                          padding: "20px",
                          objectFit: "contain",
                        }}
                        image={item?.bookImg}
                        alt={item.title}
                      />
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          padding: "16px",
                        }}
                      >
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold", marginBottom: 1 }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ marginBottom: 1 }}
                        >
                          <strong>Author:</strong> {item.author}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ marginBottom: 1 }}
                        >
                          <strong>Price:</strong> ${item.price}
                        </Typography>
                        <Typography
                          variant="body2"
                          color={item.stock > 0 ? "success.main" : "error.main"}
                          sx={{ marginBottom: 2 }}
                        >
                          <strong>Stock:</strong>{" "}
                          {item.stock > 0
                            ? `${item.stock} available`
                            : "Out of stock"}
                        </Typography>
                      </CardContent>
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                          "&:hover": {
                            opacity: 1,
                          },
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            background: "green",
                            color: "white",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            padding: "12px 24px",
                            borderRadius: 2,
                            "&:hover": {
                              background: "blue",
                            },
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleOpenModal(item?._id);
                          }}
                        >
                          Update
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            marginTop: "7px",
                            background: "red",
                            color: "white",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            padding: "12px 24px",
                            borderRadius: 2,
                            "&:hover": {
                              background: "blue",
                            },
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            hadleDelete(item?._id);
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="update-book-modal"
          aria-describedby="update-book-description"
        >
          <UpdateBookModal
            handleCloseModal={handleCloseModal}
            bookId={bookId}
          />
        </Modal>
      </div>
    </>
  );
};

export default UpdateBook;
