import React from "react";
import Header from "./Header";
import logoImg from "assets/kimPageIcons/image.png"
import styled from 'styled-components'
import { Title } from "./AboutUs";

const Footer = styled.footer`
text-align: center;          
font-family: 'DOSSaemmul';
margin-top:70px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const LogoImage = styled.img`
  width: 500px; 
  height: auto; 
  padding-top:30px;
`;

function Main(){
  return(
    <div>
       <Header/>
      <Title><strong>KimMyungsa.com</strong> 에 오신 것을 환영합니다!</Title>
     
      <main>
        <MainContainer>
        <div className="logo" >
          <LogoImage src={logoImg} className="logo-img"/>
        </div>
        </MainContainer>
      </main>
      <Footer>
        네트워크관리사 : 12.07~12.31
        웹 프로그래머 : kim soo hyun, kim yeo jin
        디자이너 : kim da seul <br/><br/>
        데이터관리사 : mongoDB
        제작 기간: 2023.12 ~ 2024.04<br/><br/>
        all copyright @ global Media - BLOOM 2024 graduation gallery kms
      </Footer>
    </div>
  )
}



export default styled(Main)`
  height: 100%;
  background: white;
  padding-top: 22px;
  position: relative;
  @media (max-width: 600px) {
    
  }

  
`;