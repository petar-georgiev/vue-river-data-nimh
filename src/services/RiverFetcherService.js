import axios from "axios";
//const BASIN_API_BASE_URL = 'http://212.72.212.9:19000/api/'
//const BASIN_API_BASE_URL = 'http://localhost:8080/api/'
const BASIN_API_BASE_URL = 'https://river-data-nimh.onrender.com/api/'

class RiverFetcherService{
    getRivers(river){
        return axios.get(`${BASIN_API_BASE_URL}${river}`)
    }
    getRiversByStartEndDate(river,startDate,endDate){
        return axios.get(`${BASIN_API_BASE_URL}${river}/date/${startDate}/${endDate}`)
    }
}

export default new RiverFetcherService()