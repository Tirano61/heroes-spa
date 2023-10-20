
import React, { useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'
import { types } from '../types/types'

/* const initialState = {
  logged: false,
} */

const init = () => {
   const user = JSON.parse( localStorage.getItem('user') );

   return {
    logged: !!user,
    user: user, 
   }
}

export const AuthProvider = ({ children }) => {

  const [ authState, dispach ] = useReducer( authReducer, {}, init );
  
  const login = ( name= '' ) =>{

    const user = {id: '123', name};
    const action = { type: types.login, payload: user };

    localStorage.setItem('user', JSON.stringify( user ));

    dispach(action);
  }
  const logout = () =>{
    localStorage.removeItem('user');
    const action = {
      type: types.logout,
    }
    dispach(action);
  }

  return (
    <AuthContext.Provider value={{ login: login,logout: logout, ...authState }}>
      { children }
    </AuthContext.Provider>
  )
}
