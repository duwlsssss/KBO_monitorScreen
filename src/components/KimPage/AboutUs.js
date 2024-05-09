import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";


function AboutUs(){

  return(
  
    <div>
      
      <Header/>
  
      <Title>김.명.사 제작팀을 소개합니다.</Title>

     <Center>
     <img src="수현.webp" width="340px"></img>
     <img src="다슬.webp" width="430px"></img>
     <img src="여진1.webp" width="300px"></img>
     </Center>
    </div>
  )
}
export const Title = styled.h1`       
  font-size: 30px;             
  text-align: center;      
  margin: 40px;
  font-family: 'DOSSaemmul';
`; 

export const Center = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 20px; /* 이미지 위 여백 조절 */
img {
  margin-bottom: 20px; /* 이미지 아래 여백 조절 */
}
`

export default AboutUs;