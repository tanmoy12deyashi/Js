import axios from "axios";

export default axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: "Client-ID hCkAVlQ5o-EDuzxK-H7tB-UlgtWlK_3jYbMa49vtcYU"
  }
})