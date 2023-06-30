const supertest = require('supertest');
const app = require('../index');

const api = supertest(app);

const filtro = 'Car';
const marca = 'Toyota';

describe('vehiculos', () => {
    test('of getVehiculos are returned as json', async () => {
        await api
            .get('/api/vehiculos/get50')
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const fullList = await api.get('/api/vehiculos/get50');
        expect(fullList.body).toHaveLength(50);
    });

    test('of getVehiculosByTextFilter and all Make are returned as json', async () => {
        await api
            .get(`/api/vehiculos/?filtro=${filtro}&marca=${marca}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const fullFilter = await api.get(`/api/vehiculos/?filtro=${filtro}&marca=${marca}`);
        expect(fullFilter.body).toHaveLength(2);

        await api
            .get(`/api/vehiculos/?filtro=${filtro}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const onlyFilter = await api.get(`/api/vehiculos/?filtro=${filtro}`);
        expect(onlyFilter.body).toHaveLength(5);
    });

    test('of getVehiculosByTextFilter and all Make sortenning', async () => {
        await api
            .get(`/api/vehiculos/?filtro=${filtro}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const onlyTextFilter = await api.get(`/api/vehiculos/?filtro=${filtro}`);
        expect(onlyTextFilter.body).toHaveLength(5);
        expect(onlyTextFilter.body[0].propietario).toBe('Carver Denziloe');
        expect(onlyTextFilter.body[3].propietario).toBe('Carey Galland');
    });

    test('of getVehiculosByTextFilter and all Make are returned as json', async () => {
        await api
            .get(`/api/vehiculos/?filtro=${filtro}&marca=${marca}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const fullFilter = await api.get(`/api/vehiculos/?filtro=${filtro}&marca=${marca}`);
        expect(fullFilter.body).toHaveLength(2);
        expect(fullFilter.body[0].propietario).toBe('Carey Galland');
        expect(fullFilter.body[1].propietario).toBe('Carolus Bulled');
    });
});
