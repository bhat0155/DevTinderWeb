// export const BASE_URL="/api"; //production
export const BASE_URL= location.hostname === "localhost" ? "http://localhost:3000" : "/api"
export const STRIPE_SECRET_KEY = "sk_test_51RPYlvQhfEops549qtBv4mdJtiuc5xUU5uFgGnFaPZIFQLTgWV2YE8XT0yB16iLUhIQnBuWJftjN5deMliYsTJEW00984T0LW9"

// changed url for backend
// this will be reflected in network calls