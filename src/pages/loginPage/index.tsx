import { imageConst } from "../../constant/imageConstant";
import { FaArrowCircleRight } from "react-icons/fa";
import "./index.scss";
import { useGoogleLogin } from "@react-oauth/google";
import { api } from "../../constant/apiConstant";
import apifunction from "../../utils/apiCall";
import { Googletoken } from "../../type";
import { useDispatch } from "react-redux";
import { cleanData, fetchuser } from "../../store/userSlice";
import { Loading } from "../../models/isLoading";
import { store, type AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { message } from "antd";
import { cleanMeeting } from "../../store/userActivityslice";
function Loginpage() {
  const navigate = useNavigate();
  const loading = useRef(false);
  const dispatch = useDispatch<AppDispatch>();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(
    () => {
      cleaner();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const Login = useGoogleLogin({
    flow: "auth-code",
    scope: "openid profile email https://www.googleapis.com/auth/calendar",
    onSuccess: (res) => {
      getAccessToken(res.code);
    },
  });
  const cleaner = async () => {
    await dispatch(cleanData());
    await dispatch(cleanMeeting());
  };

  const getAccessToken = async (code: string) => {
    const data = {
      client_id: api.googlecliendId,
      client_secret:api.googleclientsecret,
      grant_type: "authorization_code",
      code,
      redirect_uri: api.homeurl,
    };
    const response = (await apifunction({
      url: api.googleTokenurl,
      method: "post",
      payload: data,
      auth: false,
    }).then((data) => data.data)) as Googletoken;
    loading.current = true;
    await dispatch(
      fetchuser({
        url: api.baseurl + api.loginurl,
        method: "post",
        payload: {
          accessToken: response.access_token,
          refreshToken: response.refresh_token,
        },
        auth: false,
      })
    );
    await redirectcall();
  };
  const redirectcall = async () => {
    const user = store.getState().userReducer;
    if (user.isLogin) {
      if (user.data.admin) {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    }
    if (user.status === "failed" || user.message === "Network error occurred") {
      loading.current = false;
      //error message
      messageApi.open({
        type: "error",
        content: user.message,
      });
      await dispatch(cleanData());
    }
  };

  return (
    <>
      {contextHolder}
      {loading.current && <Loading />}
      <div className="login-Page">
        <div className="login-Left">
          <img src={imageConst.logo} alt="logo" />
          <section className="login-Section">
            <p>
              Welcome <span>Back!</span>
            </p>
            <p>Login into you account</p>
            <button onClick={Login}>
              Signin with Google <FaArrowCircleRight size={"20px"} />
            </button>
          </section>
        </div>
        <div className="login-Right">
          <img src={imageConst.loginimage} alt="login-Img" />
        </div>
      </div>
      <footer className="login-Footer">
        Divum Corporate Service Pvt. Ltd.
      </footer>
    </>
  );
}

export default Loginpage;
