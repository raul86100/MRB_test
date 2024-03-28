// Layout.js
import { Outlet } from "react-router-dom";
import Sidebar from "../../component/sideBar";
import "./index.scss";
import { Drawer, Popover } from "antd";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { imageConst } from "../../constant/imageConstant";
import { useSelector } from "react-redux";
import { Userslice } from "../../type";
import { FaUserCircle } from "react-icons/fa";

function Layout() {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const userdata = useSelector((state: any) => state.userReducer as Userslice);

  const content = (
    <div className="userModal-Info">
      <h2>{userdata.data.name}</h2>
      <h4>{userdata.data.email} </h4>
    </div>
  );
  return (
    <div className="userSidebar">
      <Drawer
        onClose={onClose}
        open={open}
        placement={"left"}
        className="drawer"
      >
        <Sidebar Admin={false} />
      </Drawer>
      <div className="hiddenSidebar">
        <button onClick={() => setOpen(true)} className="accept-btn">
          <MenuOutlined />
        </button>
        <img src={imageConst.logo} width={"80px"} alt="header-logo"/>
        <Popover content={content} placement="bottomLeft">
          <FaUserCircle size={40} className="header-profile-icon" />
        </Popover>
      </div>
      <div className="sidebarSection">
        <Sidebar Admin={false} />
      </div>
      <div className="userLayout">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
