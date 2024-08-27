import React, { useEffect, useState } from 'react';
import { Table, Form,Input, Button, Select, Upload, Checkbox, Divider, Space, ConfigProvider, Modal, InputNumber, InputNumberProps } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { nanoid } from 'nanoid';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams } from 'react-router';


  // nilaiAkademikRata

const FormulirSeminar: React.FC = () => {
//kumpulan state
    const { formIdD } = useParams<{ formIdD: string | undefined }>();
    

    const navigate = useNavigate();

    const [matkul, setMatkul] = useState<{ [key: string]: string }>({//jumlah_isian_per_kompetensi
      kodeEtik: "TIDAK ADA",
      profesionalisme: "TIDAK ADA",
      ktiga: "TIDAK ADA",
      seminar: "TIDAK ADA"
    });

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
          const response = await axios.get(`/form-penilaian/dsn/update-nilai?uid=${userId}&pid=${formIdD}&ft=all`,config)
          // /form-penilaian/dsn/update-nilai?uid=1998200345678&pid=123456789&ft=seminar
          const userData = response.data;
          if (userData.data.mk_kode_etik.nilai_akhir_kode_etik_huruf){
            setMatkul((prevValues) => ({
              ...prevValues,
              kodeEtik: `ADA (${userData.data.mk_kode_etik.nilai_akhir_kode_etik_huruf},${userData.data.mk_kode_etik.nilai_akhir_kode_etik_angka})`,
            }));
          }

          if (userData.data.mk_profesionalisme.nilai_akhir_profesionalisme_huruf){
            setMatkul((prevValues) => ({
              ...prevValues,
              profesionalisme: `ADA (${userData.data.mk_profesionalisme.nilai_akhir_profesionalisme_huruf},${userData.data.mk_profesionalisme.nilai_akhir_profesionalisme_angka})`,
            }));
          }
          
          if (userData.data.mk_k3lh.nilai_akhir_k3lh_huruf){
            setMatkul((prevValues) => ({
              ...prevValues,
              ["ktiga"]: `ADA (${userData.data.mk_k3lh.nilai_akhir_k3lh_huruf},${userData.data.mk_k3lh.nilai_akhir_k3lh_angka})`,
            }));          
          }

          if (userData.data.mk_seminar.nilai_akhir_seminar_huruf){
            setMatkul((prevValues) => ({
              ...prevValues,
              ["seminar"]: `ADA (${userData.data.mk_seminar.nilai_akhir_seminar_huruf},${userData.data.mk_seminar.nilai_akhir_seminar_angka})`,
            }));          
          }

        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching data'); 
      }
    };
    // const onFinish = async () => { //fungsi submit form //NEED API POST
    //   try{
    //     const token = localStorage.getItem('jwtToken');
    //     if (token) {
    //       const decodedToken: any = jwtDecode(token);
    //       const userId = decodedToken.nomerInduk;

    //       const formData = {dataNilai:{  
    //         jumlah_isian_per_kompetensi:inputValue,
    //         nilai_per_kompetensi:gradeValue,
    //         nilai_persen_per_kompetensi:percentValue
    //     },nilaiAngka:finalValue,nilaiHuruf:finalLetterValue}
    //       // Now you can send formData to your backend for processing
    //       console.log('Form Data:', formData);
    //       const config = {
    //         headers: {
    //           Authorization: `Bearer ${token}`
    //         }
    //       };

    //       await axios.patch(`/form-penilaian/dsn/update-nilai?uid=${userId}&pid=${formIdD}&ft=seminar`,formData,config);
    //       // console.log("response add form:"+response)

    //       // const userData = response.data;
    //       // setStatus("new")
    //     } else {
    //       console.error('User not found');
    //     }
    //   }catch(error){
    //     console.error('Error sending form');
    //   }
    //   window.location.reload();
      
    //   // ... your form submission logic ...
    // };

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
    //   const result = (value / 60) * 100;
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

    // const calculateFinalGrade = (value: number | null) => {
    //   setFinalValue(value)
    //   if (value !== null) {
    //     if (value >= 85) {
    //       setFinalLetterValue("A");
    //     } else if (value >= 75) {
    //       setFinalLetterValue("B");
    //     } else if (value >= 65) {
    //       setFinalLetterValue("C");
    //     } else if (value >= 55) {
    //       setFinalLetterValue("D");
    //     } else {
    //       setFinalLetterValue("E");
    //     }
    //   }

    // };
    // console.log("nilai akhir ANGKA = " + finalValue)
    // console.log("nilai akhir HHURUF = " + finalLetterValue)

    const submitForm = async () => {
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
          await axios.patch(`/form-penilaian/dsn/submit-nilai?uid=${userId}&pid=${formIdD}`,{},config);
          navigate(`/form/d/faip`, { replace: true });
          // console.log("response add form:"+response)
  
          // const userData = response.data;
          // setStatus("new")
        } else {
          console.error('User not found');
        }
      }catch(error){
        console.error('Error submitting form');
      }
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
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
            Submit Form Nilai
          </h3>
          <h4>Informasi Penilaian</h4>
          <p>- Kode Etik : { matkul.kodeEtik === 'TIDAK ADA' ? <span style={{color:'red'}}>{matkul.kodeEtik}</span> 
            : <span style={{color:'blue'}}>{matkul.kodeEtik}</span> 
            }
          </p>
          <p>- Profesionalisme : { matkul.profesionalisme === 'TIDAK ADA' ? <span style={{color:'red'}}>{matkul.profesionalisme}</span> 
            : <span style={{color:'blue'}}>{matkul.profesionalisme}</span> 
            }
          </p>
          <p>- K3LH : { matkul.ktiga === 'TIDAK ADA' ? <span style={{color:'red'}}>{matkul.ktiga}</span> 
            : <span style={{color:'blue'}}>{matkul.ktiga}</span> 
            }
          </p>
          <p>- Seminar : { matkul.seminar === 'TIDAK ADA' ? <span style={{color:'red'}}>{matkul.seminar}</span> 
            : <span style={{color:'blue'}}>{matkul.seminar}</span> 
            }
          </p>
          <p>Note. Pastikan nilai sudah dalam keadaan <span style={{color:'blue'}}>ADA</span> semua sebelum menyelesaikan penilaian!</p>
          {/* {(record.statusPenilaian === 'Data Belum Masuk') ? <p style={{color:'orange'}}>{text}</p> 
            : (record.statusPenilaian === 'Belum Dinilai') ? <p style={{color:'red'}}>{text}</p> 
            : (record.statusPenilaian === 'Proses Penilaian') ? <p style={{color:'orange'}}>{text}</p> 
            : (record.statusPenilaian === 'Nilai Masuk') ? <p style={{color:'green'}}>{text}</p> 
            : null } */}
          <Button type="primary" size='large' style={{ margin:'20px auto',display: "flex", justifyContent: "center",borderRadius:'3px' }} onClick={showModal}>
              Submit Nilai
          </Button>
          <Modal title="Submit Formulir?" open={isModalOpen} onOk={submitForm} onCancel={handleCancel} okText={'Submit'} centered>
            <p>Apakah anda yakin untuk  menyelesaikan penilaian ini?</p>
            <p style={{color:'red'}}>note. Data yang sudah terkirim tidak bisa dirubah lagi!</p>
            </Modal>
        </div>
      </ConfigProvider>
    );
  };

  export default FormulirSeminar;
