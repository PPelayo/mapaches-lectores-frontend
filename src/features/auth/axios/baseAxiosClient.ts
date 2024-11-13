import axios from "axios";
import https from "https";

export const baseAxiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    httpAgent: new https.Agent({
        rejectUnauthorized: false
    }),
    headers: {
        'Content-Type': 'application/json'
    }
})