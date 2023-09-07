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
    label: 'Section 1',
    value: 'section1',
    children: [
      { label: 'Sub-section 1.1', value: 'section1.1' },
      { label: 'Sub-section 1.2', value: 'section1.2' },
      // ... other sub-sections ...
    ],
  },
  {
    label: 'Section 2',
    value: 'section2',
    children: [
      { label: 'Sub-section 2.1', value: 'section2.1' },
      { label: 'Sub-section 2.2', value: 'section2.2' },
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
      title: 'Name 2',
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
        <Form.Item name={`choices${record.key}`} initialValue={text}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
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

  // const handleChoiceChange = (recordKey: number, checkedValues: string[]) => {
  //   // Limit the selection to 3 items
  //   if (checkedValues.length <= 3) {
  //     const updatedDataSource = dataSource.map((row) =>
  //       row.key === recordKey ? { ...row, choices: checkedValues } : row
  //     );
  //     setDataSource(updatedDataSource);
  //     setSelectedChoices(checkedValues);
  //   } else {
  //     // Show alert if more than 3 choices selected
  //     alert('Please select up to 3 choices.');
  //   }
  // };
  // const handleChoiceChange = (recordKey: number, checkedValues: string[], choiceValue: string, checked: boolean) => {
  //   if (checkedValues.length <= 3) {
  //   const updatedDataSource = dataSource.map(row =>
  //     row.key === recordKey
  //       ? { ...row, choices: checked ? [...row.choices, choiceValue] : row.choices.filter(choice => choice !== choiceValue) }
  //       : row
  //   );
  //     setDataSource(updatedDataSource);
  //     setSelectedChoices(checkedValues);
  //   } else {
  //     // Show alert if more than 3 choices selected
  //     alert('Please select up to 3 choices.');
  //   }
  // };
  


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
    }));
    
    // Now you can send formData to your backend for processing
    console.log('Form Data:', formData);
  
    // ... your form submission logic ...
  };
  

  return (
    <div>

      <div className='container-form'>
        <Button type="primary" onClick={handleAddRow}>
          + Add Row
        </Button>
        <Form ref={formRef} onFinish={onFinish} >
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <Table dataSource={dataSource} columns={columns} pagination={false} rowKey="key" scroll={{ y: 300 }} />
          </div>
          <Button type="primary" htmlType="submit">
          {/* <Button type="primary" htmlType="submit" disabled={totalSelected !== 3}> */}
            Submit
          </Button>
        </Form>
        
      </div>
    </div>
  );
};

export default FormTable;
