import React, { useEffect, useState } from 'react';
import { Table, Form,Input, Button, Select, Upload, Checkbox, Divider, Space, ConfigProvider, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { nanoid } from 'nanoid';
import { ColumnsType } from 'antd/es/table';
import { dataPenam } from '../data/SectionFormDataP'
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
    namaInovasi: string;
    bulan: string;
    tahun: string;
    mediaPublikasi: string;
    tingkatMediaPublikasi: string;
	uraianSingkatInovasi: string;
	tingkatKesulitanInovasi: string;
    klaimKompetensi: string[];
    klaimKompetensiPenam?: string[];
  }

const FormFiveFour: React.FC = () => {
//kumpulan state
    const { formId } = useParams<{ formId: string | undefined }>();
    const [dataSource, setDataSource] = useState<TableRow[]>([  ]);//data tabel
    const [selectedChoices, setSelectedChoices] = useState<{ [key: string]: string[] }>({
      // "HGsQaJKrMKrMjLWQYDSFn": ["W.1.1.1", "W.1.1.2", "W.1.1.3", "W.1.1.4", "W.1.1.5", "W.1.2.3", "W.1.2.4", "W.1.2.7", "W.1.2.8", "W.1.2.5", "W.1.2.1", "W.1.3.6", "W.1.4.3"],
      // "s-OdRU7olVC70aqBwWvPo": ["W.1.1.3", "W.1.1.4"]
    });   
    // console.log("SELECTED CHOICE: "+ Object.entries(selectedChoices))
    // const [data, setdata] = useState();
    // const [rowNumbers, setRowNumbers] = useState<number>(1);//penomeran client side
    // const [showAdditionalFields, setShowAdditionalFields] = useState<boolean>(false);
    const [form] = Form.useForm();
//kumpulan fungsi
    const formRef = React.createRef<FormInstance>();//
    //API = const response = await axios.get(`http://localhost:8000/form-penilaian/mhs?uid=${userId}&ft=i3`,config);

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
          const response = await axios.get(`http://localhost:8000/form-penilaian/mhs?uid=${userId}&ft=v4`,config)
          const userData = response.data;
          setDataSource(userData.data.form_v_empat)
          const newSelectedChoices: { [key: string]: string[] } = {};
          userData.data.form_v_empat.forEach((item: any) => {
            newSelectedChoices[item.key] = item.klaimKompetensiPenam;
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
          namaInovasi: '',
          bulan: '',
          tahun: '',
          mediaPublikasi: '',
          tingkatMediaPublikasi: '',
          uraianSingkatInovasi: '',
          tingkatKesulitanInovasi: '',
          klaimKompetensi: [],
          // jumlahKlaimWSatu: 0,
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
            namaInovasi : values[`namaInovasi${row.key}`],
            bulan: values[`bulan${row.key}`],
            tahun: values[`tahun${row.key}`],
            mediaPublikasi: values[`mediaPublikasi${row.key}`],
            tingkatMediaPublikasi: values[`tingkatMediaPublikasi${row.key}`],
            uraianSingkatInovasi: values[`uraianSingkatInovasi${row.key}`],
            tingkatKesulitanInovasi: values[`tingkatKesulitanInovasi${row.key}`],
            klaimKompetensiPenam: selectedChoices[row.key] || [],
          }));
          
          // Now you can send formData to your backend for processing
          // console.log('Form Data:', formData);
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          const response = await axios.patch(`http://localhost:8000/form-penilaian/mhs?uid=${userId}&pid=${formId}&ft=v4`,formData,config);
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
    // const handleCheckboxChange = (e:any) => {

    const handleChoiceChange = (recordKey: string, choiceValue: string, checked: boolean) => { //fungsi yg berhubungan dgn checbox klaim kompetensi
      const currentRowChoices = selectedChoices[recordKey] || [];
      // console.log(currentRowChoices);
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
          alert('Harap Memilih Tidak Lebih Dari 6 Klaim Kompetensi P6');
      }
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
          title: 'Judul / Nama Karya Temuan/Inovasi/Paten dan Implementasi Teknologi Baru',
          dataIndex: 'namaInovasi',
          key: 'namaInovasi',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`namaInovasi${record.key}`} initialValue={text} style={{width:'200px'}}>
              <TextArea rows={4} />
            </Form.Item>
          ),
        },
          {
            title: 'Bulan/Tahun',
            dataIndex: 'waktuInovasi',
            key: 'waktuInovasi',
            width: 50,
            render: (text: string, record: TableRow, index: number) => (
                <div>
                    <Form.Item className='form-item-row' name={`bulan${record.key}`} initialValue={record.bulan || undefined}>
                      <Select placeholder="--Bulan--" style={{ width: 150 }}>
                        <Select.Option value="Januari">Januari</Select.Option>
                        <Select.Option value="Februari">Februari</Select.Option>
                        <Select.Option value="Maret">Maret</Select.Option>
                        <Select.Option value="April">April</Select.Option>
                        <Select.Option value="Mei">Mei</Select.Option>
                        <Select.Option value="Juni">Juni</Select.Option>
                        <Select.Option value="Juli">Juli</Select.Option>
                        <Select.Option value="Agustus">Agustus</Select.Option>
                        <Select.Option value="September">September</Select.Option>
                        <Select.Option value="Oktober">Oktober</Select.Option>
                        <Select.Option value="November">November</Select.Option>
                        <Select.Option value="Desember">Desember</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item className='form-item-row' name={`tahun${record.key}`} initialValue={record.tahun || undefined}>
                        <Input placeholder='--Tahun--' />
                    </Form.Item>
                </div>
                ),
          },
          {
            title: 'Media Publikasi Karya (Bila Ada)',
            dataIndex: 'mediaPublikasi',
            key: 'mediaPublikasi',
            render: (text: string, record: TableRow) => (
              <Form.Item name={`mediaPublikasi${record.key}`} initialValue={text} style={{width:'200px'}}>
                <TextArea rows={4} />
              </Form.Item>
            ),
          },
          {
            title: 'Uraian Singkat Karya Temuan/Inovasi/Paten dan Implementasi Teknologi Baru',
            dataIndex: 'uraianSingkatInovasi',
            key: 'uraianSingkatInovasi',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`uraianSingkatInovasi${record.key}`} initialValue={text} style={{width:'250px'}}>
                <TextArea rows={4} />
              </Form.Item>
            ),
          },
          {
            title: 'Tingkat Kesulitan dan Manfaat dari Karya Temuan/Inovasi/Paten dan Implementasi Teknologi Baru',
            dataIndex: 'tingkatKesulitanInovasi',
            key: 'tingkatKesulitanInovasi',
            render: (text: string, record: TableRow, index: number) => (
                <Form.Item name={`tingkatKesulitanInovasi${record.key}`} initialValue={record.tingkatKesulitanInovasi  || undefined}>
                <Select placeholder="--Choose--" style={{ width: 780 }}>
                  <Select.Option value="rendah">Komplikasi masalah, kreatifitas & inovasi rendah, nilai manfaat dan dampak nilai teknologi rendah</Select.Option>
                  <Select.Option value="sedang">Komplikasi masalah, kreatifitas & inovasi sedang, nilai manfaat dan dampak nilai teknologi sedang</Select.Option>
                  <Select.Option value="luas">Komplikasi masalah, kreatifitas & inovasi tinggi, nilai manfaat dan dampak nilai teknologi luas</Select.Option>
                  <Select.Option value="sangatluas">Komplikasi masalah, kreatifitas & inovasi sangat tinggi, nilai manfaat dan dampak nilai teknologi sangat luas</Select.Option>
                </Select>
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
                {dataPenam.map(section => (
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
            <h3 className='headerform' style={{marginBottom:'10px'}}>V.4 Karya Temuan/Inovasi/Paten dan Implementasi Teknologi Baru <span style={{color:'#6b7aa1'}}>(P6)</span></h3>
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
              {/* <p>Apakah anda yakin untuk menghapus data baris ini?</p> */}
              <p style={{color:'#faad14'}}>Data baru benar-benar terhapus dengan menekan tombol "save and continue" di bagian bawah</p>
            </Modal>
        </div>
    </div>
    </ConfigProvider>

    );
  };

  export default FormFiveFour;
