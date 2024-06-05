import React, { useEffect, useState } from 'react';
import { Table, Form,Input, Button, Select, Upload, Checkbox, Divider, Space, ConfigProvider, Modal, InputNumber, InputNumberProps } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { nanoid } from 'nanoid';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router';

interface InputValues {
  W121: number;
  W122: number;
  W123: number;
  W124: number;
  W125: number;
  W126: number;
  W127: number;
  W128: number;
}
  // nilaiAkademikRata
const FormulirDua: React.FC = () => {
//kumpulan state
    const { formId } = useParams<{ formId: string | undefined }>();
    const [inputValue, setInputValues] = useState({
      W121: 0,
      W122: 0,
      W123: 0,
      W124: 0,
      W125: 0,
      W126: 0,
      W127: 0,
      W128: 0,
    });
    const [gradeValue, setInputGradeValue] = useState({
      GW121: 80,
      GW122: 80,
      GW123: 80,
      GW124: 80,
      GW125: 80,
      GW126: 80,
      GW127: 80,
      GW128: 80,
    });
    const [percentValue, setInputPercentValue] = useState({
      PW121: 0,
      PW122: 0,
      PW123: 0,
      PW124: 0,
      PW125: 0,
      PW126: 0,
      PW127: 0,
      PW128: 0,
    });
    const [finalLetterValue, setFinalLetterValue] = useState("E");
    // const [form] = Form.useForm();
//kumpulan fungsi
    const formRef = React.createRef<FormInstance>();//


    const handleNumberChange = (key: keyof typeof inputValue, value: number | null) => {
      if (value !== null) {
        setInputValues((prevValues) => {
          const updatedValues = {
            ...prevValues,
            [key]: value,
          };
          const newPercentGrade = calculateExample(key, value);
          const newGrade = calculateGrade(value);
          
          setInputPercentValue((prevPercentValues) => ({
            ...prevPercentValues,
            [`P${key}`]: newPercentGrade,
          }));
  
          setInputGradeValue((prevGradeValues) => ({
            ...prevGradeValues,
            [`G${key}`]: newGrade,
          }));
  
          return updatedValues;
        });
      }
    };
  
    const calculateExample = (key: keyof typeof inputValue, value: number) => {
      const result = (value / 24) * 100;
      return parseFloat(result.toFixed(2));
    };
  
    const calculateGrade = (value: number) => {
      return value >= 2 ? 85 : 80;
    };

    const calculateAverageGrade = (grades: typeof gradeValue) => {
      const total = Object.values(grades).reduce((acc, grade) => acc + grade, 0);
      return (total / Object.values(grades).length).toFixed(2);
    };
  
    const averageGrade = calculateAverageGrade(gradeValue);
    
    const calculateFinalGrade = (value: number | null) => {
      if (value !== null) {
        if (value >= 85) {
          setFinalLetterValue("A");
        } else if (value >= 75) {
          setFinalLetterValue("B");
        } else if (value >= 65) {
          setFinalLetterValue("C");
        } else if (value >= 55) {
          setFinalLetterValue("D");
        } else {
          setFinalLetterValue("E");
        }
      }
    };
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
        <div style={{marginBottom:'2rem'}}>
          <h3 className='headerform' style={{marginBottom:'10px'}}>
            Kode Etik <span style={{color:'#6b7aa1'}}>(W.1.2.1-8)</span>
          </h3>
          <div>
            {Object.keys(inputValue).map((key) => (
              <div key={key}>
                <div style={{display:'flex',flexDirection:'row'}}>
                  <p style={{margin:'5px 0'}}>Jumlah {key}</p>
                  <InputNumber
                    style={{width:'75px',margin:'0 5px'}}
                    min={0}
                    max={3}
                    defaultValue={0}
                    onChange={(value) => handleNumberChange(key as keyof typeof inputValue, value)}
                  />
                  <p style={{margin:'5px 0'}}> Maks. 3</p>
                </div>
                <p>Kontribusi terhadap mata kuliah : {inputValue[key as keyof typeof inputValue]}/24 = {percentValue[`P${key}` as keyof typeof percentValue]}% nilai = {gradeValue[`G${key}` as keyof typeof gradeValue]}</p>
              </div>
            ))}
          </div>
          <div style={{display:'flex',flexDirection:'row'}}>
            <p style={{margin:'5px 0'}}>Rekomendasi Nilai : <span style={{color:'blue'}}>{averageGrade}</span></p>
          </div>
          <div style={{display:'flex',flexDirection:'row'}}>
            <p style={{margin:'5px 0'}}>Nilai Akhir :</p>
              <InputNumber style={{width:'75px',margin:'0 5px'}} min={0} max={100} defaultValue={0} onChange={calculateFinalGrade} />
            <p style={{margin:'5px 0'}}>Masukkan nilai dari 1-100</p>
          </div>
          <p style={{margin:'5px 0'}}>Nilai Akhir dalam Huruf : <span style={{color:'blue'}}>{finalLetterValue}</span></p>
          <Button style={{margin:'20px auto',display: "flex", justifyContent: "center"}} type='primary'>Save and Continue</Button>
        </div>
      </ConfigProvider>
    );
  };

  export default FormulirDua;
