// with timeout and error, returns a {data, error}
export const fetchWithErrorHandling = async (url, options) => {
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
