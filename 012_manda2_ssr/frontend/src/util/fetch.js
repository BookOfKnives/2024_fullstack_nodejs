const base_url = "http://localhost:8080/";


export async function fetchPost(data, urlEnd) {
    return await fetch(base_url + urlEnd, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data),
    });
}