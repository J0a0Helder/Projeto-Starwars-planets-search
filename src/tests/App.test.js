import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Provider from '../context/MyProvider';
import userEvent from '@testing-library/user-event';
import App from '../App';
import testData from '../../cypress/mocks/testData';

describe('testes da aplicação', () => {
  it('Testa se a aplicação renderiza corretamente os inputs', () => {
    render(
    <Provider>
      <App />
    </Provider>
    );
    
    const buttonFilter = screen.getByTestId('button-filter')
    const buttonClearFilter = screen.getByTestId('button-remove-filters')
    const filterName = screen.getByTestId('name-filter');
    const filterColumn = screen.getByTestId('column-filter');
    const filterComparation = screen.getByTestId('comparison-filter');
    const filterValue = screen.getByTestId('value-filter');
    
    expect(buttonClearFilter).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();
    expect(filterName).toBeInTheDocument();
    expect(filterColumn).toBeInTheDocument();
    expect(filterComparation).toBeInTheDocument();
    expect(filterValue).toBeInTheDocument();
  });

  it('Testa se a aplicação renderiza corretamente os filtros', async () => {
    render(<App />);

    const filterColumn = screen.getByTestId('column-filter');
    const buttonClearFilter = screen.getByTestId('button-remove-filters')
    const filterComparation = screen.getByTestId('comparison-filter');
    const filterValue = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter')

    userEvent.selectOptions(filterColumn, 'orbital_period');
    userEvent.selectOptions(filterComparation, 'maior que');
    userEvent.type(filterValue, '4000');
    userEvent.click(buttonFilter);
    userEvent.click(buttonClearFilter);
  });

  it('Testa filtros "igual a"', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    await act( async () => render(<App/>));
    
    const filterColumn = screen.getByTestId('column-filter');
    expect(filterColumn).toHaveValue('population');
    userEvent.selectOptions(filterColumn, 'diameter');
    expect(filterColumn).toHaveValue('diameter');
    
    const filterValue = screen.getByTestId('value-filter');
    userEvent.clear(filterValue);
    userEvent.type(filterValue, '10200');
    
    const filterComparation = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(filterComparation, 'igual a');
    expect(filterComparation).toHaveValue('igual a');
  
    const buttonFilter = screen.getByTestId('button-filter')
    userEvent.click(buttonFilter);
  
    global.fetch.mockClear();
  });

  it('Testa filtros "maior que"', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    await act( async () => render(<App/>));
    
    const filterColumn = screen.getByTestId('column-filter');
    userEvent.selectOptions(filterColumn, 'rotation_period');
    expect(filterColumn).toHaveValue('rotation_period');
    
    const filterValue = screen.getByTestId('value-filter');
    userEvent.clear(filterValue);
    userEvent.type(filterValue, '22');
    
    const filterComparation = screen.getByTestId('comparison-filter');
    expect(filterComparation).toHaveValue('maior que');
  
    const buttonFilter = screen.getByTestId('button-filter')
    userEvent.click(buttonFilter);
  
    global.fetch.mockClear();
  });

  it('Testa filtros "menor que e o botão remover filtro"', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    await act( async () => render(<App/>));
    
    const filterColumn = screen.getByTestId('column-filter');
    userEvent.selectOptions(filterColumn, 'rotation_period');
    expect(filterColumn).toHaveValue('rotation_period');
    
    const filterValue = screen.getByTestId('value-filter');
    userEvent.clear(filterValue);
    userEvent.type(filterValue, '24');
    
    const filterComparation = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(filterComparation, 'menor que');
  
    const buttonFilter = screen.getByTestId('button-filter')
    userEvent.click(buttonFilter);

    const filter = screen.getByTestId('filter')
    expect(filter).toBeInTheDocument()
    userEvent.click(screen.getByRole('button', {name: /remover filtro/i}))

    global.fetch.mockClear();
  });

  it('Testa filtros por nome', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    await act( async () => render(<App/>));
    
    const nameInput = screen.getByTestId('name-filter');
    expect(nameInput).toBeInTheDocument();
    userEvent.type(nameInput, 't');
    expect(screen.getByText(/tatooine/i)).toBeInTheDocument();
  
    global.fetch.mockClear();
  });
});
