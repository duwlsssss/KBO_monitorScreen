import React, { useState } from 'react';
import Select from 'react-select';
import useStore from '../store';

const SchoolSelector = ({ onSelectSchool }) => {
  
  const schools = {
    'ㄱ': ['가야대학교','가천대학교','가톨릭관동대학교','가톨릭대학교','감리교신학대학교', '강남대학교', '강서대학교', '강원대학교' , '건국대학교', '건국대(글로컬)', '건양대학교','경기대학교', '경남대학교','경동대학교','경북대학교', '경상국립대학교','경성대학교','경운대학교','경인교육대학교' ,'경일대학교','경주대학교', '경희대학교', '계명대학교' ,'고려대학교','고려대(세종)', '고신대학교', '공군사관학교' ,'공주교육대학교','광신대학교' ,'광운대학교', '광주대학교', ],
    'ㄴ': ['나사렛대학교', '남부대학교', '남서울대학교'],
    'ㄷ': ['단국대학교', '대구대학교' ,'대구가톨릭대학교', '대구경북과학기술원', '대구교육대학교', '대구예술대학교' , '대구한의대학교', '대신대학교',  '대전대학교', '대전가톨릭대학교', '대전신학대학교', '대진대학교', '덕성여자대학교', '동국대학교', '동국대(와이즈)', '동덕여자대학교','동명대학교','동서대학교','동신대학교 ','동아대학교','동양대학교','동의대학교']
    ,'ㄹ': ['루터대학교'] ,
    'ㅁ':['명지대학교 ','목원대학교 ','목포가톨릭대학교'],
    'ㅂ':['배재대학교',' 백석대학교',' 부산대학교',' 부산가톨릭대학교',' 부산교육대학교',' 부산외국어대학교',
    '부산장신대학교'],
    'ㅅ':['서울대학교', '삼육대학교', '상명대학교', '상지대학교','서강대학교','서경대학교','서울과학기술대학교','서울교육대학교','서울기독대학교','서울시립대학교','서울신학대학교','서울여자대학교','서울장신대학교','서울한영대학교','서원대학교','선문대학교','성결대학교','성공회대학교','성균관대학교','성신여자대학교','세명대학교','세종대학교','세한대학교','송원대학교','수원대학교','수원가톨릭대학교','숙명여자대학교','순천향대학교 ','숭실대학교','신경주대학교','신라대학교','신한대학교','서일대학교'],
    'ㅇ':['아신대학교','아주대학교','안양대학교','연세대학교','연세대학교 미래캠퍼스','영남대학교','영남신학대학교','영산대학교','영산선학대학교','예수대학교','예원예술대학교','용인대학교','우석대학교','우송대학교','울산대학교','울산과학기술원','원광대학교','위덕대학교','유원대학교','육군사관학교','을지대학교','이화여자대학교','인제대학교','인천대학교','인천가톨릭대학교','인하대학교'],
    'ㅈ':['장로회신학대학교','전남대학교','전북대학교',' 전주대학교','전주교육대학교','제주대학교',' 제주국제대학교',' 제주한라대학교','조선대학교','중부대학교','중앙대학교','중앙승가대학교','중원대학교','진주교육대학교']
    , 'ㅊ':['차의과학대학교','창신대학교','청운대학교','청주교육대학교','청주대학교','초당대학교','총신대학교','추계예술대학교','춘천교육대학교','충남대학교','충북대학교'],
    'ㅍ':['평택대학교', '포항공과대학교'],
    'ㅎ':['한경국립대학교','한국공학대학교','한국과학기술원','한국교원대학교','한국기술교육대학교','한국방송통신대학교','한국성서대학교','한국예술종합학교','한국외국어대학교','한국전통문화대학교','한국체육대학교','한국침례신학대학교','한국항공대학교','한남대학교','한동대학교','한라대학교','한림대학교','한서대학교','한성대학교','한세대학교','한신대학교','한양대학교','한양대(에리카)','한일장신대학교','해군사관학교','협성대학교','호남대학교','호남신학대학교','호서대학교','호원대학교','홍익대학교','화성의과학대학교']
  };

  // options 배열 생성
  const groupedOptions = Object.entries(schools).map(([initial, names]) => ({
    label: initial,
    options: names.map(name => ({ label: name, value: name }))
  }));

  const { selectedSchool, setSelectedSchool } = useStore();

  const handleChange = selectedOption => {
    setSelectedSchool(selectedOption);
    onSelectSchool(selectedOption.value);
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
    <Select
      name="school"
      value={selectedSchool}
      options={groupedOptions}
      onChange={handleChange}
      placeholder="-- 대학교 선택 --"
      isSearchable={true}
      styles={customStyles}
      formatGroupLabel={data => (
        <div>
          {data.label}
        </div>
      )}
    />
  );
};

//   const [school, setSchool] = useState(''); //학교 (교외 프로젝트)

//   return (
    // <div>
    //   <label htmlFor="university"></label>
    //   <select name="school" value={school} onChange={(event) => {
    //     const selectedSchool = event.target.value;
    //     setSchool(selectedSchool);
    //     onSelectSchool(selectedSchool);
    //   }}>
    //     <option value="" disabled>
    //       -- 대학교 선택 --
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