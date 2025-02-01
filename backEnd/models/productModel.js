import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

const productModel = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }, //sukurimo metu neprideti
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
    },
    description: {
      type: DataTypes.TEXT("medium"),
      charset: "utf8mb4", // Supports full Unicode character set including emojis
      collate: "utf8mb4_unicode_ci", // Case-insensitive Unicode collation
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    image: {
      type: DataTypes.JSON,
      get() {
        const value = this.getDataValue("image"); // Get raw value from database
        if (Array.isArray(value)) {
          return value; // Return if already an array
        }
        if (typeof value === "string" && !value.startsWith("[")) {
          return [value]; // If single filename string, wrap in array
        }
        try {
          return value ? JSON.parse(value) : []; // Try to parse JSON string into array
        } catch (error) {
          return [value]; // If parsing fails, wrap value in array
        }
      },
      set(value) {
        if (Array.isArray(value)) {
          this.setDataValue("image", value); // Stores array as JSON string
        } else if (typeof value === "string") {
          this.setDataValue("image", [value]); // Wraps single image in array and stores as JSON
        } else {
          this.setDataValue("image", "[]"); // Handles null/undefined by storing empty array
        }
      },
    },
  },
  { timestamps: true }
);

export default productModel;
