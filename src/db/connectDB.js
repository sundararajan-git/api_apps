import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
