/** @jsxImportSource @emotion/react */
import { Button, Form, Input } from 'antd'
import background from '../images/bg-ta-login.jpg';
import logoHome from '../images/logo-pii-login.png';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values:any) => {
        console.log('Received values of form: ', values);
        navigate("../",{replace: true})
      };
    
return (
    <HelmetProvider>
    <div className='container-page' 
    style={{ 
        backgroundImage: `url(${background})` ,
        backgroundSize: 'cover',
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center',
        position:'relative'}}
    >
        
        {/* might not using helmet use useEffect document.title instead */}
         <Helmet>
                <title>PII TA | Login</title>
            </Helmet>
        <div className='auth-container'>
        <img className="logo-login" src={logoHome} alt="PII Logo"
        css={{
            width: '100%'
            }} />

        <div className='login-desc' 
        css={{
            background: 'rgba(255, 255, 255, 0.7)',
            padding: '10px',
            marginTop: '2rem',
            fontSize: "13px",
            fontWeight: 400,
            lineHeight: 2,
            color: "#212529",
            textAlign: 'center'
        }}>
            <h4 css={{
                marginBottom: '.5rem',
                fontWeight: '500',
                lineHeight: '1',
                fontSize: '1.2rem'}}>Sign In</h4>
            <h4 css={{
                fontWeight: '300',
                lineHeight:'2',
                fontSize: '0.85rem'
            }}>Silakan isi (Nomor KTA atau Email) & Password untuk masuk</h4>
        </div>
        
        <Form
            form={form}
            name="basic"
            initialValues={{
            remember: true,
            }}
          onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout='vertical'
            requiredMark={false}
        >
          
            <Form.Item
            className='auth-item'
            name="email"
            >
            <Input bordered={false} className='input-login' placeholder="No. KTA atau Email Anda" />
            </Form.Item>

            <Form.Item
            className='auth-item'
            name="password"
            >

            <Input.Password bordered={false} className='input-login' placeholder="Password" />
            
            </Form.Item>

            <Form.Item>
                <Button className="button-login" type='primary' htmlType="submit" onClick={onFinish} >
                    Sign In
                </Button>
            </Form.Item>
        </Form>
            <div className='bottom-auth'>
                <p>Belum memiliki akun ? - <a>Silakan Daftar Disini</a></p>
            </div>
        </div>
    </div>
    </HelmetProvider>
    )
}

export default Login
