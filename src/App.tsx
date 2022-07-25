import React, { useEffect, useRef, useState } from "react";
import * as esbuild from "esbuild-wasm";

function App() {
  const [input, setInput] = useState<string>("");
  const serviceRef = useRef<esbuild.Service | null>(null);

  // * esbuild-wasm을 사용함으로써 자바스크립트가 번들링과 트랜스파일링을 하는것이 아니라
  // * 웹어셈블리가 담당을 한다. esbuild 웹어셈블리는 고랭이 담당하여 브라우저가 이해할 수 있도록 컴파일을 해준다.
  const startService = async () => {
    // * transform 메서드를 사용하여 트랜스파일링
    // * bundle 메서드를 사용하여 번들링
    serviceRef.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const handleClick = () => {
    if (!serviceRef.current) return;

    console.log(serviceRef.current);
  };

  return (
    <div className="App">
      <textarea onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={handleClick}>submit</button>
      </div>
      <pre></pre>
    </div>
  );
}

export default App;
