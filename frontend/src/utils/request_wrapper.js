import axios from "axios";

export const requestWrapper = async (url, body, option = {}, header) => {
  try {
    let response;
    if (option === "GET") {
      response = await axios.get(url, {
        headers: {
          "Content-Type": header,
        },
        withCredentials: true,
      });
    } else if (option === "POST") {
      response = await axios.post(url, body, {
        headers: {
          "Content-Type": header,
        },
        withCredentials: true,
      });
    } else if (option === "PUT") {
      response = await axios.put(url, body, {
        headers: {
          "Content-Type": header,
        },
        withCredentials: true,
      });
    } else if (option === "PATCH") {
      response = await axios.patch(url, body, {
        headers: {
          "Content-Type": header,
        },
        withCredentials: true,
      });
    } else if (option === "DELETE") {
      response = await axios.delete(url, {
        headers: {
          "Content-Type": header,
        },
        withCredentials: true,
        data: body,
      });
    } else {
      return new Error("Something went wrong");
    }

    // console.log(response)
    return response;
  } catch (error) {
    // console.log(error);

    // if (error.status === 401) {
    //   console.log("refreshToken route");
    //   try {
    //     const refreshToken = getStorageData("refreshToken");
    //     const res = await axios.post(
    //       `${import.meta.env.VITE_AUTH_API}/refreshToken`,
    //       {},
    //       {
    //         headers: {
    //           Authorization: `bearer ${refreshToken}`,
    //         },
    //       }
    //     );

    //     if (res.status === 200) {
    //       setStorageData("accessToken", res.data.data.accessToken);
    //       setStorageData("refreshToken", res.data.data.refreshToken);
    //       const response = await requestWrapper(url, body, option);
    //       return response;
    //     }
    //     throw res;
    //   } catch (err) {
    //     console.log(err);
    //     return {
    //       status: 401,
    //       message: err.message,
    //     };
    //   }
    // }
    return error;
  }
};
