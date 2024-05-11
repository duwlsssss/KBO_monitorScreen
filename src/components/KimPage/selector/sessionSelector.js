import React, { useState } from 'react';
import Select from 'react-select';
import useStore from '../store';

const SessionSelector = ({ onSelectSession }) => {
  // 직업 목록 및 선택된 직업 상태
  const sessions = [
    '3D 그래픽 디자이너',
    '백엔드 개발자',
    '프론트엔드 개발자',
    'UX/UI 디자이너',
    '2D 그래픽 디자이너',
    '게임 개발자',
    '기획자',
    'PM',
    '마케터',
    '교육자',
    '인플루언서',
    '데이터 사이언티스트',
    '연구원',
    '미디어 아티스트',
    'IOT 개발자',
    '데이터베이스 관리자',
    'AI/머신러닝 엔지니어',
    '꿈은 없고요, 그냥 놀고 싶습니다.',
    '기타'
  ];

  const options = sessions.map(session => ({ value: session, label: session }));
  const selectedSession= useStore(state=>state.selectedSession);
  const customSession= useStore(state=>state.customSession);
  const setSelectedSession= useStore(state=>state.setSelectedSession);
  const setCustomSession = useStore(state=>state.setCustomSession);

  const handleChange = selectedOption => {
    setSelectedSession(selectedOption);
    onSelectSession(selectedOption.value);
    // "기타" 선택 시 customSession 초기화
    if (selectedOption.value === '기타') {
      setCustomSession('');
    }
  };

  const handleCustomSessionChange = event => {
    const value = event.target.value;
    setCustomSession(value);
    onSelectSession(value);
  };

  const customStyles = {
    control: (styles) => ({
      ...styles,
      width: '100%',
      fontSize: 24,
      borderColor: 'grey',
    }),
    input: (styles) => ({
      ...styles,
      fontSize: 24
    }),
    option: (styles) => ({
      ...styles,
      fontSize: 24
    }),
  };

  return (
    <div>
      <Select
        name="session"
        value={selectedSession}
        onChange={handleChange}
        options={options}
        placeholder="-- 관심 있는 분야 --"
        isSearchable={false} // 검색 비활성화
        styles={customStyles}
        aria-label="분야 선택"
      />
       {selectedSession && selectedSession.value === '기타' && (
        <input
          type="text"
          placeholder="직접 입력해주세요"
          value={customSession}
          onChange={handleCustomSessionChange}
          style={{ width: '100%', padding: '18px', fontSize: '24px', marginTop: '15px' }}
        />
      )}
    </div>
  );
};


//   const [session, setSession] = useState('');


//   return (
//     <div>
   
//       <select
//         name="session"
//         value={session}
//         onChange={(event)=>{const selectedSession = event.target.value;  setSession(selectedSession); onSelectSession(selectedSession);}}
//         aria-label="분야 선택"
//       >
//         <option value="">-- 관심 있는 분야 --</option>
//         {sessions.map((session, index) => (
//           <option key={index} value={session}>
//             {session}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

export default SessionSelector;
