import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { AppRouter } from "../../src/router/AppRouter";



describe('Pruebas en el <AppRouter />', () => { 

  test('Debe mostrar el login si no esta autenticado', () => { 
    
    const contextValue = {
      logged: false
    }

    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={ contextValue }>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByText('Login')).toBeTruthy();

  });
  test('Debe mostrar el componente marvel si esta autenticado', () => { 
    const contextValue = {
      logged: true,
      user:{
        id:'123',
        name: 'Dario'
      }
    }

    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={ contextValue }>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );
      expect(screen.getByText('Marvel Comics')).toBeTruthy();
  })
});