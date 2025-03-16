import { PUBLIC_API_URL } from "$env/static/public";

// with timeout and error, returns a {data, error}
const fetchWithErrorHandling = async (url, options) => {
    const timeoutMs = 5000;
    try {
        const response = await fetch(
            url,
            {
                signal: AbortSignal.timeout(timeoutMs),
                ...options,
            },
        );
        if (response.ok) {
            const data = await response.json();
            return {data: data, error: null};
        }
        else
            return {data: null, error: response.statusText};
    } 
    catch (error) {
        return {data: null, error: error};
    }
    
    
};

// const getQuestions = async () => {
//     const response = await fetchWithErrorHandling(
//         `${PUBLIC_API_URL}/courses/1/questions`, 
//         {}
//     );

//     if (response.data)
//         return response.data;
//     if (response.error)
//         console.log("[!] getQuestion", response.error);
// };

// const postQuestion = async (data) => {
//     const response = await fetchWithErrorHandling(
//         `${PUBLIC_API_URL}/courses/1/questions`,
//         {
//             headers: {"Content-Type": "application/json"},
//             method: "POST",
//             body: JSON.stringify(data),
//         }
//     );

//     if (response.data) {
//         return response.data;
//     }
//     if (response.error)
//         console.log("[!] postQuestion", response.error);
    
// };

// const upvoteQuestion = async (qId) => {
//     const response = await fetchWithErrorHandling(
//         `${PUBLIC_API_URL}/courses/1/questions/${qId}/upvote`, 
//         {
//             method: "POST",
//         }
//     );

//     if (response.data) {
//         return response.data;
//     }
//     if (response.error)
//         console.log("[!] upvoteQuestion", response.error);
// };

// const deleteQuestion = async (qId) => {
//     const response = await fetchWithErrorHandling(
//         `${PUBLIC_API_URL}/courses/1/questions/${qId}`, 
//         {
//             method: "DELETE",
//         }
//     );

//     if (response.data) {
//         return response.data;
//     }
//     if (response.error)
//         console.log("[!] deleteQuestion", response.error);
// };

// export { getQuestions, postQuestion, upvoteQuestion, deleteQuestion };