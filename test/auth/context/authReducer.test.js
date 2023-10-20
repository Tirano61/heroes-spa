import { authReducer } from "../../../src/auth/context/authReducer"
import { types } from "../../../src/auth/types/types";


describe('Pruebas en authReducer', () => { 
  
  const initialState = {
    logged: false,
    
  }
  
  test('Debe retornar el estado inicial', () => { 
      const newState = authReducer(initialState, {});
      expect( newState ).toBe( initialState );

  })
  test('Debe llamar el login y establecer el user', () => { 
    const action = {
      type: '[Auth] Login',
      payload: {
        id: '123',
        name: 'Dario'
      }
      
    }
    const newState = authReducer(initialState, action);

    expect( newState ).toEqual({
      logged: true,
      user: action.payload
    });
  });
  test('Logout debe borrar el usuario y logged en false', () => { 
    
    const state = {
      logged: true,
      user: {id: '123', name: 'Dario'}
    }
    const action = {
      type: types.logout
    }

    const newState = authReducer(state, action)

    expect( newState ).toEqual({logged: false});

  });

})