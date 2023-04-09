import axios from "axios";
import { useEffect } from "react";
import UserInfo from "../features/mypage/userInfo";

const MyPage: React.FC = () => {
  function createSession() {
    axios({
      method: "POST",
      url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_API_KEY}`,
      data: {
        request_token: window.sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.status === 200) {
          window.sessionStorage.setItem("sessionId", res.data.session_id);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  useEffect(() => {
    createSession();
  }, []);
  return (
    <div>
      <UserInfo />
    </div>
  );
};

export default MyPage;
