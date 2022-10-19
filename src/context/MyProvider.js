import React, { useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [state, setState] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({
    nome: '',
  });

  const [filterState, setFilterState] = useState({
    coluna: 'population',
    operador: 'maior que',
    valor: 0,
  });

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

  const filterPlanetsButton = useCallback(() => {
    const { coluna, operador, valor } = filterState;
    const filterByColumn = state.filter((planet) => {
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
  }, [state, filterState]);

  const contextValue = useMemo(() => ({
    state,
    filteredPlanets,
    filterByName,
    setFilterByName,
    setFilterState,
    filterState,
    filterPlanetsButton,
  }), [state, filteredPlanets, filterByName, filterState, filterPlanetsButton]);

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
