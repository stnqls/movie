import useGetInfo from "./useGetInfo";

const UserInfo = () => {
  const { isLoading, data } = useGetInfo();
  return (
    <>
      {isLoading || !data ? (
        <div>로딩중</div>
      ) : (
        <div style={{ marginTop: "100PX" }}>
          username : {data.data.username}
        </div>
      )}
    </>
  );
};

export default UserInfo;
