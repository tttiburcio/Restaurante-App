import api from '../api'

export const callLogin = async (email, senha) => {
    try {
        const resp = await api.post("/restaurantes/login", {
            email,
            senha
        });

        return resp.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
