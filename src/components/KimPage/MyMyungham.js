import React,{ useRef,useEffect, useState  }  from "react";
import { useLocation } from 'react-router-dom';
import Header from "./Header";
import styled from 'styled-components';
import api from '../api/axios'
import useStore from './store';
import { Title } from "./AboutUs";
import Webcam from "react-webcam";
import SchoolSelector from "./selector/schoolSelector";
import MbtiSelector from "./selector/mbtiSelector";
import SessionSelector from "./selector/sessionSelector";
// import {Cloudinary} from "@cloudinary/url-gen"; 
import cameraSound from "./sound/cameraShuter.mp3";
import buttonSound from "./sound/11 버튼선택음.wav";



function MyMyungham(){
  
  const resetMBTI = useStore(state=>state.resetMBTI);
  const resetSession = useStore(state=>state.resetSession);
  const resetSchool = useStore(state=>state.resetSchool);
  const [cldData, setCldData] = useState('');
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(''); // useEmail 상태 추가
  const location = useLocation();

  useEffect(() => {
    // URL에서 useEmail 파라미터 값을 가져오는 로직
    const urlParams = new URLSearchParams(location.search);
    const userEmailParam = urlParams.get('userEmail');
    if(userEmailParam){
      localStorage.setItem('userEmail', userEmailParam);
      setUserEmail(userEmailParam);
      setEmail(userEmailParam);
    } else { //페이지 이동해서 url에 userEmail이 없으면
      const storedEmail = localStorage.getItem('userEmail');
      if (storedEmail) {
        setUserEmail(storedEmail);
        setEmail(storedEmail);
      }
    }
  }, []);  //컴포넌트가 마운트될 때 한 번만 실행

  //userEmail 확인 
  useEffect(()=>{
    console.log("userEmail",userEmail);
  },[userEmail]);

  const [recentData, setRecentData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const [name, setName] = useState(''); //이름
  const [engName, setEngName] = useState (''); //영문 네임 
  const [major, setMajor]= useState (''); //전공 
  const [studentNum, setStudentNum]=useState(''); //학번
  const [ig, setIg] = useState(''); //인스타 아이디
  const [school, setSchool] = useState(''); // 학교
  const [session, setSession] = useState(''); // 세션
  const [MBTI, setMBTI] = useState(''); // MBTI
  const [moto, setMoto] = useState(''); //좌우명
  const [email, setEmail] = useState(''); //이메일
  const FrequencyEmails = [
    '@naver.com',
    '@gmail.com',
    '@daum.net',
    '@hanmail.net',
    '@yahoo.com',
    '@outlook.com',
    '@nate.com',
    '@kakao.com',
  ];
  const [emailList, setEmailList] = useState(FrequencyEmails); //추천 이메일 리스트를 확인, 이메일 리스트 상태 관리
  const [selected, setSelected] = useState(-1); //키보드 선택
  const [isDrobBox, setIsDropbox] = useState(false); // 드롭박스 유무
  const inputRef = useRef(); //외부클릭 감지 확인

  //외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setIsDropbox(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
  }, [inputRef]);
  //이메일 값 담기 드롭박스 상태 관리
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value.includes('@')) {
      setIsDropbox(true);
      setEmailList(
        FrequencyEmails.filter((el) =>
          el.includes(e.target.value.split('@')[1]),
        ),
      );
    } else {
      setIsDropbox(false);
      setSelected(-1);
    }
  };
  //드롭박스 클릭 선택
  const handleDropDownClick = (first, second) => {
    setEmail(`${first.split('@')[0]}${second}`);
    setIsDropbox(false);
    setSelected(-1);
  };
  //드롭박스 키보드로 선택
  const handleKeyUp = (e) => {
    if (isDrobBox) {
      if (e.key === 'ArrowDown' && emailList.length - 1 > selected) {
        setSelected(selected + 1);
      }
      if (e.key === 'ArrowUp' && selected >= 0) {
        setSelected(selected - 1);
      }
      if (e.key === 'Enter' && selected >= 0) {
        handleDropDownClick(email, emailList[selected]);
      }
    }
  };



//   const getCards=async()=>{
//     const response = await api.get('/cards')
//     console.log(response)
// }

// useEffect(()=>{
//     getCards();
// },[])



//카드 추가
const addCard=async(event)=>{

  // console.log('Sending data:', {
  //   name, engName, school, major, studentNum, email, session,
  //   MBTI, ig, moto, userEmail, backgroundOption: selectedBackground,
  //   fontOption: selectedFont, patternOption: selectedPattern,
  //     frameShapeoption: selectedFrameShape, frameOption: selectedFrame
  // });
  
  event.preventDefault(); //기본 제출 방지
  console.log('addCard',userEmail);
  console.log('color',selectedBackground);//pink
  console.log(typeof selectedBackground); //string
  console.log('font',selectedFont);//1~5
  console.log('pattern',selectedPattern);

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
          backgroundOption: selectedBackground,
          fontOption: selectedFont,
          patternOption: selectedPattern,
          frameShapeoption: selectedFrameShape ,
          frameOption: selectedFrame
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
          setMoto('');

          //selector 초기화
          resetMBTI();
          resetSession(); 
          resetSchool();
    
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
    const audio = new Audio(buttonSound);
    audio.play();
  };

  //다음 페이지로 넘어감
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    const audio = new Audio(buttonSound);
    audio.play();

  };


const [timer, setTimer] = useState(0); // 타이머 상태
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

//사진 촬영 함수 
const capture = async () => {
  if (isWebcamReady) {
    const imageSrc = webcamRef.current.getScreenshot(); //현재 찍은 사진
    setImgSrc(imageSrc);
    setLastCapturedImage(imageSrc);

    const audio = new Audio(cameraSound);
    audio.play();
    setTimer(0); // 촬영 후 타이머를 초기화
  }
};

// 타이머 함수
const handleCaptureClick = () => {
  if (timer === 0) { // 타이머가 이미 0이면 카운트다운을 시작
    setTimer(3); // 타이머를 3초로 설정

    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        const nextTimer = prevTimer - 1;
        if (nextTimer > 0) {
          return nextTimer;
        } else {
          clearInterval(countdown);
          capture(); // 타이머가 0이 되면 사진을 촬영
          return 0;
        }
      });
    }, 1000);
  }
};



// const cloudinary = new Cloudinary({
//   cloud: {
//     cloudName: 'duvv5smtd'
//   },
//   url: {
//     secure: true
//   }
// }); //클라우디너리 SDK



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
    setLoading(true); 
      try {
        await uploadImageToCloudinary(lastCapturedImage);
        setCurrentStep(currentStep + 1);
        const audio = new Audio(buttonSound);
        audio.play();
        setLoading(false); 

  }catch{
    console.log('사진 업로드 에러 발생')
  }
};



const [selectedBackground, setSelectedBackground] = useState(null);
const [selectedFont, setSelectedFont] = useState(null);
const [selectedPattern, setSelectedPattern] = useState(null);
const [selectedFrameShape, setSelectedFrameShape] = useState(null);
const [selectedFrame, setSelectedFrame] = useState(null);


//카드 배경 선택
const BackgroundOptions = [
    { name: 'Pink', image: '/front/Pink.png' },
    { name: 'Yellow', image: '/front/Yellow.png' },
    { name: 'Grey', image: '/front/Grey.png' },
    { name: 'Sky', image: '/front/Sky.png' }
  ];

const AuroraBackgroundOptions=[
  { name: 'PinkAurora', image: '/front/PinkAurora.png' },
  { name: 'PurpleAurora', image: '/front/PurpleAurora.png' },
  { name: 'GreyAurora', image: '/front/GreyAurora.png' }
]

const CheckBackgroundOptions=[
  { name: 'PinkCheck', image: '/front/PinkCheck.png' },
  { name: 'PurpleCheck', image: '/front/PurpleCheck.png' },
  { name: 'BlueCheck', image: '/front/BlueCheck.png' }
]

const OtherBackgroundOptions=[
  { name: 'SkyMelt', image: '/front/SkyMelt.png' },
  { name: 'RedMelt', image: '/front/RedMelt.png' },
  { name: 'GreenMilitary', image: '/front/GreenMilitary.png' },
  { name: 'SkyCloud', image: '/front/SkyCloud.png' },
  { name: 'GreenBerry', image: '/front/GreenBerry.png' }
]

const FrameShapeOptions=[
  { name: 'Rec', image: '/frameShape/프레임네모.png' },
  { name: 'Circle', image: '/frameShape/프레임원.png' },

]

let FrameOptions=[];


if (selectedFrameShape === "Rec") {
    FrameOptions = [
      {name: 'RecStar', image:'/frame/네모별.png'},
      {name: 'RecHeart', image:'/frame/네모하트.png'}];
} else if (selectedFrameShape === "Circle") {
    FrameOptions = [
    {name: 'CircleStar', image:'/frame/원별.png'},
    {name: 'CircleHeart', image:'/frame/원하트.png'}]; 
}

//카드 폰트 선택
const FontOptions=[
  { name: '1', image: '/fonts/학교안심봄방학.png'},
  { name: '2' , image: '/fonts/밑미.png'},
  { name: '3' , image: '/fonts/스위트.png'},
  { name: '4' , image: '/fonts/거친둘기마요.png'},
  { name: '5' , image: '/fonts/학교안심붓펜.png'}
]

//카드 패턴 선택 (뒷면)
const PatternOptions=[ 
  { name: 'dot', image: '/pattern/dot.png'},
  { name: 'starGrey', image: '/pattern/starGrey.png'},
  { name: 'starPink', image: '/pattern/starPink.png'},
  { name: 'starSky', image: '/pattern/starSky.png'},
  { name: 'starGreen', image: '/pattern/starGreen.png'},
  { name: 'starBlue', image: '/pattern/starBlue.png'},
  { name: 'starYellow', image: '/pattern/starYellow.png'},
  { name: 'starPurple', image: '/pattern/starPurple.png'},
  { name: 'heartGrey', image: '/pattern/heartGrey.png'},
  { name: 'heartPink', image: '/pattern/heartPink.png'},
  { name: 'heartSky', image: '/pattern/heartSky.png'},
  { name: 'heartGreen', image: '/pattern/heartGreen.png'},
  { name: 'heartBlue', image: '/pattern/heartBlue.png'},
  { name: 'heartYellow', image: '/pattern/heartYellow.png'},
  { name: 'heartPurple', image: '/pattern/heartPurple.png'},

]
//뒷면 패턴
const patternImages={
  "dot": "/pattern/dot.png",
  "starGrey": "/pattern/starGrey.png",
  "starPink": "/pattern/starPink.png",
  "starSky":"/pattern/starSky.png",
  "starGreen": "/pattern/starGreen.png",
  "starBlue":"/pattern/starBlue.png",
  "starYellow": "/pattern/starYellow.png",
  "starPurple":"/pattern/starPurple.png",
  "heartGrey":"/pattern/heartGrey.png",
  "heartPink":"/pattern/heartPink.png",
  "heartSky":"/pattern/heartSky.png",
  "heartGreen":"/pattern/heartGreen.png",
  "heartBlue":"/pattern/heartBlue.png",
  "heartYellow":"/pattern/heartYellow.png",
  "heartPurple":"/pattern/heartPurple.png",
}

//뒷면 색깔
const backgroundImages = {
  "Pink": "/back/Pink.png",
  "Yellow": "/back/Yellow.png",
  "Grey": "/back/Grey.png",
  "Sky": "/back/Sky.png",
  "GreenBerry":"/back/GreenB.png",
  "GreenMilitary": "/back/GreenM.png",
  "PinkAurora" : "/back/Pink.png",
  "PurpleAurora" : "/back/PurpleA.png",
  "GreyAurora" : "/back/GreyA.png",
  "PinkCheck" : "/back/Pink.png",
  "PurpleCheck" : "/back/PurpleC.png",
  "BlueCheck" : "/back/Blue.png",
  "SkyMelt" : "/back/SkyM.png",
  "SkyCloud" : "/back/SkyC.png",
  "RedMelt" : "/back/Pink.png",
};


const handleBackgroundSelection = (name) => {
  setSelectedBackground(name);
};

const handleFontSelection = (name) =>{
  setSelectedFont(name);
}

const handlePatternSelection = (name) =>{
  setSelectedPattern(name);
}

const handleFrameShapeSelection = (name) =>{
  setSelectedFrameShape(name);
}

const handleFrameSelection =(name) =>{
  setSelectedFrame(name);
}
//학번 에러 핸들링
const [studentNumError, setStudentNumError] = useState('');

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
    <> 
    <StyledMyMyungham>
      <Header/>         
      <Title>대학생 명함 문화 주도, 김명사</Title>
      {currentStep === 1 && (
        <div className="page">
          <div className="introduction">촬영하기를 눌러 프로필 촬영을 해주세요.</div>
          <div style={{ position: 'relative', width: '350px', height: '300px' }}>
            <img src="https://www.pngfind.com/pngs/b/129-1294618_camera-screen-png.png" style={{ position: 'absolute', top: 0, left: 0, width: '350px', height: '350px', zIndex: 1 }}/>
            <Webcam
              audio={false}
              mirrored={true}
              height={210}
              screenshotFormat="image/jpeg"
              width={290}
              ref={setRef} 
              style={{ position: 'absolute', top: '130px', left: 0, zIndex: 0 }}
            />     
          </div>
          {imgSrc && (
            <div>
              <img src={imgSrc} alt="Captured Image" style={{ maxWidth: '100%', marginTop:'80px'}} />
              <div className="subIntroduction">* 촬영하기를 눌러 재촬영이 가능합니다.</div>
            </div>
          )}  
          {timer > 0 && (
            <div className="timer">
              <h2>{timer}</h2> 
            </div>
           
          )}
          <div className="button-container-img">
            <button className="round-button yellow-button" onClick={handleCaptureClick}>촬영하기</button>
            <button className="round-button red-button"  onClick={cloudinaryNextStep}>{loading ? '로딩 중...' : '확정!'}</button>
          </div>
        </div>
      )}
      {currentStep === 2&& (
        <div className="page">
          <div className="introduction">사진의 모양과 프레임을 선택해주세요 !</div>
          <div className="choose">사진 모양 선택</div>
          <div>
            {FrameShapeOptions.map(option => (
              <Image
                  key={option.image}
                  src={option.image}
                  onClick={() => handleFrameShapeSelection(option.name)}
                  style={{ cursor: 'pointer' }}
                  isSelected={selectedFrameShape === option.name}
                />
            ))}
          </div> 
          <div className="choose">프레임 선택</div>
          <div>
            {FrameOptions.map(option => (
          <Image
              key={option.image}
              src={option.image}
              onClick={() => handleFrameSelection(option.name)}
              style={{ cursor: 'pointer' }}
              isSelected={selectedFrame === option.name}
            />
          ))}
          </div> 
          <div className="button-container">
            <button className="round-button green-button" onClick={backStep}>이전</button>
            <button className="round-button red-button"  onClick={nextStep}>확정!</button>
          </div>
        </div>
      )}
      {currentStep === 3&& (
        <div className="page">
          <div className="introduction">명함 배경을 선택해보세요 O.u</div>
          <h4>기본 단색 배경</h4>
          <div>
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
          </div>
          <h4>오로라 배경</h4>
          <div>
            {AuroraBackgroundOptions.map(option => (
            <Image
              key={option.image}
              src={option.image}
              alt={option.name}
              onClick={() => handleBackgroundSelection(option.name)}
              style={{ cursor: 'pointer' }}
              isSelected={selectedBackground === option.name}
            />
            ))}
          </div>
          <h4>체크무늬 배경</h4>
          <div>
            {CheckBackgroundOptions.map(option => (
              <Image
                key={option.image}
                src={option.image}
                alt={option.name}
                onClick={() => handleBackgroundSelection(option.name)}
                style={{ cursor: 'pointer' }}
                
                isSelected={selectedBackground === option.name}
              />
            ))}
          </div>
          <h4>기타 배경</h4>
          <div>
            { OtherBackgroundOptions.map(option => (
              <Image
                  key={option.image}
                  src={option.image}
                  alt={option.name}
                  onClick={() => handleBackgroundSelection(option.name)}
                  style={{ cursor: 'pointer' }}
                  
                  isSelected={selectedBackground === option.name}
                />
            ))}
          </div>
          <div className="button-container">
            <button className="round-button green-button" onClick={backStep}>이전</button>
            <button className="round-button red-button"  onClick={nextStep}>확정!</button>
          </div>
        </div>
      )}
      {currentStep === 4&& (
        <div className="page">
          <div className="introduction">마음에 드는 명함 폰트를 선택해보세요. (~˘▾˘)~♫</div>
          <br></br>
          <br></br>
          <br></br>
          <div>
            {FontOptions.map(option => (
              <Image
                  key={option.image}
                  src={option.image}
                  onClick={() => handleFontSelection(option.name)}
                  style={{ cursor: 'pointer' }}
                  isSelected={selectedFont === option.name}
                />
            ))}
          </div> 
          <div className="button-container">
              <button className="round-button green-button" onClick={backStep}>이전</button>
              <button className="round-button red-button"  onClick={nextStep}>확정!</button>
          </div>
        </div>
      )}
      {currentStep === 5&& (
        <div className="page">
          <div className="introduction">뒷면 패턴 선택하기</div>
          <div className="pattern-selection">
            <div className="pattern-container">
              <div className="selected-images">
                <div style={{ position: 'relative', margin: 'auto', width: '200px', height: '300px' }}>
                  {/* 선택된 배경에 따라 해당하는 이미지를 표시 */}
                  {selectedBackground ? (
                    <img src={backgroundImages[selectedBackground]} alt="Selected Background" width="500px" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }} />
                  ):<img src='/back/GreyA.png' alt="default Background" width="500px" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }} />}
                  {/* 선택된 패턴 이미지 표시 */}
                  {selectedPattern && (
                    <img src={patternImages[selectedPattern]} alt="Selected Pattern" width="460px"style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }} />
                  )}
                </div>
              </div>
              {/* 패턴 이미지 선택 */}
              <div className="pattern-options">
                {PatternOptions.map(option => (
                  <Image
                    key={option.image}
                    src={option.image}
                    onClick={() => handlePatternSelection(option.name)}
                    style={{ cursor: 'pointer' }}
                    isSelected={selectedPattern === option.name}
                  />
                ))}
              </div>
            </div>
            <div className="button-container">
              <button className="round-button green-button" onClick={backStep}>이전</button>
              <button className="round-button red-button" onClick={nextStep}>확정!</button>
            </div>
          </div>
        </div>
      )}
      {currentStep === 6&& (
          <>
            <form>
                <input type="text" value={name} name="name" onChange={(event)=>setName(event.target.value)} placeholder="이름" autoComplete="off"/>
                <input type="text" value={engName} name="engName" onChange={(event)=>setEngName(event.target.value)} placeholder="영문 이름 혹은 닉네임" autoComplete="off"/>
                <SchoolSelector onSelectSchool={(selectedSchool) => setSchool(selectedSchool)}/>
                <input type="text" value={major} name="major" onChange={(event)=>setMajor(event.target.value)} placeholder="학과" autoComplete="off"/>
                <input type="text" value={studentNum} name ="studentNum" onChange={handleStudentNumChange} placeholder="학번" autoComplete="off"/>
                {studentNumError && <div style={{ color: 'red' }}>{studentNumError}</div>}
                <SessionSelector onSelectSession={(selectedSession) => setSession(selectedSession)}/>
                <MbtiSelector onSelectMBTI={(selectedMBTI) => setMBTI(selectedMBTI)}/>
                <div ref={inputRef}>
                  <input
                      type="text"
                      name="email"
                      placeholder="이메일"
                      value={email}
                      onChange={(e)=>{onChangeEmail(e)}}
                      onKeyUp={handleKeyUp}
                      autoComplete="off"
                  />
                  {isDrobBox && (
                  <ul>
                    {emailList.map((item, idx) => (
                      <li
                        key={idx}
                        className={selected === idx ? 'selected' : ''}
                        onMouseOver={() => setSelected(idx)}
                        onClick={() => handleDropDownClick(email, item)}
                      >
                        {email.split('@')[0]}{item}
                      </li>
                    ))}
                  </ul>
                )}
                </div>
                <input type="text" name="ig" placeholder="인스타그램 아이디" value={ig} onChange={(event)=>{setIg(event.target.value)}} autoComplete="off"/> 
                <input type="text" name="moto" placeholder="좌우명" value={moto} onChange={(event)=>{setMoto(event.target.value)}} autoComplete="off"/>
            </form>
            <div className="button-container">
              <button className="round-button green-button"onClick={backStep}>이전</button>
              <button className="round-button red-button" onClick={addCard}>인쇄</button>
            </div>
          </>
      )}
      </StyledMyMyungham>
    </>
  )
}


export default MyMyungham;

const StyledMyMyungham = styled.div`
  height: 100%;
  background: whitegrey;
  position: relative;
  font-family: 'DOSSaemmul';

  .introduction{
    font-size: 2rem;
    margin-bottom:1.5rem;
  }
  .subIntroduction{
    font-size: 1rem;
    font-weight: bold;
    margin-top:1rem
    margin-bottom:-4rem;
  }
  .timer {
    position: absolute;
    top: 37%; /* 상위 요소의 가운데로부터 */
    left: 47%; /* 왼쪽 가운데로부터 */
    transform: translate(-50%, -50%); /* 자신의 크기의 절반만큼 좌측과 상단으로 이동 */
    font-size: 60px;  
    color: white;    
    z-index: 10;
  }
  .choose{
    font-size: 1rem;
    font-weight: bold;
    margin:1rem 0;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;  
    max-width: 600px;
    margin: 0 auto;
    padding: 25px;
    background: #f9f9f9;
    border-radius: 10px;

    input {
      width: 100%;          
      padding: 15px;
      border: 1px solid grey;
      border-radius: 4px;
      font-size: 24px;
    }

    ul{
      z-index: 100;
      line-height: 1.5;
      list-style-type: none;
      padding-inline-start: 1em;
    }
    li {
      font-size: 1.3rem;
    }
    .selected {
      background-color: #FEF299;
      color: var(--zu--m4-color);
    }

  }
`;

//명함 배경
const Image = styled.img`
  width: 200px; /* 이미지의 너비를 조정합니다 */
  height: auto; /* 높이를 자동으로 조정하여 비율을 유지합니다 */
  margin: 5px; /* 이미지 사이의 여백을 조정합니다 */
  cursor: pointer; /* 마우스 커서를 포인터로 변경합니다 */
  border: 2px solid transparent; /* 기본적으로 테두리는 투명으로 설정합니다 */
  /* 선택된 이미지에 테두리를 추가합니다 */
  ${props => props.isSelected && `
    border-color: red; /* 선택된 이미지의 테두리 색상을 지정합니다 */
  `}
`;