import React, { useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import FirstTabForm from '../components/FormThree';
import SecondTabForm from '../components/FormFour';
import ThirdTabForm from '../components/FormFive';
import FourthTabForm from '../components/FormSix';
import { Header } from 'antd/es/layout/layout';
import useDocumentTitle from '../hooks/useDocumentTitle';

const { TabPane } = Tabs;

const MultiTabFormPage: React.FC = () => {
  useDocumentTitle('PII TA | Formulir');
  
  const [activeTab, setActiveTab] = useState('first'); // Set the default active tab

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
  };
  const items: TabsProps['items'] = [
    {
      key: 'first',
      label: 'I.3',
      children: <FirstTabForm />,
    },
    {
      key: 'second',
      label: 'I.4',
      children: <SecondTabForm />,
    },
    {
      key: 'third',
      label: 'I.5',
      children: <ThirdTabForm />,
    },
    {
      key: 'fourth',
      label: 'I.6',
      children: <FourthTabForm />,
    },
  ];

  return (
    <div style={{ maxHeight: '900px'}}>
      <Header style={{ padding: '0 2rem', paddingBottom: '8px',borderBottom: '1px solid #D3D3D3',backgroundColor:'white' }}>
        <h2>FAIP</h2>
        </Header>
      <div className = 'formPage' style={{padding: '0 2rem', maxHeight: '900px' ,overflow: 'auto'}}>
        <Tabs activeKey={activeTab} onChange={handleTabChange} items={items} />
          <TabPane tab="I.3" key="first">
            <h1 className='headerform' style={{marginBottom:'0'}}>I.3 Organisasi Profesi & Organisasi Lainnya Yang Dimasuki <span style={{color:'blue'}}>(W1)</span></h1>
            <FirstTabForm />
          </TabPane>
          <TabPane tab="I.4" key="second">
            <h1 style={{marginBottom:'10px'}}>I.4 <span style={{color:'blue'}}>(W1)</span></h1>
            <SecondTabForm />
          </TabPane>
          <TabPane tab="I.5" key="third">
            <h1 style={{marginBottom:'10px'}}>I.5 <span style={{color:'blue'}}>(W1,W4,P10)</span></h1>
            <ThirdTabForm />
          </TabPane>
          <TabPane tab="I.6" key="fourth">
            <h1 style={{marginBottom:'10px'}}>I.6 <span style={{color:'blue'}}>(W1,W4,P10)</span></h1>
            <FourthTabForm />
          </TabPane>
          {/* Add more TabPane for additional tabs */}
      </div>
    </div>
    
  );
};

export default MultiTabFormPage;