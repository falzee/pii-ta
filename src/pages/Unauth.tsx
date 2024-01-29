import { StopOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import oops from "../images/404pii.webp"

const unauthorized = () => {
  return (
    <div 
        className='about-container' style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          flexDirection: 'column',
          background:'#d7d1c9',
    }}
    >
      <img src={oops} style={{width:'500px'}} alt="oops" />
      <Typography.Title  level={2}  style={{ padding:'1rem',margin:'0' }}>
        403 FORBIDDEN 
      </Typography.Title> 
    
    </div>
  )
}

export default unauthorized