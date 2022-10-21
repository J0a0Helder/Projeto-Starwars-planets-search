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
    filterPlanetsButton,
    options,
    filters,
    clearAllFilters,
    clearFilter,
  } = useContext(MyContext);

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
            {
              options.map((e) => <option key={ e } value={ e }>{e}</option>)
            }
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
          onClick={ filterPlanetsButton }
        >
          Filtrar
        </button>

        {' '}

        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => clearAllFilters() }
        >
          Limpar Filtros
        </button>

      </header>

      <section>
        {
          filters.length > 0 && filters.map((e, i) => (
            <p key={ i } data-testid="filter">
              { e.coluna }
              {' '}
              {e.operador}
              {' '}
              {e.valor}
              {' '}
              <button
                type="button"
                onClick={ () => clearFilter(e) }
              >
                Remover Filtro
              </button>
            </p>))
        }
      </section>

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
                  <a href={ element.url }>{element.url}</a>
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
