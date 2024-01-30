import React, { useState } from 'react';

const SessionSelector = ({ onSelectSession }) => {
  // 직업 목록 및 선택된 직업 상태
  const sessions = [
    '3D 그래픽 디자이너',
    '백엔드 개발자',
    '프론트엔드 개발자',
    'UX/UI 디자이너',
    '2D 그래픽 디자이너',
    '기획자',
    'PM',
    '마케터',
    '인플루언서'
  ];

  const [session, setSession] = useState('');


  return (
    <div>
   
      <select
        name="session"
        value={session}
        onChange={(event)=>{const selectedSession = event.target.value;  setSession(selectedSession); onSelectSession(selectedSession);}}
        aria-label="분야 선택"
      >
        <option value="">--관심 있는 분야--</option>
        {sessions.map((session, index) => (
          <option key={index} value={session}>
            {session}
          </option>
        ))}
      </select>

    
    </div>
  );
};

export default SessionSelector;