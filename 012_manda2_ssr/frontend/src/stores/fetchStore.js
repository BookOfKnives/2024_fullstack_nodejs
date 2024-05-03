import { writable } from "svelte/store";
import { BASE_URL } from "./generalStore";

export async function fetchPost(data, urlEnd) {
    return await fetch(BASE_URL + urlEnd, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data),
    });
}

