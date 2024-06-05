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
import { dataWempat,dataWdua,dataWtiga } from '../data/SectionFormDataW'
import { dataPenam,dataPtujuh,dataPdelapan,dataPsembilan,dataPsepuluh,dataPsebelas } from '../data/SectionFormDataP'


  //rules
  // i3 W1 maks 13
  // i4 W1 maks 6
  // i5 W2 maks 5,W4 maks 5,P10 maks 5
  // i6 W1 maks 6,W4 maks 5,P10 maks 5

  interface TableRow {
    key: any;
    tahunMulai: string;
    bulanMulai: string;
    tahunBerakhir: string;
    bulanBerakhir: string;
    masihdiInstansi : boolean;
    namaInstansi: string;
    jabatandiInstansi: string;
    namaProyek: string;
    pemberiTugas: string;
    kotaProyek: string;
    provinsiProyek: string;
    negaraProyek: string;
    durasi: string;
    jabatan: string;
    nilaiProyek: string;
    nilaiTanggungJawab: string;
    sdmyangTerlibat: string;
    tingkatKesulitan: string;
    skalaProyek: string;
    uraianSingkatNSPK: string;
    klaimKompetensi: string[];
    klaimKompetensiWdua?: string[];
    klaimKompetensiWtiga?: string[];
    klaimKompetensiWempat?: string[];
    klaimKompetensiPenam?: string[];
    klaimKompetensiPtujuh?: string[];
    klaimKompetensiPdelapan?: string[];
    klaimKompetensiPsembilan?: string[];
    klaimKompetensiPsepuluh?: string[];
    klaimKompetensiPsebelas?: string[];
    }
  //punya column
  // interface TableRow {
  //   key: any;
  //   namaOrganisasi: string;
  //   jenis: string;
  //   kotaAsal: string;
  //   provinsiAsal: string;
  //   negaraAsal: string;
  //   bulan: string;
  //   tahun: string;
  //   bulanMulai: string;
  //   tahunMulai: string;
  //   masihAnggota : boolean;
  //   jabatanOrganisasi: string;
  //   tingkatanOrganisasi: string;
  //   kegiatanOrganisasi: string;
  //   uraianTugas: string;
  //   klaimKompetensi: string[];
  // }

const FormThreeOne: React.FC = () => {
//kumpulan state
    const { formId } = useParams<{ formId: string | undefined }>();

    const [dataSource, setDataSource] = useState<TableRow[]>([]);//data tabel
    const [selectedChoices, setSelectedChoices] = useState<{ [key: number]: string[] }>({});
    const [selectedChoicesTwo, setSelectedChoicesTwo] = useState<{ [key: number]: string[] }>({});
    const [selectedChoicesThree, setSelectedChoicesThree] = useState<{ [key: number]: string[] }>({});
    const [selectedChoicesFour, setSelectedChoicesFour] = useState<{ [key: number]: string[] }>({});
    const [selectedChoicesFive, setSelectedChoicesFive] = useState<{ [key: number]: string[] }>({});
    const [selectedChoicesSix, setSelectedChoicesSix] = useState<{ [key: number]: string[] }>({});
    const [selectedChoicesSeven, setSelectedChoicesSeven] = useState<{ [key: number]: string[] }>({});
    const [selectedChoicesEight, setSelectedChoicesEight] = useState<{ [key: number]: string[] }>({});
    const [selectedChoicesNine, setSelectedChoicesNine] = useState<{ [key: number]: string[] }>({});


    // const [rowNumbers, setRowNumbers] = useState<number>(1);//penomeran client side
    // const [showAdditionalFields, setShowAdditionalFields] = useState<boolean>(false);
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
            const response = await axios.get(`http://localhost:8000/form-penilaian/mhs?uid=${userId}&ft=iii`,config)
            const userData = response.data;
            setDataSource(userData.data.form_iii)

            const newSelectedChoices: { [key: string]: string[] } = {};
            userData.data.form_iii.forEach((item: any) => {
                newSelectedChoices[item.key] = item.klaimKompetensiWdua;
            });
            setSelectedChoices(newSelectedChoices);

            const newSelectedChoicesTwo: { [key: string]: string[] } = {};
            userData.data.form_iii.forEach((item: any) => {
                newSelectedChoicesTwo[item.key] = item.klaimKompetensiWtiga;
            });
            setSelectedChoicesTwo(newSelectedChoicesTwo);

            const newSelectedChoicesThree: { [key: string]: string[] } = {};
            userData.data.form_iii.forEach((item: any) => {
                newSelectedChoicesThree[item.key] = item.klaimKompetensiWempat;
            });
            setSelectedChoicesThree(newSelectedChoicesThree);
        
            const newSelectedChoicesFour: { [key: string]: string[] } = {};
            userData.data.form_iii.forEach((item: any) => {
            newSelectedChoicesFour[item.key] = item.klaimKompetensiPenam;
            });
            setSelectedChoicesFour(newSelectedChoicesFour);

            const newSelectedChoicesFive: { [key: string]: string[] } = {};
            userData.data.form_iii.forEach((item: any) => {
            newSelectedChoicesFive[item.key] = item.klaimKompetensiPtujuh;
            });
            setSelectedChoicesFive(newSelectedChoicesFive);

            const newSelectedChoicesSix: { [key: string]: string[] } = {};
            userData.data.form_iii.forEach((item: any) => {
            newSelectedChoicesSix[item.key] = item.klaimKompetensiPdelapan;
            });
            setSelectedChoicesSix(newSelectedChoicesSix);

            const newSelectedChoicesSeven: { [key: string]: string[] } = {};
            userData.data.form_iii.forEach((item: any) => {
            newSelectedChoicesSeven[item.key] = item.klaimKompetensiPsembilan;
            });
            setSelectedChoicesSeven(newSelectedChoicesSeven);

            const newSelectedChoicesEight: { [key: string]: string[] } = {};
            userData.data.form_iii.forEach((item: any) => {
            newSelectedChoicesEight[item.key] = item.klaimKompetensiPsepuluh;
            });
            setSelectedChoicesEight(newSelectedChoicesEight);

            const newSelectedChoicesNine: { [key: string]: string[] } = {};
            userData.data.form_iii.forEach((item: any) => {
            newSelectedChoicesNine[item.key] = item.klaimKompetensiPsebelas;
            });
            setSelectedChoicesNine(newSelectedChoicesNine);
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching data'); 
      }
    };

    const handleAddRow = () => { //fungsi nambah baris 
        const newRow: TableRow = {
          key: nanoid(),//gk perlu //gk jadi deng ternyata perlu
          tahunMulai: '',
          bulanMulai: '',
          tahunBerakhir: '',
          bulanBerakhir: '',
          masihdiInstansi: false,
          namaInstansi: '',
          jabatandiInstansi: '',
          namaProyek: '',
          pemberiTugas: '',
          kotaProyek : '',
          provinsiProyek: '',
          negaraProyek: '',
          durasi: '',
          jabatan: '',
          nilaiProyek: '',
          nilaiTanggungJawab: '',
          sdmyangTerlibat: '',
          tingkatKesulitan: '',
          skalaProyek: '',
          uraianSingkatNSPK: '',
          klaimKompetensi: [],
        };
        setDataSource([...dataSource, newRow]);
        // setRowNumbers(rowNumbers + 1); 
      };
      
    
    const onFinish = async (values: any) => { //fungsi submit form //NEED API POST
      try{
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const decodedToken: any = jwtDecode(token);
          const userId = decodedToken.nomerInduk;
          const formData = dataSource.map(row => ({
            ...row,
            tahunMulai : values[`tahunMulai${row.key}`] ,
            bulanMulai: values[`bulanMulai${row.key}`] ,
            tahunBerakhir: values[`tahunBerakhir${row.key}`] ,
            bulanBerakhir: values[`bulanBerakhir${row.key}`] ,
            masihdiInstansi: values[`masihdiInstansi${row.key}`] ,
            namaInstansi: values[`namaInstansi${row.key}`] ,
            jabatandiInstansi: values[`jabatandiInstansi${row.key}`] ,
            namaProyek: values[`namaProyek${row.key}`] ,
            pemberiTugas: values[`pemberiTugas${row.key}`] ,
            kotaProyek : values[`kotaProyek${row.key}`] ,
            provinsiProyek: values[`provinsiProyek${row.key}`] ,
            negaraProyek: values[`negaraProyek${row.key}`] ,
            durasi: values[`durasi${row.key}`] ,
            jabatan: values[`jabatan${row.key}`] ,
            nilaiProyek: values[`nilaiProyek${row.key}`] ,
            nilaiTanggungJawab: values[`nilaiTanggungJawab${row.key}`] ,
            sdmyangTerlibat: values[`sdmyangTerlibat${row.key}`] ,
            tingkatKesulitan: values[`tingkatKesulitan${row.key}`] ,
            skalaProyek: values[`skalaProyek${row.key}`] ,
            uraianSingkatNSPK: values[`uraianSingkatNSPK${row.key}`] ,
            klaimKompetensiWdua: selectedChoices[row.key] || [],
            klaimKompetensiWtiga: selectedChoicesTwo[row.key] || [],
            klaimKompetensiWempat: selectedChoicesThree[row.key] || [],
            klaimKompetensiPenam: selectedChoicesFour[row.key] || [],
            klaimKompetensiPtujuh: selectedChoicesFive[row.key] || [],
            klaimKompetensiPdelapan: selectedChoicesSix[row.key] || [],
            klaimKompetensiPsembilan: selectedChoicesSeven[row.key] || [],
            klaimKompetensiPsepuluh: selectedChoicesEight[row.key] || [],
            klaimKompetensiPsebelas: selectedChoicesNine[row.key] || [],
          }));
          
          // Now you can send formData to your backend for processing
          // console.log('Form Data:', formData);
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          const response = await axios.patch(`http://localhost:8000/form-penilaian/mhs?uid=${userId}&pid=${formId}&ft=iii`,formData,config);
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
    // const handleCheckboxChange = (e:any) => {

    const handleChoiceChange = (recordKey: number, choiceValue: string, checked: boolean) => { //fungsi yg berhubungan dgn checbox klaim kompetensi
        const currentRowChoices = selectedChoices[recordKey] || [];
        console.log(currentRowChoices);
        if (checked && currentRowChoices.length < 10) {
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
        } else {
          // Show alert if more than 5 choices selected
          alert('Harap Memilih Tidak Lebih Dari 10 Klaim Kompetensi W2');
        }
      };
      
      const handleChoiceChangeTwo = (recordKey: number, choiceValue: string, checkedTwo: boolean) => { //fungsi yg berhubungan dgn checbox klaim kompetensi
        const currentRowChoices = selectedChoicesTwo[recordKey] || [];
        console.log(currentRowChoices);
        if (checkedTwo && currentRowChoices.length < 6) {
          const updatedRowChoices = [...currentRowChoices, choiceValue];
          setSelectedChoicesTwo({
            ...selectedChoicesTwo,
            [recordKey]: updatedRowChoices,
          });
        } else if (!checkedTwo) {
          const updatedRowChoices = currentRowChoices.filter(choice => choice !== choiceValue);
          setSelectedChoicesTwo({
            ...selectedChoicesTwo,
            [recordKey]: updatedRowChoices,
          });
        } else {
          // Show alert if more than 5 choices selected
          alert('Harap Memilih Tidak Lebih Dari 6 Klaim Kompetensi W3');
        }
      };
      
      const handleChoiceChangeThree = (recordKey: number, choiceValue: string, checkedThree: boolean) => { //fungsi yg berhubungan dgn checbox klaim kompetensi
        const currentRowChoices = selectedChoicesThree[recordKey] || [];
        console.log(currentRowChoices);
        if (checkedThree && currentRowChoices.length < 4) {
          const updatedRowChoices = [...currentRowChoices, choiceValue];
          setSelectedChoicesThree({
            ...selectedChoicesThree,
            [recordKey]: updatedRowChoices,
          });
        } else if (!checkedThree) {
          const updatedRowChoices = currentRowChoices.filter(choice => choice !== choiceValue);
          setSelectedChoicesThree({
            ...selectedChoicesThree,
            [recordKey]: updatedRowChoices,
          });
        } else {
          // Show alert if more than 5 choices selected
          alert('Harap Memilih Tidak Lebih Dari 4 Klaim Kompetensi W4');
        }
      };
      
      const handleChoiceChangeFour = (recordKey: number, choiceValue: string, checkedFour: boolean) => { //fungsi yg berhubungan dgn checbox klaim kompetensi
        const currentRowChoices = selectedChoicesFour[recordKey] || [];
        console.log(currentRowChoices);
        if (checkedFour && currentRowChoices.length < 6) {
          const updatedRowChoices = [...currentRowChoices, choiceValue];
          setSelectedChoicesFour({
            ...selectedChoicesFour,
            [recordKey]: updatedRowChoices,
          });
        } else if (!checkedFour) {
          const updatedRowChoices = currentRowChoices.filter(choice => choice !== choiceValue);
          setSelectedChoicesFour({
            ...selectedChoicesFour,
            [recordKey]: updatedRowChoices,
          });
        } else {
          // Show alert if more than 5 choices selected
          alert('Harap Memilih Tidak Lebih Dari 6 Klaim Kompetensi P6');
        }
      };
      
      const handleChoiceChangeFive = (recordKey: number, choiceValue: string, checkedFive: boolean) => { //fungsi yg berhubungan dgn checbox klaim kompetensi
        const currentRowChoices = selectedChoicesFive[recordKey] || [];
        console.log(currentRowChoices);
        if (checkedFive && currentRowChoices.length < 8) {
          const updatedRowChoices = [...currentRowChoices, choiceValue];
          setSelectedChoicesFive({
            ...selectedChoicesFive,
            [recordKey]: updatedRowChoices,
          });
        } else if (!checkedFive) {
          const updatedRowChoices = currentRowChoices.filter(choice => choice !== choiceValue);
          setSelectedChoicesFive({
            ...selectedChoicesFive,
            [recordKey]: updatedRowChoices,
          });
        } else {
          // Show alert if more than 5 choices selected
          alert('Harap Memilih Tidak Lebih Dari 8 Klaim Kompetensi P7');
        }
      };
      
      const handleChoiceChangeSix = (recordKey: number, choiceValue: string, checkedSix: boolean) => { //fungsi yg berhubungan dgn checbox klaim kompetensi
        const currentRowChoices = selectedChoicesSix[recordKey] || [];
        console.log(currentRowChoices);
        if (checkedSix && currentRowChoices.length < 8) {
          const updatedRowChoices = [...currentRowChoices, choiceValue];
          setSelectedChoicesSix({
            ...selectedChoicesSix,
            [recordKey]: updatedRowChoices,
          });
        } else if (!checkedSix) {
          const updatedRowChoices = currentRowChoices.filter(choice => choice !== choiceValue);
          setSelectedChoicesSix({
            ...selectedChoicesSix,
            [recordKey]: updatedRowChoices,
          });
        } else {
          // Show alert if more than 5 choices selected
          alert('Harap Memilih Tidak Lebih Dari 8 Klaim Kompetensi P8');
        }
      };
      
      const handleChoiceChangeSeven = (recordKey: number, choiceValue: string, checkedSeven: boolean) => { //fungsi yg berhubungan dgn checbox klaim kompetensi
        const currentRowChoices = selectedChoicesSeven[recordKey] || [];
        console.log(currentRowChoices);
        if (checkedSeven && currentRowChoices.length < 6) {
          const updatedRowChoices = [...currentRowChoices, choiceValue];
          setSelectedChoicesSeven({
            ...selectedChoicesSeven,
            [recordKey]: updatedRowChoices,
          });
        } else if (!checkedSeven) {
          const updatedRowChoices = currentRowChoices.filter(choice => choice !== choiceValue);
          setSelectedChoicesSeven({
            ...selectedChoicesSeven,
            [recordKey]: updatedRowChoices,
          });
        } else {
          // Show alert if more than 5 choices selected
          alert('Harap Memilih Tidak Lebih Dari 6 Klaim Kompetensi P9');
        }
      };
      
      const handleChoiceChangeEight = (recordKey: number, choiceValue: string, checkedEight: boolean) => { //fungsi yg berhubungan dgn checbox klaim kompetensi
        const currentRowChoices = selectedChoicesEight[recordKey] || [];
        console.log(currentRowChoices);
        if (checkedEight && currentRowChoices.length < 6) {
          const updatedRowChoices = [...currentRowChoices, choiceValue];
          setSelectedChoicesEight({
            ...selectedChoicesEight,
            [recordKey]: updatedRowChoices,
          });
        } else if (!checkedEight) {
          const updatedRowChoices = currentRowChoices.filter(choice => choice !== choiceValue);
          setSelectedChoicesEight({
            ...selectedChoicesEight,
            [recordKey]: updatedRowChoices,
          });
        } else {
          // Show alert if more than 5 choices selected
          alert('Harap Memilih Tidak Lebih Dari 6 Klaim Kompetensi P10');
        }
      };
      
      const handleChoiceChangeNine = (recordKey: number, choiceValue: string, checkedNine: boolean) => { //fungsi yg berhubungan dgn checbox klaim kompetensi
        const currentRowChoices = selectedChoicesNine[recordKey] || [];
        console.log(currentRowChoices);
        if (checkedNine && currentRowChoices.length < 6) {
          const updatedRowChoices = [...currentRowChoices, choiceValue];
          setSelectedChoicesNine({
            ...selectedChoicesNine,
            [recordKey]: updatedRowChoices,
          });
        } else if (!checkedNine) {
          const updatedRowChoices = currentRowChoices.filter(choice => choice !== choiceValue);
          setSelectedChoicesNine({
            ...selectedChoicesNine,
            [recordKey]: updatedRowChoices,
          });
        } else {
          // Show alert if more than 5 choices selected
          alert('Harap Memilih Tidak Lebih Dari 6 Klaim Kompetensi P11');
        }
      };
      
    //   setShowAdditionalFields(e.target.checked);
    // };
    const handleCheckboxChange = (key: any, checked: boolean) => {
      setDataSource((prevData) =>
        prevData.map((record) =>
          record.key === key ? { ...record, masihdiInstansi: checked } : record
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
            width: 50,
            align: 'center' as const,
            fixed: 'left',
        },
          {
            title: 'Periode',
            dataIndex: 'periode',
            key: 'periode',
            width:  50,
            render: (text: string, record: TableRow, index: number) => (
              <div>
              {record.masihdiInstansi  ? (
              <>
              <Form.Item className='form-item-row' name={`bulanMulai${record.key}`} initialValue={record.bulanMulai || undefined}>
                <Select placeholder="--Bulan Mulai--" style={{ width: 150 }}>
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
              <Form.Item className='form-item-row' name={`tahunMulai${record.key}`} initialValue={record.tahunMulai || undefined}>
                  <Input placeholder='--Tahun Mulai--' />
              </Form.Item></>)
              :(<>
              <Form.Item className='form-item-row' name={`bulanMulai${record.key}`} initialValue={record.bulanMulai || undefined}>
                <Select placeholder="--Bulan Mulai--" style={{ width: 150 }}>
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
              <Form.Item className='form-item-row' name={`tahunMulai${record.key}`} initialValue={record.tahunMulai || undefined}>
                  <Input placeholder='--Tahun Mulai--' />
              </Form.Item>
              <Divider style={{ margin:'5px 0'}} plain>s/d</Divider>
              <Form.Item className='form-item-row' name={`bulanBerakhir${record.key}`} initialValue={record.bulanBerakhir || undefined}>
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
              <Form.Item className='form-item-row' name={`tahunBerakhir${record.key}`} initialValue={record.tahunBerakhir || undefined}>
                  <Input placeholder='--Tahun--' />
              </Form.Item>
              </>)}
              
              {/* <Checkbox onChange={handleCheckboxChange}>Masih Menjadi Anggota</Checkbox> */}
              <Form.Item name={`masihdiInstansi${record.key}`} valuePropName="checked" initialValue={record.masihdiInstansi}>
                <Checkbox checked={record.masihdiInstansi} onChange={(e: any) => handleCheckboxChange(record.key, e.target.checked)}>Sampai Saat Ini</Checkbox>
              </Form.Item>
          </div>
          ),
          },
        {
          title: 'Nama Instansi / Perusahaan dan Jabatan/tugas',
          dataIndex: 'infoInstansi',
          key: 'infoInstansi',
          render: (text: string, record: TableRow) => (
            <div>
                <Form.Item className='form-item-row' name={`namaInstansi${record.key}`} initialValue={record.namaInstansi || undefined} style={{width:'200px'}}>
                    <Input placeholder='--Nama Instansi--' />
                </Form.Item>

                <Form.Item className='form-item-row' name={`jabatandiInstansi${record.key}`} initialValue={record.jabatandiInstansi || undefined} style={{width:'200px'}}>
                    <Input placeholder='--Jabatan--' />
                </Form.Item>
            </div>
          ),
        },
        {
          title: 'Nama Aktifitas/Kegiatan/Proyek',
          dataIndex: 'namaProyek',
          key: 'namaProyek',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`namaProyek${record.key}`} initialValue={text} style={{width:'150px'}}>
              <Input />
            </Form.Item>
          ),
        },
        {
            title: 'Pemberi Tugas',
            dataIndex: 'pemberiTugas',
            key: 'pemberiTugas',
            render: (text: string, record: TableRow) => (
              <Form.Item name={`pemberiTugas${record.key}`} initialValue={text} style={{width:'150px'}}>
                <Input />
              </Form.Item>
            ),
          },
          {
            title: 'Lokasi',
            dataIndex: 'lokasi',
            key: 'lokasi',
            render: (text: string, record: TableRow, index: number) => (
                <div>
                    <Form.Item className='form-item-row' name={`kotaProyek${record.key}`} initialValue={record.kotaProyek || undefined} style={{width:'200px'}}>
                        <Input placeholder='--Kota / Kab.--' />
                    </Form.Item>

                    <Form.Item className='form-item-row' name={`provinsiProyek${record.key}`} initialValue={record.provinsiProyek || undefined} style={{width:'200px'}}>
                        <Input placeholder='--Provinsi--' />
                    </Form.Item>

                    <Form.Item className='form-item-row' name={`negaraProyek${record.key}`} initialValue={record.negaraProyek || undefined} style={{width:'200px'}}>
                        <Input placeholder='--Negara--' />
                    </Form.Item>
                </div>
            ),
          },
          {
            title: 'Durasi',
            dataIndex: 'durasi',
            key: 'durasi',
            render: (text: string, record: TableRow, index: number) => (
                <div>
                  <Form.Item name={`durasi${record.key}`} initialValue={record.durasi || undefined}>
                    <Select placeholder="--Choose--" style={{ width: 280 }}>
                      <Select.Option value="kurang3tahun">1 - 3 Tahun</Select.Option>
                      <Select.Option value="kurang7tahun">4 - 7 Tahun</Select.Option>
                      <Select.Option value="kurang10tahun">8 - 10 Tahun</Select.Option>
                      <Select.Option value="lebih10tahun">&#62; 10 Tahun</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                ),
          },
          {
            title: 'Posisi Tugas / Jabatan',
            dataIndex: 'jabatan',
            key: 'jabatan',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`jabatan${record.key}`} initialValue={record.jabatan || undefined} >
              <Select placeholder="--Choose--" style={{ width: 280 }}>
                <Select.Option value="setaraanggota">Anggota / Staff / Dosen</Select.Option>
                <Select.Option value="setarasupervisor">Supervisor / Site Engineer/Site Manager / KaLab /Sekretaris Jurusan / Ketua Jurusan / PD</Select.Option>
                <Select.Option value="setaradirektur">Direktur / Ketua Tim / Dekan / PR / Rektor</Select.Option>
                <Select.Option value="setaraahli">Pengarah / Adviser / Nara Sumber Ahli</Select.Option>
              </Select>
            </Form.Item>
            ),
          },
          {
            title: 'Nilai Proyek',
            dataIndex: 'nilaiProyek',
            key: 'nilaiProyek',
            render: (text: string, record: TableRow) => (
              <Form.Item name={`nilaiProyek${record.key}`} initialValue={text} style={{width:'150px'}}>
                <Input />
              </Form.Item>
            ),
          },
          {
            title: 'Nilai Tanggungjawab',
            dataIndex: 'nilaiTanggungJawab',
            key: 'nilaiTanggungJawab',
            render: (text: string, record: TableRow) => (
              <Form.Item name={`nilaiTanggungJawab${record.key}`} initialValue={text} style={{width:'150px'}}>
                <Input />
              </Form.Item>
            ),
          },
          {
            title: 'SDM yang Terlibat',
            dataIndex: 'sdmyangTerlibat',
            key: 'sdmyangTerlibat',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`sdmyangTerlibat${record.key}`} initialValue={record.sdmyangTerlibat || undefined} >
              <Select placeholder="--Choose--" style={{ width: 280 }}>
                <Select.Option value="sedikit">Sedikit</Select.Option>
                <Select.Option value="sedang">Sedang</Select.Option>
                <Select.Option value="banyak">Banyak</Select.Option>
                <Select.Option value="sangatbanyak">Sangat Banyak</Select.Option>
              </Select>
            </Form.Item>
            ),
          },
          {
            title: 'Tingkat Kesulitan',
            dataIndex: 'tingkatKesulitan',
            key: 'tingkatKesulitan',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`tingkatKesulitan${record.key}`} initialValue={record.tingkatKesulitan || undefined} >
              <Select placeholder="--Choose--" style={{ width: 280 }}>
                <Select.Option value="rendah">Rendah</Select.Option>
                <Select.Option value="sedang">Sedang</Select.Option>
                <Select.Option value="tinggi">Tinggi</Select.Option>
                <Select.Option value="sangattinggi">Sangat Tinggi</Select.Option>
              </Select>
            </Form.Item>
            ),
          },
          {
            title: 'Skala Proyek',
            dataIndex: 'skalaProyek',
            key: 'skalaProyek',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`skalaProyek${record.key}`} initialValue={record.skalaProyek || undefined} >
              <Select placeholder="--Choose--" style={{ width: 280 }}>
                <Select.Option value="rendah">Rendah</Select.Option>
                <Select.Option value="sedang">Sedang</Select.Option>
                <Select.Option value="tinggi">Tinggi</Select.Option>
                <Select.Option value="sangattinggi">Sangat Tinggi</Select.Option>
              </Select>
            </Form.Item>
            ),
          },
          {
            title: 'Uraian Singkat Tugas dan Tanggung Jawab Profesional sesuai NSPK',
            dataIndex: 'uraianSingkatNSPK',
            key: 'uraianSingkatNSPK',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`uraianSingkatNSPK${record.key}`} initialValue={text} style={{width:'250px'}}>
                <TextArea rows={4} />
              </Form.Item>
            ),
          },
        {
          title: 'Klaim Kompetensi',
          dataIndex: 'klaimKompetensi',
          key: 'klaimKompetensi',
          render: (text: string[], record: TableRow) => (
          <div className='form-klaim-list' style={{height:'280px'}}>
            <Form.Item name={`klaimKompetensi${record.key}`} initialValue={text} style={{width:'1000px',fontSize:'14px'}} >
              <div style={{ display: 'flex', flexDirection: 'column'}}>
                {dataWdua.map(section => (
                <div key={section.value}>
                    <span style={{ fontWeight: 'bold' }}>{section.label}</span>
                    {section.children.map((subSection) => (
                    <div key={subSection.value} style={{ borderBottom: '1px solid #dddddd', borderTop: '1px solid #dddddd' }}>
                        <Checkbox
                        value={subSection.value}
                        checked={(selectedChoices[record.key] || []).includes(subSection.value)}
                        onChange={(e: any) => handleChoiceChange(record.key, subSection.value, e.target.checked)}
                        >
                        {subSection.label}
                        </Checkbox>
                    </div>
                    ))}
                </div>
                ))}
                {dataWtiga.map(section => (
                <div key={section.value}>
                    <span style={{ fontWeight: 'bold' }}>{section.label}</span>
                    {section.children.map((subSection) => (
                    <div key={subSection.value} style={{ borderBottom: '1px solid #dddddd', borderTop: '1px solid #dddddd' }}>
                        <Checkbox
                        value={subSection.value}
                        checked={(selectedChoicesTwo[record.key] || []).includes(subSection.value)}
                        onChange={(e: any) => handleChoiceChangeTwo(record.key, subSection.value, e.target.checked)}
                        >
                        {subSection.label}
                        </Checkbox>
                    </div>
                    ))}
                </div>
                ))}
                {dataWempat.map(section => (
                <div key={section.value}>
                    <span style={{ fontWeight: 'bold' }}>{section.label}</span>
                    {section.children.map((subSection) => (
                    <div key={subSection.value} style={{ borderBottom: '1px solid #dddddd', borderTop: '1px solid #dddddd' }}>
                        <Checkbox
                        value={subSection.value}
                        checked={(selectedChoicesThree[record.key] || []).includes(subSection.value)}
                        onChange={(e: any) => handleChoiceChangeThree(record.key, subSection.value, e.target.checked)}
                        >
                        {subSection.label}
                        </Checkbox>
                    </div>
                    ))}
                </div>
                ))}
                {dataPenam.map(section => (
                <div key={section.value}>
                    <span style={{ fontWeight: 'bold' }}>{section.label}</span>
                    {section.children.map((subSection) => (
                    <div key={subSection.value} style={{ borderBottom: '1px solid #dddddd', borderTop: '1px solid #dddddd' }}>
                        <Checkbox
                        value={subSection.value}
                        checked={(selectedChoicesFour[record.key] || []).includes(subSection.value)}
                        onChange={(e: any) => handleChoiceChangeFour(record.key, subSection.value, e.target.checked)}
                        >
                        {subSection.label}
                        </Checkbox>
                    </div>
                    ))}
                </div>
                ))}
                {dataPtujuh.map(section => (
                <div key={section.value}>
                    <span style={{ fontWeight: 'bold' }}>{section.label}</span>
                    {section.children.map((subSection) => (
                    <div key={subSection.value} style={{ borderBottom: '1px solid #dddddd', borderTop: '1px solid #dddddd' }}>
                        <Checkbox
                        value={subSection.value}
                        checked={(selectedChoicesFive[record.key] || []).includes(subSection.value)}
                        onChange={(e: any) => handleChoiceChangeFive(record.key, subSection.value, e.target.checked)}
                        >
                        {subSection.label}
                        </Checkbox>
                    </div>
                    ))}
                </div>
                ))}
                {dataPdelapan.map(section => (
                <div key={section.value}>
                    <span style={{ fontWeight: 'bold' }}>{section.label}</span>
                    {section.children.map((subSection) => (
                    <div key={subSection.value} style={{ borderBottom: '1px solid #dddddd', borderTop: '1px solid #dddddd' }}>
                        <Checkbox
                        value={subSection.value}
                        checked={(selectedChoicesSix[record.key] || []).includes(subSection.value)}
                        onChange={(e: any) => handleChoiceChangeSix(record.key, subSection.value, e.target.checked)}
                        >
                        {subSection.label}
                        </Checkbox>
                    </div>
                    ))}
                </div>
                ))}
                {dataPsembilan.map(section => (
                <div key={section.value}>
                    <span style={{ fontWeight: 'bold' }}>{section.label}</span>
                    {section.children.map((subSection) => (
                    <div key={subSection.value} style={{ borderBottom: '1px solid #dddddd', borderTop: '1px solid #dddddd' }}>
                        <Checkbox
                        value={subSection.value}
                        checked={(selectedChoicesSeven[record.key] || []).includes(subSection.value)}
                        onChange={(e: any) => handleChoiceChangeSeven(record.key, subSection.value, e.target.checked)}
                        >
                        {subSection.label}
                        </Checkbox>
                    </div>
                    ))}
                </div>
                ))}
                {dataPsepuluh.map(section => (
                <div key={section.value}>
                    <span style={{ fontWeight: 'bold' }}>{section.label}</span>
                    {section.children.map((subSection) => (
                    <div key={subSection.value} style={{ borderBottom: '1px solid #dddddd', borderTop: '1px solid #dddddd' }}>
                        <Checkbox
                        value={subSection.value}
                        checked={(selectedChoicesEight[record.key] || []).includes(subSection.value)}
                        onChange={(e: any) => handleChoiceChangeEight(record.key, subSection.value, e.target.checked)}
                        >
                        {subSection.label}
                        </Checkbox>
                    </div>
                    ))}
                </div>
                ))}
                {dataPsebelas.map(section => (
                <div key={section.value}>
                    <span style={{ fontWeight: 'bold' }}>{section.label}</span>
                    {section.children.map((subSection) => (
                    <div key={subSection.value} style={{ borderBottom: '1px solid #dddddd', borderTop: '1px solid #dddddd' }}>
                        <Checkbox
                        value={subSection.value}
                        checked={(selectedChoicesNine[record.key] || []).includes(subSection.value)}
                        onChange={(e: any) => handleChoiceChangeNine(record.key, subSection.value, e.target.checked)}
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
            <Button onClick={() => openModalDelete(record)} type='primary' danger>
              <DeleteOutlined />
            </Button>          
            ),
        },
      ];
    
      //modal logic
      const handleDelete = (key: any) => {
        const newData = dataSource.filter(item => item.key !== key);
        setDataSource(newData);
      };

      const [isModalOpen, setIsModalOpen] = useState(false);
      const [modaldata, setmodaldata] = useState<any>([]);
      const openModalDelete = (record: any) => { //fungsi hapus baris  //NEED API DELETE
        // const updatedDataSource = dataSource.filter(row => row.key !== key);
        setmodaldata(record);
        setIsModalOpen(true);
      };
      const handleDeleteRow = () => {
        handleDelete(modaldata.key);
        setIsModalOpen(false);
        };
      const showModal = () => {
        setIsModalOpen(true);
      };

      const handleCancel = () => {
        setIsModalOpen(false);
      };
    //struktur komponen
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
        <div>
        <div className='container-form'>
          <h3 className='headerform' style={{marginBottom:'10px'}}>III. KUALIFIKASI PROFESIONAL <span style={{color:'#6b7aa1'}}>(W2,W3,W4,P6,P7,P8,P9,P10,P11)</span></h3>
            <Button className="addFormButton" type="primary" onClick={handleAddRow} style={{marginBottom:'10px'}}>
                + Add Row
            </Button>
            <Form ref={formRef} onFinish={onFinish} >
              <div style={{ overflowY: 'hidden', overflowX: 'auto' }}>
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  pagination={false}
                  rowKey={(record) => record.key}
                  size="small"
                  scroll={{ y: 400, x: 'max-content' }} // Adjust x as needed
                  bordered
                />
              </div>
                <p style={{margin:'10px 0'}}>*&#41; KOMPETENSI: Isi dengan nomor Uraian Kegiatan Kompetensi yang Anda anggap persyaratannya telah terpenuhi dengan aktifitas Anda di sini</p>
                <Button className="saveFormButton" type="primary" htmlType="submit" style={{margin:'20px auto',display: "flex", justifyContent: "center" }}>
                    {/* <Button type="primary" htmlType="submit" disabled={totalSelected !== 3}> */}
                    Save & Continue
                </Button>
            </Form>
            <Modal title="Hapus data?" open={isModalOpen} onOk={handleDeleteRow} onCancel={handleCancel} okText={'Hapus'} okType='danger' centered>
              {/* <p>Apakah anda yakin untuk menghapus data baris ini?</p> */}
              <p style={{color:'#faad14'}}>Data baru benar-benar terhapus dengan menekan tombol "save and continue" di bagian bawah</p>
            </Modal>
        </div>
    </div>
    </ConfigProvider>
    );
  };

  export default FormThreeOne;
