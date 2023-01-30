import api from '../services/axios';
import { useEffect, useState } from "react";
import { notifyError } from "../utils/toast";

export function useLoading() {
    const [openLoading, setOpenLoading] = useState(false);

    useEffect(() => {
        api.interceptors.request.use(
            (config) => {
                if (config) {
                    setOpenLoading(true);
                }
                return config;
            },
            (error) => {
                notifyError(error.response.data || 'Erro inesperado');
                setOpenLoading(false);
                return error.response;
            }
        )

        api.interceptors.response.use(
            (response) => {
                setOpenLoading(false);
                return response;
            },
            (error) => {
                setOpenLoading(false);
                if (error.response.data === 'Auth Error') {
                    window.location.reload();
                    return
                }
                return error.response;
            }
        )
    }, []);

    return {
        openLoading, setOpenLoading
    }
}