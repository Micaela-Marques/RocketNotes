import axios from "axios";

export const api = axios.create({
    baseURL: "https://rocketnotes-api-va7s.onrender.com" 
});
