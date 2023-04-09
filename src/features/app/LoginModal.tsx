import React, { useState } from "react";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "../../components/Modal";
import { loginModalOpenState } from "./atom";
// import axios from "axios";

const Container = styled.div`
  width: 375px;
  min-height: 540px;
  height: auto;
  border-radius: 6px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  position: relative;
`;

const Close = styled.div`
  position: absolute;
  top: 13px;
  right: 15px;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  padding: 32px 32px 48px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TextLogo = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  text-align: left;
  > span[class="primary"] {
    color: rgb(255, 47, 110);
  }
  > span:not(.primary) {
    color: #222;
  }
`;

const Title = styled.h4`
  font-size: 20px;
  font-weight: 700;
  text-align: left;
  margin: 24px 0 20px;
  padding: 0;
`;

const Section = styled.section``;

const Form = styled.form``;

const InputWrapper = styled.div`
  padding: 4px 0;
  overflow: hidden;
`;

const InputLabel = styled.label`
  display: flex;
  align-items: center;
  background-color: rgb(245, 245, 245);
  width: 100%;
  box-sizing: border-box;
  height: 44px;
  padding: 0 12px;
  border-radius: 6px;
  margin-top: 15px;
`;

const Input = styled.input`
  background: transparent;
  font-size: 16px;
  font-weight: 400;
  width: 100%;
  padding: 0;
  border: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  caret-color: rgb(255, 47, 110);
  outline: none;
`;

const Explain = styled.div`
  margin: 5px 0;
  text-align: center;
  font-size: 13px;
  color: #9e9e9e;
`;

const SubmitButton = styled.button`
  padding: 0;
  border: none;
  cursor: pointer;
  background: rgb(255, 47, 110);
  color: rgb(255, 255, 255);
  text-align: center;
  font-size: 17px;
  font-weight: 400;
  width: 100%;
  height: 44px;
  border-radius: 6px;
  margin-top: 40px;
`;

const FindWrapper = styled.div`
  margin-top: auto;
`;

const FindPasswordWrapper = styled.div`
  font-size: 15px;
  font-weight: 400;
  text-align: center;
  margin: 20px 0 14px;
`;

const FindPassword = styled.a`
  background: none;
  padding: 0;
  border: none;
  margin: 0;
  cursor: pointer;
  color: rgb(255, 47, 110);
  font-size: inherit;
  text-decoration: none;
`;

const FindAccountWrapper = styled.div`
  font-size: 15px;
  font-weight: 400;
  text-align: center;
  color: rgb(140, 140, 140);
`;

const FindAccount = styled.a`
  background: none;
  padding: 0;
  border: none;
  margin: 0;
  cursor: pointer;
  color: rgb(255, 47, 110);
  font-size: inherit;
  text-decoration: none;
`;

interface Props {}

const LoginModal: React.FC<Props> = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] =
    useRecoilState(loginModalOpenState);
  // const [id, setId] = useState<string | undefined>("");
  // const [password, setPassword] = useState<string | undefined>("");
  const [input, setInput] = useState({ id: "", pw: "" });
  const { id, pw } = input;

  const onChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const handleClose = (): void => {
    setIsLoginModalOpen(false);
  };

  // function login() {
  //   axios({
  //     method: "POST",
  //     url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${process.env.REACT_APP_API_KEY}`,
  //     data: {
  //       username: id,
  //       password: pw,
  //       request_token: window.sessionStorage.getItem("token"),
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  return (
    <Modal isOpen={isLoginModalOpen} onClose={handleClose}>
      <Container>
        <Close onClick={handleClose}>
          <AiOutlineClose style={{ width: "25px", height: "25px" }} />
        </Close>
        <ContentWrapper>
          <TextLogo>
            <span className="primary">MOVIE</span>
            <span>TV</span>
          </TextLogo>
          <Title>로그인</Title>
          <Section>
            <Form>
              <InputWrapper>
                <InputLabel>
                  <Input
                    placeholder="이메일"
                    onChange={
                      // setId(e.target.value);
                      onChange
                    }
                    value={id}
                  />
                </InputLabel>
              </InputWrapper>
              <InputWrapper>
                <InputLabel>
                  <Input
                    placeholder="비밀번호"
                    onChange={
                      // setPassword(e.target.value);
                      onChange
                    }
                    value={pw}
                    type="password"
                  />
                </InputLabel>
              </InputWrapper>
              <SubmitButton>로그인</SubmitButton>
            </Form>
            <Explain>
              로그인시 사용되는 아이디와 비밀번호는, <br />
              TMDB사이트의 아이디,비밀번호와동일합니다.
            </Explain>
          </Section>
          <FindWrapper>
            <FindPasswordWrapper>
              <FindPassword href="https://www.themoviedb.org/reset-password">
                비밀번호를 잊어버리셨나요?
              </FindPassword>
            </FindPasswordWrapper>
            <FindAccountWrapper>
              계정이 없으신가요?
              <FindAccount href="https://www.themoviedb.org/signup">
                회원가입
              </FindAccount>
            </FindAccountWrapper>
          </FindWrapper>
        </ContentWrapper>
      </Container>
    </Modal>
  );
};

export default LoginModal;
