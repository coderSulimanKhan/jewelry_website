import { Schema, model } from "mongoose"

const rateSchema = new Schema({
  gold_t: Number
}, { timestamps: true });

const Rate = model("Rate", rateSchema);

export default Rate;