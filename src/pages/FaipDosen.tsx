import { Button, Space, Tag, theme } from 'antd';
import { Header } from 'antd/es/layout/layout'
import { title } from 'process';
import React, { useEffect } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Link, useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import Search, { SearchProps } from 'antd/es/input/Search';
interface DataType {
  key: React.Key;
  nama: string;
  nim: string;
  angkatan: number;
  statusPenilaian: string;
}

const FaipDosen = ( ) => {
  useDocumentTitle('PII TA | FAIP');
  const navigate = useNavigate()
  const data = [
    {
      key: '1',
      nama: 'Dan Brown',
      nim: '1234567890',
      angkatan: 2018,
      statusPenilaian: 'Belum Dinilai',
    },
    {
      key: '2',
      nama: 'Yellow Claw',
      nim: '1234567891',
      angkatan: 2010,
      statusPenilaian: 'Belum Dinilai',
    },
    {
      key: '3',
      nama: 'Jack Black',
      nim: '1234567892',
      angkatan: 2019,
      statusPenilaian: 'Sudah Dinilai',
    },
    {
      key: '4',
      nama: 'Red Forman',
      nim: '1234567894',
      angkatan: 2030,
      statusPenilaian: 'Nilai Masuk',
    },
  ];
  const columns: TableColumnsType<DataType> = [
    {
      title: 'Nama',
      key:'nama',
      dataIndex: 'nama',
      showSorterTooltip: true,
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
        {
          text: 'Submenu',
          value: 'Submenu',
          children: [
            {
              text: 'Green',
              value: 'Green',
            },
            {
              text: 'Black',
              value: 'Black',
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.nama.indexOf(value as string) === 0,
      sorter: (a, b) => a.nama.length - b.nama.length,
      sortDirections: ['descend'],
    },
    {
      title: 'NIM',
      key:'nim',
      dataIndex: 'nim',
    },
    {
      title: 'Angkatan',
      key:'angkatan',
      dataIndex: 'angkatan',
      sorter: (a, b) => a.angkatan - b.angkatan,
    },
    {
      title: 'Status',
      key:'statusPenilaian',
      dataIndex: 'statusPenilaian',
      filters: [
        {
          text: 'Belum Dinilai',
          value: 'Belum Dinilai',
        },
        {
          text: 'Sudah/Sedang Dinilai',
          value: 'Sudah Dinilai',
        },
        {
          text: 'Nilai Masuk',
          value: 'Nilai masuk',
        },
      ],
      render: (text: string, record: DataType) => (
        <div>
          {(record.statusPenilaian === 'Belum Dinilai') ? <p style={{color:'red'}}>{text}</p> : (record.statusPenilaian === 'Sudah Dinilai') ? <p style={{color:'blue'}}>{text}</p> : (record.statusPenilaian === 'Nilai Masuk') ? <p style={{color:'green'}}>{text}</p> : null }
        </div>
      ),
      onFilter: (value, record) => record.statusPenilaian.indexOf(value as string) === 0,
    },
    {
      title: 'Aksi',
      dataIndex: 'aksi',
      align:'center',
      width: 150,
      render: (text: string, record: DataType) => (
        <div>
          {(record.statusPenilaian === 'Belum Dinilai') 
          ? 
            <Button onClick={() => navigate('id')} type='primary'>
              <PlusOutlined />
            </Button>     
          : (record.statusPenilaian === 'Sudah Dinilai') 
          ?
            <>
              <Button onClick={() => navigate('id')} style={{margin:'0 5px'}} type='primary'>
                <EditOutlined />
              </Button> 
              <Button style={{margin:'0 5px'}} type='primary' danger>
                <DeleteOutlined />
              </Button> 
            </>
          : (record.statusPenilaian === 'Nilai Masuk') 
          ? <p style={{color:'#808080',fontStyle:'italic'}}>expired</p>
          : null
          }
        </div>
      ),
    },
  ];
  

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  return (
<div style={{ display: 'flex', justifyContent: 'center' }}>
    <div className='form' style={{ padding: '1rem', width: '100%', maxWidth: '1000px', backgroundColor: '' }}>
      {/* header tambahin underline sama shadow(opsional) */}
        <h2 style={{ padding: '0 0 1rem', textAlign: 'left', width: '100%', borderBottom: '2px solid #D3D3D3' }}>Pengisian Nilai Mahasiswa</h2>
      <div className='header-faip-dosen'>
        <h3>Silakan pilih mahasiswa yang akan anda nilai!</h3>
        <Search className='header-faip-dosen-search' placeholder="Cari mahasiswa?" onSearch={onSearch} style={{ width: 200 }} />
      </div>
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          showSorterTooltip={true}
          scroll={{ y: 400, x: 'max-content' }}
        />
    </div>
  </div>
  )
}
export default FaipDosen