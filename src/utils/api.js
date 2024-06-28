import axios from "axios";

export const apiCall = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/api/customers", data);
    return response.data;
  } catch (error) {
    throw new Error("Something wrong Api call failed");
  }
};
