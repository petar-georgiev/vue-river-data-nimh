import axios from "axios";
const BASIN_API_BASE_URL = 'http://localhost:8080/api/'

class RiverFetcherService{
    getRivers(river){
        return axios.get(`${BASIN_API_BASE_URL}${river}`)
    }
    getRiversByStartEndDate(river,startDate,endDate){
        return axios.get(`${BASIN_API_BASE_URL}${river}/date/${startDate}/${endDate}`)
    }
}

export default new RiverFetcherService()