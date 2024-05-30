import { readable } from "svelte/store";

const base_url = "http://localhost:8080";

export const userApiUrl = readable(base_url + "/api/users");
export const sessionApiUrl = readable(base_url + "/api/sessions");
export const BASE_URL = readable(base_url);
export const debug = readable(false); //set true if debugging