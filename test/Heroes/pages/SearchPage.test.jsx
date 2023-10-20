import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { SearchPage } from "../../../src/heroes/pages/SearchPage"




const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}));


describe('Pruebas en <SearchPage />', () => { 

  beforeEach(() => jest.clearAllMocks);

  test('Debe mostarse correctamente con valores  por defecto', () => { 
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    ) 

    expect(container).toMatchSnapshot();
    
  });
  test('Debe mostrar batman y el input con el valor', () => { 
    const { container } = render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    )
    const inputText = screen.getByRole('textbox');
    expect(inputText.value).toBe('batman')  
    const img = screen.getByRole('img');

    expect(img.src).toContain("/heroes/dc-batman.jpg")

  });
  test('Debe mostrar un error si no se encuentra el heroe (batman123)', () => { 
    
    const { container } = render(
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <SearchPage />
      </MemoryRouter>
    )
     
    const alert = screen.getByLabelText('alert-danger');

    expect(alert).toBeTruthy();  

  });
  test('Debe llamar el navigate a la pantalla nueva', () => {  
    const inputValue = 'superman';
    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    )

    const input = screen.getByRole('textbox');
    fireEvent.change(input, {target:{name: 'searchText', value: inputValue }});
    
    const form = screen.getByLabelText('form');
    fireEvent.submit(form);

    expect( mockUseNavigate ).toHaveBeenCalledWith(`?q=${ inputValue }`);

  });

});