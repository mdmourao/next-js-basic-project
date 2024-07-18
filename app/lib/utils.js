import axios from "axios";

// Fetcher function that returns a promise
// Used to fetch data from the server with SWR
// We can use another HTTP client library like fetch
export function defaultFetcher() {
    return (url) => axios(url).then((res) => res.data);
}