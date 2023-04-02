import React from "react";
import styled from "@emotion/styled";
import Modal from "../../components/Modal";
import { useRecoilState } from "recoil";
import { AiOutlineClose } from "react-icons/ai";
import { loginModalOpenState, signupModalOpenState } from "./atom";

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
  padding: 32px 20px 48px;
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
  margin: 24px 0 80px;
  padding: 0;
`;

const Section = styled.section`
  font-size: 15px;
  line-height: 21px;
  > span {
    font-weight: 700;
    font-size: 17px;
  }
`;

const Login = styled.button`
  background: none;
  padding: 0;
  border: none;
  margin: 0;
  cursor: pointer;
  color: rgb(255, 47, 110);
  font-size: inherit;
`;

const LoginWrapper = styled.div`
  font-size: 15px;
  font-weight: 400;
  text-align: center;
  color: rgb(140, 140, 140);
  margin-top: auto;
`;

const Button = styled.button`
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
  margin-top: 100px;
`;

interface Props {}

const SignupModal: React.FC<Props> = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] =
    useRecoilState(loginModalOpenState);
  const [isSignupModalOpen, setIsSignupModalOpen] =
    useRecoilState(signupModalOpenState);

  const handleClose = (): void => {
    setIsSignupModalOpen(false);
  };

  const handleLogin = (): void => {
    handleClose();
    !isLoginModalOpen && setIsLoginModalOpen(true);
  };

  return (
    <Modal isOpen={isSignupModalOpen} onClose={handleClose}>
      <Container>
        <Close onClick={handleClose}>
          <AiOutlineClose style={{ width: "25px", height: "25px" }} />
        </Close>
        <ContentWrapper>
          <TextLogo>
            <span className="primary">MOVIE</span>
            <span>TV</span>
          </TextLogo>
          <Title>회원가입</Title>
          <Section>
            <span>MOVIETV에서는,</span> <br />
            TMDB의 아이디와 비밀번호로 이용이 가능합니다.
            <a href="https://www.themoviedb.org/signup">
              <Button>TMDB회원가입하러가기</Button>
            </a>
          </Section>
          <LoginWrapper>
            이미 가입하셨나요? <Login onClick={handleLogin}>로그인</Login>
          </LoginWrapper>
        </ContentWrapper>
      </Container>
    </Modal>
  );
};

export default SignupModal;
