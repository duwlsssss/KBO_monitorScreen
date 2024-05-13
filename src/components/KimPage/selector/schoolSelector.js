import React, { useState } from 'react';
import Select from 'react-select';
import useStore from '../store';

const SchoolSelector = ({ onSelectSchool }) => {
  
  const schools = {
    'ㄱ': ['가야대','가천대','가톨릭관동대','가톨릭대','감리교신학대', '강남대', '강서대', '강원대' , '건국대', '건국대(글로컬)', '건양대','경기대', '경남대','경동대','경북대', '경상국립대','경성대','경운대','경인교대' ,'경일대','경주대', '경희대', '계명대' ,'고려대','고려대(세종)', '고신대', '공군사관학교' ,'공주교대','광신대' ,'광운대', '광주대', ],
    'ㄴ': ['나사렛대', '남부대', '남서울대'],
    'ㄷ': ['단국대', '대구대' ,'대구가톨릭대', '대구경북과기원', '대구교대', '대구예대' , '대구한의대', '대신대',  '대전대', '대전가톨릭대', '대전신학대', '대진대', '덕성여대', '동국대', '동국대(와이즈)', '동덕여자대','동명대','동서대','동신대 ','동아대','동양대','동의대']
    ,'ㄹ': ['루터대'] ,
    'ㅁ':['명지대 ','목원대 ','목포가톨릭대'],
    'ㅂ':['배재대',' 백석대',' 부산대',' 부산가톨릭대',' 부산교대',' 부산외대',
    '부산장신대'],
    'ㅅ':['서울대', '삼육대', '상명대', '상지대','서강대','서경대','서울과학기술대','서울교대','서울기독대','서울시립대','서울신학대','서울여자대','서울장신대','서울한영대','서원대','선문대','성결대','성공회대','성균관대','성신여자대','세명대','세종대','세한대','송원대','수원대','수원가톨릭대','숙명여자대','순천향대 ','숭실대','신경주대','신라대','신한대','서일대'],
    'ㅇ':['아신대','아주대','안양대','연세대','연세대(미래캠)','영남대','영남신학대','영산대','영산선학대','예수대','예원예대','용인대','우석대','우송대','울산대','울산과기원','원광대','위덕대','유원대','육군사관','을지대','이화여자대','인제대','인천대','인천가톨릭대','인하대'],
    'ㅈ':['장로회신학대','전남대','전북대',' 전주대','전주교대','제주대',' 제주국제대',' 제주한라대','조선대','중부대','중앙대','중앙승가대','중원대','진주교대']
    , 'ㅊ':['차의과학대','창신대','청운대','청주교대','청주대','초당대','총신대','추계예대','춘천교대','충남대','충북대'],
    'ㅍ':['평택대', '포항공대'],
    'ㅎ':['한경국립대','한국공대','한국과기원','한국교원대','한국기술교육대','한국방송통신대','한국성서대','한국예술종합학교','한국외대','한국전통문화대','한국체육대','한국침례신학대','한국항공대','한남대','한동대','한라대','한림대','한서대','한성대','한세대','한신대','한양대','한양대(에리카)','한일장신대','해군사관','협성대','호남대','호남신학대','호서대','호원대','홍익대','화성의과학대']
  };

  // options 배열 생성
  const groupedOptions = [
    ...Object.entries(schools).map(([initial, names]) => ({
      label: initial,
      options: names.map(name => ({ label: name, value: name }))
    })),
    { label: '기타', options: [{ label: '...', value: '' }] }
  ];

  const selectedSchool = useStore(state=>state.selectedSchool);
  const customSchool = useStore(state=>state.customSchool);
  const setSelectedSchool = useStore(state=>state.setSelectedSchool);
  const setCustomSchool = useStore(state=>state.setCustomSchool);

  const handleChange = selectedOption => {
    setSelectedSchool(selectedOption);
    onSelectSchool(selectedOption.value);
    // "기타" 선택 시 customSchool 초기화
    if (selectedOption.value === '기타') {
      setCustomSchool('');
    }
  };

  const handleCustomSchoolChange = event => {
    const value = event.target.value;
    setCustomSchool(value);
    onSelectSchool(value);
  };


  const customStyles = {
    control: (styles) => ({
      ...styles,
      width: '100%',
      padding: 10,
      fontSize: 24,
      borderColor: 'grey',
    }),
    menu: (styles) => ({
      ...styles,
      fontSize: 35
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
        name="school"
        value={selectedSchool}
        options={groupedOptions}
        onChange={handleChange}
        placeholder="-- 대학교 선택 --"
        isSearchable={true}
        styles={customStyles}
        aria-label="분야 선택"
        formatGroupLabel={data => (
          <div>
            {data.label}
          </div>
        )}
      />
      {selectedSchool && selectedSchool.value === '기타' && (
        <input
          type="text"
          placeholder="직접 입력해주세요"
          value={customSchool}
          onChange={handleCustomSchoolChange}
          style={{ width: '100%', padding: '18px', fontSize: '24px', marginTop: '15px' }}
        />
      )}
    </div>
  );
};

//   const [school, setSchool] = useState(''); // (교외 프로젝트)

//   return (
    // <div>
    //   <label htmlFor="university"></label>
    //   <select name="school" value={school} onChange={(event) => {
    //     const selectedSchool = event.target.value;
    //     setSchool(selectedSchool);
    //     onSelectSchool(selectedSchool);
    //   }}>
    //     <option value="" disabled>
    //       -- 대 선택 --
    //     </option>
    //     {Object.entries(schools).map(([initial, schoolList]) => (
    //       <optgroup key={initial} label={initial}>
    //         {schoolList.map((schoolName, index) => (
    //           <option key={index} value={schoolName}>
    //             {schoolName}
    //           </option>
    //         ))}
    //       </optgroup>
    //     ))}
    //   </select>
    // </div>
//   );
// };

export default SchoolSelector;