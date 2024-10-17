import React from 'react';
import '../App.css';

const PetList = ({ pets }) => {
    return (
        <div className="container">
            {Array.isArray(pets) && pets.length > 0 ? ( // Si hay mascotas
                pets.map((pet) => ( // Por cada posición en el array de mascotas
                    <div className="pet-card" key={pet.id}>
                        <img src={pet.imagen} alt={pet.nombre} />
                        <h2>{pet.nombre}</h2>
                        <p>Tipo: {pet.tipo}</p>
                        <p>Edad: {pet.edad}</p>
                        <p>Género: {pet.genero}</p>
                    </div>
                ))
            ) : ( // si no hay mascotas
                <p>No se encontraron mascotas</p>
            )}
        </div>
    );
};

export default PetList;
