import React, { useEffect, useState } from 'react';
import { ConfigProvider, Tabs, TabsProps } from 'antd';
import FirstTabForm from '../components/FormOne';
import SecondTabForm from '../components/FormTwo';
import ThirdTabForm from '../components/FormThree';
import FourthTabForm from '../components/FormFour';
import FifthTabForm from '../components/FormFive';
import SixthTabForm from '../components/FormSix';
import SeventhTabFrom from '../components/FormTwoOne';
import EighthTabFrom from '../components/FormTwoTwo';
import ThreeOneTabPage from '../components/FormThreeOne';
import FourOneTabPage from '../components/FormFourOne';
import FiveOneTabPage from '../components/FormFiveOne';
import FiveTwoTabPage from '../components/FormFiveTwo';
import FiveThreeTabPage from '../components/FormFiveThree';
import FiveFourTabPage from '../components/FormFiveFour';
import SixthOneTabFrom from '../components/FormSixOne';
import SevenOneTabFrom from '../components/FormSevenOne';

import useDocumentTitle from '../hooks/useDocumentTitle';
import UnderConstruct from './underConstruct';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import FormMhsSubmit from '../components/FormMhsSubmit';

const { TabPane } = Tabs;

// IF LAST CHANGE = SUBMITTED TOMBOL AKSI MATI DI FAIP MHS, DISINI BAKAL DIARAHIN KE 404
const MultiTabFormPage: React.FC = () => {
  useDocumentTitle('PII TA | Formulir');
  const navigate = useNavigate();
  const location = useLocation();
  const { formId } = useParams<{ formId: string | undefined }>();
  const [activeTab, setActiveTab] = useState('1'); // Set the default active tab
  const [redirecting, setRedirecting] = useState(true); // New state for redirection
  // console.log("0 FORM ID:"+ formId)

//add for submission  
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
        const response = await axios.get(`http://192.168.195.241:8000/form-penilaian/mhs?uid=${userId}&ft=info`,config);
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

        if (!userData.data.status) {
          // setRedirecting(true); 
          navigate("/unauthorized", { replace: true });
          return
        } else if (userData.data.status === "111-2"){
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
      key: '1',
      label: 'I.1',
      children: <FirstTabForm />,
    },
    {
      key: '2',
      label: 'I.2',
      children: <SecondTabForm />,
    },
    {
      key: '3',
      label: 'I.3',
      children: <ThirdTabForm />,
    },
    {
      key: '4',
      label: 'I.4',
      children: <FourthTabForm />,
    },
    {
      key: '5',
      label: 'I.5',
      children: <FifthTabForm />,
    },
    {
      key: '6',
      label: 'I.6',
      children: <SixthTabForm />,
    },
    {
      key: '7',
      label: 'II.1',
      children: <SeventhTabFrom />,
    },
    {
      key: '8',
      label: 'II.2',
      children: <EighthTabFrom />,
    },
        {
      key: '9',
      label: 'III',
      children: <ThreeOneTabPage />,
    },
    {
      key: '10',
      label: 'IV',
      children: <FourOneTabPage />,
    },
    {
      key: '11',
      label: 'V.1',
      children: <FiveOneTabPage />,
    },
        {
      key: '12',
      label: 'V.2',
      children: <FiveTwoTabPage />,
    },
        {
      key: '13',
      label: 'V.3',
      children: <FiveThreeTabPage />,
    },
        {
      key: '14',
      label: 'V.4',
      children: <FiveFourTabPage />,
    },
    {
      key: '15',
      label: 'VI',
      children: <SixthOneTabFrom />,
    },
      // {
      //   key: '16',
      //   label: 'VII',
      //   children: <SevenOneTabFrom />,
      // },
      {
        key: '17',
        label: 'Submit',
        children: <FormMhsSubmit />,
      },
    //     {
    //   key: '17',
    //   label: 'Lampiran 1',
    //   children: <UnderConstruct />,
    // },
    //     {
    //   key: '18',
    //   label: 'Lampiran 2',
    //   children: <UnderConstruct />,
    // },
    //     {
    //   key: '19',
    //   label: 'Rekap',
    //   children: <UnderConstruct />,
    // },
    
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
      {redirecting ? null :
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