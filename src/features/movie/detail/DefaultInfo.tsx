import React, { useMemo } from "react";
import styled from "@emotion/styled";
import useDefaultInfo from "./useDefaultInfo";

const Base = styled.div`
  padding: 11px 15px;
  border-bottom: 1px solid #ededed;
`;

const HeaderWrapper = styled.div``;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  color: #000;
  font-size: 19px;
  font-weight: 700;
  margin: 8px 0;
`;

const Summary = styled.div`
  color: #333;
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  > span {
    color: #808080;
  }
`;

interface Props {
  title: string;
  year: string;
  genres: string;
  runtime: number;
  overview: string;
  id: string;
  contries: string;
}

const DefaultInfo: React.FC<Props> = ({
  title,
  year,
  genres,
  overview,
  runtime,
  contries,
  id,
}) => {
  const { data, isLoading } = useDefaultInfo(id);
  const hour = Math.ceil(runtime / 60);
  const minute = runtime % 60;
  // const translate = useMemo(() => {
  //   return data?.data.translations.find((el) => el.english_name === "Korean");
  // }, [data?.data.translations]);
  const translate = data?.data.translations.find(
    (el) => el.english_name === "Korean"
  )?.data;

  return (
    <Base>
      <HeaderWrapper>
        <Header>
          <Title>기본정보</Title>
        </Header>
        <Summary>
          <span>Title : </span>
          {title === "" ? "준비중입니다" : translate?.title}
          <br />
          <span>Genres : </span>
          {genres === "" ? "준비중입니다" : genres}
          <br />
          <span>Country : </span>
          {contries === "" ? "준비중입니다" : contries}
          <br />
          <span>Release date : </span>
          {year === "" ? "준비중입니다" : year}
          <br />
          <span>Running time : </span>
          {`${runtime}` === "" ? "준비중입니다" : `${hour}시간 ${minute}분`}
          <br />
          <br />
          {isLoading || !data ? <div>Loading...</div> : translate?.overview}
        </Summary>
      </HeaderWrapper>
    </Base>
  );
};

export default DefaultInfo;
