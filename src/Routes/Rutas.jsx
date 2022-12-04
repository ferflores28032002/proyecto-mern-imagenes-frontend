import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login, Register } from '../components'

const Rutas = () => {
  return (
    <>



        <Routes>

            <Route path='/auth/login' element={<Login/>}  />
            <Route path='/auth/register' element={<Register/>}  />


        </Routes>




    </>
  )
}

export default Rutas