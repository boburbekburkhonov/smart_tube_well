import axios from "axios";
import { api } from "../API";

export const getDataApi = async (url, token) => {
    const res = await axios.get(`${api}/${url}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return res;
};

export const postDataApi = async (url, post, token) => {
    const res = await axios.post(
        `${api}/${url}`,
        post,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }
    );

    return res;
};