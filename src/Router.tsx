import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chart from "./routes/Chart";

import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

function Router() {
  return (
    <BrowserRouter>
      <Routes></Routes>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId" element={<Coin />}>
          {/* 아래 두개는 주소가 /코인아이디/price, /코인아이디/chart */}
          <Route path="price" element={<Price />} />
          <Route path="chart" element={<Chart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
