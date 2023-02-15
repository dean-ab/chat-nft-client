import axios from "axios";

const baseUrl = "http://localhost:3000";

const axiosClient = axios.create({ baseURL: baseUrl });

export function createNft(name: string, prompt: string) {
  const userId = getUserId();
  return axios.post(`http://localhost:3000/images`, {
    name,
    prompt,
    id: userId,
  });
}

export function getMyImages() {
  const userId = getUserId();
  return axios.get(`http://localhost:3000/images/${userId}`);
}

function getUserId() {
  return window.localStorage.getItem("userId") as string;
}
