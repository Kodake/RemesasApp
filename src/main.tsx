import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Loading from './components/Loading.tsx';
import MonedasList from './components/monedas/List.tsx';
import MonedasAdd from './components/monedas/Add.tsx';
import MonedasEdit from './components/monedas/Edit.tsx';
import ClientesList from './components/clientes/List.tsx';
import ClientesAdd from './components/clientes/Add.tsx';
import ClientesEdit from './components/clientes/Edit.tsx';
import TasasList from './components/tasas/List.tsx';
import TasasAdd from './components/tasas/Add.tsx';
import TasasEdit from './components/tasas/Edit.tsx';
import TransaccionesOperations from './components/transacciones/Operations.tsx';
import TransaccionesList from './components/transacciones/List.tsx';
import TransaccionesSend from './components/transacciones/Send.tsx';
import TransaccionesWithdraw from './components/transacciones/Withdraw.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Loading />
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/monedas' element={<MonedasList />}></Route>
        <Route path='/monedas/agregar' element={<MonedasAdd />}></Route>
        <Route path='/monedas/editar/:id' element={<MonedasEdit />}></Route>
        <Route path='/clientes' element={<ClientesList />}></Route>
        <Route path='/clientes/agregar' element={<ClientesAdd />}></Route>
        <Route path='/clientes/editar/:id' element={<ClientesEdit />}></Route>
        <Route path='/tasas' element={<TasasList />}></Route>
        <Route path='/tasas/agregar' element={<TasasAdd />}></Route>
        <Route path='/tasas/editar/:id' element={<TasasEdit />}></Route>
        <Route path='/transacciones' element={<TransaccionesOperations />}></Route>
        <Route path='/transacciones/listado' element={<TransaccionesList />}></Route>
        <Route path='/transacciones/envios' element={<TransaccionesSend />}></Route>
        <Route path='/transacciones/retiros/:codigo' element={<TransaccionesWithdraw />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
