import React from 'react'
import { useAppContext } from '../../context/AppContext'

export function Perfil() {
    const {logout} = useAppContext();
  return (
    <div>
        <h1>Perfil</h1>
        <a  href="" onClick={()=>{
            logout();
        }}>Cerrar sesión</a>
    </div>
  )
}