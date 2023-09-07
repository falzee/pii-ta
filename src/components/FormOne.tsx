/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Table, Form,Input, Button, Select, Upload, Checkbox } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { UploadOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';

interface TableRow {
  key: number;
  name: string;
  age: string;
  dropdown: string;
  file: any;
  choices: string[];
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
const FormTable: React.FC = () => {
  const [dataSource, setDataSource] = useState<TableRow[]>([]);
  const [selectedChoices, setSelectedChoices] = useState<{ [key: number]: string[] }>({});
  const [rowNumbers, setRowNumbers] = useState<number>(1);

  // ... handleChoiceChange and other functions ...

  const handleAddRow = () => {
    const newRow: TableRow = {
      key: rowNumbers,
      name: '',
      age: '',
      dropdown: '',
      file: null,
      choices: [],
    };
    setDataSource([...dataSource, newRow]);
    setRowNumbers(rowNumbers + 1); // Increment the row number
  };
  
  const handleDeleteRow = (key: number) => {
    const updatedDataSource = dataSource.filter(row => row.key !== key);
    setDataSource(updatedDataSource);
    // const updatedRowNumbers = updatedDataSource.map(row => row.key).splice(-1,1,);
    // console.log(updatedRowNumbers)
    // const updatedNumbers = updatedRowNumbers.splice(-1, 1) ;
  
    // console.log(updatedRowNumbers)
    //buggg
  };

  const handleChoiceChange = (recordKey: number, choiceValue: string, checked: boolean) => {
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

  const columns = [
    // ... Previous columns ...

    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: TableRow) => (
        <Form.Item name={`name${record.key}`} initialValue={text}>
          <Input />
        </Form.Item>
      ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: (text: string, record: TableRow) => (
        <Form.Item name={`age${record.key}`} initialValue={text}>
          <Input />
        </Form.Item>
      ),
    },
    {
      title: 'Dropdown',
      dataIndex: 'dropdown',
      key: 'dropdown',
      render: (text: string, record: TableRow, index: number) => (
        <Form.Item name={`dropdown${record.key}`} initialValue={text}>
          <Select style={{ width: 120 }}>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
            <Select.Option value="option3">Option 3</Select.Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: 'File Upload',
      dataIndex: 'file',
      key: 'file',
      render: (text: string, record: TableRow, index: number) => (
        <Form.Item name={`file${record.key}`} initialValue={text}>
          <Upload>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      ),
    },
    {
      title: 'Choices',
      dataIndex: 'choices',
      key: 'choices',
      render: (text: string[], record: TableRow) => (
        <div style={{ height: '150px', overflowY: 'scroll' }}>
        <Form.Item name={`choices${record.key}`} initialValue={text} >
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        {choicesData.map(section => (
          <div key={section.value}>
            <span>{section.label}</span>
            {section.children.map((subSection) => (
              <div key={subSection.value}>
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
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text: string, record: TableRow) => (
        <Button onClick={() => handleDeleteRow(record.key)}>Delete</Button>
      ),
    },
  ];

  const formRef = React.createRef<FormInstance>();


  const handleEdit = (index: number) => {
    // Implement edit functionality
    const selectedRow = dataSource[index];
    formRef.current?.setFieldsValue(selectedRow);
  };

  const handleDelete = (index: number) => {
    // Implement delete functionality
    const updatedDataSource = dataSource.filter((_, i) => i !== index);
    setDataSource(updatedDataSource);
  };

  // const onFinish = (values: any) => {
  //   console.log('Form values:', values);
  //   // You can perform further actions with the form values
  // };
  const onFinish = (values: any) => {
    const formData = dataSource.map(row => ({
      ...row,
      name: values[`name${row.key}`],
      age: values[`age${row.key}`],
      dropdown: values[`dropdown${row.key}`],
      choices: selectedChoices[row.key] || [],
      file: values[`file${row.key}`]
    }));
    
    // Now you can send formData to your backend for processing
    console.log('Form Data:', formData);
  
    // ... your form submission logic ...
  };
  

  return (
    <div>
      
      <div className='container-form'>
        <Button className="addingFormButton" type="primary" onClick={handleAddRow} style={{marginBottom:'10px'}}>
          + Add Row
        </Button>
        <Form ref={formRef} onFinish={onFinish} >
          <div style={{ maxHeight: '500px', overflowY: 'auto', }}>
            <Table dataSource={dataSource} columns={columns} pagination={false} rowKey="key" size="small" style={{maxHeight: '430px'}}/>
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

export default FormTable;

// form
// no. = number
// nama organisasi = input
// jenis = dropdown
// kota/kab = input
// prov = input
// negara = input
// perioda = if not checked 2 input&dropdown else 1 input&dropdown 
// jabatan org = dropdown
// tingkatan organisasi = dropdown
// lingkup kegiatan org = dropdown
// uraian singkat = input
// dokumen pendukung = upload
// klain kompetensi = multiple choice (max 3)
// action = delete button

// interface TableRow {
//   id: number;
//   nama: string;
//   jenis: string;
//   dropdown: string;
//   file: any;
//   choices: string[];
// }