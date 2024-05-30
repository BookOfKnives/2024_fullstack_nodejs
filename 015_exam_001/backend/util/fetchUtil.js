export async function fetchPost(url, data) {
    return await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data),
    });
}

export async function fetchPatch(url, data) {
    return await fetch(url, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type":"application/json",
        },    
        body: JSON.stringify(data),
    });    
}    
export async function fetchPatchNoData(url) {
    let data = {};
    return await fetch(url, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type":"application/json",
        },    
        body: JSON.stringify(data),
    });    
}    

export async function fetchGet(url) {
    return await fetch(url, {
        method: "GET",
        credentials: "include",
    });    
}    
