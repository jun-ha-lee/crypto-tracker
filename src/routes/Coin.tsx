// 코인아이디를 클릭하면 그 코인에 관한정보 보이기

import { useState } from "react";
import { useLocation, useParams } from "react-router-dom"; // 주소의 coinId를 가져온다 (localhost:3000/아이디)
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  margin: 0 auto;
  max-width: 480px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${props => props.theme.accentColor};
  font-size: 48px;
`;

const Loader = styled.div`
  text-align: center;
  display: block;
`;

interface RouteState { // coins에서 가져온 state값중에 name을 정의
  state: {
    name: string;
  }
}

function Coin() {
  // const { coinId } = useParams<"coinId">(); 이렇게 써도 됨
  const { coinId } = useParams();

  console.log(coinId);

  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const { state } = location as RouteState;
  // Coins 에서 넘긴 state에 대한 값이 useLocation에 담겨 온다

  // console.log(name);

  return (
    <Container>
      <Header>
        <Title>{state?.name || 'Loading'}</Title>
        {/* state가 존재하면 name을 가져오고 아니면 loading */}
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;