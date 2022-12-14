import io from "socket.io-client";
import Cookie from "js-cookie";

const token = Cookie.get("userToken");
export const socket = io("http://localhost:5000", {
  auth: {
    token: token ? `Bearer ${token}` : "",
  },
});
