import React, { useEffect, useState } from 'react';
import { Table, Form,Input, Button, Select, Upload, Checkbox, Divider, Space, ConfigProvider, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { nanoid } from 'nanoid';
import { ColumnsType } from 'antd/es/table';
import { dataWempat } from '../data/SectionFormDataW'
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
    judulKaryaTulis: string;
    namaMedia: string;
    kota: string;
    provinsi: string;
    negara : string;
    bulanTerbit: string;
    tahunTerbit: string;
    tingkatMediaPublikasi: string;
	uraianSingkatMateriPublikasi: string;
    tingkatKesulitanPublikasi: string;
    klaimKompetensi: string[];
    klaimKompetensiWempat?: string[];
  }

const FormFiveOne: React.FC = () => {
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
          const response = await axios.get(`http://192.168.195.241:8000/form-penilaian/mhs?uid=${userId}&ft=v1`,config)
          const userData = response.data;
          setDataSource(userData.data.form_v_satu)
          const newSelectedChoices: { [key: string]: string[] } = {};
          userData.data.form_v_satu.forEach((item: any) => {
            newSelectedChoices[item.key] = item.klaimKompetensiWempat;
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
          judulKaryaTulis: '',
          namaMedia: '',
          kota: '',
          provinsi: '',
          negara: '',
          bulanTerbit: '',
          tahunTerbit: '',
          tingkatMediaPublikasi: '',
          uraianSingkatMateriPublikasi: '',
          tingkatKesulitanPublikasi: '',
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
            judulKaryaTulis : values[`judulKaryaTulis${row.key}`],
            namaMedia: values[`namaMedia${row.key}`],
            kota: values[`kota${row.key}`],
            provinsi: values[`provinsi${row.key}`],
            negara: values[`negara${row.key}`],
            bulanTerbit: values[`bulanTerbit${row.key}`],
            tahunTerbit: values[`tahunTerbit${row.key}`],
            tingkatMediaPublikasi: values[`tingkatMediaPublikasi${row.key}`],
            uraianSingkatMateriPublikasi: values[`uraianSingkatMateriPublikasi${row.key}`],
            tingkatKesulitanPublikasi: values[`tingkatKesulitanPublikasi${row.key}`],
            klaimKompetensiWempat: selectedChoices[row.key] || [],
          }));
          
          // Now you can send formData to your backend for processing
          // console.log('Form Data:', formData);
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          const response = await axios.patch(`http://192.168.195.241:8000/form-penilaian/mhs?uid=${userId}&pid=${formId}&ft=v1`,formData,config);
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
      if (checked && currentRowChoices.length < 4) {
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
          alert('Harap Memilih Tidak Lebih Dari 4 Klaim Kompetensi W4');
      }
    };
    //   setShowAdditionalFields(e.target.checked);
    // };
    const handleCheckboxChange = (key: any, checked: boolean) => {
      setDataSource((prevData) =>
        prevData.map((record) =>
          record.key === key ? { ...record, masihAnggota: checked } : record
        )
      );
    };

    // const openModalDelete = (key: any) => { //fungsi hapus baris  //NEED API DELETE
    //   // const updatedDataSource = dataSource.filter(row => row.key !== key);
    //   // setDataSource(updatedDataSource);
    //   setIsModalOpen(false);
    // };
    // const showModal = (record:any) => {
    //   console.log(record);
    //   setmodaldata(record);
    //   setIsModalVisible(true);
    //   };
    // const deleteRowForm = async (record: TableRow) => {
    //   try{
    //     const token = localStorage.getItem('jwtToken');
    //     if (token) {
    //       const decodedToken: any = jwtDecode(token);
    //       const userId = decodedToken.nomerInduk;
    //       const config = {
    //         headers: {
    //           Authorization: `Bearer ${token}`
    //         }
    //       };
    //       const response = await axios.patch(`http://192.168.195.241:8000/form-penilaian/mhs?uid=${userId}&pid=${formId}&ft=i3`,config);
    //       console.log("response add form:"+response)
    //       handleDeleteRow(record.key)

    //       // const userData = response.data;
    //       // setStatus("new")
    //     } else {
    //       console.error('JWT token not found');
    //     }
    //   }catch(error){
    //     console.log('Error deleting row data form:', error);
    //   }
    //   setIsModalOpen(false);
    //   // window.location.reload(); 
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
          title: 'Judul Karya Tulis',
          dataIndex: 'judulKaryaTulis',
          key: 'judulKaryaTulis',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`judulKaryaTulis${record.key}`} initialValue={text} style={{width:'200px'}}>
              <TextArea rows={4} />
            </Form.Item>
          ),
        },
        {
          title: 'Nama Media Publikasi',
          dataIndex: 'namaMedia',
          key: 'namaMedia',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`namaMedia${record.key}`} initialValue={text} style={{width:'200px'}}>
              <TextArea rows={4} />
            </Form.Item>
          ),
        },
        {
          title: 'Kota/Kabupaten',
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
            title: 'Kapan Karya Tulis dipublikasikan?',
            dataIndex: 'waktuPublikasiKarya',
            key: 'waktuPublikasiKarya',
            width: 50,
            render: (text: string, record: TableRow, index: number) => (
                <div>
                    <Form.Item className='form-item-row' name={`bulanTerbit${record.key}`} initialValue={record.bulanTerbit || undefined}>
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
                    <Form.Item className='form-item-row' name={`tahunTerbit${record.key}`} initialValue={record.tahunTerbit || undefined}>
                        <Input placeholder='--Tahun--' />
                    </Form.Item>
                </div>
                ),
          },
          {
            title: 'Tingkat Media Pulikasi',
            dataIndex: 'tingkatMediaPublikasi',
            key: 'tingkatMediaPublikasi',
            render: (text: string, record: TableRow, index: number) => (
                <Form.Item name={`tingkatMediaPublikasi${record.key}`} initialValue={record.tingkatMediaPublikasi  || undefined}>
                <Select placeholder="--Choose--" style={{ width: 280 }}>
                  <Select.Option value="lokal">Dimuat di Media Lokal</Select.Option>
                  <Select.Option value="nasional">Dimuat di Media Nasional</Select.Option>
                  <Select.Option value="internasional">Dimuat di Media Internasional</Select.Option>
                </Select>
              </Form.Item>
            ),
          },
          {
            title: 'Uraian Singkat Materi yang Dipublikasikan',
            dataIndex: 'uraianSingkatMateriPublikasi',
            key: 'uraianSingkatMateriPublikasi',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`uraianSingkatMateriPublikasi${record.key}`} initialValue={text} style={{width:'250px'}}>
                <TextArea rows={4} />
              </Form.Item>
            ),
          },
          {
            title: 'Tingkat Kesulitan dan Manfaat dari Materi yang Dipublikasikan',
            dataIndex: 'tingkatKesulitanPublikasi',
            key: 'tingkatKesulitanPublikasi',
            render: (text: string, record: TableRow, index: number) => (
                <Form.Item name={`tingkatKesulitanPublikasi${record.key}`} initialValue={record.tingkatKesulitanPublikasi  || undefined}>
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
                {dataWempat.map(section => (
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
            <h2 className='headerform' style={{marginBottom:'10px',textAlign:'center'}}>V. PUBLIKASI, KOMUNIKASI DAN TEMUAN/INOVASI DI BIDANG KEINSINYURAN</h2>
            <h3 className='headerform' style={{marginBottom:'10px'}}>V.1 Karya Tulis di Bidang Keinsinyuran yang Dipublikasikan <span style={{color:'#6b7aa1'}}>(W4)</span></h3>
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

  export default FormFiveOne;
