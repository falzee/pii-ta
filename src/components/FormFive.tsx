import React, { useState } from 'react';
import { Table, Form,Input, Button, Select, Upload, Checkbox, Divider, Space } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { nanoid } from 'nanoid';
import { ColumnsType } from 'antd/es/table';
import { dataPsepuluh,dataWempat,dataWdua } from '../data/SectionFormData'


  //rules
  // i3 W1 maks 13
  // i4 W1 maks 6
  // i5 W2 maks 5,W4 maks 5,P10 maks 5
  // i6 W1 maks 6,W4 maks 5,P10 maks 5

  interface TableRow {
    key: any;
    namaPendidikanTeknik: string;
    
    penyelenggara: string;
    
    kotaAsal: string;
    
    provinsiAsal: string;
    
    negaraAsal: string;
    
    bulan: string;
    tahun: string;
    bulanMulai: string;
    tahunMulai: string;
    masihAnggota : boolean;
    
    tingkatanMateriPelatihan: string;
    
    jamPendidikanTeknik: string;
    
    uraianSingkatAktifitas: string;
    
    klaimKompetensi: string[];
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

const FormulirLima: React.FC = () => {
//kumpulan state
    const [dataSource, setDataSource] = useState<TableRow[]>([]);//data tabel
    const [selectedChoices, setSelectedChoices] = useState<{ [key: number]: string[] }>({});//pilihan checbox
    const [selectedChoicesTwo, setSelectedChoicesTwo] = useState<{ [key: number]: string[] }>({});//pilihan checbox
    const [selectedChoicesThree, setSelectedChoicesThree] = useState<{ [key: number]: string[] }>({});//pilihan checbox

    // const [rowNumbers, setRowNumbers] = useState<number>(1);//penomeran client side
    // const [showAdditionalFields, setShowAdditionalFields] = useState<boolean>(false);
    const [form] = Form.useForm();
//kumpulan fungsi
    const formRef = React.createRef<FormInstance>();//


    const handleAddRow = () => { //fungsi nambah baris 
        const newRow: TableRow = {
          key: nanoid(),//gk perlu //gk jadi deng ternyata perlu
          namaPendidikanTeknik: '',
          penyelenggara: '',
          kotaAsal: '',
          provinsiAsal: '',
          negaraAsal: '',
          bulan: '',
          tahun: '',
          bulanMulai: '',
          tahunMulai: '',
          masihAnggota : false,
          tingkatanMateriPelatihan: '',
          jamPendidikanTeknik: '',
          uraianSingkatAktifitas: '',
          klaimKompetensi: [],
        };
        setDataSource([...dataSource, newRow]);
        // setRowNumbers(rowNumbers + 1); 
      };
      
    const handleDeleteRow = (key: any) => { //fungsi hapus baris  //NEED API DELETE
      const updatedDataSource = dataSource.filter(row => row.key !== key);
      setDataSource(updatedDataSource);
        // const updatedRowNumbers = updatedDataSource.map(row => row.id).splice(-1,1,);
        // console.log(updatedRowNumbers)
        // const updatedNumbers = updatedRowNumbers.splice(-1, 1) ;
      
        // console.log(updatedRowNumbers)
        //buggg
    };
    
    const onFinish = (values: any) => { //fungsi submit form //NEED API POST
      const formData = dataSource.map(row => ({
        ...row,
        namaPendidikanTeknik : values[`namaPendidikanTeknik${row.key}`] ,
        penyelenggara: values[`penyelenggara${row.key}`] ,
        kotaAsal: values[`kotaAsal${row.key}`] ,
        provinsiAsal: values[`provinsiAsal${row.key}`] ,
        negaraAsal: values[`negaraAsal${row.key}`] ,
        bulan: values[`bulan${row.key}`] ,
        tahun: values[`tahun${row.key}`] ,
        bulanMulai: values[`bulanMulai${row.key}`] ,
        tahunMulai: values[`tahunMulai${row.key}`] ,
        masihAnggota : values[`masihAnggota${row.key}`] ,
        tingkatanMateriPelatihan: values[`tingkatanMateriPelatihan${row.key}`] ,
        jamPendidikanTeknik: values[`jamPendidikanTeknik${row.key}`] ,
        uraianSingkatAktifitas: values[`uraianSingkatAktifitas${row.key}`] ,
        klaimKompetensiWdua: selectedChoices[row.key] || [],
        klaimKompetensiWempat: selectedChoicesTwo[row.key] || [],
        klaimKompetensiPsepuluh: selectedChoicesThree[row.key] || [],
      }));
      
      // Now you can send formData to your backend for processing
      const formDataJson = JSON.stringify(formData, (key, value) => {
        // Include properties with undefined values
        return value === undefined ? null : value;
      });
      console.log('Form Data:', formDataJson);
      
      // ... your form submission logic ...
    };
    // const handleCheckboxChange = (e:any) => {

    const handleChoiceChange = (recordKey: number, choiceValue: string, checked: boolean) => { //fungsi yg berhubungan dgn checbox klaim kompetensi
      const currentRowChoices = selectedChoices[recordKey] || [];
      console.log(currentRowChoices);
      if (checked && currentRowChoices.length < 5) {
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
          alert('Harap Memilih Tidak Lebih Dari 5 Klaim Kompetensi W2');
      }
    };
    const handleChoiceChangeTwo = (recordKey: number, choiceValue: string, checkedTwo: boolean) => { //fungsi yg berhubungan dgn checbox klaim kompetensi
      const currentRowChoices = selectedChoicesTwo[recordKey] || [];
      console.log(currentRowChoices);
      if (checkedTwo && currentRowChoices.length < 5) {
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
      }else {
          // Show alert if more than 3 choices selected
          alert('Harap Memilih Tidak Lebih Dari 5 Klaim Kompetensi W4');
      }
    };

    const handleChoiceChangeThree = (recordKey: number, choiceValue: string, checkedThree: boolean) => { //fungsi yg berhubungan dgn checbox klaim kompetensi
      const currentRowChoices = selectedChoicesThree[recordKey] || [];
      console.log(currentRowChoices);
      if (checkedThree && currentRowChoices.length < 5) {
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
      }else {
          // Show alert if more than 3 choices selected
          alert('Harap Memilih Tidak Lebih Dari 5 Klaim Kompetensi P10');
      }
    };
    //   setShowAdditionalFields(e.target.checked);
    // };
    const handleCheckboxChange = (key: any, checked: boolean) => {
      setDataSource((prevData) =>
        prevData.map((record) =>
          record.key === key ? { ...record, masihAnggota: checked } : record
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
            width: 22,
            align: 'center' as const,
          },
        {
          title: 'NAMA PENDIDIKAN/PELATIHAN TEKNIK',
          dataIndex: 'namaPendidikanTeknik',
          key: 'namaPendidikanTeknik',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`namaPendidikanTeknik${record.key}`} initialValue={text} style={{width:'200px'}}>
              <Input />
            </Form.Item>
          ),
        },
        {
          title: 'PENYELENGGARA',
          dataIndex: 'penyelenggara',
          key: 'penyelenggara',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`penyelenggara${record.key}`} initialValue={text} style={{width:'200px'}}>
              <Input />
            </Form.Item>
          ),
        },
        {
          title: 'Kota/Kabupaten',
          dataIndex: 'kotaAsal',
          key: 'kotaAsal',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`kotaAsal${record.key}`} initialValue={text} style={{width:'150px'}}>
              <Input />
            </Form.Item>
          ),
        },
        {
            title: 'Provinsi',
            dataIndex: 'provinsiAsal',
            key: 'provinsiAsal',
            render: (text: string, record: TableRow) => (
              <Form.Item name={`provinsiAsal${record.key}`} initialValue={text} style={{width:'150px'}}>
                <Input />
              </Form.Item>
            ),
          },
          {
            title: 'Negara',
            dataIndex: 'negaraAsal',
            key: 'negaraAsal',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`negaraAsal${record.key}`} initialValue={text} style={{width:'150px'}}>
                <Input />
              </Form.Item>
            ),
          },
          {
            title: 'BULAN / TAHUN',
            dataIndex: 'bulanTahun',
            key: 'bulanTahun',
            render: (text: string, record: TableRow, index: number) => (
                <div>
                    {record.masihAnggota  ? (
                    <>
                    <Form.Item name={`bulanMulai${record.key}`} initialValue={undefined}>
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
                    <Form.Item name={`tahunMulai${record.key}`} initialValue={text}>
                        <Input placeholder='--Tahun--' />
                    </Form.Item></>)
                    :(<>
                    <Form.Item name={`bulanMulai${record.key}`} initialValue={undefined}>
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
                    <Form.Item name={`tahunMulai${record.key}`} initialValue={text}>
                        <Input placeholder='--Tahun--' />
                    </Form.Item>
                    <Divider plain>s/d</Divider>
                    <Form.Item name={`bulan${record.key}`} initialValue={undefined}>
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
                    <Form.Item name={`tahun${record.key}`} initialValue={text}>
                        <Input placeholder='--Tahun--' />
                    </Form.Item>
                    </>)}
                    
                    {/* <Checkbox onChange={handleCheckboxChange}>Masih Menjadi Anggota</Checkbox> */}
                    <Form.Item name={`masihAnggota${record.key}`} valuePropName="checked" initialValue={false}>
                      <Checkbox checked={record.masihAnggota} onChange={(e: any) => handleCheckboxChange(record.key, e.target.checked)}>Masih Menjadi Anggota</Checkbox>
                    </Form.Item>
                </div>
                ),
          },
          // html entitites
          // Left square bracket [: &#91; or &lsqb;
          // Right square bracket ]: &#93; or &rsqb;
          // Left curly bracket {: &#123; or &lcub;
          // Right curly bracket }: &#125; or &rcub;
          // Left parenthesis (: &#40; or &lpar;
          // Right parenthesis ): &#41; or &rpar;
          // Comma ,: &comma; or &#44;
          // Greater than >: &gt; or &#62;
          // Less than <: &lt; or &#60;
          // Asterisk *: &ast; or &#42;
          // At sign @: &commat; or &#64;
          // Underscore _: &lowbar; or &#95;
          // Plus +: &plus; or &#43;
          // Equal =: &equals; or &#61;
          // Ampersand &: &amp; or &#38;
          // Dollar $: &dollar; or &#36;
          // Hash #: &num; or &#35;
          // Exclamation mark !: &excl; or &#33;
          // (-) is &hyphen; or &#45;
          {
            title: 'Pada tingkatan apa materi Pendidikan/Pelatihan Teknik yang Anda Ikuti',
            dataIndex: 'tingkatanMateriPelatihan',
            key: 'tingkatanMateriPelatihan',
            render: (text: string, record: TableRow, index: number) => (
                <div>
                  <Form.Item name={`tingkatanMateriPelatihan${record.key}`} initialValue={undefined}>
                    <Select placeholder="--Choose--" style={{ width: 280 }}>
                      <Select.Option value="dasar">Tingkat Dasar &#40;Fundamental&#41;</Select.Option>
                      <Select.Option value="lanjutan">Tingkat Lanjutan &#40;Advanced&#41;</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                ),
          },
          {
            title: 'Berapa jam Anda mengikuti Pendidikan/Pelatihan Teknik ?',
            dataIndex: 'jamPendidikanTeknik',
            key: 'jamPendidikanTeknik',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`jenisLembagaPenghargaan${record.key}`} initialValue={undefined} >
              <Select placeholder="--Choose--" style={{ width: 280 }}>
                <Select.Option value="kurang36jam">Lama pendidikan s/d 36 Jam</Select.Option>
                <Select.Option value="kurang100jam">Lama pendidikan 36 &#45; 100 Jam</Select.Option>
                <Select.Option value="kurang240jam">Lama pendidikan 100 &#45; 240 Jam</Select.Option>
                <Select.Option value="lebih240jam">&#62; dari 240 Jam</Select.Option>
              </Select>
            </Form.Item>
            ),
          },
          {
            title: 'Uraian Singkat Aktifitas',
            dataIndex: 'uraianSingkatAktifitas',
            key: 'uraianSingkatAktifitas',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`uraianSingkatAktifitas${record.key}`} initialValue={text} style={{width:'250px'}}>
                <TextArea rows={4} />
              </Form.Item>
            ),
          },
        {
          title: 'Klaim Kompetensi',
          dataIndex: 'klaimKompetensi',
          key: 'klaimKompetensi',
          render: (text: string[], record: TableRow) => (
          <div style={{ height: '150px', overflowY: 'scroll',border:'1px solid #dddddd',padding:'5px' }}>
            <Form.Item name={`klaimKompetensi${record.key}`} initialValue={text} style={{width:'1000px',fontSize:'14px'}} >
              <div style={{ display: 'flex', flexDirection: 'column'}}>
                {dataWdua.map(section => (
                <div key={section.value} >
                  <span style={{fontWeight:'bold'}}>{section.label}</span>
                    {section.children.map((subSection) => (
                      <div key={subSection.value} style={{borderBottom:'1px solid #dddddd',borderTop:'1px solid #dddddd'}}>
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
                {dataWempat.map(section => (
                <div key={section.value} >
                  <span style={{fontWeight:'bold'}}>{section.label}</span>
                    {section.children.map((subSection) => (
                      <div key={subSection.value} style={{borderBottom:'1px solid #dddddd',borderTop:'1px solid #dddddd'}}>
                        <Checkbox
                          value={subSection.value}
                          checked={(selectedChoicesTwo[record.key] || []).includes(subSection.value)}
                          onChange={(e : any) => handleChoiceChangeTwo(record.key, subSection.value, e.target.checked)}
                        >
                          {subSection.label}
                        </Checkbox>
                      </div>
                ))}
                </div>
              ))}
              {dataPsepuluh.map(section => (
                <div key={section.value} >
                  <span style={{fontWeight:'bold'}}>{section.label}</span>
                    {section.children.map((subSection) => (
                      <div key={subSection.value} style={{borderBottom:'1px solid #dddddd',borderTop:'1px solid #dddddd'}}>
                        <Checkbox
                          value={subSection.value}
                          checked={(selectedChoicesThree[record.key] || []).includes(subSection.value)}
                          onChange={(e : any) => handleChoiceChangeThree(record.key, subSection.value, e.target.checked)}
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
            <Button onClick={() => handleDeleteRow(record.key)} danger><DeleteOutlined /> x</Button>
          ),
        },
      ];
    
    //struktur komponen
    return (
    <div>
        <div className='container-form'>
          <h3 className='headerform' style={{marginBottom:'10px'}}>I.5 Pendidikan/Pelatihan Teknik/Manajemen <span style={{color:'blue'}}>(W2,W4,P10)</span></h3>
          <Button className="addFormButton" type="primary" onClick={handleAddRow} style={{marginBottom:'10px'}}>
            + Add Row
          </Button>
            <Form ref={formRef} onFinish={onFinish} >
                <div style={{ maxHeight: '420px', overflowY: 'auto', }}>
                    <Table dataSource={dataSource} columns={columns} pagination={false} rowKey={(record) => record.key} size="small" style={{maxHeight: '400px', margin: '-8px', padding: '8px' }}/>
                </div>
                <p style={{margin:'10px 0'}}>*&#41; KOMPETENSI: Isi dengan nomor Uraian Kegiatan Kompetensi yang Anda anggap persyaratannya telah terpenuhi dengan aktifitas Anda di sini</p>
                <Button className="saveFormButton" type="primary" htmlType="submit" style={{margin:'10px auto',display: "flex", justifyContent: "center" }}>
                    {/* <Button type="primary" htmlType="submit" disabled={totalSelected !== 3}> */}
                    Save & Continue
                </Button>
            </Form>
        </div>
    </div>
    );
  };

  export default FormulirLima;
