import Textarea from "@mui/joy/Textarea";
import { Button, styled, TextField } from "@mui/material";
import { useContext, useState } from "react";
import SessionContext from "../../context/SessionContext";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function NewProduct() {
  const { setErrorHandler } = useContext(SessionContext);

  const [minMaxPriceInput, setMinMaxPriceInput] = useState("");
  const [minMaxDiscountInput, setMinMaxDiscountInput] = useState("");

  function handleNumberChange(min, max, event, setter) {
    const value = event.target.value;
    if (value === "" || (Number(value) >= min && Number(value) <= max)) {
      setter(value);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const productData = {
      name: formData?.get("productName"),
      price: +formData?.get("price"),
      discount: +formData?.get("discount"),
      description: formData?.get("description"),
      rating: 0,
    };

    // Jei ne visi fieldai uzpildyti, nesiusti formos.
    if (
      !productData.name ||
      !productData.price ||
      !productData.discount ||
      !productData.description
    ) {
      setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: "Please fill in all the fields before submitting.",
        alertColor: "error",
      });
      return;
    }

    try {
      const promise = await fetch(`http://localhost/server/api/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      const response = await promise.json();

      if (promise.ok) {
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: "Product successfully created!",
          alertColor: "success",
        });
      } else {
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: response.error || "Failed to create product",
          alertColor: "error",
        });
      }
    } catch (error) {
      setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: error || "An error occurred",
        alertColor: "error",
      });
    }
  }

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <>
      <div>
        <h2 className="text-xl font-bold mb-4">Add new product</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-14">
          <TextField
            variant="outlined"
            type="text"
            fullWidth
            // required
            label="Product name"
            name="productName"
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "rgb(17 24 39)",
              },

              "& .MuiInputLabel-root": {
                color: "rgb(17 24 39)",
              },
            }}
          />
          <TextField
            variant="outlined"
            type="number"
            fullWidth
            label="Price"
            name="price"
            // required
            value={minMaxPriceInput}
            onChange={(event) =>
              handleNumberChange(0, 1000000, event, setMinMaxPriceInput)
            }
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "rgb(17 24 39)",
              },

              "& .MuiInputLabel-root": {
                color: "rgb(17 24 39)",
              },
            }}
          />
          <TextField
            variant="outlined"
            type="number"
            fullWidth
            label="Discount"
            name="discount"
            // required
            value={minMaxDiscountInput}
            onChange={(event) =>
              handleNumberChange(0, 99, event, setMinMaxDiscountInput)
            }
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "rgb(17 24 39)",
              },

              "& .MuiInputLabel-root": {
                color: "rgb(17 24 39)",
              },
            }}
          />
          <div className="flex flex-col gap-2">
            <TextField
              multiline
              variant="outlined"
              name="description"
              placeholder="Description"
              fullWidth
              // required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "rgb(17 24 39)",
                    borderWidth: 2,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "rgb(17 24 39)",
                },
              }}
            />
          </div>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{
              height: "3.25rem",
              backgroundColor: "#111827",
              "&:hover": {
                transition: "all 0.15s ease-in-out",
                color: "#white",
                background: "#991b1b",
              },
            }}
          >
            Upload Photo
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => console.log(event.target.files)}
              multiple
            />
          </Button>
          <button
            type="submit"
            className="block w-full rounded bg-gray-900 p-4 text-gray-50 text-sm font-medium transition hover:scale-105 hover:text-red-800"
          >
            Add new product
          </button>
        </form>
      </div>
    </>
  );
}
