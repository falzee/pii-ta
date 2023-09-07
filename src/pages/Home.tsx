/** @jsxImportSource @emotion/react */
import { Button, theme } from 'antd';
import { Header } from 'antd/es/layout/layout'
import React from 'react'
import { Link } from 'react-router-dom';

const Home = ( ) => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
  return (
    <div>
        <Header style={{ padding: '0 2rem', background: colorBgContainer }}>
        <h2>Beranda</h2>
        </Header>
        <div className='home-page' css={{padding:'2rem 2rem',background:'#e4e3e3',borderBottom: '1px solid #D3D3D3'}}>
            <h2 css={{ marginBottom: '1rem' }}>Selamat Datang di Situs PII.</h2>
            <p>Anda dapat melakukan pemuktahiran data. Klik Button dibawah ini dan ikuti prosesnya </p>
            <Link to='/faip'>
              <Button type="primary" size='large' css={{ marginTop:'3rem' }} >
              Pemutakhiran Data
              </Button>
            </Link>
        </div>
    </div>
  )
}
export default Home