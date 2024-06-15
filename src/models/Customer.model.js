const { Schema, models, model } = require("mongoose");

const CustomerAddressSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const CustomerAddress =
  models?.CustomerAddress || model("CustomerAddress", CustomerAddressSchema);
