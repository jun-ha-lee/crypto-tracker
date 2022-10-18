// 모든코인 보이기
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: #fff;
  color: ${props => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    transition: color .2s ease-in;
    padding: 20px;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.accentColor};
  font-size: 48px;
`;

const Loader = styled.div`
  text-align: center;
  display: block;
`;

const CoinImg = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface CoinInterface { // typescript에게 어떤 형식을 api로 부터 가져오는지 설명해줌
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]); // api로 받아올 코인들은 빈배열에 넣을것이다 알려줌
  const [loading, setLoading] = useState(true); // 로딩, 초기값은 true

  // api로 가져오기
  useEffect(function () {
    (async () => {
      const response = await fetch('https://api.coinpaprika.com/v1/coins');
      const json = await response.json();
      // console.log(json);
      setCoins(json.slice(0, 100)); // api로 받아온 코인갯수를 100개까지 자른다
      setLoading((current) => !current); // 로딩이 다되면 false로 바꾼다
      // setLoading(false);로 해도 된다
    })();
  }, []);// 한번만 실행

  console.log(coins);

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> :
        <CoinsList>
          {coins.map(coin => <Coin key={coin.id}>
            <Link to={`/${coin.id}`} state={coin}>
              {/* <Link>에 state를 추가 하여 coin에 관한 정보를 넘긴다 */}

              <CoinImg src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt={coin.name} />
              {coin.name} &rarr;
            </Link>
          </Coin>)}
        </CoinsList>}
    </Container>
  );
}

export default Coins;