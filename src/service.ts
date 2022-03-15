import { SearchType } from "./constant";
import axios from "axios";

const token = process.env.REACT_APP_TOKEN;

const endpoint = "https://api.github.com";
export interface IParams {
    type: string;
    query: string;
    sort: string;
    direction: string;
    page: number;
    per_page: number;
}

export const fetchRepos = (params: IParams) => {
    const { type, query, page, per_page, sort, direction } = params;
    if (type === SearchType.Org) {
        return axios.get(`${endpoint}/orgs/${query}/repos`, {
            params: {
                type: "all",
                page,
                per_page,
                sort,
                direction,
            },
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
    }

    return axios.get(`${endpoint}/users/${query}/repos`, {
        params: {
            type: "owner",
            page,
            per_page,
            sort,
            direction,
        },
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
};
