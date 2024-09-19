import React from "react";
import styled from "styled-components";

const Payment = () => {
  const handleOpenWindow = () => {
    window.open("https://example.com", "_blank", "width=600,height=400");
  };
  return <button onClick={handleOpenWindow}>새 창 열기</button>;
};

export default Payment;
