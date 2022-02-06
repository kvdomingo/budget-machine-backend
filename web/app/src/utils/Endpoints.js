import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const baseURL = "/api/";

const axiosInstance = axios.create({ baseURL });

const api = {
  data: {
    getIncomesExpenses() {
      return axiosInstance.get("income-expense");
    },
    getCalendar() {
      return axiosInstance.get("calendar");
    },
    getCategories() {
      return axiosInstance.get("category");
    },
    createCategory(data) {
      return axiosInstance.post("category", data, {
        headers: {
          "X-CSRFToken": cookies.get("csrftoken"),
        },
      });
    },
  },
};

export default api;
