import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import '../styles/table.css';

function Table() {
  const {
    setFilterByName,
    filteredPlanets,
    filterByName,
    setFilterState,
    filterState,
    filterPlanetsButton } = useContext(MyContext);

  const { nome } = filterByName;
  const { coluna, operador, valor } = filterState;

  const th = ['Name',
    'Rotation Period',
    'Orbital Period',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'URL',
  ];

  const handleChangeName = ({ target }) => {
    setFilterByName((prevState) => ({ ...prevState, nome: target.value.toLowerCase() }));
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setFilterState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <header>
        <label htmlFor="searchInput">
          Nome do planeta
          <input
            type="text"
            id="searchInput"
            value={ nome }
            onChange={ handleChangeName }
            data-testid="name-filter"
          />
        </label>
        {' '}
        <label htmlFor="column">
          Coluna:
          {' '}
          <select
            data-testid="column-filter"
            id="column"
            value={ coluna }
            onChange={ handleChange }
            name="coluna"
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>

        {' '}

        <label htmlFor="comparison" id="comparison">
          Operador:
          {' '}
          <select
            id="comparison"
            data-testid="comparison-filter"
            value={ operador }
            onChange={ handleChange }
            name="operador"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        {' '}

        <label htmlFor="value">
          Valor:
          {' '}
          <input
            id="value"
            type="number"
            data-testid="value-filter"
            value={ valor }
            name="valor"
            onChange={ handleChange }
          />
        </label>

        {' '}

        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => filterPlanetsButton() }
        >
          Filtrar
        </button>

      </header>
      <table>
        <thead>
          <tr>
            {th.map((element, index) => (<th key={ index }>{element}</th>))}
          </tr>
        </thead>
        <tbody>
          {
            filteredPlanets.map((element, index) => (
              <tr key={ index }>
                <td>{element.name}</td>
                <td>{element.rotation_period}</td>
                <td>{element.orbital_period}</td>
                <td>{element.diameter}</td>
                <td>{element.climate}</td>
                <td>{element.gravity}</td>
                <td>{element.terrain}</td>
                <td>{element.surface_water}</td>
                <td>{element.population}</td>
                <td>
                  {element.films.map((e, i) => <li key={ i }><a href={ e }>{e}</a></li>)}
                </td>
                <td>
                  {element.created}
                </td>
                <td>
                  {element.edited}
                </td>
                <td>
                  {element.url}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
}

export default Table;
