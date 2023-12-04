import api from '../api'

export const getAllPlates = async (id) => {
    try {
        const resp = await api.get(`/pratos?restauranteId=${id}`);

        return resp?.data || [];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const createPlate = async (plate) => {
    try {
        await api.post("/pratos", plate);
    } catch (err) {
        console.log(err)
    }
}

export const updatePlate = async (id, plate) => {
    try {
        await api.put(`/pratos/${id}`, plate);

    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const deletePlate = async (id, plate) => {
    try {
        await api.delete(`/pratos/${id}`, plate);

    } catch (err) {
        console.log(err);
        throw err;
    }
}
