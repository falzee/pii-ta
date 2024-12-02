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
    namaBahasa: string;
    jenisBahasa: string;
    kemampuanVerbalBahasa: string;
    jenisTulisan: string;
    klaimKompetensi: string[];
    // jumlahKlaimWSatu: number;
    klaimKompetensiWempat?: string[];
  }

const FormSixOne: React.FC = () => {
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
    //API = const response = await axios.get(`/form-penilaian/mhs?uid=${userId}&ft=i3`,config);

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
          const response = await axios.get(`/form-penilaian/mhs?uid=${userId}&ft=vi`,config)
          const userData = response.data;
          setDataSource(userData.data.form_vi)
          const newSelectedChoices: { [key: string]: string[] } = {};
          userData.data.form_vi.forEach((item: any) => {
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
            namaBahasa: '',
            jenisBahasa: '',
            kemampuanVerbalBahasa: '',
            jenisTulisan: '',
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
            namaBahasa : values[`namaBahasa${row.key}`],
            jenisBahasa: values[`jenisBahasa${row.key}`],
            kemampuanVerbalBahasa: values[`kemampuanVerbalBahasa${row.key}`],
            jenisTulisan: values[`jenisTulisan${row.key}`],
            klaimKompetensiWempat: selectedChoices[row.key] || [],
          }));
          
          // Now you can send formData to your backend for processing
          // console.log('Form Data:', formData);
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          const response = await axios.patch(`/form-penilaian/mhs?uid=${userId}&pid=${formId}&ft=vi`,formData,config);
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
      if (checked && currentRowChoices.length < 3) {
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
          alert('Harap Memilih Tidak Lebih Dari 3 Klaim Kompetensi W4');
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
          title: 'Nama Bahasa',
          dataIndex: 'namaBahasa',
          key: 'namaBahasa',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`namaBahasa${record.key}`} initialValue={text} style={{width:'200px'}}>
              <Input />
            </Form.Item>
          ),
        },
        {
          title: 'Jenis Bahasa',
          dataIndex: 'jenisBahasa',
          key: 'jenisBahasa',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`jenisBahasa${record.key}`} initialValue={record.jenisBahasa || undefined} >
              <Select placeholder="--Choose--" style={{ width: 280 }} >
                <Select.Option value="Bahasa Daerah">Bahasa Daerah</Select.Option>
                <Select.Option value="Bahasa Nasional">Bahasa Nasional</Select.Option>
                <Select.Option value="Bahasa Asing / Internasional">Bahasa Asing / Internasional</Select.Option>
              </Select>
            </Form.Item>
          ),
        },
        {
          title: 'Kemampuan Verbal Aktif/Pasif',
          dataIndex: 'kemampuanVerbalBahasa',
          key: 'kemampuanVerbalBahasa',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`kemampuanVerbalBahasa${record.key}`} initialValue={record.kemampuanVerbalBahasa || undefined} >
              <Select placeholder="--Choose--" style={{ width: 280 }} >
                <Select.Option value="Pasif (Tertulis)">Pasif (Tertulis)</Select.Option>
                <Select.Option value="Aktif (Tertulis/lisan)">Aktif (Tertulis/lisan)</Select.Option>
              </Select>
            </Form.Item>
          ),
        },
        {
            title: 'Jenis Tulisan Yang Mampu Disusun',
            dataIndex: 'jenisTulisan',
            key: 'jenisTulisan',
            render: (text: string, record: TableRow) => (
                <Form.Item name={`jenisTulisan${record.key}`} initialValue={record.jenisTulisan || undefined} >
                  <Select placeholder="--Choose--" style={{ width: 280 }} >
                    <Select.Option value="Makalah">Makalah</Select.Option>
                    <Select.Option value="Jurnal">Jurnal</Select.Option>
                    <Select.Option value="Laporan">Laporan</Select.Option>
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
            <h3 className='headerform' style={{marginBottom:'10px'}}>VI. Bahasa yang Dikuasai <span style={{color:'#6b7aa1'}}>(W4)</span></h3>
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

  export default FormSixOne;
