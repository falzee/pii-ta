import { Button, Modal, Space, Tag, theme } from 'antd';
import { Header } from 'antd/es/layout/layout'
import Table, { ColumnsType } from 'antd/es/table';
import { title } from 'process';
import React, { useEffect, useState } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';


const Faip = ( ) => {

  const [nama, setNama] = useState(''); // State to store the user's role
  const [nim, setNim] = useState('');
  const [pid,setPid] = useState('')
  const [lastUpdate,setLastUpdate] = useState('')
  const [lastEdit,setLastEdit] = useState('')
  const [status, setStatus] = useState('');// new,edit,submit,expired

  useEffect(() => {
    // Retrieve JWT token from localStorage
    fetchUserData();
  }, [status,lastUpdate,lastEdit]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('jwtToken');

      if (token) {
        // Decode the token to extract user ID
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.nomerInduk;
        setNama(decodedToken.nama);
        setNim(decodedToken.nomerInduk);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        // Make API request with user ID
        const response = await axios.get(`http://localhost:8000/form-penilaian/mhs?uid=${userId}&ft=info`,config);
        // const response = await axios.get(`http://localhost:8000/form-penilaian/mhs`,config);
        // console.log("response:"+response)
        // if response no 

        const userData = response.data;
        
        setPid(userData.data.pid)
        setLastUpdate(userData.data.last_updated.slice(0, 10))
        setLastEdit(userData.data.last_change)
        setStatus("edit")
        // console.log("userdata:"+ userData.data.pid)
        // setUserData(userData);
        // Update the items with fetched data

      } else {
        console.error('JWT token not found');
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
      setLastUpdate('')
      setLastEdit('')
      setStatus('new')
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useDocumentTitle('PII TA | FAIP');

  return (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div className='form' style={{ padding: '1rem', width: '100%', maxWidth: '800px', backgroundColor: '' }}>
      {/* header tambahin underline sama shadow(opsional) */}
      <h2 style={{ padding: '0 0 1rem', textAlign: 'left', width: '100%', borderBottom: '2px solid #D3D3D3' }}>Pengisian FAIP</h2>

      {/* <h3 style={{ padding: '1rem 0 0' }}>Data Pribadi:</h3> */}
      <p style={{ padding: '1rem 0 0' }}>Nama : {nama}</p>
      <p style={{ padding: '1rem 0 0' }}>Nim : {nim}</p>
      <p style={{ padding: '1rem 0 0' }}>Last updated : {lastUpdate ? lastUpdate : "-"}</p>
      <p style={{ padding: '1rem 0 0' }}>Last change : {lastEdit ? lastEdit : "-"}</p>
      <p style={{ padding: '1rem 0 0' }}>Status : {(status === 'new') ? 'Baru' : (status === 'edit' ? 'Data Masuk' : '-')}</p>

      <div style={{display: 'flex',justifyContent: 'center',alignItems:'center',margin:'1rem 0'}}>
        {(status === 'new') ? 
        // like edit, but button with post api to sever to create new form and make pid for dynamic pid
        <Link className='link-hover' style={{margin:'0 0.5rem'}} to='/form/mahasiswa/faip/id'>
          <Button type="primary" size='large' style={{ borderRadius:'3px' }} >
            + Baru
          </Button>
        </Link> : (status === 'edit') ?
        <>
        {/* edit to> edit in dynamic page with pid > submit/ delete get popup> reload (delete no reload only submit)> 
        if try change page get popup u sure? > only save if submit/delete so if sure just go away w/out save*/}
        <Link className='link-hover' style={{margin:'0 0.5rem'}} to='/form/mahasiswa/faip/id'>
        <Button type="primary" size='large' style={{ borderRadius:'3px' }} >
          <span style={{margin:'0 5px'}}><EditOutlined /></span> Edit
        </Button>
      </Link>
      {/* delete to>popup > delete> backend delete &  state to new again & reload */}
        <Button type="primary" danger size='large' style={{ borderRadius:'3px',margin:'0 0.5rem' }} onClick={showModal}>
          <span style={{margin:'0 5px'}}><DeleteOutlined /></span> Delete
        </Button>
      
      <Modal title="Hapus Formulir?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={'Hapus'} okType='danger' centered>
        <p>Apakah anda yakin untuk menghapus SEMUA data yang anda masukkan?</p>
        <p style={{color:'red'}}>note. data yang dihapus tidak bisa dikembalikan</p>
      </Modal></> : null
      }
        
      </div>
    </div>
  </div>
  )
}
export default Faip
{/* <>
  <h2>Masa pengiriman formulir sudah berakhir!</h2>
  <h3>Hubungi admin untuk perubahan</h3>
</> */}