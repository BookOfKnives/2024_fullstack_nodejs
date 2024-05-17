import { writable } from "svelte/store";

export const userLoginStatus = writable(false);
export const userName = writable("");
//2804 2024 oughta call this something thats NOT "login"