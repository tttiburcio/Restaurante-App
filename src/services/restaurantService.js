import api from '../api'

export const createRestaurant = async (restaurant) => {
    try {
        await api.post("/restaurantes", restaurant);
    } catch (err) {
        console.log(err)
    }
}
