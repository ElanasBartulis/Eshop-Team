import {
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Textarea from "@mui/joy/Textarea";
import { useState } from "react";

// PVZ
const products = [
  {
    id: 1,
    name: "Xbox 360",
    price: 299,
    discount: 15,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt porta lacinia. Curabitur sed arcu et orci ornare volutpat. Morbi",
    rating: 4.5,
  },
  {
    id: 2,
    name: "PlayStation 4",
    price: 349,
    discount: 10,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt porta lacinia. Curabitur sed arcu et orci ornare volutpat. Morbi",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Nintendo Switch",
    price: 299,
    discount: 5,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt porta lacinia. Curabitur sed arcu et orci ornare volutpat. Morbi",
    rating: 4.8,
  },
  {
    id: 4,
    name: "Samsung Galaxy S21",
    price: 799,
    discount: 20,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt porta lacinia. Curabitur sed arcu et orci ornare volutpat. Morbi",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Apple MacBook Air",
    price: 999,
    discount: 10,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt porta lacinia. Curabitur sed arcu et orci ornare volutpat. Morbi",
    rating: 4.9,
  },
  {
    id: 6,
    name: "Google Pixel 6",
    price: 599,
    discount: 12,
    description:
      "High-performance phone with an advanced camera and long-lasting battery for everyday use.",
    rating: 4.7,
  },
  {
    id: 7,
    name: "Dell XPS 13",
    price: 1199,
    discount: 18,
    description:
      "A premium ultrabook with a stunning display and exceptional build quality for professionals.",
    rating: 4.8,
  },
  {
    id: 8,
    name: "Sony WH-1000XM5",
    price: 349,
    discount: 8,
    description:
      "Industry-leading noise-canceling headphones with superb sound quality and comfortable design.",
    rating: 4.9,
  },
  {
    id: 9,
    name: "GoPro HERO 10",
    price: 399,
    discount: 25,
    description:
      "A compact action camera capable of shooting 5.3K video with incredible stabilization.",
    rating: 4.6,
  },
  {
    id: 10,
    name: "Kindle Paperwhite",
    price: 129,
    discount: 5,
    description:
      "A waterproof e-reader with a high-resolution display and adjustable warm light.",
    rating: 4.8,
  },
];

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
            const product = rows.find((row) => row.id === params.id);
            console.log(product);
            handleEdit(product);
          }}
        />
        <DeleteForeverIcon
          sx={{ cursor: "pointer", color: "red" }}
          onClick={() => {
            const product = rows.find((row) => row.id === params.id);
            handleDelete(product);
          }}
        />
      </>
    ),
  },
];

// Map every product
const rows = products.map((product) => ({
  id: product.id,
  productName: product.name,
  price: product.price,
  discount: product.discount,
  description: product.description,
  rating: product.rating,
}));

const paginationModel = { page: 0, pageSize: 10 };

export default function ProductList() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  function handleEdit(id) {
    setSelectedProduct(id);
    setOpen(true);
  }
  function handleDelete(id) {
    console.log(id);
  }
  function handleClose() {
    setOpen(false);
    setSelectedProduct(null);
  }
  return (
    <>
      {/* TABLE */}
      <Paper sx={{ minHeight: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns(handleEdit, handleDelete)}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 15, 20, 25, 50]}
          sx={{ border: 0 }}
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
          <div className="flex flex-col gap-4">
            <TextField
              type="text"
              variant="standard"
              label="Product Name"
              name="productName"
              value={selectedProduct ? selectedProduct.productName : ""}
            />

            {/* PRODUCT PRICE */}
            <TextField
              type="text"
              variant="standard"
              label="Price"
              name="Price"
              value={selectedProduct ? selectedProduct.price : ""}
            />

            {/* PRODUCT DISCOUNT */}
            <TextField
              type="text"
              variant="standard"
              label="Discount"
              name="discount"
              value={selectedProduct ? selectedProduct.discount : ""}
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
                value={selectedProduct ? selectedProduct.description : ""}
              />
            </div>

            {/* PRODUCT RATING */}
            <TextField
              type="text"
              variant="standard"
              label="Rating"
              name="rating"
              value={selectedProduct ? selectedProduct.rating : ""}
              disabled
            />
          </div>

          {/* INSIDE MODULE BUTTONS */}
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              mt: 2,
              backgroundColor: "#111827",
              "&:hover": {
                backgroundColor: "#16a34a",
              },
            }}
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
        </Box>
      </Modal>
    </>
  );
}
