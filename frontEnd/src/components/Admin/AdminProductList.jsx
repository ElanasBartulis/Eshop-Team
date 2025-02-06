import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Textarea from "@mui/joy/Textarea";
import { useContext, useEffect, useState } from "react";
import SnackbarComponent from "../SnackBarComponent";
import SessionContext from "../../context/SessionContext";
import DeleteConfirmation from "../DeleteConfirm";
import { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export default function ProductList() {
  const { setErrorHandler } = useContext(SessionContext);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [allUsersCount, setAllUsersCount] = useState(0);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    product: null,
  });
  const [imageOpen, setImageOpen] = useState(false);

  // fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        const promise = await fetch(
          `/server/api/product/?page=${paginationModel.page}&rowsPerPage=${paginationModel.pageSize}`
        );
        const { allProducts, count } = await promise.json();

        setAllUsersCount(count);
        setData(allProducts);
        setLoading(false);
      } catch (error) {
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: error,
          alertColor: "error",
        });
        setLoading(false);
      }
    }
    fetchData();
  }, [paginationModel]);

  const columns = (handleEdit, handleDelete) => [
    { field: "id", headerName: "ID", width: 70 },
    { field: "productName", headerName: "Product Name", width: 250 },
    { field: "price", headerName: "Price", width: 130 },
    { field: "discount", headerName: "Discount", width: 130 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "rating", headerName: "Rating", width: 70 },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,

      // HOW TABLE DATA IS FETCHED
      renderCell: (params) => (
        <>
          <EditIcon
            sx={{ cursor: "pointer" }}
            onClick={() => {
              const product = data.find((row) => row.id === params.id);
              handleEdit(product);
            }}
          />
          <DeleteForeverIcon
            sx={{ cursor: "pointer", color: "red" }}
            onClick={() => {
              const product = data.find((row) => row.id === params.id);
              handleDelete(product);
            }}
          />
        </>
      ),
    },
  ];

  // Map every product
  const rows = data?.map((product) => ({
    id: product.id,
    productName: product.name,
    price: product.price,
    discount: product.discount,
    description: product.description,
    rating: +product.rating.toFixed(2),
    image: product.image,
  }));

  function handleEdit(id) {
    setSelectedProduct(id);
    setOpen(true);
  }

  async function handleDelete(product) {
    setDeleteConfirmation({
      open: true,
      product,
    });
  }

  function handleCancelDelete() {
    setDeleteConfirmation({
      open: false,
      product: null,
    });
  }

  async function handleConfirmDelete() {
    try {
      const promise = await fetch(
        `/server/api/product/${deleteConfirmation.product.id}`,
        {
          method: "DELETE",
        }
      );

      if (promise.ok) {
        //Jei promise ok, istrinti image is sistemos
        await fetch(
          `/server/api/upload/image/${deleteConfirmation.product.image}`,
          { method: "DELETE" }
        );

        setData((prevData) =>
          prevData.filter(
            (product) => product.id !== deleteConfirmation.product.id
          )
        );

        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: "Product deleted",
          alertColor: "success",
        });
      } else {
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: "Something went wrong",
          alertColor: "error",
        });
      }
    } catch (error) {
      setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: error.message || "An unknown error occurred",
        alertColor: "error",
      });
    }

    setDeleteConfirmation({
      open: false,
      product: null,
    });
  }
  function handleClose() {
    setOpen(false);
    setSelectedProduct(null);
  }

  async function handleSaveChanges(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const editedData = {
      name: formData?.get("productName"),
      price: +formData?.get("Price"),
      discount: +formData?.get("discount"),
      description: formData?.get("description"),
    };

    // Jeigu changes nebuvo padaryti.
    const noChanges = Object.keys(editedData).every(
      (key) => editedData[key] === selectedProduct[key]
    );

    if (noChanges) {
      handleClose();
      return;
    }

    try {
      const promise = await fetch(`/server/api/product/${selectedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });
      const response = await promise.json();
      if (promise.ok) {
        setData((prevData) =>
          prevData.map((product) =>
            product.id === selectedProduct.id
              ? { ...product, ...editedData }
              : product
          )
        );
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: response,
          alertColor: "success",
        });
      } else {
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: response,
          alertColor: "error",
        });
      }
    } catch (error) {
      setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: error,
        alertColor: "error",
      });
    }

    handleClose();
  }
  return (
    <>
      {/* jeigu ilgai krauna - sukimosi icon per visa ekrana suksis */}
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* -------------------- */}

      <Paper sx={{ minHeight: 400, width: "100%", marginTop: "2.25rem" }}>
        <DataGrid
          rows={rows}
          columns={columns(handleEdit, handleDelete)}
          rowCount={allUsersCount}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 15, 20, 25, 50]}
          sx={{ border: 0 }}
          paginationMode="server"
          loading={loading}
        />
      </Paper>
      {/* MODULE SETUP START */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {/* MODULE */}
          <Typography variant="h6" sx={{ mb: 4 }}>
            Edit Product
          </Typography>

          {/* PRODUCT NAME */}
          <form onSubmit={handleSaveChanges} className="flex flex-col gap-4">
            <TextField
              type="text"
              variant="standard"
              label="Product Name"
              name="productName"
              defaultValue={selectedProduct?.name}
            />

            {/* PRODUCT PRICE */}
            <TextField
              type="text"
              variant="standard"
              label="Price"
              name="Price"
              defaultValue={selectedProduct?.price}
            />

            {/* PRODUCT DISCOUNT */}
            <TextField
              type="text"
              variant="standard"
              label="Discount"
              name="discount"
              defaultValue={selectedProduct?.discount}
            />

            {/* PRODUCT DESCRIPTION */}
            <div className="flex flex-col gap-2">
              <Typography
                level="body-md"
                sx={{ fontSize: "12px", color: "#666666" }}
              >
                Description
              </Typography>
              <Textarea
                type="text"
                variant="standard"
                label="Description"
                name="description"
                defaultValue={selectedProduct?.description}
                minRows={3} // Minimum number of rows
                maxRows={6} // Maximum number of rows before scrolling
              />
            </div>

            {/* IMAGE */}
            <div className="flex flex-col gap-2">
              <Typography
                level="body-md"
                sx={{ fontSize: "12px", color: "#666666" }}
              >
                Product Image
              </Typography>
              <div className="w-full h-[200px] flex items-center justify-center border rounded-md cursor-pointer overflow-hidden">
                <Swiper
                  navigation
                  pagination={{ clickable: true }}
                  modules={[Navigation, Pagination]}
                  className="!h-full w-full"
                >
                  {selectedProduct?.image.map((src, index) => (
                    <SwiperSlide
                      key={index}
                      className="flex items-center justify-center"
                    >
                      <img
                        src={`/server/api/upload/image/${src}`}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-full object-contain"
                        onClick={() => setImageOpen(true)}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* IMAGE ZOOM MODAL */}
            <Modal
              open={imageOpen}
              onClose={() => setImageOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 2,
                  width: "80vw",
                  height: "80vh",
                  outline: "none",
                  borderRadius: 1,
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Swiper
                  navigation
                  pagination={{ clickable: true }}
                  modules={[Navigation, Pagination]}
                  className="rounded-lg shadow-lg w-full h-full"
                >
                  {selectedProduct?.image.map((src, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={`/server/api/upload/image/${src}`}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            </Modal>

            {/* PRODUCT RATING */}
            <TextField
              type="text"
              variant="standard"
              label="Rating"
              name="rating"
              defaultValue={selectedProduct?.rating}
              disabled
            />

            <div>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#111827",
                  "&:hover": {
                    backgroundColor: "#16a34a",
                  },
                }}
                type="submit"
              >
                Save Changes
              </Button>
              <Button
                variant="contained"
                onClick={handleClose}
                sx={{
                  mt: 2,
                  ml: 1,
                  color: "white",
                  backgroundColor: "#111827",
                  "&:hover": {
                    backgroundColor: "#991b1b",
                  },
                }}
              >
                Cancel
              </Button>
            </div>
            {/* INSIDE MODULE BUTTONS */}
          </form>
        </Box>
      </Modal>
      <SnackbarComponent />
      <DeleteConfirmation
        open={deleteConfirmation.open}
        message={`Are you sure you want to delete this product? This action cannot be undone.`}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
