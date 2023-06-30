import React, { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { getVehiculos, getVehiculosByFilter } from '../services/vehiculos.service.js';
import ListadoVehiculos from './ListadoVehiculos';

const marcas = [
  'Acura'
  ,'Aston Martin'
  ,'Audi'
  ,'BMW'
  ,'Bentley'
  ,'Buick'
  ,'Cadillac'
  ,'Chevrolet'
  ,'Chrysler'
  ,'Dodge'
  ,'Ford'
  ,'GMC'
  ,'Holden'
  ,'Honda'
  ,'Hummer'
  ,'Hyundai'
  ,'Infiniti'
  ,'Isuzu'
  ,'Jaguar'
  ,'Jeep'
  ,'Kia'
  ,'Lamborghini'
  ,'Land Rover'
  ,'Lexus'
  ,'Lincoln'
  ,'Lotus'
  ,'Maybach'
  ,'Mazda'
  ,'Mercedes-Benz'
  ,'Mercury'
  ,'Mitsubishi'
  ,'Nissan'
  ,'Oldsmobile'
  ,'Plymouth'
  ,'Pontiac'
  ,'Porsche'
  ,'Ram'
  ,'Rolls-Royce'
  ,'Saab'
  ,'Saturn'
  ,'Subaru'
  ,'Suzuki'
  ,'Toyota'
  ,'Volkswagen'
  ,'Volvo'
];

const Players = () => {
  const [lista, setLista] = useState([]);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const { filtro, marca } = data;

    if (filtro.length >= 3) {
      getVehiculosByFilter(filtro, marca).then((res) => {setLista(res)})
    } else {
      alert('El filtro debe tener al menos 3 caracteres.');
      setLista([]);
    }
  };

  useEffect(() => {
    getVehiculos().then((listaVehiculos) => {setLista(listaVehiculos)});
  }, []);

  return (
    <div className="container">
      <h3>Formulario de Búsqueda</h3>
      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Filtro:</label>
              <input type="text" placeholder="Inicio del nombre para filtrar..." className="form-control" {...register('filtro')} />
            </div>
            <div className="mb-3">
              <label className="form-label">Marca:</label>
              <select className="form-select" {...register('marca')}>
                <option key="Todas" value="Todas">
                  Todas
                </option>
                {marcas.map((marca) => (
                  <option key={marca} value={marca}>
                    {marca}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Buscar
            </button>
          </form>
        </div>
      </div>
      <ListadoVehiculos lista={lista} />
    </div>
  );
};

export default Players;
