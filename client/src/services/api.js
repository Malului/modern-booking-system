import axios from "axios";

const API_URL = 'http://localhost:3000/api/v1'

//Create axios instance with base URL
const api = axios.create({
    baseURL: API_URL
});


//Search availability
export const searchAvailability = {
    getAvailability : (bookingData) => api.post('/search/availability', bookingData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export default api