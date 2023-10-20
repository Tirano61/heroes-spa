import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth"
import { PublicRoute } from "../../src/router/PublicRoute"
import { MemoryRouter, Route, Routes } from "react-router-dom";



describe('Pruebas en el <PublicRoute />', () => { 
  test('Si no estoy autenticado debe mostrar el children', () => { 
    
    const contextValue = {
      logged: false
    }

    render(
      <AuthContext.Provider value={ contextValue }>
        <PublicRoute >
          <h1>Ruta publica</h1>
        </PublicRoute>
      </AuthContext.Provider>
    )
    
      expect(screen.getByText('Ruta publica')).toBeTruthy()

  });
  test('Debe navegar si esta autenticado', () => { 

    const contextValue = {
      logged: true,
      user:{
        name: 'Dario',
        id: '123'
      }
    }

    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter initialEntries={['/login']}>
          
          <Routes>

            <Route path="login" element={
              <PublicRoute >
                <h1>Ruta publica</h1>
              </PublicRoute>
            }/>

            <Route path="marvel" element={<h1>Pagina marvel</h1>} />
          
          </Routes>
         
        </MemoryRouter>
      </AuthContext.Provider>
    )
    
    expect(screen.getByText('Pagina marvel')).toBeTruthy();

  });
})