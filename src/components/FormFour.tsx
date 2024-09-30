
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
  
//four
interface TableRow {
  key: any;
  namaTandaPenghargaan: string;
  
  namaLembaga: string;
  
  kotaAsal: string;
  
  provinsiAsal: string;
  
  negaraAsal: string;
  
  bulanTerbit: string;
  tahunTerbit: string;
  
  tingkatPenghargaan: string;
  
  jenisLembagaPenghargaan: string;
  
  uraianSingkatAktifitas: string;
  
  klaimKompetensi: string[];
  klaimKompetensiWsatu?: string[]
  }
  //punya column
  
  const FormulirEmpat: React.FC = () => {
    //kumpulan state
    const { formId } = useParams<{ formId: string | undefined }>();
    const [dataSource, setDataSource] = useState<TableRow[]>([ ]);//data tabel
    const [selectedChoices, setSelectedChoices] = useState<{ [key: number]: string[] }>({});//pilihan checbox
    
    // const [rowNumbers, setRowNumbers] = useState<number>(1);//penomeran client side
    // const [showAdditionalFields, setShowAdditionalFields] = useState<boolean>(false);
    const [form] = Form.useForm();
    //kumpulan fungsi
    const formRef = React.createRef<FormInstance>();//
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
          const response = await axios.get(`/form-penilaian/mhs?uid=${userId}&ft=i4`,config)
          const userData = response.data;
          setDataSource(userData.data.form_i_empat)
          const newSelectedChoices: { [key: string]: string[] } = {};
          userData.data.form_i_empat.forEach((item: any) => {
            newSelectedChoices[item.key] = item.klaimKompetensiWsatu;
          });
          setSelectedChoices(newSelectedChoices);
    
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
          namaTandaPenghargaan: '',
          namaLembaga: '',
          kotaAsal: '',
          provinsiAsal: '',
          negaraAsal: '',
          bulanTerbit: '',
          tahunTerbit: '',
          tingkatPenghargaan: '',
          jenisLembagaPenghargaan: '',
          uraianSingkatAktifitas: '',
          klaimKompetensi: [],
        };
        setDataSource([...dataSource, newRow]);
        // setRowNumbers(rowNumbers + 1); 
      };
      

    

    const onFinish = async (values: any) => { //fungsi submit form //NEED API POST
      
      try{
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const decodedToken: any = jwtDecode(token);
          const userId = decodedToken.nomerInduk;
          const formData = dataSource.map(row => ({
            ...row,
            namaTandaPenghargaan : values[`namaTandaPenghargaan${row.key}`],
            namaLembaga: values[`namaLembaga${row.key}`],
            kotaAsal: values[`kotaAsal${row.key}`],
            provinsiAsal: values[`provinsiAsal${row.key}`] ,
            negaraAsal: values[`negaraAsal${row.key}`] ,
            bulanTerbit: values[`bulanTerbit${row.key}`] ,
            tahunTerbit: values[`tahunTerbit${row.key}`] ,
            tingkatPenghargaan: values[`tingkatPenghargaan${row.key}`] ,
            jenisLembagaPenghargaan: values[`jenisLembagaPenghargaan${row.key}`],
            uraianSingkatAktifitas: values[`uraianSingkatAktifitas${row.key}`] ,
            klaimKompetensiWsatu: selectedChoices[row.key] || [],
          }));
          
          // Now you can send formData to your backend for processing
          // console.log('Form Data:', formData);
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          const response = await axios.patch(`/form-penilaian/mhs?uid=${userId}&pid=${formId}&ft=i4`,formData,config);
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
    };
    // const handleCheckboxChange = (e:any) => {

    const handleChoiceChange = (recordKey: number, choiceValue: string, checked: boolean) => { //fungsi yg berhubungan dgn checbox klaim kompetensi
      const currentRowChoices = selectedChoices[recordKey] || [];
      console.log(currentRowChoices);
      if (checked && currentRowChoices.length < 6) {
        const updatedRowChoices = [...currentRowChoices, choiceValue];
          setSelectedChoices({
            ...selectedChoices,
            [recordKey]: updatedRowChoices,
          });
      } else if (!checked) {
        const updatedRowChoices = currentRowChoices.filter(choice => choice !== choiceValue);
          setSelectedChoices({
            ...selectedChoices,
            [recordKey]: updatedRowChoices,
          });
      }else {
          // Show alert if more than 3 choices selected
          alert('Harap Memilih Tidak Lebih Dari 6 Klaim Kompetensi W1');
      }
    };

    //   setShowAdditionalFields(e.target.checked);
    // };
    
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
          title: 'Nama Tanda Penghargaan',
          dataIndex: 'namaTandaPenghargaan',
          key: 'namaTandaPenghargaan',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`namaTandaPenghargaan${record.key}`} initialValue={text} style={{width:'200px'}}>
              <Input />
            </Form.Item>
          ),
        },
        {
          title: 'Nama Lembaga yang Memberikan',
          dataIndex: 'namaLembaga',
          key: 'namaLembaga',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`namaLembaga${record.key}`} initialValue={text} style={{width:'200px'}}>
              <Input />
            </Form.Item>
          ),
        },
        {
          title: 'Kota/Kabupaten',
          dataIndex: 'kotaAsal',
          key: 'kotaAsal',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`kotaAsal${record.key}`} initialValue={text} style={{width:'150px'}}>
              <Input />
            </Form.Item>
          ),
        },
        {
            title: 'Provinsi',
            dataIndex: 'provinsiAsal',
            key: 'provinsiAsal',
            render: (text: string, record: TableRow) => (
              <Form.Item name={`provinsiAsal${record.key}`} initialValue={text} style={{width:'150px'}}>
                <Input />
              </Form.Item>
            ),
          },
          {
            title: 'Negara',
            dataIndex: 'negaraAsal',
            key: 'negaraAsal',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`negaraAsal${record.key}`} initialValue={text} style={{width:'150px'}}>
                <Input />
              </Form.Item>
            ),
          },
          {
            title: 'Tanggal Terbit',
            dataIndex: 'tanggalTerbit',
            key: 'tanggalTerbit',
            width: 50,
            render: (text: string, record: TableRow, index: number) => (
                <div>
                    <Form.Item className='form-item-row' name={`bulanTerbit${record.key}`} initialValue={record.bulanTerbit || undefined}>
                      <Select placeholder="--Bulan--" style={{ width: 150 }}>
                        <Select.Option value="Januari">Januari</Select.Option>
                        <Select.Option value="Pebruari">Februari</Select.Option>
                        <Select.Option value="Maret">Maret</Select.Option>
                        <Select.Option value="April">April</Select.Option>
                        <Select.Option value="Mei">Mei</Select.Option>
                        <Select.Option value="Juni">Juni</Select.Option>
                        <Select.Option value="Juli">Juli</Select.Option>
                        <Select.Option value="Agustus">Agustus</Select.Option>
                        <Select.Option value="September">September</Select.Option>
                        <Select.Option value="Oktober">Oktober</Select.Option>
                        <Select.Option value="Nopember">November</Select.Option>
                        <Select.Option value="Desember">Desember</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item className='form-item-row' name={`tahunTerbit${record.key}`} initialValue={record.tahunTerbit || undefined}>
                        <Input placeholder='--Tahun--' />
                    </Form.Item>
                </div>
                ),
          },
          {
            title: 'Tingkat Penghargaan yang Diterima',
            dataIndex: 'tingkatPenghargaan',
            key: 'tingkatPenghargaan',
            render: (text: string, record: TableRow, index: number) => (
                <div>
                  <Form.Item name={`tingkatPenghargaan${record.key}`} initialValue={record.tingkatPenghargaan || undefined}>
                    <Select placeholder="--Choose--" style={{ width: 280 }}>
                      <Select.Option value="Tingkatan Muda/pemula">Tingkatan Muda/pemula</Select.Option>
                      <Select.Option value="Tingkatan Madya">Tingkatan Madya</Select.Option>
                      <Select.Option value="Tingkatan Utama">Tingkatan Utama</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                ),
          },
          {
            title: 'Penghargaan Diberikan oleh Lembaga',
            dataIndex: 'jenisLembagaPenghargaan',
            key: 'jenisLembagaPenghargaan',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`jenisLembagaPenghargaan${record.key}`} initialValue={record.jenisLembagaPenghargaan || undefined} >
                <Select placeholder="--Choose--" style={{ width: 280 }}>
                  <Select.Option value="Penghargaan Lokal">Penghargaan Lokal</Select.Option>
                  <Select.Option value="Penghargaan Nasional">Penghargaan Nasional</Select.Option>
                  <Select.Option value="Penghargaan Regional">Penghargaan Regional</Select.Option>
                  <Select.Option value="Penghargaan Internasional">Penghargaan Internasional</Select.Option>
                </Select>
              </Form.Item>
            ),
          },
          {
            title: 'Uraian Singkat Aktifitas',
            dataIndex: 'uraianSingkatAktifitas',
            key: 'uraianSingkatAktifitas',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`uraianSingkatAktifitas${record.key}`} initialValue={text} style={{width:'250px'}}>
                <TextArea rows={4} />
              </Form.Item>
            ),
          },
        {
          title: 'Klaim Kompetensi',
          dataIndex: 'klaimKompetensi',
          key: 'klaimKompetensi',
          render: (text: string[], record: TableRow) => (
          <div className='form-klaim-list'>
            <Form.Item name={`klaimKompetensi${record.key}`} initialValue={text} style={{width:'1000px',fontSize:'14px'}} >
              <div style={{ display: 'flex', flexDirection: 'column'}}>
                {dataWsatu.map(section => (
                <div key={section.value} >
                  <span style={{fontWeight:'bold'}}>{section.label}</span>
                    {section.children.map((subSection) => (
                      <div key={subSection.value} style={{borderBottom:'1px solid #dddddd',borderTop:'1px solid #dddddd'}}>
                        <Checkbox
                          value={subSection.value}
                          checked={(selectedChoices[record.key] || []).includes(subSection.value)}
                          onChange={(e : any) => handleChoiceChange(record.key, subSection.value, e.target.checked)}
                        >
                          {subSection.label}
                        </Checkbox>
                    </div>
                ))}
                </div>
              ))}
              </div>
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
            // <Button onClick={showModal} type='primary' danger><DeleteOutlined /> x</Button>
            // {/* <Modal title="Hapus Formulir?" open={isModalOpen} onOk={deleteRowForm} onCancel={handleCancel} okText={'Hapus'} okType='danger' centered> */}
            // <Modal title="Hapus data?" open={isModalOpen} onOk={() => handleDeleteRow(record.key)} onCancel={handleCancel} okText={'Hapus'} okType='danger' centered>
            //   <p>Apakah anda yakin untuk menghapus data baris ini?</p>
            //   <p style={{color:'red'}}>note. data yang dihapus tidak bisa dikembalikan</p>
            // </Modal>
            // </>
            
          ),
        },
      ];

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
          <h3 className='headerform' style={{marginBottom:'10px'}}>I.4 Tanda Penghargaan Yang Diterima (kerja tanpa pamrih) <span style={{color:'#6b7aa1'}}>(W1)</span></h3>
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
              <p style={{margin:'10px 0'}}>*&#41; KOMPETENSI: Isi dengan nomor Uraian Kegiatan Kompetensi yang Anda anggap persyaratannya telah terpenuhi dengan aktifitas Anda di sini</p>
              <Button className="saveFormButton" type="primary" htmlType="submit" style={{margin:'20px auto',display: "flex", justifyContent: "center" }}>
                  {/* <Button type="primary" htmlType="submit" disabled={totalSelected !== 3}> */}
                  Save & Continue
              </Button>
          </Form>
          <Modal title="Hapus data?" open={isModalOpen} onOk={handleDeleteRow} onCancel={handleCancel} okText={'Hapus'} okType='danger' centered>
            <p>Apakah anda yakin untuk menghapus data baris ini?</p>
            <p style={{color:'#faad14'}}>Data baru benar-benar terhapus dengan menekan tombol "save and continue" di bagian bawah</p>
          </Modal>
      </div>
  </div>
  </ConfigProvider>
    );
  };

  export default FormulirEmpat;
