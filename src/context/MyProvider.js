import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

const INITIAL_STATE = [];

function Provider({ children }) {
  const [state, setState] = useState(INITIAL_STATE);

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

  const contextValue = useMemo(() => ({
    state,
  }), [state]);

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
