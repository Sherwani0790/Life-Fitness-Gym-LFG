import axios from "axios";

// Create an axios instance with base configuration
export const apiKB = axios.create({
  baseURL: "/api", // Adjust this to your actual API base URL
  headers: {
    "Content-Type": "application/json",
  },
});
