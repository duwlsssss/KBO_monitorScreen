import React,{ useRef }  from "react";
import Header from "./Header";
import styled from 'styled-components';
import { useEffect, useState } from "react"
import api from '../api/axios'
import { Title } from "./AboutUs";
import Webcam from "react-webcam";
import SchoolSelector from "./Selector.js/schoolSelector";
import MbtiSelector from "./Selector.js/MbtiSelector";
import SessionSelector from "./Selector.js/sessionSelector";
// import {Cloudinary} from "@cloudinary/url-gen"; //클라우디너리 SDK
import SignatureCanvas from 'react-signature-canvas'; 



function MyMyungham(){


  const [userEmail, setUserEmail] = useState(''); // useEmail 상태 추가

  useEffect(() => {
    // URL에서 useEmail 파라미터 값을 가져오는 로직
    const urlParams = new URLSearchParams(window.location.search);
    const userEmailParam = urlParams.get('userEmail');
    console.log('useEmailParam',userEmailParam);//테스트 출력, 이메일값
    setUserEmail(userEmailParam); // useEmail 상태 설정
  
  
  }, []);



  console.log(userEmail);

  const [recentData, setRecentData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const [name, setName] = useState(''); //이름
  const [engName, setEngName] = useState (''); //영문 네임 
  const [major, setMajor]= useState (''); //전공 
  const [studentNum, setStudentNum]=useState(''); //학번
  const [email, setEmail] = useState(''); //이메일
  const [ig, setIg] = useState(''); //인스타 아이디
  const [school, setSchool] = useState(''); // 학교
  const [session, setSession] = useState(''); // 세션
  const [MBTI, setMBTI] = useState(''); // MBTI
  const [moto, setMoto] = useState(''); //좌우명

//   const getCards=async()=>{
//     const response = await api.get('/cards')
//     console.log(response)
// }

// useEffect(()=>{
//     getCards();
// },[])


//카드 추가
const addCard=async(event)=>{
  
  event.preventDefault(); //기본 제출 방지
  console.log('addCard',userEmail);

  try{

      const response = await api.post('/cards',{
          
          name :name,
          engName : engName,
          school : school,
          major : major,
          studentNum : studentNum,
          email :email,
          session :session,
          MBTI: MBTI,
          ig: ig,
          moto: moto,
          userEmail: userEmail 
  
      });
   
      console.log('API 응답:', response);
      const { status } = response;
  //입력 후 input 값 초기화
      if (status === 200) {
          console.log('성공');
        
          setName('');
          setEngName('');
          setMajor('');
          setStudentNum('');
          setEmail('');
          setIg('');
          setSchool('');
          setSession('');
          setMBTI('');
          setMoto('');
      } else {
          throw new Error('카드를 추가할 수 없습니다.');
      }
  } catch (err) {
      console.error('에러', err);
  }

  //  가장 최근에 저장된 데이터를 가져와서 상태 업데이트
  const latestData = await getLatestData(); 
  setRecentData(latestData);


  // 데이터 저장 후, 최근 데이터를 부모 창으로 전송
  window.parent.postMessage({
    type: 'recentData',
    data: latestData,
  }, '*');

}

const getLatestData = async () => {
  try {
    // 백엔드에서 모든 카드를 가져오기
    const response = await api.get('/cards');
    const allCards = response.data.data; //allCards 잘 불러와짐. (백엔드 저장 데이터)

    // 모든 카드 중에서 최근에 저장된 카드를 찾기
    const latestCard = findLatestCard(allCards); 
    console.log('최근 카드:',latestCard)

    // 최근에 저장된 카드 반환
    return latestCard;
  } catch (error) {
    console.error('카드를 가져오는 중 에러 발생:', error);
    return error;
  }
};

const findLatestCard = (cards) => {
  if (!Array.isArray(cards) || cards.length === 0) {
    return null;
  }

  try {
    // 카드들을 생성일자 기준으로 정렬 (가장 최근이 맨 앞에 오도록)
    const sortedCards = cards.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // 가장 최근에 저장된 카드 반환
    return sortedCards[0];
  } catch (error) {
    console.error('정렬 중 오류 발생:', error);
    return null;
  }
};

 //이전 페이지로 넘어감
  const backStep = () =>{
    setCurrentStep(currentStep -1);
  };

  //다음 페이지로 넘어감
  const nextStep = () => {
    setCurrentStep(currentStep + 1);

  };


//리액트 웹캠 세팅 
const webcamRef = useRef(null);

const [isWebcamReady, setIsWebcamReady] = useState(false);
const [imgSrc, setImgSrc] = useState(null);

const setRef = (webcam) => {
  webcamRef.current = webcam;
  if (webcam && !isWebcamReady) {
    setIsWebcamReady(true);
  }
};


//클라우디너리에 이미지 저장 로직!
const capture = async () => {
  if (isWebcamReady) {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    // // TODO: imageSrc를 저장하는 로직을 추가하기.
  }
};
  // Cloudinary 업로드

  const uploadImageToCloudinary =async(imageSrc)=>{
  try {
    const cloudinaryUploadEndpoint = `https://api.cloudinary.com/v1_1/duvv5smtd/upload`;
    const formData = new FormData();
    formData.append('file', imageSrc);

    //사용자 태그 추가
    formData.append('tags', userEmail);

    const uploadPreset = 'su9ieks9';
    formData.append('upload_preset', uploadPreset);
   

    // formData.append('upload_preset', 'your_unsigned_upload_preset'); // 서명되지 않은 업로드 프리셋
    // formData.append('tags', 'your_tags'); // 필요한 경우 태그 추가

    const response = await fetch(cloudinaryUploadEndpoint, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
    
      const responseData = await response.json();
      console.log('Cloudinary 업로드 성공:', responseData);
    } else {
      console.error('Cloudinary 업로드 실패:', response.status, response.statusText);
      const errorResponseData = await response.json();
      console.error('에러 응답 데이터:', errorResponseData);
    }
  } catch (error) {
    console.error('Cloudinary 업로드 중 에러:', error);
  }
};

  

  const cloudinaryNextStep = async () => {

      try {
         
        const imageSrc = webcamRef.current.getScreenshot();
        
        if (imageSrc) {
          // Cloudinary 이미지 업로드
          const imageUrl = await uploadImageToCloudinary(imageSrc);
          setCurrentStep(currentStep + 1);
          if (imageUrl) {
            // 이미지가 성공적으로 업로드되면 다음 페이지로 이동
           console.log('이미지 업로드 성공!')
          } else {
            console.error('이미지 업로드 실패');
          }
        } else {
          console.error('웹캠이 준비되지 않았거나 이미지가 없습니다.');
        }
      } catch (error) {
        console.error('이미지 업로드 중 에러:', error);
      }
    
  };
  



const signatureRef = useRef();



  return(


    <div> 
      <Header/>         
      <Title>대학생 명함 문화 주도, 김명사</Title>
      
      {currentStep === 1 && (
        <StyledMyMyungham>
          <h3>화면을 응시해주세요. 촬영이 시작됩니다.</h3>
          <Webcam
            audio={false}
            height={100}
            screenshotFormat="image/jpeg"
            width={280}
            ref={setRef} 
          />

          {imgSrc && (
                      <div>
                        {/* 이미지 표시 */}
                        <img src={imgSrc} alt="Captured Image" style={{ maxWidth: '100%' }} />
                        <h5>*촬영하기를 눌러 재촬영이 가능합니다.</h5>
                      </div>
                      
                    )}  

              <h2>Filters</h2>
              
       
            <button onClick={capture}>촬영하기</button>
            <button onClick={cloudinaryNextStep}>다음</button>


        </StyledMyMyungham>
      )}

         
    {currentStep === 2&& (
        <StyledMyMyungham>
                <h3>서명 페이지</h3>
              <p>화면에 서명을 해주세요.</p>


      <SignatureCanvas
        ref={signatureRef}
        penColor="lightgrey"
        canvasProps={{ width: 400, height: 200, className: 'signature-canvas' }}
      />

            <button onClick={backStep}>이전</button>
            <button onClick={nextStep}>다음</button>


        </StyledMyMyungham>
      )}
      
      
    
      {currentStep === 3 && (
      <StyledMyMyungham>
      <form>

          <input type="text" value={name} name="name" onChange={(event)=>setName(event.target.value)} placeholder="이름"/><br/>
          <input type="text" value={engName} name="engName" onChange={(event)=>setEngName(event.target.value)} placeholder="영문 이름 혹은 닉네임"/><br/>
          <SchoolSelector onSelectSchool={(selectedSchool) => setSchool(selectedSchool)}/>
          <input type="text" value={major} name="major" onChange={(event)=>setMajor(event.target.value)} placeholder="학과"/><br/>
          <input type="text" value={studentNum} name ="studentNum" onChange={(event)=>setStudentNum(event.target.value)} placeholder="학번"/><br/>
          <SessionSelector onSelectSession={(selectedSession) => setSession(selectedSession)}/>
          <MbtiSelector onSelectMBTI={(selectedMBTI) => setMBTI(selectedMBTI)}/>
          <input type="email" name="email" placeholder="이메일을 입력하세요" value={email} onChange={(event) => {
          setEmail(event.target.value);}}/>
          <input type="text" name="ig" placeholder="인스타그램 아이디" value={ig} onChange={(event)=>{setIg(event.target.value)}}/> 
          <input type="text" name="moto" placeholder="좌우명" value={moto} onChange={(event)=>{setMoto(event.target.value)}} />

          <br/> 

          <button onClick={addCard}>인쇄</button>

      </form>

      <button onClick={backStep}>이전</button>
      </StyledMyMyungham>
      )}

    </div>
  )
}

//스타일 컴포넌트
export default styled(MyMyungham)`

  
  height: 100%;
  background: white;
  padding-top: 22px;
  position: relative;
  .top-bars {
    border-bottom: 1px rgb(235, 235, 235) solid;
  }
  .top-bar {
    height: 44px;
  }
  .app-bar {
    height: 58px;
    margin-left: 154px;
    position: relative;
    width: 584px;
  }
  .bar-items {
    display: flex;
    align-items: center;
    position: relative;
    height: 44px;
  }
  .left {
    position: absolute;
    left: 0;
  }
  .right {
    position: absolute;
    right: 4px;
  }
  .logo {
    width: 150px;
    height: 34px;
    padding: 4px 28px 0 30px;
    cursor: pointer;
  }
  .search-bar {
    display: flex;
    align-items: center;
    border-radius: 22px;
    width: 586px;
    height: 46px;
    border: 1px rgb(223, 225, 229) solid;
    padding: 5px 0 0 20px;
    input {
      outline: 0;
      border: 0;
      flex: 1;
      width: 30px;
      font-size: 16px;
    }
    img {
      width: 24px;
      height: 24px;
    }
    .icon {
      width: 40px;
    }
    .icon:nth-of-type(1) {
      cursor: pointer;
    }
    .icon:nth-of-type(2) {
      fill: rgb(66, 133, 244);
      color: rgb(66, 133, 244);
    }
  }
  .functions {
    display: flex;
    align-items: center;
    height: 100%;
    padding-right: 14px;
    img {
      margin: 8px;
      width: 24px;
      cursor: pointer;
      height: 24px;
    }
  }
  .tags {
    height: 100%;
    display: flex;
    font-size: 13px;
    align-items: center;
    color: rgb(119, 119, 119);
  }
  .tag.active {
    color: rgb(26, 115, 232);
    border-bottom: 3px rgb(26, 115, 232) solid;
    font-weight: 700;
  }
  .tag {
    height: 100%;
    cursor: pointer;
    padding: 28px 16px 0;
    &:hover:not(.active) {
      color: rgb(34, 34, 34);
    }
  }

  .content {
    color: rgb(34, 34, 34);
    padding: 55px 0 0 170px;
    p {
      margin: 16px 0;
    }
  }
  #search-in-content {
    font-weight: 700;
  }
  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 83px;
    border-top: 1px solid rgba(0, 0, 0, 0.07);
    background-color: rgba(0, 0, 0, 0.05);
    .upper {
      position: relative;
      color: rgba(0, 0, 0, 0.54);
      width: 100%;
      font-size: 15px;
      padding-bottom: 2px;
      height: 50%;
    }
    .lower {
      position: relative;
      border-top: 1px solid rgba(0, 0, 0, 0.07);
      height: 50%;
      color: rgb(95, 99, 104);
      font-size: 13px;
      width: 100%;
      .item {
        cursor: pointer;
      }
      .item:hover {
        text-decoration: underline;
      }
    }
    .footer-items {
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 150px;
      position: relative;
    }
    .left .item {
      margin-right: 27px;
    }
  }
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

const StyledMyMyungham = styled.div`


  height: 100%;
  background: whitegrey;
  margin-top: 10px;
  position: relative;
  font-family: 'DOSSaemmul';


  form {
    max-width: 400px;
    margin: 0 auto;
    padding: 25px;
    background: #f9f9f9;
    border-radius: 3px;

    input {
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid #ddd;
      outline: none; 
    }
    select {
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid #ddd;
    
      outline: none; 
    }


  h5{
    color:grey;
  }

    button {
      width: 100%;
      padding: 10px;
      background: #f0f0f0;
      border: 1px solid #a0a0a0;
      cursor: pointer;
      color: #000;
      font-size: 14px;
      font-weight: bold;
      transition: background 0.3s, border-color 0.2s;

      &:hover {
        background: #e0e0e0;
        border-color: #909090;
      }

      &:active {
        background: #c0c0c0;
        border-color: #808080;
      }
  }
`;