import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.scss';
import Router from './router';
import { api } from './constant/apiConstant';


function App() {

  return (
    <>
     <GoogleOAuthProvider clientId={api.googlecliendId as string}>
    <Router />
    </GoogleOAuthProvider>
  
    </>
  );
}

export default App;
