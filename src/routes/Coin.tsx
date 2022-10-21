// 코인아이디를 클릭하면 그 코인에 관한정보 보이기

import { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom"; // 주소의 coinId를 가져온다 (localhost:3000/아이디)
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
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Loader = styled.div`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

interface RouteState {
  // coins에서 가져온 state값중에 name을 정의
  state: {
    name: string;
  };
}

// interface ITag {
//   // 아래 InfoData의 tag가 array로 이루어져 있어서 interface를 만들었다
//   coin_counter: number;
//   ico_counter: number;
//   id: string;
//   name: string;
// }

interface InfoData {
  // 필요없는건 여기에 넣을 필요없다
  // interface이름을 지을때 앞에 I를 붙이는 경우가 있다 왜그러지
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  // tags: ITag[]; // array로 이루어져 있어서 따로 interface를 만들었다
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  // const { coinId } = useParams<"coinId">(); 이렇게 써도 됨
  const { coinId } = useParams();

  console.log(coinId);

  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const { state } = location as RouteState;
  // Coins 에서 넘긴 state에 대한 값이 useLocation에 담겨 온다

  // console.log(location+'location');

  const [info, setInfo] = useState<InfoData>(); // api로 불러오는 코인정보를 담기위해, InfoData interface사용
  const [priceInfo, setPriceInfo] = useState<PriceData>(); // api로 불러오는 코인가격을 담기위해, PriceData inteface사용

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json(); // 코인정보 불러오기
      console.log(infoData);

      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json(); // 코인가격 불러오기
      console.log(priceData);

      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]); // coinId가 변할때 마다 실행됨, 그러나 이페이지에서 coinId가 변할일은 없음

  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "loading..." : info?.name}
        </Title>
        {/* ? loading ? 'loading...' : info?.name 이 부분은 처음화면으로 부터 접속한게 아닌경우에 실행*/}
        {/* state가 존재하면 name을 가져오고 아니면 loading */}
        {/* ?.는 옵셔널 체이닝 이라고 한다, state가 존재하지 않으면 원래는 타입에러가 나오지만 언디파인드라고 뜨게함 */}
        {/* ?.은 ?.'앞’의 평가 대상이 undefined나 null이면 평가를 멈추고 undefined를 반환합니다. */}
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Outlet />
          {/* Router.tsx에서 설정하고 나올곳을 <Outlet />을 추가 */}
        </>
      )}
    </Container>
  );
}

export default Coin;
