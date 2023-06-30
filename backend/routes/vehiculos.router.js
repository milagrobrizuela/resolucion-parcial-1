const express = require('express');
const sequelize = require('../sequelize-init.js');
const { Op } = require('sequelize');

const VehiculosRouter = express.Router();

VehiculosRouter.get('/api/vehiculos/', async function(req, res) {
    try {
        const { filtro, marca } = req.query;

        if (!filtro || filtro === 'Todos') {
            const data = await sequelize.models.Vehiculo.findAll({
                limit: 50,
                order: [['marca'], ['year', 'DESC']]
            });
            
            if (data.length > 0) {
                res.status(200).json(data);
            } else {
                res.status(400).json({ message: 'No se encontraron vehículos.' });
            }
        } else {
            let where = {};
            if (filtro !== undefined) {
                where.propietario = { [Op.like]: `${filtro}%` };
            }
            if (marca !== undefined && marca !== '' && marca !== 'Todas') {
                where.marca = marca;
            }

            const data = await sequelize.models.Vehiculo.findAll({
                where,
                order: [['marca'], ['year', 'DESC']]
            });

            if (data.length > 0) {
                res.status(200).json(data);
            } else {
                res.status(400).json({ message: 'No se encontraron vehículos.' });
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = VehiculosRouter;
