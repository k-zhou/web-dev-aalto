import { PUBLIC_API_URL } from "$env/static/public";
import { fetchWithTimeout } from "./fetchWithTimeout";

const postNote = async (data, options) => {
    const response = await fetchWithTimeout(
        `${PUBLIC_API_URL}/api/notes`,
        {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(data),
            ...options
        }
    );

    if (response.error)
        console.log("[!] postNote", response.error);
    return response;
};

const getAllNotes = async (options) => {
    const response = await fetchWithTimeout(
        `${PUBLIC_API_URL}/api/notes`, 
        {
            ...options
        }
    );
    // console.log("notes api", response);
    // if (response.data)
    //     return response.data;
    if (response.error)
        console.log("[!] getAllNotes", response.error);
    return response;
};

const getOneNote = async (id, options) => {
    const response = await fetchWithTimeout(
        `${PUBLIC_API_URL}/api/notes/${id}`, 
        {
            ...options
        }
    );

    if (response.error)
        console.log("[!] getOneNote", response.error);
    return response;
};

const editNote = async (id, data, options) => {
    const response = await fetchWithTimeout(
        `${PUBLIC_API_URL}/api/notes/${id}`,
        {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(data),
            ...options
        }
    );

    if (response.error)
        console.log("[!] editNote", response.error);
    return response;
};

const deleteNote = async (id, options) => {
    const response = await fetchWithTimeout(
        `${PUBLIC_API_URL}/api/notes/${id}`, 
        {
            method: "DELETE",
            ...options
        }
    );

    if (response.error)
        console.log("[!] deleteNote", response.error);
    return response;
};

export { postNote, getAllNotes, getOneNote, editNote, deleteNote };