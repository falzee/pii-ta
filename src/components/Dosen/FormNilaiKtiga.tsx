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
  W131: number;
  W132: number;
  W133: number;
  W134: number;
  W135: number;
  W136: number;
  W137: number;
  W141: number;
  W142: number;
  W143: number;
  W144: number;
  W145: number;
}
  // nilaiAkademikRata

  // PATOKAN DR DB
  // "data_penilaian": {
  //   "profesionalisme": {
  //     "data_nilai_profesionalisme": {  
  //        jumlah_isian_per_kompetensi:{},
  //        nilai_per_kompetensi:{},
  //        nilai_persen_per_kompetensi:{}
  //     },
  //     "nilai_akhir_profesionalisme_angka": "",
  //     "nilai_akhir_profesionalisme_huruf": ""
  //   },
  //   "kode_etik": {
  //     "data_nilai_kode_etik": [],
  //     "nilai_akhir_kode_etik_angka": "",
  //     "nilai_akhir_kode_etik_huruf": ""
  //   },
  //   "k3": {
  //     "data_nilai_k3": [],
  //     "nilai_akhir_k3_angka": "",
  //     "nilai_akhir_k3_huruf": ""
  //   },
  //   "seminar": {
  //     "data_nilai_seminar": [],
  //     "nilai_akhir_seminar_angka": "",
  //     "nilai_akhir_seminar_huruf": ""
  //   },
  //   "studi_kasus": {
  //     "data_nilai_studi_kasus": [],
  //     "nilai_akhir_studi_kasus_angka": "",
  //     "nilai_akhir_studi_kasus_huruf": ""
  //   },
  //   "praktik_keinsinyuran": {
  //     "data_nilai_praktik_keinsinyuran": [],
  //     "nilai_akhir_praktik_keinsinyuran_angka": "",
  //     "nilai_akhir_praktik_keinsinyuran_huruf": ""
  //   }
  // },
const FormulirKtiga: React.FC = () => {
//kumpulan state
    const { formIdD } = useParams<{ formIdD: string | undefined }>();
    const [inputValue, setInputValues] = useState<{ [key: string]: number }>({//jumlah_isian_per_kompetensi
      W131: 0,
      W132: 0,
      W133: 0,
      W134: 0,
      W135: 0,
      W136: 0,
      W137: 0,
      W141: 0,
      W142: 0,
      W143: 0,
      W144: 0,
      W145: 0,
    });
    const [gradeValue, setInputGradeValue] = useState({//nilai_per_kompetensi
      GW131: 75,
      GW132: 75,
      GW133: 75,
      GW134: 75,
      GW135: 75,
      GW136: 75,
      GW137: 75,
      GW141: 75,
      GW142: 75,
      GW143: 75,
      GW144: 75,
      GW145: 75,
    });
    const [percentValue, setInputPercentValue] = useState({//nilai_persen_per_kompetensi
      PW131: 0,
      PW132: 0,
      PW133: 0,
      PW134: 0,
      PW135: 0,
      PW136: 0,
      PW137: 0,
      PW141: 0,
      PW142: 0,
      PW143: 0,
      PW144: 0,
      PW145: 0,

    });
    const [finalValue, setFinalValue] = useState<number | null>(0);//nilai_akhir_angka
    const [finalLetterValue, setFinalLetterValue] = useState("E");//nilai_akhir_huruf
    // const [form] = Form.useForm();
    //kumpulan fungsi
    const formRef = React.createRef<FormInstance>();//
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
          const response = await axios.get(`http://192.168.195.241:8000/form-penilaian/dsn/update-nilai?uid=${userId}&pid=${formIdD}&ft=k3lh`,config)
          // http://192.168.195.241:8000/form-penilaian/dsn/update-nilai?uid=1998200345678&pid=123456789&ft=k3lh
          const userData = response.data;
          if (userData.data.mk_k3lh.data_nilai_k3lh.jumlah_isian_per_kompetensi){
            setInputValues(userData.data.mk_k3lh.data_nilai_k3lh.jumlah_isian_per_kompetensi);
          }

          if (userData.data.mk_k3lh.data_nilai_k3lh.nilai_per_kompetensi){
            setInputGradeValue(userData.data.mk_k3lh.data_nilai_k3lh.nilai_per_kompetensi);
          }
          
          if (userData.data.mk_k3lh.data_nilai_k3lh.nilai_persen_per_kompetensi){
            setInputPercentValue(userData.data.mk_k3lh.data_nilai_k3lh.nilai_persen_per_kompetensi);
          }

          if (userData.data.mk_k3lh.nilai_akhir_k3lh_angka){
            setFinalValue(userData.data.mk_k3lh.nilai_akhir_k3lh_angka);
          }
          if (userData.data.mk_k3lh.nilai_akhir_k3lh_huruf){
            setFinalLetterValue(userData.data.mk_k3lh.nilai_akhir_k3lh_huruf);
          }

        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching data'); 
      }
    };
    const onFinish = async () => { //fungsi submit form //NEED API POST
      try{
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const decodedToken: any = jwtDecode(token);
          const userId = decodedToken.nomerInduk;

          const formData = {dataNilai:{  
            jumlah_isian_per_kompetensi:inputValue,
            nilai_per_kompetensi:gradeValue,
            nilai_persen_per_kompetensi:percentValue
        },nilaiAngka:finalValue,nilaiHuruf:finalLetterValue}
          // Now you can send formData to your backend for processing
          console.log('Form Data:', formData);
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };

          await axios.patch(`http://192.168.195.241:8000/form-penilaian/dsn/update-nilai?uid=${userId}&pid=${formIdD}&ft=k3lh`,formData,config);
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
      const result = (value / 36) * 100;
      return parseFloat(result.toFixed(2));
    };

    const calculateGrade = (value: number) => {
      return value >= 2 ? 85 : 75;
    };

    const calculateAverageGrade = (grades: typeof gradeValue) => {
      const total = Object.values(grades).reduce((acc, grade) => acc + grade, 0);
      return (total / Object.values(grades).length).toFixed(2);
    };

    const averageGrade = calculateAverageGrade(gradeValue);

    const calculateFinalGrade = (value: number | null) => {
      setFinalValue(value)
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
            K3LH <span style={{color:'#6b7aa1'}}>(W.1.3.1-7 ,W.1.4.1-6)</span>
          </h3>
          <div>
            {Object.keys(inputValue).map((key) => (
              <div key={key}>
                <div style={{display:'flex',flexDirection:'row'}}>
                  <p style={{margin:'5px 0'}}>&bull; Jumlah {key}</p>
                  <InputNumber
                    style={{width:'75px',margin:'0 5px'}}
                    min={0}
                    max={3}
                    value={inputValue[key]}
                    onChange={(value) => handleNumberChange(key as keyof typeof inputValue, value)}
                  />
                  <p style={{margin:'5px 0'}}> Maks. 3</p>
                </div>
                <p>Kontribusi terhadap mata kuliah : {inputValue[key as keyof typeof inputValue]}/36 = {percentValue[`P${key}` as keyof typeof percentValue]}% nilai = {gradeValue[`G${key}` as keyof typeof gradeValue]}</p>
                <Divider style={{margin:'5px 0'}} />
              </div>
            ))}
          </div>
          <div style={{display:'flex',flexDirection:'row'}}>
            <p style={{margin:'5px 0'}}>Rekomendasi Nilai : <span style={{color:'blue'}}>{averageGrade}</span></p>
          </div>
          <div style={{display:'flex',flexDirection:'row'}}>
            <p style={{margin:'5px 0'}}>Nilai Akhir :</p>
              <InputNumber style={{width:'75px',margin:'0 5px'}} min={0} max={100} value={finalValue !== null ? finalValue : undefined} onChange={calculateFinalGrade} />
            <p style={{margin:'5px 0',fontStyle:'italic',color:'gray'}}>* Masukkan nilai dari 1-100</p>
          </div>
          <p style={{margin:'5px 0'}}>Nilai Akhir dalam Huruf : <span style={{color:'blue'}}>{finalLetterValue}</span></p>
          <Button style={{margin:'20px auto',display: "flex", justifyContent: "center"}} onClick={onFinish} type='primary'>Save and Continue</Button>
        </div>
      </ConfigProvider>
    );
  };

  export default FormulirKtiga;
