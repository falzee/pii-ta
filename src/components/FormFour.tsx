import React, { useState } from 'react';
import { Table, Form,Input, Button, Select, Upload, Checkbox, Divider, Space } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { nanoid } from 'nanoid';
import { ColumnsType } from 'antd/es/table';
import { dataWsatu } from '../data/SectionFormData'


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
  }
  //punya column
  
  const FormulirEmpat: React.FC = () => {
    //kumpulan state
    const [dataSource, setDataSource] = useState<TableRow[]>([]);//data tabel
    const [selectedChoices, setSelectedChoices] = useState<{ [key: number]: string[] }>({});//pilihan checbox
    
    // const [rowNumbers, setRowNumbers] = useState<number>(1);//penomeran client side
    // const [showAdditionalFields, setShowAdditionalFields] = useState<boolean>(false);
    const [form] = Form.useForm();
    //kumpulan fungsi
    const formRef = React.createRef<FormInstance>();//
    
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
      
    const handleDeleteRow = (key: any) => { //fungsi hapus baris  //NEED API DELETE
      const updatedDataSource = dataSource.filter(row => row.key !== key);
      setDataSource(updatedDataSource);
        // const updatedRowNumbers = updatedDataSource.map(row => row.id).splice(-1,1,);
        // console.log(updatedRowNumbers)
        // const updatedNumbers = updatedRowNumbers.splice(-1, 1) ;
      
        // console.log(updatedRowNumbers)
        //buggg
    };
    

    const onFinish = (values: any) => { //fungsi submit form //NEED API POST
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
        klaimKompetensiWdua: selectedChoices[row.key] || [],
      }));
      
      // Now you can send formData to your backend for processing
      const formDataJson = JSON.stringify(formData, (key, value) => {
        // Include properties with undefined values
        return value === undefined ? null : value;
      });
      console.log('Form Data:', formDataJson);
      
      // ... your form submission logic ...
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
            width: 22,
            align: 'center' as const,
          },
        {
          title: 'NAMA TANDA PENGHARGAAN',
          dataIndex: 'namaTandaPenghargaan',
          key: 'namaTandaPenghargaan',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`namaTandaPenghargaan${record.key}`} initialValue={text} style={{width:'200px'}}>
              <Input />
            </Form.Item>
          ),
        },
        {
          title: 'NAMA LEMBAGA YANG MEMBERIKAN',
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
            title: 'TANGGAL TERBIT',
            dataIndex: 'tanggalTerbit',
            key: 'tanggalTerbit',
            render: (text: string, record: TableRow, index: number) => (
                <div>
                    <Form.Item name={`bulanTerbit${record.key}`} initialValue={undefined}>
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
                    <Form.Item name={`tahunTerbit${record.key}`} initialValue={text}>
                        <Input placeholder='--Tahun--' />
                    </Form.Item>
                </div>
                ),
          },
          {
            title: 'Penghargaan yang diterima tingkat',
            dataIndex: 'tingkatPenghargaan',
            key: 'tingkatPenghargaan',
            render: (text: string, record: TableRow, index: number) => (
                <div>
                  <Form.Item name={`tingkatPenghargaan${record.key}`} initialValue={undefined}>
                    <Select placeholder="--Choose--" style={{ width: 280 }}>
                      <Select.Option value="pemula">Tingkatan Muda/pemula</Select.Option>
                      <Select.Option value="madya">Tingkatan Madya</Select.Option>
                      <Select.Option value="utama">Tingkatan Utama</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                ),
          },
          {
            title: 'Penghargaan diberikan oleh lembaga',
            dataIndex: 'jenisLembagaPenghargaan',
            key: 'jenisLembagaPenghargaan',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`jenisLembagaPenghargaan${record.key}`} initialValue={undefined} >
                <Select placeholder="--Choose--" style={{ width: 280 }}>
                  <Select.Option value="lokal">Penghargaan Lokal</Select.Option>
                  <Select.Option value="nasional">Penghargaan Nasional</Select.Option>
                  <Select.Option value="regional">Penghargaan Regional</Select.Option>
                  <Select.Option value="internasional">Penghargaan Internasional</Select.Option>
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
          <div style={{ height: '150px', overflowY: 'scroll',border:'1px solid #dddddd',padding:'5px' }}>
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
            <Button onClick={() => handleDeleteRow(record.key)} danger><DeleteOutlined /> x</Button>
          ),
        },
      ];
    
    //struktur komponen
    return (
    <div>
        <div className='container-form'>
            <h3 className='headerform' style={{marginBottom:'10px'}}>I.4 Tanda Penghargaan Yang Diterima (kerja tanpa pamrih) <span style={{color:'#6b7aa1'}}>(W1)</span></h3>
            <Button className="addFormButton" type="primary" onClick={handleAddRow} style={{marginBottom:'10px'}}>
                + Add Row
            </Button>
            <Form ref={formRef} onFinish={onFinish} >
                <div style={{ maxHeight: '420px', overflowY: 'auto', }}>
                    <Table dataSource={dataSource} columns={columns} pagination={false} rowKey={(record) => record.key} size="small" style={{maxHeight: '400px', margin: '-8px', padding: '8px' }}/>
                </div>
                <p style={{margin:'10px 0'}}>*&#41; KOMPETENSI: Isi dengan nomor Uraian Kegiatan Kompetensi yang Anda anggap persyaratannya telah terpenuhi dengan aktifitas Anda di sini</p>
                <Button className="saveFormButton" type="primary" htmlType="submit" style={{margin:'10px auto',display: "flex", justifyContent: "center" }}>
                    {/* <Button type="primary" htmlType="submit" disabled={totalSelected !== 3}> */}
                    Save & Continue
                </Button>
            </Form>
        </div>
    </div>
    );
  };

  export default FormulirEmpat;
