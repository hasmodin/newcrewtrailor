import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  // Customer & Header Details
  date: { type: Date, default: Date.now },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  company: { type: String },
  fittingDate: Date,
  deliveryDate: Date,
  remarks: String,

  // Item Quantities
  quantities: {
    jackets: { type: Number, default: 0 },
    shirts: { type: Number, default: 0 },
    trousers: { type: Number, default: 0 },
    skirts: { type: Number, default: 0 },
    blouses: { type: Number, default: 0 },
    dresses: { type: Number, default: 0 },
    chef: { type: Number, default: 0 },
    apron: { type: Number, default: 0 },
    waistcoat: { type: Number, default: 0 },
    drCoat: { type: Number, default: 0 },
    alterations: { type: Number, default: 0 },
  },

  // Measurements
  measurements: {
    top: {
      length: String,
      shoulder: String,
      sleeveLength: String,
      cuff: String,
      chest: String,
      waist: String,
      hip: String,
      backWidth: String,
      bicep: String,
      neck: String,
      vestLength: String,
    },
    bottom: {
      length: String,
      frontRise: String,
      insideLength: String,
      waist: String,
      hip: String,
      thigh: String,
      knee: String,
      bottom: String,
      highRise: String,
      skirtsLength: String,
      alterations: String,
    },
  },

  // Style Details
  topStyle: {
    jacketButtons: String,
    jacketVent: String,
    jacketLapel: String,
    handStitch: String,
    vestButton: String,
    shirtCollar: String,
    shirtPatti: String,
    shirtsCuff: String,
    shirtsCut: String,
    shirtsPocket: String,
    waistcoat: String,
  },
  bottomStyle: {
    trBelt: String,
    trPocket: String,
    hipPocket: String,
    trTurnup: String,
    trRPlate: String,
    trLoops: String,
    skirtsLoops: String,
    skirtsVent: String,
  },
});

export const Order = mongoose.model("Order", OrderSchema);
