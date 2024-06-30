import React, { useEffect, useState } from 'react';
import { Table, Form,Input, Button, Select, Upload, Checkbox, Divider, Space, ConfigProvider, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { nanoid } from 'nanoid';
import { ColumnsType } from 'antd/es/table';
import { dataWsatu } from '../data/SectionFormDataW'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router';


  //rules
  // i3 W1 maks 13
  // i4 W1 maks 6
  // i5 W2 maks 5,W4 maks 5,P10 maks 5
  // i6 W1 maks 6,W4 maks 5,P10 maks 5
  

  //punya column
  interface TableRow {
    key: any;
    namaKualifikasiEtik: string;
    lembaga: string;
    alamat: string;
    kota: string;
    provinsi: string;
    negara: string;
    noTelp: string;
    email: string;
    hubungan: string;
  }

const FormulirDuaSatu: React.FC = () => {
//kumpulan state
    const { formId } = useParams<{ formId: string | undefined }>();
    const [dataSource, setDataSource] = useState<TableRow[]>([  ]);//data tabel
    // const [form] = Form.useForm();
//kumpulan fungsi
    const formRef = React.createRef<FormInstance>();//
    //API = const response = await axios.get(`http://192.168.195.241:8000/form-penilaian/mhs?uid=${userId}&ft=i3`,config);

    useEffect(() => {
      // Retrieve JWT token from localStorage
      fetchFaipData();
    }, []);
    
    const fetchFaipData = async () => {
      try {
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
          // Make API request with user ID
          const response = await axios.get(`http://192.168.195.241:8000/form-penilaian/mhs?uid=${userId}&ft=ii1`,config)
          const userData = response.data;
          setDataSource(userData.data.form_ii_satu)
    
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching data'); 
      }
    };
    const handleAddRow = () => { //fungsi nambah baris 
        const newRow: TableRow = {
          key: nanoid(),//gk perlu //gk jadi deng ternyata perlu
          namaKualifikasiEtik: '',
          lembaga: '',
          alamat: '',
          kota: '',
          provinsi: '',
          negara: '',
          noTelp: '',
          email: '',
          hubungan:'',
        };
        setDataSource([...dataSource, newRow]);
        // setRowNumbers(rowNumbers + 1); 
      };
      

    // const updatedRowNumbers = updatedDataSource.map(row => row.id).splice(-1,1,);
    // console.log(updatedRowNumbers)
    // const updatedNumbers = updatedRowNumbers.splice(-1, 1) ;
  
    // console.log(updatedRowNumbers)
    //buggg

    const onFinish = async (values: any) => { //fungsi submit form //NEED API POST

      try{
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const decodedToken: any = jwtDecode(token);
          const userId = decodedToken.nomerInduk;

          const formData = dataSource.map(row => ({
            ...row,
            namaKualifikasiEtik : values[`namaKualifikasiEtik${row.key}`],
            lembaga: values[`lembaga${row.key}`],
            alamat: values[`alamat${row.key}`],
            kota: values[`kota${row.key}`],
            provinsi: values[`provinsi${row.key}`],
            negara: values[`negara${row.key}`],
            noTelp: values[`noTelp${row.key}`],
            email: values[`email${row.key}`],
            hubungan: values[`hubungan${row.key}`],
          }));
          
          // Now you can send formData to your backend for processing
          // console.log('Form Data:', formData);
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          const response = await axios.patch(`http://192.168.195.241:8000/form-penilaian/mhs?uid=${userId}&pid=${formId}&ft=ii1`,formData,config);
          // console.log("response add form:"+response)

          // const userData = response.data;
          // setStatus("new")
        } else {
          console.error('User not found');
        }
      }catch(error){
        console.error('Error sending form');
      }
      window.location.reload();
      
      // ... your form submission logic ...
    };

    
//kolom tabel
    const columns: ColumnsType<TableRow>= [
        {
          title: 'No.', // Visual numbering
          dataIndex: 'visualNumber', // This doesn't have to correspond to any data field
          key: 'visualNumber',
          render: (text: string, record: TableRow, index: number) => (<span style={{fontWeight:'bold'}}>{`${index + 1}`}</span>), // Render the row index + 1,
          width: 50,
          align: 'center' as const,
          fixed: 'left',
        },
        {
          title: 'Nama',
          dataIndex: 'namaKualifikasiEtik',
          key: 'namaKualifikasiEtik',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`namaKualifikasiEtik${record.key}`} initialValue={text} style={{width:'200px'}}>
              <Input />
            </Form.Item>
          ),
        },
        {
          title: 'Lembaga',
          dataIndex: 'lembaga',
          key: 'lembaga',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`lembaga${record.key}`} initialValue={text} style={{width:'250px'}}>
              <Input />
            </Form.Item>
          ),
        },
        {
          title: 'Alamat',
          dataIndex: 'alamat',
          key: 'alamat',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`alamat${record.key}`} initialValue={text} style={{width:'250px'}}>
              <TextArea rows={4} />
            </Form.Item>
          ),
        },
        {
            title: 'Kota / Kabupaten',
            dataIndex: 'kota',
            key: 'kota',
            render: (text: string, record: TableRow) => (
              <Form.Item name={`kota${record.key}`} initialValue={text} style={{width:'150px'}}>
                <Input />
              </Form.Item>
            ),
          },
        {
            title: 'Provinsi',
            dataIndex: 'provinsi',
            key: 'provinsi',
            render: (text: string, record: TableRow) => (
              <Form.Item name={`provinsi${record.key}`} initialValue={text} style={{width:'150px'}}>
                <Input />
              </Form.Item>
            ),
          },
          {
            title: 'Negara',
            dataIndex: 'negara',
            key: 'negara',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`negara${record.key}`} initialValue={text} style={{width:'150px'}}>
                <Input />
              </Form.Item>
            ),
          },
          {
            title: 'No. Telp',
            dataIndex: 'noTelp',
            key: 'noTelp',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`noTelp${record.key}`} initialValue={text} style={{width:'150px'}}>
                <Input />
              </Form.Item>
            ),
          },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`email${record.key}`} initialValue={text} style={{width:'250px'}}>
                <Input />
              </Form.Item>
            ),
          },
          {
            title: 'Hubungan',
            dataIndex: 'hubungan',
            key: 'hubungan',
            render: (text: string, record: TableRow, index: number) => (
                <div>
                  <Form.Item name={`hubungan${record.key}`} initialValue={record.hubungan || undefined}>
                    <Select placeholder="--Choose--" style={{ width: 280 }}>
                      <Select.Option value="atasan">Atasan</Select.Option>
                      <Select.Option value="rekanKerja">Rekan kerja</Select.Option>
                      <Select.Option value="rekanSeprofesi">Rekan Seprofesi</Select.Option>
                      <Select.Option value="lainLain">Lain-lain</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                ),
          },
        {
            title: 'Hapus',
            dataIndex: 'actions',
            key: 'actions',
            render: (text: string, record: TableRow) => (
            // <>
            <Button onClick={() => openModalDelete(record)} type='primary' danger>
              <DeleteOutlined />
            </Button>         
          ),
        },
      ];
      //modal logic
      const handleDelete = (key: any) => {
        const newData = dataSource.filter(item => item.key !== key);
        setDataSource(newData);
      };

      const [isModalOpen, setIsModalOpen] = useState(false);
      const [modaldata, setmodaldata] = useState<any>([]);
      const openModalDelete = (record: any) => { //fungsi hapus baris  //NEED API DELETE
        // const updatedDataSource = dataSource.filter(row => row.key !== key);
        setmodaldata(record);
        setIsModalOpen(true);
      };
      const handleDeleteRow = () => {
        handleDelete(modaldata.key);
        setIsModalOpen(false);
        };
      const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    //struktur komponen
    return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBorderRadius: 4,
          },
          Checkbox: {
            colorPrimary: '#6b7aa1',
            colorPrimaryHover: '#7e90be',
          },
          Input: {
            activeBorderColor:'#7e90be',
            hoverBorderColor:'#7e90be',
          },
        }
      }}
    >
    <div>
        <div className='container-form'>
            <h2 className='headerform' style={{marginBottom:'10px',textAlign:'center'}}>II. KUALIFIKASI KODE ETIK INSINYUR INDONESIA dan ETIKA PROFESIONAL</h2>
            <h3 className='headerform' style={{marginBottom:'10px'}}>II.1 Referensi Kode Etik dan Etika Profesi <span style={{color:'#6b7aa1'}}>(#)</span></h3>
            <Button className="addFormButton" type="primary" onClick={handleAddRow} style={{marginBottom:'10px'}}>
                + Add Row
            </Button>
            <Form ref={formRef} onFinish={onFinish} >
              <div style={{ overflowY: 'hidden', overflowX: 'auto' }}>
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  pagination={false}
                  rowKey={(record) => record.key}
                  size="small"
                  scroll={{ y: 400, x: 'max-content' }} // Adjust x as needed
                  bordered
                />
              </div>
                <p style={{margin:'10px 0'}}>*&#41; Catatan: <span style={{color:'#6b7aa1'}}>(#)</span> Sekurang-krangnya 2 (dua) orang,sebanyak-banyaknya 4 (empat) orang</p>
                <Button className="saveFormButton" type="primary" htmlType="submit" style={{margin:'20px auto',display: "flex", justifyContent: "center" }}>
                    {/* <Button type="primary" htmlType="submit" disabled={totalSelected !== 3}> */}
                    Save & Continue
                </Button>
            </Form>
            <Modal title="Hapus data?" open={isModalOpen} onOk={handleDeleteRow} onCancel={handleCancel} okText={'Hapus'} okType='danger' centered>
              {/* <p>Apakah anda yakin untuk menghapus data baris ini?</p> */}
              <p style={{color:'#faad14'}}>Data baru benar-benar terhapus dengan menekan tombol "save and continue" di bagian bawah</p>
            </Modal>
        </div>
    </div>
    </ConfigProvider>

    );
  };

  export default FormulirDuaSatu;
