import { PUBLIC_API_URL } from "$env/static/public";
import { fetchWithErrorHandling } from "$lib/apis/fetchWithErrorHandling";

const getAllCourses = async (id) => {
    const response = await fetchWithErrorHandling(
        `${PUBLIC_API_URL}/api/courses`, 
        {}
    );

    if (response.data)
        return response.data;
    if (response.error)
        console.log("[!] getAllCourses", response.error);
};

const getOneCourse = async (id) => {
    const response = await fetchWithErrorHandling(
        `${PUBLIC_API_URL}/api/courses/${id}`, 
        {}
    );

    if (response.data)
        return response.data;
    if (response.error)
        console.log("[!] getOneCourse", response.error);
};

const postCourse = async (data) => {
    const response = await fetchWithErrorHandling(
        `${PUBLIC_API_URL}/api/courses`,
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
        console.log("[!] postCourse", response.error);
    
};

const deleteCourse = async (id) => {
    const response = await fetchWithErrorHandling(
        `${PUBLIC_API_URL}/api/courses/${id}`, 
        {
            method: "DELETE",
        }
    );

    if (response.data) {
        return response.data;
    }
    if (response.error)
        console.log("[!] deleteCourse", response.error);
};

export { getAllCourses, getOneCourse, postCourse, deleteCourse };