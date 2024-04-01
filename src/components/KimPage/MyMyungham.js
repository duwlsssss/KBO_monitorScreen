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
import {Cloudinary} from "@cloudinary/url-gen"; 





function MyMyungham(){
  
  
   const [cldData, setCldData] = useState('');


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
  console.log('color',selectedBackground);//pink
  console.log(typeof selectedBackground); //string

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
          userEmail: userEmail,
          backgroundOption: selectedBackground 
  
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

const [lastCapturedImage, setLastCapturedImage] = useState(null);


const capture = async () => {
  if (isWebcamReady) {
    const imageSrc = webcamRef.current.getScreenshot(); //현재 찍은 사진
    setImgSrc(imageSrc);
    setLastCapturedImage(imageSrc);
  }
};

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: 'duvv5smtd'
  },
  url: {
    secure: true
  }
}); //클라우디너리 SDK




const uploadImageToCloudinary = async () => {
  try {
    const response = await api.post('/images', {
      image: lastCapturedImage,
      tags: [userEmail]
    });
    setCldData(response.data);
  } catch (error) {
    console.error('Error uploading image:', error);
    // Handle error
  }
};


  const cloudinaryNextStep = async () => {

      try {
        await uploadImageToCloudinary(lastCapturedImage);
        setCurrentStep(currentStep + 1);

  }catch{
    console.log('사진 업로드 에러 발생')
  }
};


//배경 색깔 선택
const [selectedBackground, setSelectedBackground] = useState(null);

const BackgroundOptions = [
  { name: 'Green', image: 'green.png' },
  { name: 'Pink', image: 'pink.png' },
  { name: 'Yellow', image: 'yellow.png' },
  { name: 'Blue', image: 'blue.png' }
];


const handleBackgroundSelection = (name) => {
  setSelectedBackground(name);
};

//학번 에러 핸들링
const [studentNumError, setStudentNumError] = useState('');

// 학번 입력 값 변경 핸들러
const handleStudentNumChange = (event) => {
  const value = event.target.value;
  // 숫자가 아닌 값이거나 아무런 문자도 입력되지 않은 경우
  if (!/^\d*$/.test(value)) {
    setStudentNumError('* 학번은 숫자만 입력해주세요.'); // 에러 메시지 설정
  } else {
    setStudentNumError(''); // 에러 메시지 초기화
  }
  setStudentNum(value); // 입력 값 설정
};





  return(


    <div> 
      <Header/>         
      <Title>대학생 명함 문화 주도, 김명사</Title>
      
      {currentStep === 1 && (
        <div className="page1">
         
          <h3>화면을 응시해주세요. 촬영이 시작됩니다.</h3>
         
          <div>
     
          <Webcam
            audio={false}
            height={200}
            screenshotFormat="image/jpeg"
            width={300}
            ref={setRef} 
          />
        
        
          </div>
      
         

          {imgSrc && (
                      <div>
                        {/* 이미지 표시 */}
                        <img src={imgSrc} alt="Captured Image" style={{ maxWidth: '100%' }} />
                        <h5>*촬영하기를 눌러 재촬영이 가능합니다.</h5>
                      </div>
                      
                    )}  
              <div className="button-container">
                    <button className="round-button yellow-button" onClick={capture}>촬영하기</button>
                  <button className="round-button red-button"  onClick={cloudinaryNextStep}>다음</button>
             </div>
          {/* {imgSrc && (
          <div>
            <h2>Overlays</h2>
            <Filter>
              {OVERLAYS.map(overlay => {
                return (
                  <li key={overlay} data-is-active-filter={false}>
                    <FilterThumb onClick={() => setOverlay(overlay)}>
                      <img width="100" height="100" src={
                        cloudinary.image(cldData?.public_id)
                          .resize('w_200,h_200')
                          .addTransformation(`l_${overlay}/fl_layer_apply,fl_relative,g_faces,h_1.2,y_-0.05`)
                          .toURL()
                      } alt={overlay} />
                      <span>{ overlay }</span>
                   </FilterThumb>
                  </li>
                )
              })}
            </Filter>
            </div>
            )} */}

       
        </div>
    

        

)}

      
      

      

         
     {currentStep === 2&& (
        <div className="page2">
              <h3>명함 배경 선택</h3>
                
                {BackgroundOptions.map(option => (
           
           <Image
              key={option.image}
              src={option.image}
              alt={option.name}
              onClick={() => handleBackgroundSelection(option.name)}
              style={{ cursor: 'pointer' }}
              
              isSelected={selectedBackground === option.name}
            />

          ))}
  <div className="button-container">
            <button className="round-button green-button" onClick={backStep}>이전</button>
            <button className="round-button red-button"  onClick={nextStep}>다음</button>
        </div>
        </div>
       
      )}

  
      
    
      {currentStep === 3 && (
      <StyledMyMyungham>
      <form>

          <input type="text" value={name} name="name" onChange={(event)=>setName(event.target.value)} placeholder="이름"/><br/>
          <input type="text" value={engName} name="engName" onChange={(event)=>setEngName(event.target.value)} placeholder="영문 이름 혹은 닉네임"/><br/>
          <SchoolSelector onSelectSchool={(selectedSchool) => setSchool(selectedSchool)}/>
          <input type="text" value={major} name="major" onChange={(event)=>setMajor(event.target.value)} placeholder="학과"/><br/>
          <input type="text" value={studentNum} name ="studentNum" onChange={handleStudentNumChange} placeholder="학번"/><br/>
          {studentNumError && <div style={{ color: 'red' }}>{studentNumError}</div>}
          <SessionSelector onSelectSession={(selectedSession) => setSession(selectedSession)}/>
          <MbtiSelector onSelectMBTI={(selectedMBTI) => setMBTI(selectedMBTI)}/>
          <input type="email" name="email" placeholder="이메일을 입력하세요" value={email} onChange={(event) => {
          setEmail(event.target.value);}}/>
          <input type="text" name="ig" placeholder="인스타그램 아이디" value={ig} onChange={(event)=>{setIg(event.target.value)}}/> 
          <input type="text" name="moto" placeholder="좌우명" value={moto} onChange={(event)=>{setMoto(event.target.value)}} />

          <br/> 

         
      </form>
      <div className="button-container">
     
      <button className="round-button green-button"onClick={backStep}>이전</button>
      <button className="round-button red-button" onClick={addCard}>인쇄</button>

      </div>
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


const Image = styled.img`
  width: 120px; /* 이미지의 너비를 조정합니다 */
  height: auto; /* 높이를 자동으로 조정하여 비율을 유지합니다 */
  margin: 5px; /* 이미지 사이의 여백을 조정합니다 */
  cursor: pointer; /* 마우스 커서를 포인터로 변경합니다 */
  border: 2px solid transparent; /* 기본적으로 테두리는 투명으로 설정합니다 */

  /* 선택된 이미지에 테두리를 추가합니다 */
  ${props => props.isSelected && `
    border-color: red; /* 선택된 이미지의 테두리 색상을 지정합니다 */
  `}
`;



// const FilterThumb = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   background: none;
//   padding: 0.5em;
//   border-radius: 0.2em;
//   border: solid 2px ${props => props.theme.colorLightGray};
//   cursor: pointer;

//   &:hover {
//     border: solid 2px ${props => props.theme.colorPurple};
//   }

//   &[data-is-active-filter="true"] {
//     border: solid 2px ${props => props.theme.colorPurple};
//     box-shadow: 0 2px 15px rgba(${props => props.theme.colorPurple}, .5);
//   }

//   span,
//   img {
//     display: block;
//   }

//   img {
//     margin-bottom: .5em;
//   }
// `;

// const Filter = styled.ul`
//   display: grid;
//   grid-gap: .5em;
//   grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
//   list-style: none;
//   padding: 0;
//   margin: 0;
// `;