import axios from "axios";

export default function useAxios(customBaseUrl?: boolean) {

    const config = useRuntimeConfig();
    const customUrl = customBaseUrl ? config.public.baseUrl : config.public.url;

    let api = axios.create({
        baseURL: customUrl,
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