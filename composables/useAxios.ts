import axios from "axios";

export default function useAxios() {

    const config = useRuntimeConfig();
    const customUrl = config.public.url;

    let api = axios.create({
        baseURL: customUrl,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${config.public.token}`
        },
        withCredentials: true,
        withXSRFToken: true,
    })


    async function csrf() {
        return await api.get("/sanctum/csrf-cookie")
    }

    return {
        api, csrf
    }
}