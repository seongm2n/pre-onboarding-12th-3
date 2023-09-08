# 12차 프리온보딩 프론트엔드 인턴십 3주차 과제

> [한국임상정보 사이트](https://clinicaltrialskorea.com/) 검색영역을 클론해서  
> 검색창 구현 & 검색어 추천 기능 구현 & 캐싱 기능 구현

> api 레파지토리 배포 후 url사용

</br>

<td align="center"><a href="https://github.com/seongm2n"><img align="center" width="50" height="50" src="https://avatars.githubusercontent.com/u/62044613?v=4"/><br /><sub><h3>신성민</h3></sub></a><br /></td>
</br>

## 배포 링크

[3주차 과제 링크](https://pre-onboarding-12th-3-katqmbei5-seongm2n.vercel.app/)

</br>

## 개발 환경

- Environment  
  ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)
  ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
  ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
- Development  
  ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![react-router-dom](https://img.shields.io/badge/react--router--dom-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
  ![Axios](https://img.shields.io/badge/Axios-671CDF?style=for-the-badge&logo=axios&logoColor=white)
  ![Styled-Components](https://img.shields.io/badge/styled--components%20CSS-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white)
  ![React Icons](https://img.shields.io/badge/React%20Icons-E91D63?style=for-the-badge&logo=react&logoColor=white)

</br>

## 프로젝트 구조

```
📦src
 ┣ 📂@types
 ┣ 📂components
 ┃ ┣ 📂commons
 ┃ ┗ 📂search
 ┃ ┃ ┣ 📜RecommendedSearch.tsx
 ┃ ┃ ┣ 📜SearchBar.tsx
 ┃ ┃ ┗ 📜SearchSick.tsx
 ┣ 📂context
 ┃ ┗ 📜DebouncedSearchContext.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useKeyPress.tsx
 ┃ ┗ 📜useOutsideClick.tsx
 ┣ 📂lib
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📜HttpClient.ts
 ┃ ┃ ┗ 📜SearchSickList.ts
 ┃ ┗ 📂cache
 ┃ ┃ ┗ 📜localCache.ts
 ┣ 📂pages
 ┃ ┣ 📜Main.tsx
 ┃ ┗ 📜NotFound.tsx
 ┣ 📂styles
 ┣ 📜App.tsx
 ┗ 📜index.tsx
```

</br>

## 프로젝트 설치 및 실행

프로젝트 패키지 설치

```
npm install
```

프로젝트 실행

```
npm start
```

</br>

## 주요 기능 목표 및 구현 설명

### 질환명 검색 시 API호출을 통해서 검색어 추천 기능 구현
- 처음 구현을 했을 때는 검색에 대한 글자가 하나라도 포함이 되면 검색 글자가 포함된 모든 데이터가 출력이 되었습니다. 이렇게 했을 경우 관련이 없는 데이터도 보이게 됩니다. 그래서 생각해 본 것은    
**검색 한 것에 대한 데이터를 찾고 입력값과 데이터 첫글자와 같은지 비교해서 같으면 추천 검색으로 보여줍니다.** 

- 추천 검색어는 10개 띄워주는 것으로 갯수를 제한해두었습니다.
- 닫기 버튼을 눌렀을 경우 검색창에서 입력한 글자만 없애줍니다.
- 검색창 이외의 공간을 누르게 되면 추천 기능을 보여주는 창을 닫아주고 입력한 글자는 그대로 유지합니다.
- 입력한 검색어나 필터링 기준을 적용할 때, 대소문자를 무시하고 일치하는 항목을 찾기 위해 문자열을 소문자로 변환했습니다.
</br>

### API 호출별로 로컬 캐싱 구현
- 로컬 캐싱이라는 단어가 익숙하지 않아서 어떤 식으로 접근해야 할까 고민이 많았습니다.

- 처음에는 로컬스토리지에 데이터를 저장하는 형식으로 했었는데 이것은 캐싱이 아니라 데이터 저장이라는 생각이 들었습니다.

- 로컬캐싱을 어떤식으로 했는지 팀원들과 얘기를 해본 결과 Cache API 방법을 사용한게 더 최적의 방법이라고 생각이 들었습니다.

- `writeToCache` 함수를 사용하여 데이터를 캐시하고, `readFromCache` 함수를 사용하여 캐시된 데이터를 검색합니다. 이렇게 하면 데이터의 빠른 로딩 및 더 나은 사용자 경험을 제공할 수 있습니다.

- (`EXPIRE_TIME`)만료시간을 설정해 두어서 현재 시간과 비교하여 만료되면 해당 캐시를 삭제합니다.
  </br>

### 입력마다 API호출하지 않도록 API호출 횟수를 줄이는 전략 수립 및 실행
- 일정 시간 동안(350ms로 결정) 입력 값의 변경을 기다렸다가 실제 검색 요청을 보내는 기술인 debouce 처리하였습니다. 이 방법은 사용자 경험 향상 시킵니다. 이를 적용함으로써 불필요한 검색 요청을 줄일 수 있습니다.   
- useEffect를 사용해서 디바운스 구현하여 query상태가 변경될 때마다 디바운스된 검색 쿼리(debouncedQuery)를 업데이트하고 사용자가 입력이 끝난 후에만 검색이 실제로 수행됩니다.
컴포넌트가 언마운트될 때 디바운스 타이머를 해제하고 메모리 누수를 방지합니다.

- 성능 최적화를 위해 api 호출 함수에서 useCallback을 사용해서 렌더링 될 때마다 새로 생성되지 않고 한 번만 생성되고 함수 내부에서 사용하는 의존성 배열에 변화가 없을 때 이전 함수를 재사용합니다.
</br>

### API 호출할 때 마다 console.info("calling api")출력을 통해 콘솔창에서 API호출 횟수 확인
- 캐시가 있을 경우에는 api 호출이 일어나지 않으므로 `console.info("calling api")`가 콘솔에 나오지 않고,   
캐시가 없거나 캐시 사용이 비활성화된 경우 api 호출합니다. 이 경우에는 `console.info("calling api")`가 콘솔에 나옵니다.
</br>

### 키보드만으로 추천 검색어들로 이동 가능하도록 구현
- 키보드 이벤트 처리를 하기 위해 만든 `useKeyPress` 커스텀 훅을 사용했습니다.
- 위쪽 화살표 키 처리
  - `upArrowPressed`는 위쪽 화살표 키를 눌렀을 때 `true`로 설정됩니다.
  - 이전 선택된 항목의 인덱스를 업데이트하고, 항목이 `처음`이면 `마지막 항목`을 선택하고, 그렇지 않으면 `이전 항목`을 선택합니다.
- 아래쪽 화살표 키 처리
  - `downArrowPressed`는 아래쪽 화살표 키를 눌렀을 때 `true`로 설정됩니다.
  - 이전 선택된 항목의 인덱스를 업데이트하고, 항목이 `마지막`이면 `첫 번째 항목`을 선택하고, 그렇지 않으면 `다음 항목`을 선택합니다.
