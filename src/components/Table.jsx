import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import '../styles/table.css';

function Table() {
  const { setFilterByName, filteredPlanets, filterByName } = useContext(MyContext);
  const { nome } = filterByName;
  console.log(filteredPlanets);
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

  const handleChange = ({ target }) => {
    setFilterByName((prevState) => ({ ...prevState, nome: target.value.toLowerCase() }));
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
            onChange={ handleChange }
            data-testid="name-filter"
          />
        </label>
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
