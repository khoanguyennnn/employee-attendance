// import axios from "axios";
import axios from "./axios";

const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`);
}

export { fetchAllUser };