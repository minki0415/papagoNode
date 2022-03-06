# PapagoNode

* 서비스 소개 : 네이버의 Papago API를 활용하여 한국어, 영어, 일본어 번역을 해주는 웹사이트 구현 (Naver Papago 페이지 클론코딩)

* 프로젝트 기간 : 22/02/23 ~ 22/02/25

* 핵심 기능 : 
  1.🔍 언어 감지 - 입력한 언어가 어떤 언어인지 감지
  2. ⚙ 언어 번역 - 작성된 언어를 선택한 언어로 번역하여 출력


* 실행화면 🖥

 <메인화면>
![image](https://user-images.githubusercontent.com/93183070/156912203-2b9e1dcd-0ffb-454a-ba67-19f74887ba84.png)

 <영어 번역>
![image](https://user-images.githubusercontent.com/93183070/156912240-8bd23d04-cf26-4be3-9835-a95e7e9e48ef.png)

<일본어 번역>
![image](https://user-images.githubusercontent.com/93183070/156912249-a8690504-bb35-415b-a3c9-2deb197dd696.png)


* 트러블 슈팅
  - 문자열 하나하나 입력할 때마다 서버가 갱신되어 효율적으로 번역이되지 않음
  -> setTimeout() 활용하여 1.5초마다 문자를 감지하고 번역하도록 수정

