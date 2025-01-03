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
    renderCell: (param) => (
      <>
        <EditIcon
          sx={{ cursor: "pointer" }}
          onClick={() => handleEdit(param.row.id)}
        />
        <DeleteForeverIcon
          sx={{ cursor: "pointer", color: "red" }}
          onClick={() => handleDelete(param.row.id)}
        />
      </>
    ),
  },
];

// Map threw every product
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
    console.log(id);
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
      <Paper sx={{ minHeight: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns(handleEdit, handleDelete)}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 15, 20, 25, 50]}
          sx={{ border: 0 }}
        />
      </Paper>
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
          <Typography variant="h6">Edit Product</Typography>

          {/* Reikia pagriebti esamas lenteles value cia, turbut naudosiu .map  */}
          <div>
            <TextField
              type="text"
              variant="standard"
              label="Product Name"
              name="productName"
            />
          </div>

          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              mt: 2,
              backgroundColor: "#111827",
              "&:hover": {
                backgroundColor: "#991b1b", // Optional: Define hover color
              },
            }}
          >
            Save Changes
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClose}
            sx={{ mt: 2, ml: 1 }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
}
