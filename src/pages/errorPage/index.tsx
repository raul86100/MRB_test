import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
import './index.scss'

const Loginerror= () => {
    const navigate=useNavigate();
  return (
  <div className='error-Page'>
     <Result
    status="403"
    title="Don't have access"
    subTitle="Sorry, your session has been expired to access this page."
    extra={<Button type="primary" onClick={()=>navigate('/')}>Back Login</Button>}
  />
    </div>
  )
}
export default Loginerror;