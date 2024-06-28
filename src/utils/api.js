import axios from "axios";

export const apiCall = async (data) => {
  try {
    const response = await axios.post("https://fahim-vaiya-task.vercel.app/api/customers", data);
    return response.data;
  } catch (error) {
    throw new Error("Something wrong Api call failed");
  }
};
