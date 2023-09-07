/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Table, Form,Input, Button, Select, Upload, Checkbox } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { UploadOutlined } from '@ant-design/icons';

interface TableRow {
    id: number;
    nama: string;
    jenis: string;
    kotaAsal: string;
    provinsiAsal: string;
    negaraAsal: string;
    perioda: string;
    jabatanOrganisasi: string;
    tingkatanOrganisasi: string;
    kegiatanOrganisasi: string;
    uraianTugas: string;
    dokumenPendukung: any;
    klaimKompetensi: string[];
    }

interface SubSection {
    label: string;
    value: string;
    }

interface Section {
    label: string;
    value: string;
    children: SubSection[];
    }

const choicesData: Section[]= [
    {
    label: 'W.1.1. -',
    value: 'section1',
    children: [
        { label: 'W.1.1.1. -', value: 'section1.1.1.' },
        { label: 'W.1.1.2. -', value: 'section1.1.2.' },
        { label: 'W.1.1.3. -', value: 'section1.1.3.' },
        { label: 'W.1.1.4. -', value: 'section1.1.4.' },
        { label: 'W.1.1.5. -', value: 'section1.1.5.' },
        // ... other sub-sections ...
        ],
    },
    {
    label:'W.1.2. -',
    value: 'section2',
    children: [
        { label: 'W.1.2.1. -', value: 'section1.2.1.' },
        { label: 'W.1.2.2. -', value: 'section1.2.2.' },
        { label: 'W.1.2.3. -', value: 'section1.2.3.' },
        { label: 'W.1.2.4. -', value: 'section1.2.4.' },
        { label: 'W.1.2.5. -', value: 'section1.2.5.' },
        // ... other sub-sections ...
        ],
    },
    {
    label:'W.1.3. -',
    value: 'section3',
    children: [
        { label: 'W.1.3.1. -', value: 'section1.3.1.' },
        { label: 'W.1.3.2. -', value: 'section1.3.2.' },
        { label: 'W.1.3.3. -', value: 'section1.3.3.' },
        { label: 'W.1.3.4. -', value: 'section1.3.4.' },
        { label: 'W.1.3.5. -', value: 'section1.3.5.' },
        // ... other sub-sections ...
        ],
    },
    {
    label:'W.1.4. -',
    value: 'section4',
    children: [
        { label: 'W.1.4.1. -', value: 'section1.4.1.' },
        { label: 'W.1.4.2. -', value: 'section1.4.2.' },
        { label: 'W.1.4.3. -', value: 'section1.4.3.' },
        { label: 'W.1.4.4. -', value: 'section1.4.4.' },
        { label: 'W.1.4.5. -', value: 'section1.4.5.' },
        // ... other sub-sections ...
        ],
    },
    // ... other sections ...
  ];

const Formulir: React.FC = () => {
//kumpulan state
    const [dataSource, setDataSource] = useState<TableRow[]>([]);//data tabel
    const [selectedChoices, setSelectedChoices] = useState<{ [id: number]: string[] }>({});//pilihan checbox
    const [rowNumbers, setRowNumbers] = useState<number>(1);//penomeran client side
  

//kumpulan fungsi
    const formRef = React.createRef<FormInstance>();//
  
    const handleAddRow = () => { //fungsi nambah baris
        const newRow: TableRow = {
          id: rowNumbers,
          nama: '',
          jenis: '',
          kotaAsal: '',
          provinsiAsal: '',
          negaraAsal: '',
          perioda: '',
          jabatanOrganisasi: '',
          tingkatanOrganisasi: '',
          kegiatanOrganisasi: '',
          uraianTugas: '',
          dokumenPendukung: null,
          klaimKompetensi: [],
        };
        setDataSource([...dataSource, newRow]);
        setRowNumbers(rowNumbers + 1); // Increment the row number
      };
      
      const handleDeleteRow = (id: number) => { //fungsi hapus baris
        const updatedDataSource = dataSource.filter(row => row.id !== id);
        setDataSource(updatedDataSource);
        // const updatedRowNumbers = updatedDataSource.map(row => row.id).splice(-1,1,);
        // console.log(updatedRowNumbers)
        // const updatedNumbers = updatedRowNumbers.splice(-1, 1) ;
      
        // console.log(updatedRowNumbers)
        //buggg
      };
    
      const handleChoiceChange = (recordKey: number, choiceValue: string, checked: boolean) => { //fungsi yg berhubungan dgn checbox
        const currentRowChoices = selectedChoices[recordKey] || [];
        
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
          alert('Please select up to 3 choices.');
        }
      };
    
  
    const onFinish = (values: any) => { //fungsi submit form
      const formData = dataSource.map(row => ({
        ...row,
        nama : values[`name${row.id}`],
        jenis: values[`age${row.id}`],
        kotaAsal: values[`dropdown${row.id}`],
        provinsiAsal: values[`dropdown${row.id}`],
        negaraAsal: values[`dropdown${row.id}`],
        perioda: values[`dropdown${row.id}`],
        jabatanOrganisasi: values[`dropdown${row.id}`],
        tingkatanOrganisasi: values[`dropdown${row.id}`],
        kegiatanOrganisasi: values[`dropdown${row.id}`],
        uraianTugas: values[`dropdown${row.id}`],
        dokumenPendukung: values[`file${row.id}`],
        klaimKompetensi: selectedChoices[row.id] || [],

      }));
      
      // Now you can send formData to your backend for processing
      console.log('Form Data:', formData);
    
      // ... your form submission logic ...
    };
    
//kolom tabel
    const columns = [
        // ... Previous columns ...
        {
            title: 'ID', // Hidden column
            dataIndex: 'id',
            key: 'id',
            render: () => null, // This will hide the column's content
        },
        {
            title: 'No.', // Visual numbering
            dataIndex: 'visualNumber', // This doesn't have to correspond to any data field
            key: 'visualNumber',
            render: (text: string, record: TableRow, index: number) => index + 1, // Render the row index + 1
          },
        {
          title: 'Nama',
          dataIndex: 'nama',
          key: 'nama',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`name${record.id}`} initialValue={text}>
              <Input />
            </Form.Item>
          ),
        },
        {
          title: 'Jenis',
          dataIndex: 'jenis',
          key: 'jenis',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`jenis${record.id}`} initialValue={text}>
              <Select style={{ width: 120 }}>
                <Select.Option value="option1">Option 1</Select.Option>
                <Select.Option value="option2">Option 2</Select.Option>
                <Select.Option value="option3">Option 3</Select.Option>
              </Select>
            </Form.Item>
          ),
        },
        {
          title: 'Kota/Kabupaten',
          dataIndex: 'kotaAsal',
          key: 'kotaAsal',
          render: (text: string, record: TableRow, index: number) => (
            <Form.Item name={`kotaAsal${record.id}`} initialValue={text}>
              <Input />
            </Form.Item>
          ),
        },
        {
            title: 'Provinsi',
            dataIndex: 'provinsiAsal',
            key: 'provinsiAsal',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`provinsiAsal${record.id}`} initialValue={text}>
                <Input />
              </Form.Item>
            ),
          },
          {
            title: 'Negara',
            dataIndex: 'negaraAsal',
            key: 'negaraAsal',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`negaraAsal${record.id}`} initialValue={text}>
                <Input />
              </Form.Item>
            ),
          },
          {
            title: 'Perioda',
            dataIndex: 'perioda',
            key: 'perioda',
            render: (text: string, record: TableRow, index: number) => (
                <Form.Item name={`perioda${record.id}`} initialValue={text}>
                <Select style={{ width: 120 }}>
                  <Select.Option value="option1">Option 1</Select.Option>
                  <Select.Option value="option2">Option 2</Select.Option>
                  <Select.Option value="option3">Option 3</Select.Option>
                </Select>
              </Form.Item>
            ),
          },
          {
            title: 'Jabatan Dalam Organisasi',
            dataIndex: 'jabatanOrganisasi',
            key: 'jabatanOrganisasi',
            render: (text: string, record: TableRow, index: number) => (
                <Form.Item name={`jabatanOrganisasi${record.id}`} initialValue={text}>
                <Select style={{ width: 120 }}>
                  <Select.Option value="option1">Option 1</Select.Option>
                  <Select.Option value="option2">Option 2</Select.Option>
                  <Select.Option value="option3">Option 3</Select.Option>
                </Select>
              </Form.Item>
            ),
          },
          {
            title: 'Tingkatan Organisasi',
            dataIndex: 'tingkatanOrganisasi',
            key: 'tingkatanOrganisasi',
            render: (text: string, record: TableRow, index: number) => (
                <Form.Item name={`tingkatanOrganisasi${record.id}`} initialValue={text}>
                <Select style={{ width: 120 }}>
                  <Select.Option value="option1">Option 1</Select.Option>
                  <Select.Option value="option2">Option 2</Select.Option>
                  <Select.Option value="option3">Option 3</Select.Option>
                </Select>
              </Form.Item>
            ),
          },
          {
            title: 'Lingkup Kegiatan Organisasi',
            dataIndex: 'kegiatanOrganisasi',
            key: 'kegiatanOrganisasi',
            render: (text: string, record: TableRow, index: number) => (
                <Form.Item name={`kegiatanOrganisasi${record.id}`} initialValue={text}>
                <Select style={{ width: 120 }}>
                  <Select.Option value="option1">Option 1</Select.Option>
                  <Select.Option value="option2">Option 2</Select.Option>
                  <Select.Option value="option3">Option 3</Select.Option>
                </Select>
              </Form.Item>
            ),
          },
          {
            title: 'Uraian Singkat Tugas dan Tanggung Jawab Profesional sesuai NSPK',
            dataIndex: 'uraianTugas',
            key: 'uraianTugas',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`uraianTugas${record.id}`} initialValue={text}>
                <Input />
              </Form.Item>
            ),
          },
        {
          title: 'Dokumen Pendukung',
          dataIndex: 'dokumenPendukung',
          key: 'dokumenPendukung',
          render: (text: string, record: TableRow, index: number) => (
            <Form.Item name={`dokumenPendukung${record.id}`} initialValue={text}>
              <Upload>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          ),
        },
        {
          title: 'Klaim Kompetensi',
          dataIndex: 'klaimKompetensi',
          key: 'klaimKompetensi',
          render: (text: string[], record: TableRow) => (
            <div style={{ height: '150px', overflowY: 'scroll' }}>
            <Form.Item name={`klaimKompetensi${record.id}`} initialValue={text} >
          <div style={{ display: 'flex', flexDirection: 'column'}}>
            {choicesData.map(section => (
              <div key={section.value}>
                <span>{section.label}</span>
                {section.children.map((subSection) => (
                  <div id={subSection.value}>
                    <Checkbox
                      value={subSection.value}
                      checked={(selectedChoices[record.id] || []).includes(subSection.value)}
                      onChange={(e : any) => handleChoiceChange(record.id, subSection.value, e.target.checked)}
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
          title: 'Actions',
          dataIndex: 'actions',
          key: 'actions',
          render: (text: string, record: TableRow) => (
            <Button onClick={() => handleDeleteRow(record.id)}>Delete</Button>
          ),
        },
      ];
    return (
    <div>
        <div className='container-form'>
            <Button className="addFormButton" type="primary" onClick={handleAddRow} style={{marginBottom:'10px'}}>
                + Add Row
            </Button>
            <Form ref={formRef} onFinish={onFinish} >
                <div style={{ maxHeight: '500px', overflowY: 'auto', }}>
                    <Table dataSource={dataSource} columns={columns} pagination={false} rowKey="id" size="small" style={{maxHeight: '430px'}}/>
                </div>
                <Button className="saveFormButton" type="primary" htmlType="submit" style={{margin:'20px auto',display: "flex", justifyContent: "center" }}>
                    {/* <Button type="primary" htmlType="submit" disabled={totalSelected !== 3}> */}
                    Sava & Continue
                </Button>
            </Form>
        </div>
    </div>
    );
  };

  export default Formulir;