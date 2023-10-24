import { Button, theme } from 'antd'
import { Header } from 'antd/es/layout/layout'
import React from 'react'
import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'

type Props = {}

const User = (props: Props) => {
  useDocumentTitle('PII TA | User');

  return (
    <div>
        <Header style={{ padding: '0 2rem', background: '#ffffff' ,borderBottom: '1px solid #D3D3D3'}}>
        <h2>User</h2>
        </Header>
        
    </div>
  )
}

export default User