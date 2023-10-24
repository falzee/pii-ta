import React from 'react';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Faip from './pages/Faip';
import { start } from 'repl';
import { css } from '@emotion/react'
import Layouting from './pages/Layouting';
import { ConfigProvider } from 'antd';
import { Route, RouterProvider, createBrowserRouter,createRoutesFromElements,Navigate, BrowserRouter, Routes } from 'react-router-dom';
import FormOne from './components/FormOne';
import User from './pages/User';
import TabPage from './pages/TabPage';
import { useAppSelector } from './hooks/reduxHooks';
import ProtectedRoute from './pages/PRoute';
import ErrorPage from './pages/ErrorPage';

function App() {
  const {isLogin} = useAppSelector((state)=> state.auth.isLogin)
  const router = createBrowserRouter(
      createRoutesFromElements(
        <>
        <Route element={<Login/>} path="/login"/>
        <Route element={<ProtectedRoute><Layouting /></ProtectedRoute>} >
          <Route element={<Home/> } path="/" />
          <Route element={<Home/> } path="home"/>
          <Route element={<User/> } path="user"/>
          <Route element={<Faip/> } path="faip"/>
            <Route element={<TabPage/>} path="faip/formulir"/>
          {/* <Route element={<About/>} path="/about"/>
         */}
        </Route>
        <Route element={<ErrorPage/>} path="*"/> 
        </>
      )
  );
  // <Routes>
  // {isLogin && 
  //   <>
  //   <Route element={<Login/>} path="/login"/>
  //   <Route element={<Register/>} path="/register"/>
  //   <Route element={<Layouting />}>
  //       <Route element={<Home/>} path="/"/>
  //       <Route element={<Home/>} path="/home"/>
  //       <Route element={<Tcrud/>} path="/crud"/>
  //       <Route element={<About/>} path="/about"/>
  //       <Route element={<ErrorPage/>} path="*"/>
  //   </Route>
  //   </>           
  //   //Tcrud is final crud
  //   }
  //   {!isLogin && 
  //   <>
  //     <Route element={<Login/>} path="/"/>
  //     <Route element={<Login/>} path="/login"/>
  //     <Route element={<Register/>} path="/register"/>
  //     <Route element={<ErrorPage/>} path="*"/>
  //   </>            
  //   }
  //   </Routes>

  return (
    <ConfigProvider
      // theme={{
      //   token: {
      //     colorPrimary: '#ed7623',
      //     colorPrimaryBorder:'none',
      //     borderRadius: 0
      //   },
      // }}
    >
      <div className="App">
        <RouterProvider router={router}/>
      </div>
    </ConfigProvider>
  );
}

export default App;

        // <BrowserRouter>
        // <Routes>
        //   {isLogin && 
        //     <>
        //       <Route element={<Login/>} path="/login"/>
        //       <Route element={<Layouting />}>
        //         <Route element={<Home/>} path="/"/>
        //         <Route element={<Home/>} path="/home"/>
        //         <Route element={<User/>} path="/user"/>
        //         <Route element={<Faip/> } path="/faip"/>
        //           <Route element={<TabPage/>} path="/faip/formulir"/>
        //              {/* <Route element={<About/>} path="/about"/>
        //              <Route element={<ErrorPage/>} path="*"/> */}
        //       </Route>
        //       </>
        //     //Tcrud is final crud
        //     }
        //   {!isLogin && 
        //     <>
        //       <Route element={<Login/>} path="/"/>
        //       <Route element={<Login/>} path="/login"/>
        //       {/* <Route element={<Register/>} path="/register"/>
        //       <Route element={<ErrorPage/>} path="*"/> */}
        //     </>            
        //     }
        // </Routes>
        // </BrowserRouter>