import React from 'react';
import Select from 'react-select';
import useStore from '../store';

const MbtiSelector = ({ onSelectMBTI }) => {

  const mbtiTypes = [
    'INTJ', 'INFJ', 'ISTJ', 'ISFJ',
    'ENTJ', 'ENFJ', 'ESTJ', 'ESFJ',
    'INTP', 'INFP', 'ISTP', 'ISFP',
    'ENTP', 'ENFP', 'ESTP', 'ESFP'
  ];

  const options = mbtiTypes.map(mbti => ({ value: mbti, label: mbti }));
  const { selectedMBTI, setSelectedMBTI } = useStore();

  const handleChange = selectedOption => {
    setSelectedMBTI(selectedOption);  // Zustand 스토어의 상태도 업데이트
    onSelectMBTI(selectedOption.value);     // 부모 컴포넌트에 선택된 값을 알림
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '100%',
      padding: 10,
      fontSize: 24,
      borderColor: 'grey',
    }),
    input: (provided) => ({
      ...provided,
      fontSize: 24
    }),
    option: (provided) => ({
      ...provided,
      fontSize: 24
    }),
  };

  return (
    <div>
       <Select
        name="mbti"
        value={selectedMBTI}
        onChange={handleChange}
        options={options}
        placeholder="-- MBTI 유형을 선택하세요 --"
        isSearchable={true}
        styles={customStyles}
        aria-label="MBTI 선택"
      />
    </div>
  );
};

export default MbtiSelector;

//   const [MBTI, setMBTI] = useState('');


//   return (
//     <div>
//       <select
//         name="MBTI"
//         value={MBTI}
//         onChange={(event)=>{const selectedMBTI = event.target.value; setMBTI(selectedMBTI); onSelectMBTI(selectedMBTI);}}
//         aria-label="MBTI 유형 선택"
//       >
//         <option value="">-- MBTI 유형을 선택하세요 --</option>
//         {mbtiTypes.map((mbtiType, index) => (
//           <option key={index} value={mbtiType}>
//             {mbtiType}
//           </option>
//         ))}
//       </select>

//     </div>
//   );
// };
