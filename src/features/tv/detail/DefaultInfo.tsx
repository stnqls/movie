import React from "react";
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
  color: #4a4a4a;
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
`;

interface Props {
  title: string;
  year: string;
  genres: string;
  overview: string;
  id: string;
  contries: string;
  nextEpisodeDate: string;
  nextEpisodeName: string;
  lastEpisodeDate: string;
  status: string;
}

const DefaultInfo: React.FC<Props> = ({
  title,
  year,
  genres,
  overview,
  id,
  contries,
  nextEpisodeDate,
  nextEpisodeName,
  lastEpisodeDate,
  status,
}) => {
  const { data, isLoading } = useDefaultInfo(id);
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
          {title === "" ? "준비중입니다" : translate?.title || title}
          <br />
          <span>Genres : </span>
          {genres === "" ? "준비중입니다" : genres}
          <br />
          <span>Country : </span>
          {contries === "" ? "준비중입니다" : contries}
          <br />
          <span>First Air Date : </span>
          {year === "" ? "준비중입니다" : year}
          <br />
          {status === "Ended" ? (
            <>
              <span>Last episode : </span>
              완결 ({lastEpisodeDate})
            </>
          ) : (
            <>
              <span>Next episode : </span>
              {nextEpisodeName === "" ? "-" : nextEpisodeName}
              {nextEpisodeDate === "" ? "" : `(${nextEpisodeDate})`}
            </>
          )}
          <br />
          <br />
          {isLoading || !data ? <div>Loading...</div> : translate?.overview}
        </Summary>
      </HeaderWrapper>
    </Base>
  );
};

export default DefaultInfo;
