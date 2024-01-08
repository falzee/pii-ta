import { Button, Space, Tag, theme } from 'antd';
import { Header } from 'antd/es/layout/layout'
import Table, { ColumnsType } from 'antd/es/table';
import { title } from 'process';
import React, { useEffect } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';

interface DataType {
  key: string;
  periode: string;
  badan: number;
  permohonan: string;
  status:string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Time Period',
    dataIndex: 'periode',
    key: 'periode',
    render: (text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined) => <a>{text}</a>,
  },
  {
    title: 'Badan Kejuruan',
    dataIndex: 'badankejuruan',
    key: 'badan',
  },
  {
    title: 'Jenis Permohonan',
    dataIndex: 'permohonan',
    key: 'permohonan',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_: any, record: { periode: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
      <Space size="middle">
        <a>Invite {record.periode}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  // {
  //   key: '1',
  //   name: 'John Brown',
  //   age: 32,
  //   address: 'New York No. 1 Lake Park',
  //   tags: ['nice', 'developer'],
  // },
  // {
  //   key: '2',
  //   name: 'Jim Green',
  //   age: 42,
  //   address: 'London No. 1 Lake Park',
  //   tags: ['loser'],
  // },
  // {
  //   key: '3',
  //   name: 'Joe Black',
  //   age: 32,
  //   address: 'Sydney No. 1 Lake Park',
  //   tags: ['cool', 'teacher'],
  // },
];

const Faip = ( ) => {
  useDocumentTitle('PII TA | FAIP');

    const {
        token: { colorBgContainer },
      } = theme.useToken();
      
  return (
    <div>
      {/* header tambahin underline sama shadow(opsional) */}
        <Header style={{ padding: '0 2rem', background: '#ffffff' ,borderBottom: '1px solid #D3D3D3'}}>
          <h2>FAIP</h2>
        </Header>
        <div className='home-page' style={{padding:'2rem',background:'#e4e3e3'}}>
          {/* h2 bukan bug itu buat simbol */}
            <h2 style={{ marginBottom: '1rem' }}>Anda dapat melakukan Pengisian Formulir Aplikasi Insinyur Profesional &#40;FAIP&#41; </h2>
            <p>Klik Button dibawah ini dan ikuti prosesnya.</p>
            <Link className='link-hover' to='/faip/formulir'>
              <Button type="primary" size='large' style={{ marginTop:'3rem',borderRadius:'0' }} >
              Buat FAIP Baru
              </Button>
            </Link>
        </div>
        {/* tabel masih contoh */}
        <div style={{margin:'1rem 1.5rem' ,maxHeight: '420px', overflowY: 'auto'}}>
          <Table columns={columns} dataSource={data} bordered size="small"/>
        </div>
        
    </div>
  )
}
export default Faip