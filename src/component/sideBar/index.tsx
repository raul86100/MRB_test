import React, { useState } from "react";
import "./index.scss";
import { adminData, userData } from "../../constant/sidebarConstant";
import picture from "../../assets/Images/Divum LOGO 2022.svg";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import apifunction from "../../utils/apiCall";
import { api } from "../../constant/apiConstant";
import { useSelector } from 'react-redux';
import { Userslice } from '../../type';

type Props = {
  Admin: Boolean;
};

const Sidebar = (props: Props) => {
  const { Admin } = props;
  const [open, setOpen] = useState(false);
  const userdata = useSelector((state: any) => state.userReducer as Userslice);

  const navigate = useNavigate();

  const pathSelector = () => {
    let loc = window.location.pathname.split("/")[2];
    
    return loc ? loc : "";
  };

  const handleSidebarClick = async (link: any) => {
    if (link !== pathSelector()) {
      if (link === "/") {
        setOpen(true);
      } else {
        navigate(link);
      }
    }
  };

  const handleOk = async () => {
    await apifunction({
      url: api.baseurl + api.logouturl,
      method: "get",
      auth: true,
    });
    // await dispatch(cleanData());
    setOpen(false);

    navigate("/");
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="sideBar">
      <Modal
        open={open}
        title="Are you sure to logout"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      ></Modal>
      <img src={picture} alt="logo" onClick={()=>{userdata.data.admin===true?navigate('/admin'):navigate('/user')}} className="logo-img"/>
      <ul className="sideBarList">
        {Admin
          ? adminData.map((val) => {
              return (
                <div
                  className="Row"
                  key={val.key}
                  onClick={() => handleSidebarClick(val.link)}
                  style={{
                    backgroundColor:
                      val.link === window.location.pathname ? "#5473e350" : "",
                  }}
                >
                  <div
                    id="icon"
                    style={{
                      transform: 0.6 ? "scale(1.25)" : "scale(1)",
                    }}
                  >
                    {val.icon}
                  </div>
                  <div
                    id="title"
                    style={{
                      color:
                        val.link === window.location.pathname ? "black" : "",
                    }}
                  >
                    {val.title}
                  </div>
                </div>
              );
            })
          : userData.map((val, key) => {
              return (
                <li
                  className="Row"
                  key={key}
                  onClick={() => {
                    handleSidebarClick(val.link);
                  }}
                  style={{
                    backgroundColor:
                      val.link === window.location.pathname ? "#5473e350" : "",
                  }}
                >
                  <div
                    id="icon"
                    style={{
                      transform: 0.6 ? "scale(1.25)" : "scale(1)",
                    }}
                  >
                    {val.icon}
                  </div>
                  <div
                    id="title"
                    style={{
                      color:
                        val.link === window.location.pathname ? "black" : "",
                    }}
                  >
                    {val.title}
                  </div>
                </li>
              );
            })}
      </ul>
    </div>
  );
};

export default Sidebar;
