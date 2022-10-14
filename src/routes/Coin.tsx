// 코인아이디를 클릭하면 그 코인에 관한정보 보이기

import { useParams } from "react-router-dom"; // 주소의 coinId를 가져온다 (localhost:3000/아이디)

function Coin() {
  // const { coinId } = useParams<"coinId">(); 이렇게 써도 됨
  const { coinId } = useParams();

  console.log(coinId);

  return (
    <h1>Coin : {coinId}</h1>
  );
}

export default Coin;