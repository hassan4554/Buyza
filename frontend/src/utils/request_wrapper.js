import axios from "axios";
import { getFromLocalStorage } from "./helper";

export const requestWrapper = async (url, body, option = {}, header) => {
  try {
    const token = getFromLocalStorage("token");
    const seller_token = getFromLocalStorage("Seller_token");

    let response;
    if (option === "GET") {
      response = await axios.get(url, {
        headers: {
          "Content-Type": header,
          Authorization: `Bearer ${token}`,
          "X-Seller-Token": seller_token,
        },
      });
    } else if (option === "POST") {
      response = await axios.post(url, body, {
        headers: {
          "Content-Type": header,
          Authorization: `Bearer ${token}`,
          "X-Seller-Token": seller_token,
        },
      });
    } else if (option === "PUT") {
      response = await axios.put(url, body, {
        headers: {
          "Content-Type": header,
          Authorization: `Bearer ${token}`,
          "X-Seller-Token": seller_token,
        },
      });
    } else if (option === "PATCH") {
      response = await axios.patch(url, body, {
        headers: {
          "Content-Type": header,
          Authorization: `Bearer ${token}`,
          "X-Seller-Token": seller_token,
        },
      });
    } else if (option === "DELETE") {
      response = await axios.delete(url, {
        headers: {
          "Content-Type": header,
          Authorization: `Bearer ${token}`,
          "X-Seller-Token": seller_token,
        },
        data: body,
      });
    } else {
      return new Error("Something went wrong");
    }

    return response;
  } catch (error) {
    return error;
  }
};
