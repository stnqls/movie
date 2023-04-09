import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled/macro";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import {
  loginModalOpenState,
  signupModalOpenState,
} from "../features/app/atom";

import useMovieSearch from "../features/movie/useMovieSearch";
import useClickOutside from "../hooks/useClickOutside";
import Portal from "./Portal";
import LoginModal from "../features/app/LoginModal";
import SignupModal from "../features/app/SignupModal";
import axios from "axios";

const Base = styled.header`
  width: 100%;
  margin: 0 auto;
  height: 62px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(255, 255, 255);
  text-align: center;
  box-shadow: rgb(0 0 0 / 8%) 0px 1px 0px 0px;
  transition: background-color 200ms ease 0s;
  z-index: 10;
`;

const Navigation = styled.nav`
  margin: 0 auto;
  max-width: 1200px;
`;

const MenuListWrapper = styled.div``;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
`;

const Menu = styled.li`
  display: flex;
  align-items: center;
  height: 62px;
  flex-shrink: 0;
  &:not(:first-of-type) {
    margin: 0 0 0 24px;
  }
`;

const MenuButton = styled.button<{ active?: boolean }>`
  font-size: 15px;
  color: ${({ active }) =>
    active ? "rgb(255, 47, 110)" : "rgb(126, 126, 126)"};
  cursor: pointer;
  border: none;
  background: none;
`;

const SearchMenu = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  height: 62px;
  flex-shrink: 1;
  margin: 0 0 0 auto;
  transition: all 0.5s ease 0s;
  position: relative;
`;

const Link = styled.a`
  text-decoration: none;
`;

const TextLogo = styled.h1`
  font-size: 24px;
  font-weight: 700;
  > span[class="primary"] {
    color: rgb(255, 47, 110);
  }
  > span:not(.primary) {
    color: #222;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchResultWrapper = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 9999999;
  background-color: #fff;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  max-height: 480px;
  overflow-y: scroll;
`;

const SearchResultListItem = styled.li`
  padding: 4px 6px;
  box-sizing: border-box;
  color: #222;
  font-size: 16px;
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    background-color: #eee;
  }
`;

const SearchResultList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SearchFormWrapper = styled.div``;

const SearchForm = styled.form``;

const SearchLabel = styled.label`
  background: rgb(245, 245, 247);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 38px;
  border-radius: 2px;
  padding: 7px 8px;
`;

const SearchInput = styled.input`
  font-size: 14px;
  font-weight: 400;
  background: transparent;
  width: 100%;
  padding: 0 0 0 8px;
  border: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  caret-color: rgb(53, 53, 53);
  line-height: 23px;
`;

const SignIn = styled.button`
  background: transparent;
  color: rgb(116, 116, 123);
  font-size: 14px;
  padding: 0;
  border: 0;
  cursor: pointer;
  margin: 15px 0;
`;

const SignUp = styled.button`
  border-radius: 6px;
  font-weight: 500;
  box-sizing: border-box;
  min-width: 72px;
  height: 32px;
  background: transparent;
  color: rgb(53, 53, 53);
  font-size: 14px;
  border: 1px solid rgba(116, 116, 123, 0.5);
  cursor: pointer;
  margin: 15px 0;
`;

interface Props {}

const Header: React.FC<Props> = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const pathname = window.location.pathname;
  const navigate = useNavigate();

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [isLoginModalOpen, setIsLoginModalOpen] =
    useRecoilState(loginModalOpenState);
  const [isSignupModalOpen, setIsSignupModalOpen] =
    useRecoilState(signupModalOpenState);

  const handleLoginModal = (): void => {
    !isLoginModalOpen && setIsLoginModalOpen(true);
  };

  const handleSignup = (): void => {
    !isSignupModalOpen && setIsSignupModalOpen(true);
  };

  const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchKeyword(e.target.value);
  };

  useClickOutside(searchRef, () => setSearchKeyword(""));

  const { data: searchResult } = useMovieSearch(searchKeyword);

  let token: string = "";

  function getToken() {
    axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_API_KEY}`,
    })
      .then((res) => {
        if (res.status === 200) {
          // window.sessionStorage.setItem("token", res.data.request_token);
          token = res.data.request_token;
          navigate(
            `https://www.themoviedb.org/authenticate/${token}?redirect_to=https://themovietv.netlify.app/`
            // `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/`
          );
          createSession();
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function createSession() {
    axios({
      method: "POST",
      url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_API_KEY}`,
      data: {
        request_token: token,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getToken();
  }, []);

  return (
    <Base>
      <Navigation>
        <MenuListWrapper>
          <MenuList>
            <Menu>
              <Link href="/">
                <TextLogo>
                  <span className="primary">MOVIE</span>
                  <span>TV</span>
                </TextLogo>
              </Link>
            </Menu>
            <Menu>
              <Link href="/movie">
                <MenuButton active={pathname === "/movie"}>영화</MenuButton>
              </Link>
            </Menu>
            <Menu>
              <Link href="/tv">
                <MenuButton active={pathname === "/tv"}>TV 프로그램</MenuButton>
              </Link>
            </Menu>
            <SearchMenu ref={searchRef}>
              <SearchContainer>
                <SearchFormWrapper>
                  <SearchForm>
                    <SearchLabel>
                      <AiOutlineSearch />
                      <SearchInput
                        placeholder="콘텐츠, 인물, 컬렉션, 유저를 검색해보세요."
                        onChange={handleKeyword}
                      />
                    </SearchLabel>
                  </SearchForm>
                </SearchFormWrapper>
              </SearchContainer>
              <SearchResultWrapper>
                <SearchResultList>
                  {searchResult?.results.map((searchResultItem) => (
                    <Link
                      href={`/movie/${searchResultItem.id}`}
                      key={searchResultItem.id}
                    >
                      <SearchResultListItem>
                        {searchResultItem.title}
                      </SearchResultListItem>
                    </Link>
                  ))}
                </SearchResultList>
              </SearchResultWrapper>
            </SearchMenu>
            <Menu>
              <SignIn onClick={handleLoginModal}>로그인</SignIn>
              {isLoginModalOpen && <Portal children={<LoginModal />} />}
            </Menu>
            <Menu>
              <SignUp onClick={handleSignup}>회원가입</SignUp>
              {isSignupModalOpen && <Portal children={<SignupModal />} />}
            </Menu>
          </MenuList>
        </MenuListWrapper>
      </Navigation>
    </Base>
  );
};

export default Header;
