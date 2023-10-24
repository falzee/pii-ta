import { Button, Form, Input,message } from 'antd'
import background from '../images/bg-ta-login.jpg';
import logoHome from '../images/logo-pii-login.png';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useAppSelector,useAppDispatch } from '../hooks/reduxHooks';
import { postLogIn } from '../app/authSlice';
import { AppDispatch } from '../app/Store';

const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useAppDispatch();
    const {isLogin,error,loading} = useAppSelector((state)=> state.auth)
    const auth = useAppSelector((state)=> state.auth)
    // const [serverConnection,setServerConnection] = useState(true);

    // const validateExampleField = (rule: any, value: string, callback: Function) => {
    //   if (value && value.length < 5) {
    //     message.error('Example Field must be at least 5 characters long',1);
    //   } else {
    //     callback();
    //   }
    // };

    const validateEmail = (rule: any, value: string, callback: Function) => {
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i; // Your custom email regex
  
      if (!regex.test(value)) {
        callback('Please enter a valid email address');
      } else {
        callback();
      }
    };

    const successMessage = () => {
      message.success('Successfully Logged in');
    };
    const errorMessage = () => {
      message.error('Please Enter Correct Email Address and Password');
    };

    // const serverLost = () => {
    //   message.error('Failed connected to server...');
    // };
    
    const loadMessage = () => {
      const hide = message.loading('Please Wait..', 0);
      // Dismiss manually and asynchronously
      setTimeout(hide, 200);
    };
    
    useEffect(() => {
      form.setFieldsValue(auth)
    }, [form, auth])

    const onFinish = (values:any) => {
      form.validateFields()
			.then((values:any) => {
			  dispatch(postLogIn(values));  
			})
			.catch((error) => {
        console.error('Error fetching data :', error); 
      });

    };

    const onFinishFailed = (errorInfo : any) => {
      console.log('Failed:', errorInfo);
    };

    useEffect(() => {
      if (error === true) {
        errorMessage();
        navigate('/login' , { replace: true }); 
      }else if(loading){
        loadMessage();
      }else if(isLogin){
        successMessage();
        navigate('/' , { replace: true }); 
      }
    }, [error,loading]);
    // console.log(isLogin) 
  
    useDocumentTitle('PII TA')

return (
    <div className='container-page' 
    style={{ 
        backgroundImage: `url(${background})` ,
        backgroundSize: 'cover',
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center',
        position:'relative'}}
    >
        
        <div className='auth-container'>
        <img className="logo-login" src={logoHome} alt="PII Logo"
        style={{
            width: '100%'
            }} />

        <div className='login-desc' 
        style={{
            background: 'rgba(255, 255, 255, 0.7)',
            padding: '10px',
            marginTop: '2rem',
            fontSize: "13px",
            fontWeight: 400,
            lineHeight: 2,
            color: "#212529",
            textAlign: 'center'
        }}>
            <h4 style={{
                marginBottom: '.5rem',
                fontWeight: '500',
                lineHeight: '1',
                fontSize: '1.2rem'}}>Sign In</h4>
            <h4 style={{
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
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout='vertical'
            requiredMark={false}
        >
          
            <Form.Item
            className='auth-item'
            name="email"
            rules={[
              {
                required: true,
                message: '',
              },
              {
                validator: validateEmail, // Custom validation rule
              },
            ]}
            >
            <Input bordered={false} className='input-login' placeholder="No. KTA atau Email Anda" />
            </Form.Item>

            <Form.Item
            className='auth-item'
            name="password"
            rules={[
              {
                required: true,
              },
              // {
              //   validator: validateExampleField, // Custom validation rule
              // },
            ]}
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
    )
}

export default Login
