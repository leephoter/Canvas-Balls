# WE-AR-test-v2
## 갯수, 크기, 속도, 방향이 랜덤인 공의 물리엔진 (공의 무게 무시, 중력 무시, 속도 일정)
https://user-images.githubusercontent.com/69745441/188494603-3b2e7d87-8273-4d11-a5c3-11fbce6c777d.mov


---
## 프로그램 실행 순서
1. `npm install`
2. `npm run bundle`
3. `npm run start`


https://user-images.githubusercontent.com/69745441/188494582-40c44b84-e53b-46cd-a7c4-917f2a1d2a2e.mov


---
## 조건
- 가로 1000, 세로 500 의 canvas
- 10 ~ 20 개의 공이 랜덤한 위치에 생성
- 0 ~ 360 사이에 랜덤한 각도로 공의 이동
- 10px ~ 20px 사이의 랜덤한 반지름의 공
- 200 ~ 400 px/s 사이의 랜덤한 속도의 공
- 공이 벽 (canvas 의 끝) 에 부딪힐 경우 반사각으로 튕김
- 공과 공이 부딪힐 경우 반사각으로 튕김
- 공의 속도는 어느 환경에서도 일정해야 한다

---
## 구현 방법
### canvas 생성
- 가로 1000, 세로 500
- 참고 : https://www.w3schools.com/html/html5_canvas.asp


### circle (공) 생성
1. 랜덤 위치 point (x, y)
    - canvas 내부에 circle 이 생성 되려면 `radius <= x <= 1000 - radius`, `radius <= y <= 500 - radius`
2. 고유값 id
    - circle 끼리 부딪힐 시 주체 판단을 하기 위해 할당
3. 랜덤 반지름 radius
    - `10 <= radius <= 20`
4. 속도 speed
    - 200 ~ 400 px/s
    - 이동 벡터(x, y) 의 스칼라 값이 200 ~ 400 이어야 한다
    - 1초에 60 frame 이동 -> 200 / 60 ~ 400 / 60 px/s
5. 방향 direction (x, y)
    - 각 1도 === pi/180 라디안
    - x: cos(pi/180 * 랜덤 각도)
    - y: sin(pi/180 * 랜덤 각도)
    - 방향을 뜻해야하기 때문에 크기(속도 or 스칼라)가 1인 단위벡터의 x, y 값으로 변환 후 할당


### circle 이동
- 초기 위치 (point) 에 방향 (direction) 만큼 속도를 곱해서 할당
    - `point(x, y) = direction(x, y) * speed`


### canvas 벽에 튕기기
- 세로 벽 부딪힐 시 가로 방향 전환 
    - 기존 방향(x)에 `-direction(x)` 할당
- 가로 벽 부딪힐 시 세로 방향 전환 
    - 기존 방향(y)에 `-direction(y)` 할당


### circle 끼리 튕기기 - 입사각, 반사각
![Screen Shot 2022-09-05 at 3 51 35 PM](https://user-images.githubusercontent.com/69745441/188382956-e41640a5-a409-488c-af81-3671a110eb84.png)

위 그림에서 
- V = 이동하는 circle1 의 direction(x1, y1)
  - `(direction.x1, direction.y1)`
- n = circle1 와 circle2 의 중점 차이 단위 벡터
  - `(x1 - x2, y1 - y2)` 의 단위벡터

출처 : https://ifyouwanna.tistory.com/entry/%EB%B0%98%EC%82%AC%EB%B2%A1%ED%84%B0


---
## 단위벡터 unitVector(x, y) 매서드
- 벡터의 x, y 를 매개변수로 받아 크기(스칼라)가 1이고 방향을 뜻하는 단위벡터의 x, y 를 객체로 반환하는 매서드
- 반환 `x = x * √(1 / x^2 + y^2)`, `y = y * √(1 / x^2 + y^2)`


---
## 특정 범위 내의 랜덤 정수, 실수
 - util 함수로 모듈화
 - 랜덤 정수의 circle 갯수
    - `randomRangeInteger(min, max)`
 - 랜덤 실수의 이동 각도, 반지름, 속도
    - `randomRangeRealNumber(min, max)`


---
## 크로스 브라우징
![Screen Shot 2022-09-05 at 4 59 24 PM](https://user-images.githubusercontent.com/69745441/188398674-d8afb7f9-f9e8-4405-854c-625576d5aa3e.png)
<img width="855" alt="Screen Shot 2022-09-06 at 2 05 58 AM" src="https://user-images.githubusercontent.com/69745441/188493145-924727d6-ba99-40cc-9096-ea97c390fc7e.png">

- 브라우저에 canvas, requestAnimationFrame, es5, es6 등 지원기능
- Polyfill 에서 각 기능을 지원해주도록 sciprt 태그를 추가

<img width="1552" alt="Screen Shot 2022-09-06 at 2 11 45 AM" src="https://user-images.githubusercontent.com/69745441/188493798-cd719c99-a722-4eaa-b91d-88be0b282704.png">

- 지원을 원하는 기능 체크

<img width="1440" alt="Screen Shot 2022-09-06 at 2 13 54 AM" src="https://user-images.githubusercontent.com/69745441/188493943-1fc78e5c-a67f-4990-ba7b-11da1207b0bf.png">

- URL 복사
- `<script src="복사된 URL"></script>` 추가

- Polyfill : https://cdn.polyfill.io/v3/url-builder/ 
- 출처 : https://caniuse.com/

