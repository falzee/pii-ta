import React, { useContext, useEffect, useState } from 'react';
import { Table, Form,Input, Button, Select, Upload, Checkbox, Divider, Space, ConfigProvider, Modal, InputNumber, InputNumberProps } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { MhsGradeContext,Grades } from '../../pages/FaipDosenNilai'; // Import the context
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { nanoid } from 'nanoid';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router';



const FormulirDua: React.FC = () => {
//kumpulan state
    const { formIdD } = useParams<{ formIdD: string | undefined }>();
    const gradeContext = useContext<Grades | undefined>(MhsGradeContext);

    const [finalValue, setFinalValue] = useState<number | null>(60);//nilai_akhir_angka
    const [finalLetterValue, setFinalLetterValue] = useState("E");//nilai_akhir_huruf
    // const [form] = Form.useForm();
//kumpulan fungsi
    const formRef = React.createRef<FormInstance>();//

    const onFinish = async () => { //fungsi submit form //NEED API POST
      try{
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const decodedToken: any = jwtDecode(token);
          const userId = decodedToken.nomerInduk;

          const formData = {
          dataNilai:{  
            // jumlah_isian_per_kompetensi:inputValue,
            // nilai_per_kompetensi:gradeValue,
            // nilai_persen_per_kompetensi:percentValue
          },
          nilaiAngka:finalValue,
          nilaiHuruf:finalLetterValue}
          // Now you can send formData to your backend for processing
          console.log('Form Data:', formData);
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };

          await axios.patch(`/form-penilaian/dsn/update-nilai?uid=${userId}&pid=${formIdD}&ft=kode-etik`,formData,config);
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

    // const handleNumberChange = (key: keyof typeof inputValue, value: number | null) => {
    //   if (value !== null) {
    //     setInputValues((prevValues) => {
    //       const updatedValues = {
    //         ...prevValues,
    //         [key]: value,
    //       };
    //       const newPercentGrade = calculateExample(key, value);
    //       const newGrade = calculateGrade(value);
          
    //       setInputPercentValue((prevPercentValues) => ({
    //         ...prevPercentValues,
    //         [`P${key}`]: newPercentGrade,
    //       }));
  
    //       setInputGradeValue((prevGradeValues) => ({
    //         ...prevGradeValues,
    //         [`G${key}`]: newGrade,
    //       }));
  
    //       return updatedValues;
    //     });
    //   }
    // };
  
    // const calculateExample = (key: keyof typeof inputValue, value: number) => {
    //   const result = (value / 24) * 100;
    //   return parseFloat(result.toFixed(2));
    // };
  
    // const calculateGrade = (value: number) => {
    //   return value >= 2 ? 85 : 75;
    // };

    // const calculateAverageGrade = (grades: typeof gradeValue) => {
    //   const total = Object.values(grades).reduce((acc, grade) => acc + grade, 0);
    //   return (total / Object.values(grades).length).toFixed(2);
    // };
  
    // const averageGrade = calculateAverageGrade(gradeValue);
    useEffect(() => {
        const calculateFinalGrade = (value: number | null) => {
            // setFinalValue(value)
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

        calculateFinalGrade(finalValue)
            
    }, [finalValue]);
    

// console.log("nilai akhir ANGKA = " + finalValue)
// console.log("nilai akhir HHURUF = " + finalLetterValue)

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
        Kode Etik 
        {/* <span style={{color:'#6b7aa1'}}>(W.1.2.1-8)</span> */}
        </h3>

        <div style={{display:'flex',flexDirection:'row'}}>
        {/* <p style={{margin:'5px 0'}}>Rekomendasi Nilai : <span style={{color:'blue'}}>{averageGrade}</span></p> */}
        </div>

        <h4>CPMK 1. Mahasiswa mampu menjelaskan etika dan kode etik, profesionalisme, tata laku dan ciri khas dalam bidang profesi keinsinyuran sesuai kaidah etika profesi </h4>
        <p style={{margin:'5px 0'}}>Rekomendasi Nilai : <span style={{color:'blue'}}>80</span></p>
        <div style={{display:'flex',flexDirection:'row'}}>
            <p style={{margin:'5px 0'}}>Nilai CPMK 1 :</p>
            <InputNumber style={{width:'75px',margin:'0 5px'}} min={0} max={100}  />
            <p style={{margin:'5px 0',fontStyle:'italic',color:'gray'}}>* Masukkan nilai dari 1-100</p>
        </div>
        <Divider style={{margin:'10px 0'}} />

        <h4>CPMK 2. Mahasiswa mampu menerapkan etika dan kode etik, profesionalisme, tata laku dan ciri khas dalam bidang profesi keinsinyuran sesuai kaidah etika profesi </h4>
        <p style={{margin:'5px 0'}}>Rekomendasi Nilai : <span style={{color:'blue'}}>80</span></p>
        <div style={{display:'flex',flexDirection:'row'}}>
            <p style={{margin:'5px 0'}}>Nilai CPMK 2 :</p>
            <InputNumber style={{width:'75px',margin:'0 5px'}} min={0} max={100}  />
            <p style={{margin:'5px 0',fontStyle:'italic',color:'gray'}}>* Masukkan nilai dari 1-100</p>
        </div>
        <Divider style={{margin:'10px 0'}} />

        <h4>CPMK 3. Mahasiswa mampu menyelesaiakan masalah berperilaku sesuai dengan etika profesi keinsinyuran dengan mengemukakan pendapat baik lisan maupun tulisan</h4>
        <p style={{margin:'5px 0'}}>Rekomendasi Nilai : <span style={{color:'blue'}}>80</span></p>
        <div style={{display:'flex',flexDirection:'row'}}>
            <p style={{margin:'5px 0'}}>Nilai CPMK 3 :</p>
            <InputNumber style={{width:'75px',margin:'0 5px'}} min={0} max={100}  />
            <p style={{margin:'5px 0',fontStyle:'italic',color:'gray'}}>* Masukkan nilai dari 1-100</p>
        </div>
        <Divider style={{margin:'10px 0'}} />

        <p style={{margin:'5px 0'}}>Nilai Akhir dalam Angka : <span style={{color:'blue'}}>{finalValue}</span></p>
        <p style={{margin:'5px 0'}}>Nilai Akhir dalam Huruf : <span style={{color:'blue'}}>{finalLetterValue}</span></p>
        <Button style={{margin:'20px auto',display: "flex", justifyContent: "center"}} type='primary'>Save and Continue</Button>
    </div>
    </ConfigProvider>
);
};

export default FormulirDua;
