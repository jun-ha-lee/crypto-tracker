// 코인아이디를 클릭하면 그 코인에 관한정보 보이기

import { useEffect, useState } from "react";
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

  const [info, setInfo] = useState({}); // api로 불러오는 코인정보를 담기위해
  const [priceInfo, setPriceInfo] = useState({}); // api로 불러오는 코인가격을 담기위해

  useEffect(()=>{
    (async ()=> {
      const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json(); // 코인정보 불러오기
      console.log(infoData);

      const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json(); // 코인가격 불러오기
      console.log(priceData);

      setInfo(infoData);
      setPriceInfo(priceData);
    })();
  },[]);

  return (
    <Container>
      <Header>
        <Title>{state?.name || 'Loading'}</Title>
        {/* state가 존재하면 name을 가져오고 아니면 loading */}
        {/* ?.는 옵셔널 체이닝 이라고 한다, state가 존재하지 않으면 원래는 타입에러가 나오지만 언디파인드라고 뜨게함 */}
        {/* ?.은 ?.'앞’의 평가 대상이 undefined나 null이면 평가를 멈추고 undefined를 반환합니다. */}
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;