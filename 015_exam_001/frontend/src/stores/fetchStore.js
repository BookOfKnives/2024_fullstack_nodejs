

export async function fetchPost(data, url) {

    // return await fetch(BASE_URL + urlEnd, {
    return await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data),
    });
}

