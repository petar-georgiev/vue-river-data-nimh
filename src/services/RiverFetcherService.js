import axios from "axios";
const DUNABE_BASIN_API_BASE_URL = 'http://localhost:8080/api/'

class DunabeBasinService{
    getRivers(river){
        return axios.get(`${DUNABE_BASIN_API_BASE_URL}${river}`)
    }
}

export default new DunabeBasinService()