import React, { useState } from 'react';
import { Table, Form,Input, Button, Select, Upload, Checkbox, Divider, Space } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { nanoid } from 'nanoid';
import { ColumnsType } from 'antd/es/table';

//punya multiple choice
interface SubSection {
  label: string;
  value: string;
}
    
//punya multiple choice
interface Section {
    label: string;
    value: string;
    children: SubSection[];
  }
  
const choicesData: Section[]= [
  {
    label: 'W.1.1. - Mengembangkan dan mewujudkan tanggungjawab kecendekiaan dan kepedulian profesi keinsinyuran kepada bangsa, negara dan komunitas internasional',
    value: 'W.1.1.',
    children: [
      { label: 'W.1.1.1. - Menyadari tanggungjawab kecendekiaan Insinyur Profesional bagi memahami dan menjunjung falsafah dan nilai Pancasila sebagai  falsafah dasar masyarakat bangsa Indonesia', value: 'W.1.1.1' },
      { label: 'W.1.1.2. - Menghayati dan senantiasa  berusaha mengamalkan nilai dan jiwa Pancasila dalam menjalankan profesi.', value: 'W.1.1.2' },
      { label: 'W.1.1.3. - Berpedoman kepada konstitusi dan perundang-undangan yang berlaku di Negara Kesatuan Republik Indonesia dalam menjalankan profesi.', value: 'W.1.1.3' },
      { label: 'W.1.1.4. - Menjunjung rasa kesetiakawanan nasional dan rasa kepedulian sosial dan berusaha mendorong kewirausahaan dan kesejahteraan masyarakat menuju cita-cita Bangsa dan Negara', value: 'W.1.1.4' },
      { label: 'W.1.1.5. - Mengembangkan wawasan kebangsaan yang kuat dan dengan sadar menumbuhkan  kepercayaan  diri  membangun  kemandirian  nasional dalam profesinya dan dalam mengembangkan kerjasama di komunitas internasional.', value: 'W.1.1.5' },
      // ... other sub-sections ...
    ],
  },
  {
    label:'W.1.2. - Menghayati serta mematuhi Kode Etik Insinyur Indonesia dan tatalaku profesi yang berlaku',
    value: 'W.1.2.',
    children: [
        { label: 'W.1.2.1. -  Menempatkan tanggungjawab pada  kesejahteraan, kesehatan dan keselamatan masyarakat di atas tanggungjawabnya kepada profesi, kepada kepentingan golongan, atau kepada rekan sesama insinyur', value: 'W.1.2.1' },
        { label: 'W.1.2.2. - Bertindak dengan menjunjung tinggi kehormatan, martabat dan nilai luhur profesi.', value: 'W.1.2.2' },
        { label: 'W.1.2.3. - Melakukan pekerjaan, hanya dalam batasan kompetensinya.', value: 'W.1.2.3' },
        { label: 'W.1.2.4. - Mengembangkan nama baik berdasarkan prestasi dan tidak bersaing secara curang.', value: 'W.1.2.4' },
        { label: 'W.1.2.5. - Menerapkan kemampuan profesionalnya untuk kepentingan pemberi kerja keinsinyuran secara penuh amanah.', value: 'W.1.2.5' },
        { label: 'W.1.2.6. - Memberikan keterangan, pendapat atau pernyataan secara obyektif berdasarkan  kebenaran dan dalam cakupan pengetahuannya.', value: 'W.1.2.6' },
        { label: 'W.1.2.7. - Melakukan pengembangan kemampuan profesional secara berkelanjutan.', value: 'W.1.2.7' },
        { label: 'W.1.2.8. - Secara aktif membantu dan mendorong rekan kerjanya untuk memajukan pengetahuan dan pengalaman mereka.', value: 'W.1.2.8' },
        // ... other sub-sections ...
      ],
    },
    {
      label:'W.1.3. - Memahami, menerapkan, serta mengembangkan wawasan dan kaidah-kaidah kelestarian lingkungan',
      value: 'W.1.3.',
      children: [
        { label: 'W.1.3.1. - Menyadari  bahwa saling ketergantungan dan keaneka-ragaman ekosistem adalah dasar bagi  kelangsungan hidup manusia.', value: 'W.1.3.1.' },
        { label: 'W.1.3.2. - Menyadari keterbatasan daya dukung lingkungan hidup untuk menyerap perubahan yang dibuat manusia.', value: 'W.1.3.2.' },
        { label: 'W.1.3.3. - Menggalakkan tindakan  keinsinyuran yang diperlukan untuk memperbaiki, mempertahankan dan memulihkan  lingkungan hidup.', value: 'W.1.3.3.' },
        { label: 'W.1.3.4. - Menggalakkan  penggunaan  yang  bijaksana  atas  sumber-daya  tak  terbarukan  dengan  memperkecil  atau  mendaur-ulang  limbah  dan mengembangkan sumber-daya alternatif lain sejauh mungkin', value: 'W.1.3.4.' },
        { label: 'W.1.3.5. - Berusaha  mencapai  tujuan pekerjaan keinsinyurannya dengan penggunaan bahan baku dan enerji secara hemat dan dengan menerapkan kaidah pengelolaan lingkungan berkelanjutan', value: 'W.1.3.5.' },
        { label: 'W.1.3.6. - Memperhatikan keseluruhan dampak dari  siklus hidup produk dan proyek terhadap lingkungan hidup.', value: 'W.1.3.6.' },
        { label: 'W.1.3.7. - Memperhitungkan pengaruh yang mungkin muncul dari tindakan keinsinyuran terhadap faktor budaya atau warisan sejarah.', value: 'W.1.3.7.' },
        // ... other sub-sections ...
      ],
    },
    {
    label:'W.1.4. - Mengemban tanggungjawab profesional atas tindakan dan karyanya.',
    value: 'W.1.4.',
    children: [
      { label: 'W.1.4.1. - Memperhitungkan risiko dan tanggung-gugat (liabilities) profesional, dan sanggup bertanggungjawab untuk itu', value: 'W.1.4.1..' },
      { label: 'W.1.4.2. - Menerapkan dengan tepat persyaratan kesehatan dan keselamatan kerja (K-3).', value: 'W.1.4.2..' },
      { label: 'W.1.4.3. - Menyelidiki kebutuhan keselamatan masyarakat dan bertindak untuk memecahkan masalah keselamatan yang mungkin timbul.', value: 'W.1.4.3..' },
        { label: 'W.1.4.4. - Mengambil tindakan pencegahan yang tepat dalam menangani pekerjaan  yang berbahaya.', value: 'W.1.4.4..' },
        { label: 'W.1.4.5. - Memperhatikan kaidah-kaidah pencegahan dan penanganan  bencana alam serta pemulihan akibatnya.', value: 'W.1.4.5..' },
        // ... other sub-sections ...
      ],
    },
    // ... other sections ...
  ];

  //punya column
  interface TableRow {
    key: any;
    namaOrganisasi: string;
    jenis: string;
    kotaAsal: string;
    provinsiAsal: string;
    negaraAsal: string;
    bulan: string;
    tahun: string;
    bulanMulai: string;
    tahunMulai: string;
    masihAnggota : boolean;
    jabatanOrganisasi: string;
    tingkatanOrganisasi: string;
    kegiatanOrganisasi: string;
    uraianTugas: string;
    dokumenPendukung: any;
    klaimKompetensi: string[];
  }

const Formulir: React.FC = () => {
//kumpulan state
    const [dataSource, setDataSource] = useState<TableRow[]>([]);//data tabel
    const [selectedChoices, setSelectedChoices] = useState<{ [key: number]: string[] }>({});//pilihan checbox
    // const [rowNumbers, setRowNumbers] = useState<number>(1);//penomeran client side
    // const [showAdditionalFields, setShowAdditionalFields] = useState<boolean>(false);
    const [form] = Form.useForm();
//kumpulan fungsi
    const formRef = React.createRef<FormInstance>();//
  
    const handleAddRow = () => { //fungsi nambah baris 
        const newRow: TableRow = {
          key: nanoid(),//gk perlu //gk jadi deng ternyata perlu
          namaOrganisasi: '',
          jenis: '',
          kotaAsal: '',
          provinsiAsal: '',
          negaraAsal: '',
          bulan: '',
          tahun: '',
          bulanMulai: '',
          tahunMulai: '',
          masihAnggota : false,
          jabatanOrganisasi: '',
          tingkatanOrganisasi: '',
          kegiatanOrganisasi: '',
          uraianTugas: '',
          dokumenPendukung: null,
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
        namaOrganisasi : values[`namaOrganisasi${row.key}`],
        jenis: values[`jenis${row.key}`],
        kotaAsal: values[`kotaAsal${row.key}`],
        provinsiAsal: values[`provinsiAsal${row.key}`],
        negaraAsal: values[`negaraAsal${row.key}`],
        bulan: values[`bulan${row.key}`],
        tahun: values[`tahun${row.key}`],
        bulanMulai: values[`bulanMulai${row.key}`],
        tahunMulai: values[`tahunMulai${row.key}`],
        masihAnggota : values[`masihAnggota${row.key}`],
        jabatanOrganisasi: values[`jabatanOrganisasi${row.key}`],
        tingkatanOrganisasi: values[`tingkatanOrganisasi${row.key}`],
        kegiatanOrganisasi: values[`kegiatanOrganisasi${row.key}`],
        uraianTugas: values[`uraianTugas${row.key}`],
        dokumenPendukung: values[`dokumenPendukung${row.key}`],
        klaimKompetensi: selectedChoices[row.key] || [],
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
          alert('Harap Memilih Tidak Lebih Dari 3 Klaim Kompetensi');
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
          title: 'Nama Organisasi',
          dataIndex: 'namaOrganisasi',
          key: 'namaOrganisasi',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`namaOrganisasi${record.key}`} initialValue={text} style={{width:'200px'}}>
              <Input />
            </Form.Item>
          ),
        },
        {
          title: 'Jenis',
          dataIndex: 'jenis',
          key: 'jenis',
          render: (text: string, record: TableRow) => (
            <Form.Item name={`jenis${record.key}`} initialValue={undefined} >
              <Select placeholder="--Choose--" style={{ width: 280 }} >
                <Select.Option value="jenis1">Organisasi PII</Select.Option>
                <Select.Option value="jenis2">Organisasi Keinsinyuran Non PII</Select.Option>
                <Select.Option value="jenis3">Organisasi Non Keinsinyuran</Select.Option>
              </Select>
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
            title: 'Perioda',
            dataIndex: 'perioda',
            key: 'perioda',
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
          {
            title: 'Jabatan Dalam Organisasi',
            dataIndex: 'jabatanOrganisasi',
            key: 'jabatanOrganisasi',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`jabatanOrganisasi${record.key}`} initialValue={undefined} >
                <Select placeholder="--Choose--" style={{ width: 280 }}>
                  <Select.Option value="jabatan1">Anggota biasa</Select.Option>
                  <Select.Option value="jabatan2">Anggota pengurus</Select.Option>
                  <Select.Option value="jabatan3">Pimpinan</Select.Option>
                </Select>
              </Form.Item>
            ),
          },
          {
            title: 'Tingkatan Organisasi',
            dataIndex: 'tingkatanOrganisasi',
            key: 'tingkatanOrganisasi',
            render: (text: string, record: TableRow, index: number) => (
                <Form.Item name={`tingkatanOrganisasi${record.key}`} initialValue={undefined}>
                <Select placeholder="--Choose--" style={{ width: 280 }}>
                  <Select.Option value="tingkatan1">Organisasi lokal (bukan Nasional)</Select.Option>
                  <Select.Option value="tingkatan2">Organisasi Nasional</Select.Option>
                  <Select.Option value="tingkatan3">Organisasi Regional</Select.Option>
                  <Select.Option value="tingkatan4">Organisasi Internasional</Select.Option>
                </Select>
              </Form.Item>
            ),
          },
          {
            title: 'Lingkup Kegiatan Organisasi',
            dataIndex: 'kegiatanOrganisasi',
            key: 'kegiatanOrganisasi',
            render: (text: string, record: TableRow, index: number) => (
                <Form.Item name={`kegiatanOrganisasi${record.key}`} initialValue={undefined}>
                <Select placeholder="--Choose--" style={{ width: 280 }}>
                  <Select.Option value="kegiatan1">Asosiasi Profesi</Select.Option>
                  <Select.Option value="kegiatan2">Lembaga Pemerintah</Select.Option>
                  <Select.Option value="kegiatan3">Lembaga Pendidikan</Select.Option>
                  <Select.Option value="kegiatan4">Badan Usaha Milik Negara</Select.Option>
                  <Select.Option value="kegiatan6">Badan Usaha Swasta</Select.Option>
                  <Select.Option value="kegiatan7">Organisasi Kemasyarakatan</Select.Option>
                  <Select.Option value="kegiatan8">Lain-lain</Select.Option>
                </Select>
              </Form.Item>
            ),
          },
          {
            title: 'Uraian Singkat Tugas dan Tanggung Jawab Profesional sesuai NSPK',
            dataIndex: 'uraianTugas',
            key: 'uraianTugas',
            render: (text: string, record: TableRow, index: number) => (
              <Form.Item name={`uraianTugas${record.key}`} initialValue={text} style={{width:'250px'}}>
                <TextArea rows={4} />
              </Form.Item>
            ),
          },
        {
          title: 'Dokumen Pendukung',
          dataIndex: 'dokumenPendukung',
          key: 'dokumenPendukung',
          render: (text: string, record: TableRow, index: number) => (
            <Form.Item name={`dokumenPendukung${record.key}`} initialValue={text}>
              <Upload>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          ),
        },
        {
          title: 'Klaim Kompetensi (Pilih Maks.3)',
          dataIndex: 'klaimKompetensi',
          key: 'klaimKompetensi',
          render: (text: string[], record: TableRow) => (
          <div style={{ height: '150px', overflowY: 'scroll',border:'1px solid #dddddd',padding:'5px' }}>
            <Form.Item name={`klaimKompetensi${record.key}`} initialValue={text} style={{width:'1000px',fontSize:'14px'}} >
              <div style={{ display: 'flex', flexDirection: 'column'}}>
                {choicesData.map(section => (
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

  export default Formulir;
