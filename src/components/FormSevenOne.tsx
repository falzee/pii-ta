import React, { useEffect, useState } from 'react';
import { Table, Form,Input, Button, Select, Upload, Checkbox, Divider, Space, ConfigProvider, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { nanoid } from 'nanoid';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router';

const FormulirSevenOne: React.FC = () => {
    //API = const response = await axios.get(`http://localhost:8000/form-penilaian/mhs?uid=${userId}&ft=i3`,config);
    const { formId } = useParams<{ formId: string | undefined }>();

    const [form] = Form.useForm();

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
          const response = await axios.get(`http://localhost:8000/form-penilaian/mhs?uid=${userId}&ft=vii`,config)
          const userData = response.data;
          form.setFieldsValue({ accept: userData.data.form_vii.accept });
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching data'); 
      }
    };


    const onFinish = async (values: any) => { //fungsi submit form //NEED API POST
      try{
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const decodedToken: any = jwtDecode(token);
          const userId = decodedToken.nomerInduk;

          // console.log('Form Data:', formData);
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          await axios.patch(`http://localhost:8000/form-penilaian/mhs?uid=${userId}&pid=${formId}&ft=vii`,values,config);
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
    //struktur komponen
    return (
    <ConfigProvider
      theme={{
        components: {
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
            <h3 className='headerform' style={{marginBottom:'10px'}}>VII. Peryataan</h3>

            <Form name="checkboxForm" form={form} onFinish={onFinish} initialValues={{ accept: false } }>
              <div style={{ overflowY: 'hidden', overflowX: 'auto' }}>
              <Form.Item name="accept" valuePropName="checked" >
                <Checkbox>
                    Dengan ini saya menyatakan bahwa seluruh keterangan yang diunggah adalah benar.
                </Checkbox>
              </Form.Item>
              {/* <Form.Item name="accept" valuePropName="checked" rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject('Note. Harap Centang Untuk Konfirmasi Formulir FAIP Sebelum Submit.'),
            },
          ]} ></Form.Item> */}
              </div>
                <Button className="saveFormButton" type="primary" htmlType="submit" style={{margin:'20px auto',display: "flex", justifyContent: "center" }}>
                    {/* <Button type="primary" htmlType="submit" disabled={totalSelected !== 3}> */}
                    Submit
                </Button>
            </Form>
        </div>
    </div>
    </ConfigProvider>

    );
  };

  export default FormulirSevenOne;
