import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    if (typeof window === "undefined") {
      return config;
    }

    const customJWT = document.cookie
      .split("; ")
      .find((row) => row.startsWith("customJWT="))
      ?.split("=")[1];

    if (customJWT) {
      config.headers["Authorization"] = `Bearer ${customJWT}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response?.data === "Unauthorized") {
      // removing key
      document.cookie =
        "customJWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export default axios;
