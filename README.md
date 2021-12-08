![cover](./readme_assets/cover.png)

# My Materials Manager

## 1. Introduction

**My Materials Manager, MMM**은 인테리어 디자이너가 프로젝트에 사용한 자재들을 아카이빙하는 웹 어플리케이션입니다. 카드 형태로 자재를 저장하면 타입 별로 분류되어 쉽게 찾아볼 수 있습니다. 각 아이템은 이미지 파일로 다운받을 수 있고, 즐겨찾기한 목록을 따로 모아보거나 검색해서 자재를 찾을 수 있습니다.

### 프로젝트 기간

- 2021.03.01 - 2021.04.11

### 담당 분야

- 개인 프로젝트

### preview

![preview](./readme_assets/preview.gif)

## 2.Features

- 노트북 화면 사이즈를 중심으로 한 반응형 스타일링

- 이메일 주소로 간편한 회원가입 구현

- 자재 내역 등록/수정/삭제 기능
- 자재 타입 별 분류 기능
- 아이템 별 즐겨찾기 기능
- 아이템 별 pdf로 저장하기 기능

- 즐겨찾기한 아이템 모아보기

- 키워드로 내가 가진 자재 검색하기

## 3. Requirements

- 최신 Chrome 브라우저의 사용을 권장합니다.

## 4. 사용 스킬

### 1) Client

- React
- React Router
- Recoil
- PostCSS
- html2canvas

### 2) Server

- ES2015+
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JSON Web Token
- bcrypt

### 3) Deployment

- Client: Netlify(https://my-materials-manager.netlify.app)
- Server: Heroku(https://my-materials-manager.herokuapp.com/)

## 5. Installation

1. git을 클론합니다.

```
git clone https://github.com/web-doh/mmm.git
cd mmm/
```

2. `.env` 파일을 생성하고 아래 `<>`에 환경변수를 입력한 후, root 디렉토리에 저장합니다.

```
MONGODB_URI=<mongoDB-connection-string>
JWT_SECRET_KEY=<jwt-secret-key>
```

## 6. 프로젝트 관리 툴

- 와이어프레임 설계 : Figma (Contra wireframe kit 응용)
  ![wireframe](./readme_assets/figma.png)

- 업무 관리, API 작성 및 오류 노트 작성 : Notion

- 코드 버전 관리 : Git / Github Desktop

## 7. Challenges

### 1) Webpack 초기 설정

### 2) 네트워크 통신에 대한 이해

<br/>

## 8. Things to do

### 1) 추가하고자 하는 기능

- 아이템을 가격 순, 등록날짜 순 등으로 정렬하기
- My page : 계정을 관리하고, 탈퇴하는 기능
- Social login : 네이버, 카카오 계정 연동
- 아이템 카드 공유하기 기능
- item price input 칸에 환전 API 적용해서 현재 환율로 변환한 가격 보여주기

### 2) 개선점

- TypeScript 적용
- Recoil을 활용한 전역 상태 응용
- 리팩토링
