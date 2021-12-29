import axios, {AxiosInstance} from "axios";

export const server = (): AxiosInstance => {
  return axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 15000,
    headers: {
      "Content-type": "application/json"
    }
  })
}