import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


function Header() {
  return (


   
    <StyledHeader>
      <Link to="/" className="navbar_item"><h2>[ 홈 ]</h2></Link>
      <Link to="/MyMyungham" className="navbar_item"><h2>[ 명함 만들기 ]</h2></Link>
      <Link to="/AboutUs" className="navbar_item"><h2>[ About Us ]</h2></Link>
      </StyledHeader>
   
  );
}

const StyledHeader = styled.div`
  height: 70px;
  background: gainsboro;
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: 'DOSSaemmul';
  color: blue;


  /* 방문한 링크 스타일 (visited) */
  a:visited {
    color: blue;
  }

  a:hover {
    color: red; /* 호버 시 색상을 빨간색(red)으로 변경합니다. */
  }
`;




export default styled(Header)`
  height: 100%;
  background: white;
  padding-top: 22px;
  position: relative;

`;