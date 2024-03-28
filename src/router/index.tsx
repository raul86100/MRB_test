import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../pages/loginPage";

import Adminlayout from "../layout/adminLayout";
import Adminhome from "../pages/adminPage/home";
import Adminschedule from "../pages/adminPage/schedules";
import Adminactivity from "../pages/adminPage/activity";
import Feedback from "../pages/adminPage/feedback";
import Request from "../pages/adminPage/request";
import Roomdetails from '../pages/adminPage/room';
import Userlayout from "../layout/userLayout";
import Userhome from "../pages/userPage/home";
import Bookingpage from "../pages/userPage/bookform";
import Booking from "../pages/userPage/booking";
import Userschedule from "../pages/userPage/schedules";
import Useractivity from "../pages/userPage/activities";
import Errorlogin from "../pages/errorPage/index";
import { useSelector } from "react-redux";
import { Userslice } from "../type";

function Router() {
   const userdata = useSelector((state: any) => state.userReducer as Userslice);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          {userdata.isLogin ? (  
             <> 
              {userdata.data.admin ?   
              <Route path="admin" element={<Adminlayout />}>
                <Route index element={<Adminhome />} />

                <Route path="roomdetails" element={<Roomdetails />} />
                <Route path="schedules" element={<Adminschedule />} />
                <Route path="activity" element={<Adminactivity />} />
                <Route path="request" element={<Request />} />
                <Route path="feedback" element={<Feedback />} />
              </Route>
            :  <>                
              <Route path="user" element={<Userlayout />}>
                <Route index element={<Userhome />} />
                <Route path="booking" element={<Booking />} />
                <Route path="schedule" element={<Userschedule />} />
                <Route path="activity" element={<Useractivity />} />
              </Route>
              <Route path="bookform" element={<Bookingpage />} />
            </>
            }  
             </>  
          ) : ( 
             <Route path="*" element={<Errorlogin />} /> 
           )  
         }   
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
