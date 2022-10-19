import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import '../styles/table.css';

function Table() {
  const { state } = useContext(MyContext);

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

  return (
    <table>
      <thead>
        <tr>
          {th.map((element, index) => (<th key={ index }>{element}</th>))}
        </tr>
      </thead>
      <tbody>
        {
          state.map((element, index) => (
            <tr key={ index }>
              <td>
                {element.name}
              </td>
              <td>
                {element.rotation_period}
              </td>
              <td>
                {element.orbital_period}
              </td>
              <td>
                {element.diameter}
              </td>
              <td>
                {element.climate}
              </td>
              <td>
                {element.gravity}
              </td>
              <td>
                {element.terrain}
              </td>
              <td>
                {element.surface_water}
              </td>
              <td>
                {element.population}
              </td>
              <td>
                <ul>
                  {element.films.map((e, i) => <li key={ i }>{e}</li>)}
                </ul>
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
  );
}

export default Table;
