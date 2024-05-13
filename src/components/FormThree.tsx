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
  

  //punya column
  interface TableRow {
    key: any;
    namaOrganisasi: string;
    jenis: string;
    kotaAsal: string;
    provinsiAsal: string;
    negaraAsal: string;
    bulan: string;
    tahun: string;
    bulanMulai: string;
    tahunMulai: string;
    masihAnggota : boolean;
    jabatanOrganisasi: string;
    tingkatanOrganisasi: string;
    kegiatanOrganisasi: string;
    uraianTugas: string;
    klaimKompetensi: string[];
    // jumlahKlaimWSatu: number;
  }

const Formulir: React.FC = () => {
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
          namaOrganisasi: '',
          jenis: '',
          kotaAsal: '',
          provinsiAsal: '',
          negaraAsal: '',
          bulan: '',
          tahun: '',
          bulanMulai: '',
          tahunMulai: '',
          masihAnggota : false,
          jabatanOrganisasi: '',
          tingkatanOrganisasi: '',
          kegiatanOrganisasi: '',
          uraianTugas: '',
          klaimKompetensi: [],
          // jumlahKlaimWSatu: 0,
        };
        setDataSource([...dataSource, newRow]);
        // setRowNumbers(rowNumbers + 1); 
      };
      
    const handleDeleteRow = (key: any) => { //fungsi hapus baris  //NEED API DELETE
      const updatedDataSource = dataSource.filter(row => row.key !== key);
      setDataSource(updatedDataSource);
    };
    // const updatedRowNumbers = updatedDataSource.map(row => row.id).splice(-1,1,);
    // console.log(updatedRowNumbers)
    // const updatedNumbers = updatedRowNumbers.splice(-1, 1) ;
  
    // console.log(updatedRowNumbers)
    //buggg

    const onFinish = (values: any) => { //fungsi submit form //NEED API POST
      const formData = dataSource.map(row => ({
        ...row,
        namaOrganisasi : values[`namaOrganisasi${row.key}`],
        jenis: values[`jenis${row.key}`],
        kotaAsal: values[`kotaAsal${row.key}`],
        provinsiAsal: values[`provinsiAsal${row.key}`],
        negaraAsal: values[`negaraAsal${row.key}`],
        bulan: values[`bulan${row.key}`],
        tahun: values[`tahun${row.key}`],
        bulanMulai: values[`bulanMulai${row.key}`],
        tahunMulai: values[`tahunMulai${row.key}`],
        masihAnggota : values[`masihAnggota${row.key}`],
        jabatanOrganisasi: values[`jabatanOrganisasi${row.key}`],
        tingkatanOrganisasi: values[`tingkatanOrganisasi${row.key}`],
        kegiatanOrganisasi: values[`kegiatanOrganisasi${row.key}`],
        uraianTugas: values[`uraianTugas${row.key}`],
        klaimKompetensiWSatu: selectedChoices[row.key] || [],
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
      if (checked && currentRowChoices.length < 13) {
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
          alert('Harap Memilih Tidak Lebih Dari 13 Klaim Kompetensi W1');
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
          title: 'Nama Organisasi',
          dataIndex: 'namaOrganisasi',
          key: 'namaOrganisasi',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`namaOrganisasi${record.key}`} initialValue={text} style={{width:'200px'}}>
              <Input />
            </Form.Item>
          ),
        },
        {
          title: 'Jenis',
          dataIndex: 'jenis',
          key: 'jenis',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`jenis${record.key}`} initialValue={undefined} >
              <Select placeholder="--Choose--" style={{ width: 280 }} >
                <Select.Option value="jenis1">Organisasi PII</Select.Option>
                <Select.Option value="jenis2">Organisasi Keinsinyuran Non PII</Select.Option>
                <Select.Option value="jenis3">Organisasi Non Keinsinyuran</Select.Option>
              </Select>
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
            title: 'Perioda',
            dataIndex: 'perioda',
            key: 'perioda',
            render: (text: string, record: TableRow, index: number) => (
                <div>
                    {record.masihAnggota  ? (
                    <>
                    <Form.Item name={`bulanMulai${record.key}`} initialValue={undefined}>
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
                    <Form.Item name={`tahunMulai${record.key}`} initialValue={text}>
                        <Input placeholder='--Tahun--' />
                    </Form.Item></>)
                    :(<>
                    <Form.Item name={`bulanMulai${record.key}`} initialValue={undefined}>
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
                    <Form.Item name={`tahunMulai${record.key}`} initialValue={text}>
                        <Input placeholder='--Tahun--' />
                    </Form.Item>
                    <Divider plain>s/d</Divider>
                    <Form.Item name={`bulan${record.key}`} initialValue={undefined}>
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
                    <Form.Item name={`tahun${record.key}`} initialValue={text}>
                        <Input placeholder='--Tahun--' />
                    </Form.Item>
                    </>)}
                    
                    {/* <Checkbox onChange={handleCheckboxChange}>Masih Menjadi Anggota</Checkbox> */}
                    <Form.Item name={`masihAnggota${record.key}`} valuePropName="checked" initialValue={false}>
                      <Checkbox checked={record.masihAnggota} onChange={(e: any) => handleCheckboxChange(record.key, e.target.checked)}>Masih Menjadi Anggota</Checkbox>
                    </Form.Item>
                </div>
                ),
          },
          {
            title: 'Jabatan Dalam Organisasi',
            dataIndex: 'jabatanOrganisasi',
            key: 'jabatanOrganisasi',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`jabatanOrganisasi${record.key}`} initialValue={undefined} >
                <Select placeholder="--Choose--" style={{ width: 280 }}>
                  <Select.Option value="jabatan1">Anggota biasa</Select.Option>
                  <Select.Option value="jabatan2">Anggota pengurus</Select.Option>
                  <Select.Option value="jabatan3">Pimpinan</Select.Option>
                </Select>
              </Form.Item>
            ),
          },
          {
            title: 'Tingkatan Organisasi',
            dataIndex: 'tingkatanOrganisasi',
            key: 'tingkatanOrganisasi',
            render: (text: string, record: TableRow, index: number) => (
                <Form.Item name={`tingkatanOrganisasi${record.key}`} initialValue={undefined}>
                <Select placeholder="--Choose--" style={{ width: 280 }}>
                  <Select.Option value="tingkatan1">Organisasi lokal (bukan Nasional)</Select.Option>
                  <Select.Option value="tingkatan2">Organisasi Nasional</Select.Option>
                  <Select.Option value="tingkatan3">Organisasi Regional</Select.Option>
                  <Select.Option value="tingkatan4">Organisasi Internasional</Select.Option>
                </Select>
              </Form.Item>
            ),
          },
          {
            title: 'Lingkup Kegiatan Organisasi',
            dataIndex: 'kegiatanOrganisasi',
            key: 'kegiatanOrganisasi',
            render: (text: string, record: TableRow, index: number) => (
                <Form.Item name={`kegiatanOrganisasi${record.key}`} initialValue={undefined}>
                <Select placeholder="--Choose--" style={{ width: 280 }}>
                  <Select.Option value="kegiatan1">Asosiasi Profesi</Select.Option>
                  <Select.Option value="kegiatan2">Lembaga Pemerintah</Select.Option>
                  <Select.Option value="kegiatan3">Lembaga Pendidikan</Select.Option>
                  <Select.Option value="kegiatan4">Badan Usaha Milik Negara</Select.Option>
                  <Select.Option value="kegiatan6">Badan Usaha Swasta</Select.Option>
                  <Select.Option value="kegiatan7">Organisasi Kemasyarakatan</Select.Option>
                  <Select.Option value="kegiatan8">Lain-lain</Select.Option>
                </Select>
              </Form.Item>
            ),
          },
          {
            title: 'Uraian Singkat Tugas dan Tanggung Jawab Profesional sesuai NSPK',
            dataIndex: 'uraianTugas',
            key: 'uraianTugas',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`uraianTugas${record.key}`} initialValue={text} style={{width:'250px'}}>
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
            <h3 className='headerform' style={{marginBottom:'10px'}}>I.3 Organisasi Profesi & Organisasi Lainnya Yang Dimasuki <span style={{color:'blue'}}>(W1)</span></h3>
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

  export default Formulir;
