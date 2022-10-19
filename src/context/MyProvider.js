import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

const INITIAL_STATE = [];
const STATE_FILTER = {
  nome: '',
};

function Provider({ children }) {
  const [state, setState] = useState(INITIAL_STATE);
  const [filterByName, setFilterByName] = useState(STATE_FILTER);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

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

  const contextValue = useMemo(() => ({
    state,
    setFilterByName,
    filteredPlanets,
    filterByName,
  }), [state, filteredPlanets, filterByName]);

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
