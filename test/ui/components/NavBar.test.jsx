import { fireEvent, render, screen } from "@testing-library/react";
import { Navbar } from "../../../src/ui/components/NavBar";
import { AuthContext } from "../../../src/auth/context";
import { MemoryRouter } from "react-router-dom";


const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}));

describe('Pruebas en el <NavBar />', () => { 
  const init = {
    logged: true,
    user: {
      id: '123',
      name: 'Dario'
    },
    logout: jest.fn()
  }

  beforeEach(() => jest.clearAllMocks());

  test('Debe mostrar el nomber de usuario', () => { 

    render( 
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={ init }>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>  
    )
    
    expect(screen.getByText('Dario')).toBeTruthy();
  });    
  test('debe llamar el logout al presionar el boton', () => { 

    render( 
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={ init }>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>  
    )

    const logoutBtn = screen.getByRole('button');
    fireEvent.click( logoutBtn );

    expect( init.logout ).toHaveBeenCalled();
    expect( mockUseNavigate ).toHaveBeenCalledWith("/login", {"replace": true});
      
  });
});