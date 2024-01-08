import { Button, theme } from 'antd';
import { Header } from 'antd/es/layout/layout'
import React from 'react'
import { Link } from 'react-router-dom';

const Home = ( ) => {

  return (
    <div>
        <Header style={{ padding: '0 2rem', background: '#ffffff' }}>
        <h2>Beranda</h2>
        </Header>
        <div className='home-page' style={{padding:'2rem 2rem',background:'#e4e3e3',borderBottom: '1px solid #D3D3D3'}}>
            <h2 style={{ marginBottom: '1rem' }}>Selamat Datang di Situs Penilaian</h2>
            <p>Anda dapat melakukan pemuktahiran data. Klik Button dibawah ini dan ikuti prosesnya </p>
            <Link className='link-hover' to='/faip'>
              <Button className='btn-home' type="primary" size='large' style={{ marginTop:'3rem' ,borderRadius:'0'}} >
              Cek Penilaian
              </Button>
            </Link>
        </div>
    </div>
  )
}
export default Home