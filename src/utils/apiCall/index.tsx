import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Apitype, ErrorResponse, Response, Tokenentity } from "../../type";
import { store } from "../../store/store";
import { api } from "../../constant/apiConstant";
import { cleanData, updateToken } from "../../store/userSlice";

const apifunction = async (
  obj: Apitype
): Promise<AxiosResponse<Response> | ErrorResponse | any> => {
  const { accessToken, refreshToken } = store.getState().userReducer.data;

  if (obj.auth) {
    const temp = obj;

    const config: AxiosRequestConfig = {
      url: obj.url,
      method: obj.method,
      data: obj.payload,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const authResponse = await axios(config);

      return authResponse;
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 403) {
          try {
            const refreshtoken = await axios({
              url: api.baseurl + api.refreshToken,
              method: "get",
              headers: { Authorization: `Bearer ${refreshToken}` },
            });
            const data = refreshtoken.data as Response;
            await store.dispatch(updateToken(data.data as any as Tokenentity));
            const { accessToken } = store.getState().userReducer.data;
            const newconfig: AxiosRequestConfig = {
              url: temp.url,
              method: temp.method,
              data: temp.payload,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            };

            const authResponse = await axios(newconfig);

            return authResponse;
          } catch (err) {
            store.dispatch(cleanData());
            return { status: 403, statusText: "token expire" };
          }
        } else {
          return {
            status: error.response.status as number,
            data: error.response.data as any,
          };
        }
      }
      if (error.request) {
        return { status: 500, statusText: "request error" };
      }
    }
  } else {
    const config: AxiosRequestConfig = {
      url: obj.url,
      method: obj.method,
      data: obj.payload,
    };

    try {
      //success api call
      const response = await axios(config);

      return response;
    } catch (error: any) {
      //error based on 401
      if (error.response) {
        return {
          status: error.response.status as number,
          data: error.response.data as any,
        };
      } else if (error.request) {
        return {
          //bad request
          status: 500,
          statusText: "Network error occurred",
        };
      } else {
        return {
          //unexecpted error
          status: 501,
          statusText: "An unexpected error occurred",
        };
      }
    }
  }
};

export default apifunction;
