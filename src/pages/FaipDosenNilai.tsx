import React, { useEffect, useState } from 'react';
import { ConfigProvider, Tabs, TabsProps } from 'antd';
import useDocumentTitle from '../hooks/useDocumentTitle';
import UnderConstruct from './underConstruct';
import { jwtDecode } from 'jwt-decode';
import FormNilaiKodeEtik from '../components/Dosen/FormNilaiKodeEtik'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { useLocation } from 'react-router-dom';

const { TabPane } = Tabs;

// IF LAST CHANGE = SUBMITTED TOMBOL AKSI MATI DI FAIP MHS, DISINI BAKAL DIARAHIN KE 404
const MultiTabFormPage: React.FC = () => {
  useDocumentTitle('PII TA | Formulir');
  const navigate = useNavigate();
  const location = useLocation();
  const { formIdD } = useParams<{ formIdD: string | undefined }>();
  const [activeTab, setActiveTab] = useState('1'); // Set the default active tab
  const [penilai,setPenilai] = useState('')
  const [namaMhs,setNamaMhs] = useState('')

  // const [redirecting, setRedirecting] = useState(true); // New state for redirection
  // console.log("0 FORM ID:"+ formId)


  // useEffect(() => {
  //   fetchUserData(formId);
  // }, [formId]);

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
  // http://localhost:8000/form-penilaian/dsn/student-info?pid=123456789&uid=1998200345678
  useEffect(() => {
    // Fetch user data when component mounts
    fetchFaipData();
  }, []);

    //API = const response = await axios.get(`http://localhost:8000/form-penilaian/dsn?uid=${userId},config);
    const fetchFaipData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
    
        if (token) {
          // Decode the token to extract user ID
          const decodedToken: any = jwtDecode(token);
          const userId = decodedToken.nomerInduk;

          setPenilai(decodedToken.nama)
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          // Make API request with user ID
          const response = await axios.get(`http://localhost:8000/form-penilaian/dsn/student-info?uid=${userId}&pid=${formIdD}`,config);
          const userData = response.data.data;
          setNamaMhs(userData.info_mhs.nama_mhs);
          
          // console.log("FETCH SUCCESS?")
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching data'); 
      }
    };


  useEffect(() => {
    function beforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
    }

    window.addEventListener('beforeunload', beforeUnload);

    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, []);

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
    localStorage.setItem('activeTab', tabKey);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Kode Etik',
      children: <FormNilaiKodeEtik />,
    },
    {
      key: '2',
      label: 'Profesionalisme',
      children: <UnderConstruct />,
    },
    {
      key: '3',
      label: 'K3',
      children: <UnderConstruct />,
    },
    {
      key: '4',
      label: 'Seminar & Workshop',
      children: <UnderConstruct />,
    },
    {
      key: '5',
      label: 'Studi Kasus',
      children: <UnderConstruct />,
    },
    {
      key: '6',
      label: 'Praktik Keinsinyuran',
      children: <UnderConstruct />,
    },
    {
      key: '7',
      label: 'Submit?',
      children: <UnderConstruct />,
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
      {/* {redirecting ? <div>Redirecting...</div> :
      <> */}

      <div className='header-faip' style={{margin:'1rem 1rem 0',padding:'0 1rem 0'}}>
        <h2 style={{ padding: '0 0 1rem', textAlign: 'left', width: '100%', borderBottom: '2px solid #D3D3D3' }}>Penilaian FAIP</h2>
        <div className='top-content' style={{backgroundColor:'#c2d0c1',padding:'1rem'}}>
          <h3>Informasi Penilaian</h3>
          <p>Dosen penilai : {penilai}</p>
          <p>Mahasiswa yang dinilai : {namaMhs}</p>
        </div>
      </div>

      <div className = 'formPage' style={{padding: '0 2rem',overflow: 'hidden'}}>
        <Tabs activeKey={activeTab} onChange={handleTabChange} items={items} />
          </div> 
        {/* </>
        } */}
      
          {/* Add more TabPane for additional tabs */}
      
    </div>
    </ConfigProvider>
  );
};

export default MultiTabFormPage;