import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled/macro";
import { AiOutlineSearch } from "react-icons/ai";
import { useRecoilState } from "recoil";

import { signupModalOpenState } from "../features/app/atom";

import useMovieSearch from "../features/movie/useMovieSearch";
import useClickOutside from "../hooks/useClickOutside";
import Portal from "./Portal";
import SignupModal from "../features/app/SignupModal";
import { redirect } from "react-router-dom";

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
const MyPage = styled.button`
  border-radius: 6px;
  font-weight: 500;
  box-sizing: border-box;
  min-width: 72px;
  height: 32px;
  background: rgb(255, 47, 110);
  color: white;
  font-weight: 600;
  font-size: 14px;
  border: 2px solid rgb(255, 47, 110);
  cursor: pointer;
  margin: 15px 0;
`;

interface Props {}

const Header: React.FC<Props> = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const pathname = window.location.pathname;

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [isSignupModalOpen, setIsSignupModalOpen] =
    useRecoilState(signupModalOpenState);

  const handleSignup = (): void => {
    !isSignupModalOpen && setIsSignupModalOpen(true);
  };

  const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchKeyword(e.target.value);
  };

  const handleLogout = () => {
    setIsLogin(false);
    window.sessionStorage.removeItem("token");
    window.sessionStorage.removeItem("sessionId");
    redirect("/");
  };

  useClickOutside(searchRef, () => setSearchKeyword(""));

  const { data: searchResult } = useMovieSearch(searchKeyword);

  const [islogin, setIsLogin] = useState<Boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (window.sessionStorage.getItem("token")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });

  // const createSession = () => {
  //   axios({
  //     method: "POST",
  //     url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_API_KEY}`,
  //     data: {
  //       request_token: window.sessionStorage.getItem("token"),
  //     },
  //   })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         window.sessionStorage.setItem("sessionId", res.data.session_id);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // };

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
            {islogin ? (
              <>
                <Menu>
                  <Link href="/mypage">
                    <MyPage>My Page</MyPage>
                  </Link>
                </Menu>
                <Menu>
                  <SignUp onClick={handleLogout}>LOG OUT</SignUp>
                </Menu>
              </>
            ) : (
              <>
                <Menu>
                  <Link href="/login">
                    <SignIn>LOG IN</SignIn>
                  </Link>
                </Menu>
                <Menu>
                  <SignUp onClick={handleSignup}>SIGN UP</SignUp>
                  {isSignupModalOpen && <Portal children={<SignupModal />} />}
                </Menu>
              </>
            )}
          </MenuList>
        </MenuListWrapper>
      </Navigation>
    </Base>
  );
};

export default Header;
