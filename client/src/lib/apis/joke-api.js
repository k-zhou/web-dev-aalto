import { PUBLIC_JOKES_API_URL } from "$env/static/public";

const getJoke = async () => {
    const response = await fetch(`${PUBLIC_JOKES_API_URL}/random`);
    return await response.json();
};

export { getJoke };