import { Button, Space, Tag, theme } from 'antd';
import { Header } from 'antd/es/layout/layout'
import Table, { ColumnsType } from 'antd/es/table';
import { title } from 'process';
import React, { useEffect } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';

const FaipDosen = ( ) => {
  useDocumentTitle('PII TA | FAIP');

    const {
        token: { colorBgContainer },
      } = theme.useToken();
      
  return (
    <div>
      {/* header tambahin underline sama shadow(opsional) */}
        <Header style={{ padding: '0 2rem', background: '#ffffff' ,borderBottom: '1px solid #D3D3D3'}}>
          <h2>FAIP - Dosen</h2>
        </Header>
        <div className='home-page' style={{padding:'2rem',background:'#d7d1c9'}}>
          {/* h2 bukan bug itu buat simbol */}
            <h2 style={{ margin: '1rem 0' }}>Klik tombol dibawah untuk mengecek nilai!</h2>
            <Link className='link-hover' to='/form/nilai'>
              <Button type="primary" size='large' style={{ margin: '1rem 0',borderRadius:'0' }} >
                Cek Penilaian
              </Button>
            </Link>
        </div>
        
    </div>
  )
}
export default FaipDosen