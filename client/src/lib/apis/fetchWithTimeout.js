// with timeout
export const fetchWithTimeout = async (url, options) => {
    const timeoutMs = 5000;
    try {
        const response = await fetch(
            url,
            {
                signal: AbortSignal.timeout(timeoutMs),
                ...options,
            },
        );
        if (!response.ok) {
          console.log("Something went wrong fetching", url);
        }
        return response;
    } 
    catch (error) {
        console.log("Error while fetching:", error);
        return {data: null, error: error};
    }
};
