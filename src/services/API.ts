const ENV = import.meta.env;
const BASE_URL = "https://api.themoviedb.org/3";

const API_CONFIG = {
    method: "GET",
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${ENV.VITE_API_READ_ONLY_KEY}`,
    },
};

// Funzione per ottenere i film popolari
export const getPopularMovie = async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular`, API_CONFIG);
        if (!response.ok) throw new Error(`Errore API: ${response.status}`);

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Errore nella richiesta API:", error);
        return [];
    }
};

// Test API con fetch
(async () => {
    try {
        const response = await fetch(
            `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
            API_CONFIG,
        );

        if (!response.ok) throw new Error(`Errore API: ${response.status}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Errore nella fetch:", error);
    }
})();
