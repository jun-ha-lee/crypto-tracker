// 코인아이디를 클릭하면 그 코인에 관한정보 보이기

import { useParams } from "react-router-dom";

function Coin() {
  // const { coinId } = useParams<"coinId">(); 이렇게 써도 됨
  const { coinId } = useParams();

  console.log(coinId);

  return (
    <h1>Coin : {coinId}</h1>
  );
}

export default Coin;