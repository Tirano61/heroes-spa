
import React, { useContext } from 'react'
import { AuthContext } from '../auth';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
  const { authState } = useContext(AuthContext);

  return (!authState.logged)
  ? children
  : <Navigate to='/marvel'/>
}
