import axios from "axios";

export default function useAxios(customBaseUrl?: boolean) {

    const config = useRuntimeConfig();

    let api = axios.create({
        baseURL: config.public.url,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
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