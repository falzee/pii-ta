import { Button, Modal, Space, Tag, theme } from 'antd';
import { Header } from 'antd/es/layout/layout'
import Table, { ColumnsType } from 'antd/es/table';
import { title } from 'process';
import React, { useEffect, useState } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, UndoOutlined, UploadOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { nanoid } from 'nanoid';


const Faip = ( ) => {
  const [nama, setNama] = useState(''); // State to store the user's role
  const [nim, setNim] = useState('');
  const [pid,setPid] = useState('')
  const [lastUpdate,setLastUpdate] = useState('')
  const [lastEdit,setLastEdit] = useState('')
  const [status, setStatus] = useState('');// new,edit,submit,expired
  const [validateAssesor, setValidateAssesor] = useState('');  

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve JWT token from localStorage
    fetchUserData();
  }, [status]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('jwtToken');

      if (token) {
        // Decode the token to extract user ID
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.nomerInduk;
        setNama(decodedToken.nama);
        setNim(decodedToken.nomerInduk);
        // console.log("nim mauk:" + nim)
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        // Make API request with user ID
        const response = await axios.get(`/form-penilaian/mhs?uid=${userId}&ft=info`,config);
        const responseAssesor = await axios.get(`/form-tools/faip-form/all-assesor/${userId}`,config);
        console.log("[responseAssesor] = " + responseAssesor.data.data.dosen_penilai_faip)
        if (responseAssesor.data.data.dosen_penilai_faip && responseAssesor.data.data.dosen_penilai_faip.length > 0){
          setValidateAssesor("verified");
          console.log("[validateAssesor] = " + validateAssesor)
        } else if (responseAssesor.data.data.dosen_penilai_faip.length === 0){
          setValidateAssesor("notVerified");
          console.log('Condition not met, array is empty or undefined');
        }
        const userData = response.data;
        
        setPid(userData.data.pid)
        setLastUpdate(userData.data.last_updated.slice(0, 10))
        setLastEdit(userData.data.last_change)
        if (userData.data.status === "111-0"){
          setStatus('edit')
        } else if (userData.data.status === "111-1"){
          setStatus("retry")
        } else if (userData.data.status === "111-2" || userData.data.status === "111-3"){
          setStatus("submit")
        } 

        // if (responseAssesor.data.data.dosen_penilai_faip){
        //   setValidateAssesor(true)
        // }
        // console.log("userdata:"+ userData.data.pid)
        // setUserData(userData);
        // Update the items with fetched data

      } else {
        console.error('User not found');
      }
    } catch (error) {
      console.error('Error getting user data');
      setLastUpdate('')
      setLastEdit('')
      setStatus('new')
      const token = localStorage.getItem('jwtToken');

      if (token) {
        // Decode the token to extract user ID
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.nomerInduk;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        // const responseAssesor = await axios.get(`/form-tools/all-list/${userId}`, config);

        // // Logging the response to verify the structure
        // console.log(responseAssesor.data);

        // if (responseAssesor.data.data.list_one && responseAssesor.data.data.list_one.length > 0) {
        //   console.log('Condition met, setting state to true');
        //   setValidateAssesor(true);
        // } else {
        //   console.log('Condition not met, array is empty or undefined');
        // }
        const responseAssesor = await axios.get(`/form-tools/faip-form/all-assesor/${userId}`,config);
        console.log("[responseAssesor] = " + responseAssesor.data.data.dosen_penilai_faip)
        if (responseAssesor.data.data.dosen_penilai_faip && responseAssesor.data.data.dosen_penilai_faip.length > 0){
          setValidateAssesor("verified");
          console.log("[validateAssesor] = " + validateAssesor)
        } else if (responseAssesor.data.data.dosen_penilai_faip.length === 0){
          setValidateAssesor("notVerified");
          console.log('Condition not met, array is empty or undefined');
        }

      } else {
        console.error('User not found');
      }
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteForm = async () => {
    try{
      const token = localStorage.getItem('jwtToken');

      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.patch(`/form-penilaian/mhs/reset-form?uid=${nim}&pid=${pid}`,{},config);
        // console.log("response add form:"+response)

        // const userData = response.data;
        // setStatus("new")
      } else {
        console.error('User not found');
      }
    }catch(error){
      console.error('Error deleting form');
    }
    setIsModalOpen(false);
    window.location.reload(); 
  };

  const restartForm = async () => {
    try{
      const token = localStorage.getItem('jwtToken');

      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.patch(`/form-penilaian/mhs/restart-form?uid=${nim}&pid=${pid}`,{},config);
        // console.log("response add form:"+response)
        setStatus("edit");
        navigate(`/form/m/faip/edit/${pid}`, { replace: false });
        // const userData = response.data;
        // setStatus("new")
      } else {
        console.error('User not found');
      }
    }catch(error){
      console.error('Error deleting form');
    }

  };

  const newForm = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const prefix = 'formM-'; // Define your prefix here
      const pid = `${prefix}${nanoid()}`;       
      // console.log("token form:" + token);
      
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Ensure the Content-Type header is set
          }
        };  
        const response = await axios.post(`/form-penilaian/mhs?uid=${nim}&pid=${pid}`, {}, config);
        // console.log("response create form:" + response);
  
        // const userData = response.data;
        setStatus("edit");
        navigate(`/form/m/faip/edit/${pid}`, { replace: false });
        
      } else {
        console.error('User not found');
      }
    } catch (error) {
      console.error('Form can\'t be created');
    }
  };

  const submitForm = async () => {
    try{
      const token = localStorage.getItem('jwtToken');

      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        await axios.patch(`http://192.168.195.241:8000/form-penilaian/mhs/submit-form?uid=${nim}&pid=${pid}`,{},config);
        // console.log("response add form:"+response)

        // const userData = response.data;
        // setStatus("new")
      } else {
        console.error('User not found');
      }
    }catch(error){
      console.error('Error submitting form');
    }
    window.location.reload(); 
  };

  useDocumentTitle('PII TA | FAIP');

  return (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div className='form' style={{ padding: '1rem', width: '100%', maxWidth: '800px', backgroundColor: '' }}>
      {/* header tambahin underline sama shadow(opsional) */}
      <h2 style={{ padding: '0 0 1rem', textAlign: 'left', width: '100%', borderBottom: '2px solid #D3D3D3' }}>Formulir FAIP</h2>

      {/* <h3 style={{ padding: '1rem 0 0' }}>Data Pribadi:</h3> */}
      <p style={{ padding: '1rem 0 0' }}>Nama : {nama}</p> 
      <p style={{ padding: '1rem 0 0' }}>Nim : {nim}</p>
      <p style={{ padding: '1rem 0 0' }}>Last updated : {lastUpdate ? lastUpdate : "-"}</p>
      <p style={{ padding: '1rem 0 0' }}>Last change : {lastEdit ? lastEdit : "-"}</p>
      <p style={{ padding: '1rem 0 0' }}>Status : {(status === 'new') ? 'Baru' : (status === 'edit') ? 'Data Masuk' : (status === 'retry') ? 'Ulang' : (status === 'submit') ? 'Terkirim': '-'}</p>
      <p style={{ padding: '1rem 0 0' }}>note.</p>
      <p style={{ padding: '0' }}>- Jangan lupa untuk mengirim formulir di bagian <span style={{color:'blue'}}>SUBMIT</span> di halaman pengisian formulir FAIP setelah selesai</p>
      <p style={{ padding: '0' }}>- Formulir masih bisa diedit dan dirubah selama belum di submit </p>
      {
        (validateAssesor === "verified") ? 
          <div style={{display: 'flex',justifyContent: 'center',alignItems:'center',margin:'1rem 0'}}>
          { (status === 'new') ? 
          // like edit, but button with post api to sever to create new form and make pid for dynamic pid
          // <Link className='link-hover' style={{}} to={`/form/mahasiswa/faip/edit/${pid}`}>
          <Button type="primary" size='large' onClick={newForm} style={{ borderRadius:'3px',margin:'0 0.5rem' }} >
                + Baru
              </Button> 
            :(status === 'retry') ? 
            // like edit, but button with post api to sever to create new form and make pid for dynamic pid
            // <Link className='link-hover' style={{}} to={`/form/mahasiswa/faip/edit/${pid}`}>
            <Button type="primary" size='large' onClick={restartForm} style={{ borderRadius:'3px',margin:'0 0.5rem' }} >
                + Buat Ulang
              </Button> 
              : (status === 'edit') ?
              <>
              {/* edit to> edit in dynamic page with pid > submit/ delete get popup> reload (delete no reload only submit)> 
              if try change page get popup u sure? > only save if submit/delete so if sure just go away w/out save*/}
              <Link className='link-hover' style={{margin:'0 0.5rem'}} to={`/form/m/faip/edit/${pid}`}>
                <Button type="primary" size='large' style={{ borderRadius:'3px' }} >
                  <span style={{margin:'0 5px'}}><EditOutlined /></span> Edit
                </Button>
              </Link>
              {/* delete to>popup > delete> backend delete &  state to new again & reload */}
              <Button type="primary" danger size='large' style={{ borderRadius:'3px',margin:'0 0.5rem' }} onClick={showModal}>
                <span style={{margin:'0 5px'}}><DeleteOutlined /></span> Delete
              </Button>
              {/* 
              <Button type="primary" size='large' style={{ borderRadius:'3px',margin:'0 0.5rem' }} onClick={submitForm}>
              <span style={{margin:'0 5px'}}><UploadOutlined /></span> Submit
              </Button> */}
            
              <Modal title="Hapus Formulir?" open={isModalOpen} onOk={deleteForm} onCancel={handleCancel} okText={'Hapus'} okType='danger' centered>
                <p>Apakah anda yakin untuk menghapus <span style={{color:'red'}}>SEMUA</span> data yang anda masukkan?</p>
                <p style={{color:'red'}}>note. data yang dihapus tidak bisa dikembalikan</p>
              </Modal>
              </> 
            : (status === 'submit') ?
                <>
                  <p style={{color:"blue"}}>Data Sudah Berhasil Terkirim!</p>
                  {/* <Button type="primary" size='large' style={{ borderRadius:'3px',margin:'0 0.5rem' }} onClick={deleteForm}>
                    <span style={{margin:'0 5px'}}><UndoOutlined /></span> RESTART DEV
                  </Button> */}
                </>
            : null
        }
          
        </div> 
        : (validateAssesor === "notVerified") ?
          <div style={{display: 'flex',justifyContent: 'center',alignItems:'center',margin:'1rem 0'}}>
            <p style={{color:"red"}}>Form belum dapat dibuka,harap hubungi admin!</p>
          </div>
        : null
      }
      
    </div>
  </div>
  )
}
export default Faip
{/* <>
  <h2>Masa pengiriman formulir sudah berakhir!</h2>
  <h3>Hubungi admin untuk perubahan</h3>
</> */}
