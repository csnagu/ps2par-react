import React from "react";
import "./App.css";
import Converter from "./Converter";

function App() {
  return (
    <div className="App">
      <Converter />
      <footer className="Footer">
        thanks for{" "}
        <a href="http://www.big.or.jp/~dram/ps2code.html">
          PS2PARコード変換スクリプト
        </a>
      </footer>
    </div>
  );
}

export default App;
