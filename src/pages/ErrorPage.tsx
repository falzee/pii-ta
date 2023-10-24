import { StopOutlined } from '@ant-design/icons'
import { Typography } from 'antd'

const ErrorPage = () => {
  return (
    <div 
        className='about-container' style={{ 
        display:'flex',
        flexDirection:'column',
        padding:'0',
        width:'100vw',
        height:'100%',
        marginTop:'25%',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        top: '50%',
        left: '50%'
    }}
    >
      <Typography.Title level={1} style={{ padding:'0',margin:'0' }}>
        <StopOutlined style={{ color: 'red',marginRight:'10px' }} />
          404    
      </Typography.Title> 
      <Typography.Text  style={{ padding:'0',margin:'0' }}>
        Not Found   
      </Typography.Text> 
    
    </div>
  )
}

export default ErrorPage