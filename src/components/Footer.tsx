import styled from "@emotion/styled";

const Base = styled.footer`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  background-color: #1c1d1f;
  background: #1c1d1f;
`;

const TermAndPolicy = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin: 0 auto;
  padding: 20px 0 38px;
  max-width: 1200px;
`;

const TermAndPolicyItem = styled.li`
  display: inline-block;
  color: #a5a5a7;
  font-size: 13px;
  font-weight: 400;
  line-height: 22px;
  vertical-align: top;
  cursor: pointer;
  &:not(:last-of-type) {
    &:after {
      content: "";
      display: inline-block;
      background: #848485;
      vertical-align: top;
      width: 1px;
      height: 12px;
      margin: 5px 8px 0;
    }
  }
`;

const Footer = () => {
  return (
    <Base>
      <TermAndPolicy>
        <TermAndPolicyItem>서비스 이용약관</TermAndPolicyItem>
        <TermAndPolicyItem>개인정보 처리방침</TermAndPolicyItem>
        <TermAndPolicyItem>회사 정보</TermAndPolicyItem>
      </TermAndPolicy>
    </Base>
  );
};

export default Footer;
