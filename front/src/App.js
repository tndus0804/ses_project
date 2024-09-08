import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("web/api") // Spring Boot의 /api 경로로 GET 요청을 보냄
      .then((response) => response.text()) // 서버에서 반환한 텍스트(문자열) 응답을 받음
      .then((data) => setMessage(data)) // 받은 데이터를 state에 저장
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1> {/* 서버에서 받은 메시지를 화면에 출력 */}
    </div>
  );
}

export default App;
