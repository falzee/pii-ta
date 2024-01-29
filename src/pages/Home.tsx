import { Button, theme } from 'antd';
import { Header } from 'antd/es/layout/layout'
import React from 'react'
import { Link } from 'react-router-dom';
import welcomeTA from '../images/Welcome-update.png';

const Home = ( ) => {

  return (
    <div className='home-container' style={{padding:'0',
    background:'#d7d1c9',
    borderBottom: '1px solid #D3D3D3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',}}>
        <div className='home-page' style={{padding:'2rem 2rem',
        display: 'flex',  // Added flex properties for centering
        flexDirection: 'column',  // To stack child elements vertically
        alignItems: 'center',
        textAlign: 'center',}}>
          <img src={welcomeTA} alt="logo welcome" style={ {
            width: '600px',
            maxWidth: '100%',
            objectFit: 'cover'} } />
          <h2 style={{ marginTop: '2rem' }}>Selamat Datang di Situs Penilaian</h2>
          <p style={{ marginTop: '0.5rem' }}>Klik tombol dibawah ini untuk memulai pengecekan nilai </p>
          <Link className='link-hover' to='/faip/mahasiswa'>
            <Button className='btn-home' type="primary" size='large' style={{ marginTop:'2rem' ,borderRadius:'0'}} >
            Cek Penilaian
            </Button>
          </Link>
        </div>
    </div>
  )
}
export default Home
{/*  */}