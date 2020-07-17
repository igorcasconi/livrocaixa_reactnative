import axios from "axios";

const DatabaseService = axios.create({baseURL: "http://igorcasconi-dev.umbler.net/api"});

export default DatabaseService;