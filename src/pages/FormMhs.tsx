import { Button, Space, Tag, theme } from 'antd';
import { Header } from 'antd/es/layout/layout'
import Table, { ColumnsType } from 'antd/es/table';
import { title } from 'process';
import React, { useEffect, useState } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { FormOutlined } from '@ant-design/icons';

const FaipMhs = ( ) => {
  useDocumentTitle('PII TA | Form');

    const {
        token: { colorBgContainer },
      } = theme.useToken();
        // css margin  
  // w,x,y,z =>top,right,bottom left
  // x,y,z =>top,(l+r),bottom
  // y,z =>(t+b),(l+r)
    const [isHovered, setIsHovered] = useState(false);

  return (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div className='form' style={{ padding: '1rem', width: '100%', maxWidth: '800px', backgroundColor: '' }}>
      {/* header tambahin underline sama shadow(opsional) */}
      <h2 style={{ padding: '0 0 1rem', textAlign: 'left', width: '100%', borderBottom: '2px solid #D3D3D3' }}>Pengisisan Formulir</h2>

      <h3 style={{ padding: '1rem 0 0' }}>Silakan pilih formulir yang akan anda isi di bawah ini!</h3>

      <div className='list-form' onMouseEnter={() => setIsHovered(true)}  onMouseLeave={() => setIsHovered(false)}>
        <Link
          className={isHovered ? 'list-form-item hovered' : 'list-form-item'}
          // style={{color:'#11324d'}}
          to='/form/mahasiswa/faip'
        >
          <h2><span style={{margin:'0 0.5rem'}}><FormOutlined /></span>FAIP</h2>
        </Link>
      </div>
      
    </div>
  </div>
  )
}
export default FaipMhs