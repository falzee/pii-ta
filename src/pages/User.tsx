import { Button, Descriptions, DescriptionsProps, theme } from 'antd'
import { Header } from 'antd/es/layout/layout'
import React from 'react'
import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'
import Table, { ColumnsType } from 'antd/es/table'

type Props = {}

const items: DescriptionsProps['items'] = [
  // TODO Fetch dr backend
  {
    key: '1',
    label: 'Nama',
    children: 'Erik Kababan',
  },
  {
    key: '2',
    label: 'Gelar',
    children: 'S.T.',
  },
  {
    key: '3',
    label: 'Jenis Kelamin',
    children: 'Pria',
  },
  {
    key: '4',
    label: 'Tempat & Tanggal Lahir',
    children: 'Johannesburgh, 30 September 1965',
  },
  {
    key: '5',
    label: 'KTP atau Passport',
    children: '30903899079884',
  },
  {
    key: '7',
    label: 'Email',
    children: 'erikkababan@mail.com',
  },
  {
    key: '8',
    label: 'Nomor Ponsel',
    children: '+123456789',
  },
  {
    key: '9',
    label: 'Alamat Rumah',
    children: 'Jl.kesana no.169',
  },
  {
    key: '10',
    label: 'Website',
    children: 'https:/linkedin.com/erik',
  },
  {
    key: '11',
    label: 'Deskripsi',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel ex ex. Sed rhoncus eleifend nunc. Maecenas ac ligula a ex bibendum faucibus convallis et tellus. Duis sit amet porta metus, ultricies luctus metus. Pellentesque eleifend metus ut dui varius, a vulputate arcu aliquam. Phasellus sapien tellus, pellentesque porttitor sem. ',
  },
];
const User = (props: Props) => {
  useDocumentTitle('PII TA | User');

  return (
    <div>
        <Header style={{ padding: '0 2rem', background: '#ffffff' ,borderBottom: '1px solid #D3D3D3'}}>
        <h2>User</h2>
        </Header>
        <div className='home-page' style={{padding:'2rem'}}>
          {/* h2 bukan bug itu buat simbol */}
            <h2 style={{ marginBottom: '1rem' }}>Profil Data Pribadi</h2>
            <div style={{}}>
            <Descriptions bordered items={items} column={1} labelStyle={{width:'140px'}} size='middle' />
            </div>
        </div>
    </div>
  )
}

export default User