import React, { useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import FirstTabForm from '../components/FormOne';
import SecondTabForm from '../components/FormTwo';
import ThirdTabForm from '../components/FormThree';
import { Header } from 'antd/es/layout/layout';
import useDocumentTitle from '../hooks/useDocumentTitle';

const { TabPane } = Tabs;

const MultiTabFormPage: React.FC = () => {
  useDocumentTitle('PII TA | Formulir');
  const [activeTab, setActiveTab] = useState('third'); // Set the default active tab

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
      children: 'Content of Tab Pane 2',
    },
    {
      key: 'third',
      label: 'I.5',
      children: <ThirdTabForm />,
    },
  ];

  return (
    <div style={{ maxHeight: '900px'}}>
      <Header style={{ padding: '0 2rem', paddingBottom: '8px',borderBottom: '1px solid #D3D3D3',backgroundColor:'white' }}>
        <h2>FAIP</h2>
        </Header>
      <div className = 'formPage' style={{padding: '0 2rem', maxHeight: '900px' ,overflow: 'auto'}}>
        <Tabs activeKey={activeTab} onChange={handleTabChange} items={items} />
          {/* <TabPane tab="I.3" key="first">
              <FirstTabForm />
          </TabPane>
          <TabPane tab="I.4" key="second">

          </TabPane>
          <TabPane tab="I.5" key="third">
            <h1 style={{marginBottom:'10px'}}>I.3 Organisasi Profesi & Organisasi Lainnya Yang Dimasuki <span style={{color:'blue'}}>(W1)</span></h1>
            <ThirdTabForm />
          </TabPane> */}
          {/* Add more TabPane for additional tabs */}
      </div>
    </div>
    
  );
};

export default MultiTabFormPage;