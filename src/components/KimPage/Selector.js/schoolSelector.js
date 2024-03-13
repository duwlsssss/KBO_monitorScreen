// SchoolSelector.js

import React, { useState } from 'react';

const SchoolSelector = ({ onSelectSchool }) => {
  
  const schools = [

    '가야대학교','가천대학교','가톨릭관동대학교','가톨릭대학교','감리교신학대학교', '강남대학교', '강서대학교', '강원대학교' , '건국대학교', '건국대학교 GLOCAL캠퍼스', '건양대학교','경기대학교', '경남대학교','경동대학교','경북대학교', '경상국립대학교','경성대학교','경운대학교','경인교육대학교' ,'경일대학교','경주대학교', '경희대학교', '계명대학교' ,'고려대학교','고려대학교 세종캠퍼스', '고신대학교', '공군사관학교' ,'공주교육대학교','광신대학교' ,'광운대학교', '광주대학교'
    
  ];

  const [school, setSchool] = useState(''); //학교 (교외 프로젝트)


  return (
    <div>
      <label htmlFor="university"></label>
      <select name="school" value={school} onChange={(event)=>{ setSchool(selectedSchool); const selectedSchool = event.target.value;onSelectSchool(selectedSchool);}}>
       
        <option value="" disabled>
          -- 대학교 선택 --</option>
        {schools.map((school, index) => (
          <option key={index} value={school}>
            {school}
          </option>
        ))}
      </select>

    </div>
  );
};

export default SchoolSelector;