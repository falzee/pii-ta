import { Button, Checkbox, ConfigProvider, Modal, Select, Space, Tabs, TabsProps, Tag, theme } from 'antd';
import { Header } from 'antd/es/layout/layout'
import Table, { ColumnsType } from 'antd/es/table';
import { title } from 'process';
import React, { useEffect, useState } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, InfoCircleOutlined, UndoOutlined, UploadOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { dataWdua } from '../data/SectionFormDataW'
import { allData } from '../data/sectionFormDataAll';
import { allSectionData } from '../data/sectionFormDataSectionAll';
import UnderConstruct from './underConstruct';
import FilterKodeEtik from '../components/Admin/FilterKodeEtik'
import FilterProfesionalisme from '../components/Admin/FilterProfesionalisme';
import FilterKtiga from '../components/Admin/FilterKtiga';
import FilterSeminar from '../components/Admin/FilterSeminar';
import FilterManajemenPraktek from '../components/Admin/FilterManajemenPraktek';
import FilterPraktekInsinyur from '../components/Admin/FilterPraktekInsinyur';
import FilterPenulisanProposal from '../components/Admin/FilterPenulisanProposal';


const { TabPane } = Tabs;

const FaipAdminAddFilter = ( ) => {
const [infoDsnPenilaiFaip, setInfoDsnPenilaiFaip] = useState(''); // State to store the user's role
const [activeTab, setActiveTab] = useState('1'); // Set the default active tab
const navigate = useNavigate();
const location = useLocation();


//   useEffect(() => {
//     // Retrieve JWT token from localStorage
//     fetchUserData();
//   }, [status]);

//   const fetchUserData = async () => {
//     try {
//       const token = localStorage.getItem('jwtToken');

//       if (token) {
//         // Decode the token to extract user ID
//         const decodedToken: any = jwtDecode(token);
//         const userId = decodedToken.nomerInduk;
//         setNama(decodedToken.nama);
//         setNim(decodedToken.nomerInduk);
//         // console.log("nim mauk:" + nim)
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         };
//         // Make API request with user ID
//         const response = await axios.get(`/form-penilaian/mhs?uid=${userId}&ft=info`,config);
//         // const response = await axios.get(`/form-penilaian/mhs`,config);
//         // console.log("response:"+response)
//         // if response no 

//         const userData = response.data;
        
//         setPid(userData.data.pid)
//         setLastUpdate(userData.data.last_updated.slice(0, 10))
//         setLastEdit(userData.data.last_change)
//         if (userData.data.status === "111-0"){
//           setStatus('edit')
//         } else if (userData.data.status === "111-1"){
//           setStatus("retry")
//         } else if (userData.data.status === "111-2" || userData.data.status === "111-3"){
//           setStatus("submit")
//         } 
//         // console.log("userdata:"+ userData.data.pid)
//         // setUserData(userData);
//         // Update the items with fetched data

//       } else {
//         console.error('User not found');
//       }
//     } catch (error) {
//       console.error('Error getting user data');
//       setLastUpdate('')
//       setLastEdit('')
//       setStatus('new')
//     }
//   };


const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
    localStorage.setItem('activeTab', tabKey);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Kode Etik',
        children: <FilterKodeEtik />
    },
    {
        key: '2',
        label: 'Profesionalisme',
        children: <FilterProfesionalisme />,
    },
    {
        key: '3',
        label: 'K3',
        children: <FilterKtiga />,
    },
    {
        key: '4',
        label: 'Seminar & Workshop',
        children: <FilterSeminar />,
    },
    {
        key: '5',
        label: ' Manajemen Praktik Keinsinyuran',
        children: <FilterManajemenPraktek />,
    },
    {
        key: '6',
        label: 'Praktik Keinsinyuran',
        children: <FilterPraktekInsinyur />,
    },
    {
      key: '7',
      label: 'Penulisan Proposal SK',
      children: <FilterPenulisanProposal />,
    },
];

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
useDocumentTitle('PII TA | FAIP');

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
        Checkbox: {
            colorPrimary: '#6b7aa1',
            colorPrimaryHover: '#7e90be',
        },
        },
    }}
    >       
    <div style={{ maxHeight: '1500px' }}>
        <div className='form' style={{ padding: '1rem', }}>
            {/* header tambahin underline sama shadow(opsional) */}
            <h2 style={{ padding: '0 0 1rem', textAlign: 'left', width: '100%', borderBottom: '2px solid #D3D3D3' }}>Penambahan Filter Konversi FAIP</h2>
            <div style={{ margin:'1rem 0 0',padding:'1rem', borderRadius:'5px',backgroundColor:'#CCFFCC'}}>
                
                <h4><InfoCircleOutlined /> Informasi : </h4> 
                <p>- <span style={{fontWeight:'bold'}}>PENTING :</span> Pengisian filter harap diisi sebelum proses penilaian diterapkan ke seluruh mahasiswa.</p>
                <p>- Harap memilih filter untuk setiap CPMK dengan mengklik checkbox yang tersedia.</p>
                <p>- Harap mengisi filter CPMK pada keseluruhan pilihan MK.</p>
                <p>- Apabila sudah selesai jangan lupa untuk klik <span style={{fontWeight:'bold'}}>SAVE</span> di setiap pilihan MK.</p>
                
            </div>
            <div className = 'formPage' style={{padding: '0',overflow: 'hidden'}}>
                <Tabs activeKey={activeTab} onChange={handleTabChange} items={items} />
            </div> 

        

        </div>
    </div>
    </ConfigProvider> 
    )
}
export default FaipAdminAddFilter
{/* <>
<h2>Masa pengiriman formulir sudah berakhir!</h2>
<h3>Hubungi admin untuk perubahan</h3>
</> */}
