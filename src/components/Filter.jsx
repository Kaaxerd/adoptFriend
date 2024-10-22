import React, { useState, useEffect } from 'react';
import PetList from './PetList';

const Filter = () => {
    const [pets, setPets] = useState([]); // Todas las mascotas
    const [filteredPets, setFilteredPets] = useState([]); // Mascotas filtradas
    const [filters, setFilters] = useState({
        tipo: '',
        edad: '',
        genero: ''
    }); // Filtros
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

    useEffect(() => {
        const filtered = pets.filter((pet) => {
            return (
                pet.tipo.toLowerCase().includes(filters.tipo.toLowerCase()) &&
                pet.edad.toString().includes(filters.edad) &&
                pet.genero.toLowerCase().includes(filters.genero.toLowerCase())
            );
        });
        setFilteredPets(filtered);
    }, [filters, pets]);

    const handleFilterChange = (e) => { // Función para cambiar los filtros individualmente
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <button onClick={fetchPets}>Mostrar Mascotas</button>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="tipo"
                    placeholder="Filtrar por tipo (perro, gato, etc.)"
                    value={filters.tipo}
                    onChange={handleFilterChange}
                />
                <input 
                    type="text" 
                    name="edad"
                    placeholder="Filtrar por edad"
                    value={filters.edad}
                    onChange={handleFilterChange}
                />
                <select 
                    name="genero"
                    value={filters.genero}
                    onChange={handleFilterChange}
                >
                    <option value="">Todos los géneros</option>
                    <option value="macho">Macho</option>
                    <option value="hembra">Hembra</option>
                </select>
                <button type="submit">Aplicar Filtros</button>
            </form>
            {showPets && <PetList pets={filteredPets} />}
        </div>
    );
};

export default Filter;