import axios from "axios";

const { NODE_ENV } = process.env;

const baseURL =
  NODE_ENV === "development" ? "http://localhost:8000/api/" : "https://budget-machine-api.herokuapp.com/api/";

const axiosInstance = axios.create({ baseURL });

const api = {
  data: {
    incomeExpense() {
      return axiosInstance.get("income-expense");
    },
    calendar() {
      return axiosInstance.get("calendar");
    },
    category() {
      return axiosInstance.get("category");
    },
  },
};

export default api;
