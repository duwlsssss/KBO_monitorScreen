import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";


function AboutUs(){

  return(
  
    <div>
      
      <Header/>
  
      <Title><iframe src="https://giphy.com/embed/3oKIPgf7qGYYO0fQ7S" width="100" height="50" frameBorder="0" allowFullScreen></iframe>김.명.사 제작팀을 소개합니다.  <iframe src="https://giphy.com/embed/10a8AOSeP6Rqfu" width="100" height="40" frameBorder="0" allowFullScreen></iframe></Title>
   
      <hr/>

     <Center>
     <img src="수현.png" width="340px"></img>
     <img src="다슬.png" width="430px"></img>
     <img src="여진1.png" width="300px"></img>
     </Center>
    </div>
  )
}
export const Title = styled.h1`       
  font-size: 30px;             
  text-align: center;          
  @font-face {
    font-family: 'DOSSaemmul';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_eight@1.0/DOSSaemmul.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  
  font-family: 'DOSSaemmul';
  margin: 1em 1em;
  
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

export default styled(AboutUs)`
  height: 100%;
  background: white;
  padding-top: 22px;
  position: relative;

  @media (max-width: 800px) {
    .top-bar {
      height: auto;
    }
    .bar-items.left {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: auto;
      position: relative;
    }
    .bar-items.right {
      display: none;
    }
    .search-bar {
      margin-top: 15px;
      width: 90%;
      height: 40px;
      border-radius: 3px;
      padding: 0px 5px 0 10px;
      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
      }
    }
    .app-bar {
      margin: 0 15px;
      width: calc(100% - 30px);
      height: 40px;
    }
    .tags {
      display: flex;
      width: 100%;
    }
    .tags.right {
      display: none;
    }
    .tag {
      text-align: center;
      padding: 16px 0 0 0;
      flex: 1;
    }
    .content {
      padding: 10px 40px;
    }
    .footer-items.left {
      padding-left: 25px;
    }
    footer .left .item {
      margin-right: 15px;
    }
    

    
  }
`;