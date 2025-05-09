// export const BASE_URL="/api"; //production
export const BASE_URL= location.hostname === "localhost" ? "http://localhost:3000" : "/api"

// changed url for backend
// this will be reflected in network calls