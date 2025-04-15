import { PUBLIC_API_URL } from "$env/static/public";
import { fetchWithErrorHandling } from "$lib/apis/fetchWithErrorHandling";

const getQuestions = async (id) => {
    const response = await fetchWithErrorHandling(
        `${PUBLIC_API_URL}/api/courses/${id}/questions`, 
        {}
    );

    if (response.data)
        return response.data;
    if (response.error)
        console.log("[!] getQuestion", response.error);
};

const postQuestion = async (id, data) => {
    const response = await fetchWithErrorHandling(
        `${PUBLIC_API_URL}/api/courses/${id}/questions`,
        {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(data),
        }
    );

    if (response.data) {
        return response.data;
    }
    if (response.error)
        console.log("[!] postQuestion", response.error);
    
};

const upvoteQuestion = async (id, qId) => {
    const response = await fetchWithErrorHandling(
        `${PUBLIC_API_URL}/api/courses/${id}/questions/${qId}/upvote`, 
        {
            method: "POST",
        }
    );

    if (response.data) {
        return response.data;
    }
    if (response.error)
        console.log("[!] upvoteQuestion", response.error);
};

const deleteQuestion = async (id, qId) => {
    const response = await fetchWithErrorHandling(
        `${PUBLIC_API_URL}/api/courses/${id}/questions/${qId}`, 
        {
            method: "DELETE",
        }
    );

    if (response.data) {
        return response.data;
    }
    if (response.error)
        console.log("[!] deleteQuestion", response.error);
};

export { getQuestions, postQuestion, upvoteQuestion, deleteQuestion };