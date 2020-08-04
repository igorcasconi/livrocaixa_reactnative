import axios from "axios";

const DatabaseService = axios.create({baseURL: "http://igorcasconi-dev.umbler.net/api"});

export const config = {
    headers: {'X-My-Custom-Header': 'Header-Value'}
};

export default DatabaseService;