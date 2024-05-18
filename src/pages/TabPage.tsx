import React, { useEffect, useState } from 'react';
import { ConfigProvider, Tabs, TabsProps } from 'antd';
import ThirdTabForm from '../components/FormThree';
import FourthTabForm from '../components/FormFour';
import FifthTabForm from '../components/FormFive';
import SixthTabForm from '../components/FormSix';
import SeventhTabFrom from '../components/FormTwoOne';
// FirstTabForm FirstTabForm ThirdTabForm FourthTabForm
import { Header } from 'antd/es/layout/layout';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { useLocation } from 'react-router-dom';

const { TabPane } = Tabs;

const MultiTabFormPage: React.FC = () => {
  useDocumentTitle('PII TA | Formulir');
  const navigate = useNavigate();
  const location = useLocation();
  const { formId } = useParams<{ formId: string | undefined }>();
  const [activeTab, setActiveTab] = useState('third'); // Set the default active tab
  const [redirecting, setRedirecting] = useState(true); // New state for redirection
  // console.log("0 FORM ID:"+ formId)


  useEffect(() => {
    fetchUserData(formId);
  }, [formId]);

  useEffect(() => {
    // Load the saved tab from local storage or default to 'first'
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('activeTab', activeTab);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [activeTab]);

  useEffect(() => {
    const clearActiveTabOnNavigation = () => {
      localStorage.removeItem('activeTab');
    };

    return () => {
      clearActiveTabOnNavigation();
    };
  }, [location]);

  const fetchUserData = async (formId: string | undefined) => {
    try {
      const token = localStorage.getItem('jwtToken');

      if (token) {
        // Decode the token to extract user ID
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.nomerInduk;
        // console.log("1 uid:"+ userId)

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        // Make API request with user ID
        const response = await axios.get(`http://localhost:8000/form-penilaian/mhs?uid=${userId}&ft=info`,config);
        // console.log("2 response:"+ response)

        // if response no 

        const userData = response.data;
        // console.log("3 uid:"+ userData.data.student_id)
        // console.log("4 pid:"+ userData.data.pid)

        if (formId !== userData.data.pid) {
          // setRedirecting(true); 
          navigate("/unauthorized", { replace: true });
          return
        } else if (userId !== userData.data.student_id){
          // setRedirecting(true); 
          navigate("/unauthorized", { replace: true });        
        } else{
          setRedirecting(false); 
        }
        
        // setUserData(userData);
        // Update the items with fetched data

      } else {
        console.error('User not found');
      }
    } catch (error) {
      console.error('Error fetching user data'); 
  // navigate("/unauthorized", { replace: true });
    }
  };


  // useEffect(() => {
  //   function beforeUnload(e: BeforeUnloadEvent) {
  //     e.preventDefault();
  //   }

  //   window.addEventListener('beforeunload', beforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', beforeUnload);
  //   };
  // }, []);

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
    localStorage.setItem('activeTab', tabKey);
  };

  const items: TabsProps['items'] = [
    {
      key: 'third',
      label: 'I.3',
      children: <ThirdTabForm />,
    },
    {
      key: 'fourth',
      label: 'I.4',
      children: <FourthTabForm />,
    },
    {
      key: 'fifth',
      label: 'I.5',
      children: <FifthTabForm />,
    },
    {
      key: 'sixth',
      label: 'I.6',
      children: <SixthTabForm />,
    },
    {
      key: 'seventh',
      label: 'II.1',
      children: <SeventhTabFrom />,
    },
  ];
  // css margin  
  // w,x,y,z =>top,right,bottom left
  // x,y,z =>top,(l+r),bottom
  // y,z =>(t+b),(l+r)
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            itemHoverColor: '#7e90be',
            itemColor:'#6b7aa1',
            itemSelectedColor:'#6b7aa1',
            inkBarColor:'#6b7aa1',
            cardBg:'#6b7aa1',
          },

        },
      }}
    >
    <div className="faip-mhs-container" style={{ maxHeight: '1200px'}}>
      {redirecting ? <div>Redirecting...</div> :
      <>
      <div className='header-faip' style={{margin:'1rem 1rem 0',padding:'0 1rem 0'}}>
        <h2 style={{ padding: '0 0 1rem', textAlign: 'left', width: '100%', borderBottom: '2px solid #D3D3D3' }}>Pengisian FAIP</h2>
      </div>

      <div className = 'formPage' style={{padding: '0 2rem',overflow: 'hidden'}}>
        <Tabs activeKey={activeTab} onChange={handleTabChange} items={items} />
          {/* <TabPane tab="I.3" key="third">
            <ThirdTabForm />
          </TabPane>
          <TabPane tab="I.4" key="fourth">
            <FourthTabForm />
          </TabPane>
          <TabPane tab="I.5" key="fifth">
            <FifthTabForm />
          </TabPane>
          <TabPane tab="I.6" key="sixth">
            <SixthTabForm />
          </TabPane>
          <TabPane tab="II.1" key="seventh">
            <SeventhTabForm />
          </TabPane> */}
          </div> 
        </>}
      
          {/* Add more TabPane for additional tabs */}
      
    </div>
    </ConfigProvider>
  );
};

export default MultiTabFormPage;