import { Button, Form, Modal, Select, Space, Tag, theme } from 'antd';
import { Header } from 'antd/es/layout/layout'
import Table, { ColumnsType } from 'antd/es/table';
import { title } from 'process';
import React, { useEffect, useState } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, UndoOutlined, UploadOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { nanoid } from 'nanoid';


const { Option } = Select;

interface OptionType {
    nomer_induk: string;
    nama: string;
}

const FaipAdminAddAssesor = ( ) => {
    const [allOptions, setAllOptions] = useState<OptionType[]>([]);
    const [selectedValues, setSelectedValues] = useState<(string | null)[]>([null, null, null]); // Array for selected values

const [form] = Form.useForm();

useEffect(() => {
    // Retrieve JWT token from localStorage
    fetchUserData();
}, [form]);


const fetchUserData = async () => {
    try {
    const token = localStorage.getItem('jwtToken');

    if (token) {
        // Decode the token to extract user ID
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.nomerInduk;
        // console.log("nim mauk:" + nim)
        const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
        };
        // Make API request with user ID
        const responseAssesor = await axios.get(`/form-tools/faip-form/all-assesor/${userId}`,config);
        const responseLecturer = await axios.get(`/form-tools/faip-form/all-lecturer/${userId}`,config);
        const options = responseLecturer.data.data;
        const selected = responseAssesor.data.data.dosen_penilai_faip;

        // Validate selected values against allOptions
        

        setAllOptions(options);
        setSelectedValues(selected);

        form.setFieldsValue({
            first: selected[0],
            second: selected[1],
            third: selected[2],
        });  
    } else {
        console.error('User not found');
    }
    } catch (error) {
    console.error('Error getting user data');
    }
};

console.log(selectedValues)

  // Handle selection change for each select
const handleSelectChange = (index: number, value: string | null) => {
    const updatedValues = [...selectedValues];
    updatedValues[index] = value;

    setSelectedValues(updatedValues);
    form.setFieldsValue({
    first: updatedValues[0],
    second: updatedValues[1],
    third: updatedValues[2],
    });
};

// Filter options that are not selected in other selects
const getFilteredOptions = (currentIndex: number): OptionType[] => {
    const selectedItems = selectedValues.filter((_, index) => index !== currentIndex);
    
    // Filter options to exclude currently selected items
    return allOptions.filter((option) => !selectedItems.includes(option.nomer_induk));
};

const onReset = () => {
    setSelectedValues([null, null, null]); // Reset selectedValues
    form.resetFields(); // Reset form fields to null
};

const onSave = async () => {
    try{
        const token = localStorage.getItem('jwtToken');
        if (token) {
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.nomerInduk;

        const config = {
            headers: {
            Authorization: `Bearer ${token}`
            }
        };
        await axios.patch(`/form-tools/faip-form/assesor/${userId}`,selectedValues,config);

        } else {
        console.error('User not found');
        }
    }catch(error){
        console.error('Error sending form');
    }
    window.location.reload();
};

useDocumentTitle('PII TA | FAIP');

return (
<div style={{ display: 'flex', justifyContent: 'center' }}>
    <div className='form' style={{ padding: '1rem', width: '100%', maxWidth: '800px', backgroundColor: '' }}>
    {/* header tambahin underline sama shadow(opsional) */}
    <h2 style={{ padding: '0 0 1rem', textAlign: 'left', width: '100%', borderBottom: '2px solid #D3D3D3' }}>Penambahan Dosen Penilai Konversi FAIP</h2>
    <Form
        form={form}
        onFinish={onSave} // Call onSave when form is submitted
        initialValues={{ first: null, second: null, third: null }} // Ensure initial values are set
    >
    <p style={{ padding: '10px 0 0' }}>Dosen Penilai 1 : </p> 

    <Form.Item style={{ margin: '0' }} name="first" >
        <Select 
            placeholder="--Tambah Dosen Penilai 1--"
            onChange={(value) => handleSelectChange(0, value)} // index 0 for first select
        >
        {getFilteredOptions(0).map((option) => (
            <Option key={option.nomer_induk} value={option.nomer_induk}>
            {option.nomer_induk} - {option.nama}
            </Option>
        ))}
        </Select>
    </Form.Item>

    <p style={{ padding: '10px 0 0' }}>Dosen Penilai 2 : </p> 

    <Form.Item style={{ margin: '0' }} name="second">
        <Select 
            placeholder="--Tambah Dosen Penilai 2--"
            onChange={(value) => handleSelectChange(1, value)}
        >        
        {getFilteredOptions(1).map((option) => (
            <Option key={option.nomer_induk} value={option.nomer_induk}>
            {option.nomer_induk} - {option.nama}
            </Option>
        ))}
        </Select>
    </Form.Item>

    <p style={{ padding: '10px 0 0' }}>Dosen Penilai 3 : </p> 

    <Form.Item style={{ margin: '0' }} name="third">
        <Select 
            placeholder="--Tambah Dosen Penilai 3--"
            onChange={(value) => handleSelectChange(2, value)}
        >
        {getFilteredOptions(2).map((option) => (
            <Option key={option.nomer_induk} value={option.nomer_induk}>
            {option.nomer_induk} - {option.nama}
            </Option>
        ))}
        </Select>
    </Form.Item>
    <div style={{display: "flex", justifyContent: "center"}}>
        <Button danger onClick={onReset} style={{margin:'20px 10px'}}>
                Reset
        </Button>
        <Form.Item>
            <Button type="primary" htmlType="submit" style={{margin:'20px 10px'}}>
                Save
            </Button>
        </Form.Item>
    </div>
    
    </Form>

    </div>
</div>
)
}
export default FaipAdminAddAssesor
{/* <>
<h2>Masa pengiriman formulir sudah berakhir!</h2>
<h3>Hubungi admin untuk perubahan</h3>
</> */}
