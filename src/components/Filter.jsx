import React, { useState, useEffect } from 'react';
import PetList from './PetList';

const Filter = () => {
    const [pets, setPets] = useState([]); // Todas las mascotas
    const [filteredPets, setFilteredPets] = useState([]); // Mascotas filtradas
    const [filter, setFilter] = useState(''); // Estado para el criterio de filtrado
    const [showPets, setShowPets] = useState(false); // Mostrar las mascotas solo después de cargarlas

    const fetchPets = async () => {
        try {
            const response = await fetch('https://huachitos.cl/api/animales'); // Accede al JSON
            const responseData = await response.json(); // Convierte la respuesta en JSON
            if (Array.isArray(responseData.data)) { // Verifica si la respuesta es un array
                setPets(responseData.data); // Guarda las mascotas en el estado
                setFilteredPets(responseData.data); // Inicialmente, no hay filtro aplicado
            } else {
                console.error('Unexpected response format:', responseData);
            }
            setShowPets(true);
        } catch (error) {
            console.error('Error fetching pets:', error);
        }
    };

    useEffect(() => { // Filtra las mascotas
        if (filter) { // sólo si hay un filtro
            const filtered = pets.filter((pet) => pet.tipo.toLowerCase().includes(filter.toLowerCase()));
            setFilteredPets(filtered);
        } else {
            setFilteredPets(pets); // Si no hay filtro, mostrar todos
        }
    }, [filter, pets]);

    return (
        <div>
            <button onClick={fetchPets}>Mostrar Mascotas</button>
            <input 
                type="text" 
                placeholder="Filtrar por tipo (perro, gato, etc.)"
                value={filter}
                onChange={(e) => setFilter(e.target.value)} // Actualiza el filtro con el valor ingresado
            />
            {showPets && <PetList pets={filteredPets} />} {/* Pasa las mascotas filtradas a PetList */}
        </div>
    );
};

export default Filter;
