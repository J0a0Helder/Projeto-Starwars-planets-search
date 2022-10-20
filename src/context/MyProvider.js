import React, { useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  // ============================== Estados ============================== //

  // ========== estado inicial ========== //
  const [state, setState] = useState([]);

  // ========== estado com os planetas filtrados ========== //
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  // ========== estado para filtrar por nome ========== //
  const [filterByName, setFilterByName] = useState({
    nome: '',
  });

  // ========== estado que filtra por coluna, operador e valor ========== //
  const [filterState, setFilterState] = useState({
    coluna: 'population',
    operador: 'maior que',
    valor: 0,
  });

  // ========== estado que salva as options ========== //
  const [options, setOptions] = useState(['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  // ========== estado que salva os filtros usados ========== //
  // const [filters, setFilters] = useState([{}]);

  // ============================== Funções ============================== //

  // ========== requisição a API e colocando no estado ========== //

  useEffect(() => {
    const fetchPlanets = async () => {
      const END_POINT = 'https://swapi.dev/api/planets';
      const promise = await fetch(END_POINT);
      const { results } = await promise.json();
      setState(results.map((element) => {
        delete element.residents;
        return element;
      }));
    };
    fetchPlanets();
  }, []);

  // ========== filtro por nome ========== //

  useEffect(() => {
    const { nome } = filterByName;
    if (nome !== '') {
      const planetsFilteredByName = state.filter((planet) => {
        const planetName = planet.name.toLowerCase();
        return planetName.includes(nome);
      });
      setFilteredPlanets(planetsFilteredByName);
    } else {
      setFilteredPlanets(state);
    }
  }, [filterByName, state]);

  // ===== filtra por coluna, valor e operador e remove as options do array ===== //

  const filterPlanetsButton = useCallback(() => {
    const { coluna, operador, valor } = filterState;
    const filterByColumn = filteredPlanets.filter((planet) => {
      const valueColum = Number(planet[coluna]);
      const valueCompare = Number(valor);
      switch (operador) {
      case 'maior que':
        return valueColum > valueCompare;
      case 'menor que':
        return valueColum < valueCompare;
      default:
        return valueColum === valueCompare;
      }
    });

    setFilteredPlanets(filterByColumn);
    // setOrderList((prevState) => ({ ...prevState,
    //   coluna,
    //   operador,
    //   valor }));
    setOptions(options.filter((e) => e !== coluna));
  }, [filterState, filteredPlanets, options]);

  // ========== valor do contexto e envio das funções ========== //

  const contextValue = useMemo(() => ({
    filteredPlanets,
    filterByName,
    setFilterByName,
    setFilterState,
    filterState,
    filterPlanetsButton,
    options,
  }), [filteredPlanets, filterByName, filterState, filterPlanetsButton, options]);

  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
