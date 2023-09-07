/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Popover } from 'antd';
import logoPii from '../images/logo-pii.png';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
const { Header, Sider, Content } = Layout;


const content = (
  <div>
    <Link to='./login'><Button>Logout</Button></Link>
  </div>
);

const Layouting: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  let location = useLocation();

  const [current, setCurrent] = useState(location.pathname);
    //or simply use const [current, setCurrent] = useState(location.pathname)        

  useEffect(() => {
    if (location) {
      if( current !== location.pathname ) {
        setCurrent(location.pathname);
        }
    }
    }, [location, current]);
    
  //klo butuh manual
  // function handleClick(e: any) {
  //     setCurrent(e.key);
  // }

  const toHome = () => {
    navigate("./")
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // css margin  
  // w,x,y,z =>top,right,bottom left
  // x,y,z =>top,(l+r),bottom
  // y,z =>(t+b),(l+r)
  return (
    <Layout style={{minHeight: '100vh'}} >
      <Header style={{ padding: 0, backgroundColor:'#201f2b',display:'flex',position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          alignItems: 'center' }}>
          <div className="logo-sider"  css={{ height:'64px',backgroundColor:'colorBgContainer',display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',cursor: 'pointer'}} onClick={toHome}>        
            <img src={logoPii} alt="logo pii" css={css` margin:10px` } />
          </div>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}

            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: 'white'
            }}
          />
          <Popover placement="bottomRight" content={content} trigger="click">
            <UserOutlined css={{marginLeft:'auto',marginRight:'20px',color:'white',fontSize:'130%',cursor: 'pointer'}} />
          </Popover>
        </Header>
      
      <Layout hasSider>
      <Sider trigger={null}  collapsible collapsed={collapsed} collapsedWidth={0} 
      style={{ 
          backgroundColor:'#201f2b',
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: '64px',
          bottom: 0,
          zIndex : 9999,
      }} 
      width={176} >
        
        
        <Menu
          theme="dark"
          style={{ backgroundColor:'#201f2b'}}
          mode="inline"
          selectedKeys={[current]}
          // onClick={handleMenuClick}
          items={[
            {
              key: '/',
              icon: <HomeOutlined />,
              label: (<Link to='./'>Beranda</Link>),
            },
            {
              key: '/user',
              icon: <UserOutlined />,
              label: (<Link to='./user'>User</Link>), 
            },
            {
              key: '/faip',
              icon: <UnorderedListOutlined />,
              label: (<Link to='./faip'>FAIP</Link>),
              
            },
            {
              key: '/login',
              icon: <LogoutOutlined />,
              label: (<Link to='./login'>Logout</Link>),
            },
          ]}
        />
      </Sider>
      
      <Layout >
        {collapsed 
        ? (<Content
          style={{
            minHeight: 280,
            background: colorBgContainer,
            overflow: 'initial',
          }}
        >
             <Outlet />
        </Content>)
         : <Content
          style={{
            minHeight: 280,
            background: colorBgContainer,
            overflow: 'initial',
            margin: '0 0 0 176px'
          }}
        >
          
             <Outlet />
        </Content>
        }
      
        </Layout>
      </Layout>

    </Layout>
  );
};

export default Layouting;
