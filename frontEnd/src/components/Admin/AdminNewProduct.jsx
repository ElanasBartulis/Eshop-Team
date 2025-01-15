import { TextField } from "@mui/material";
import { useContext, useState } from "react";
import SessionContext from "../../context/SessionContext";

export default function NewProduct() {
  const { setErrorHandler } = useContext(SessionContext);

  const [minMaxPriceInput, setMinMaxPriceInput] = useState("");
  const [minMaxDiscountInput, setMinMaxDiscountInput] = useState("");
  const [fileInput, setFileInput] = useState(null);

  function handleNumberChange(min, max, event, setter) {
    const value = event.target.value;
    if (value === "" || (Number(value) >= min && Number(value) <= max)) {
      setter(value);
    }
  }

  function handleFileChange(e) {
    setFileInput(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (!fileInput) {
      setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: "Please upload an image first",
        alertColor: "error",
      });
      return;
    }

    try {
      // IMAGE UPLOAD
      const imageUploadPromise = await fetch("/server/api/upload/image", {
        method: "POST",
        body: formData,
      });

      const imageUploadResponse = await imageUploadPromise.json();

      if (!imageUploadResponse.ok) {
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage:
            imageUploadResponse.error || "Failed to upload image",
          alertColor: "error",
        });
      }
      ///////////////////////////////////

      const productData = {
        name: formData?.get("productName"),
        price: +formData?.get("price"),
        discount: +formData?.get("discount"),
        description: formData?.get("description"),
        rating: 0,
        image: imageUploadResponse.file.path.toString(),
      };

      // Jei ne visi fieldai uzpildyti, nesiusti formos.
      if (
        !productData.name ||
        !productData.price ||
        !productData.discount ||
        productData.discount === 0 ||
        !productData.description ||
        !fileInput
      ) {
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage:
            "Please fill in all the fields & upload an image before submitting.",
          alertColor: "error",
        });
        return;
      }

      // INPUTS
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

  return (
    <>
      <div>
        <h2 className="text-xl font-bold mb-4">Add new product</h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="flex flex-col gap-14"
        >
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

          <input type="file" name="addProduct" onChange={handleFileChange} />

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
