import axios from "axios";

const url = 'http://localhost:3001/api/vehiculos/'

export const getVehiculos = () => {
    return axios.get(url)
    .then((response) => {
        const { data } = response;
        return data;
    });
};

export const getVehiculosByFilter = (filtro, marca) => {
    return axios.get(`${url}?filtro=${filtro}&marca=${marca}`)
    .then((response) => {
        const { data } = response;
        return data;
    });
};