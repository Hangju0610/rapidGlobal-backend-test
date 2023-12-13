# 과제 진행

## 1. **중계 서버 구축**

Interceptor를 Rate Limit 구축 진행

## 2. **코딩 테스트 진행**

### 1) 상품 카테고리 매칭

Map을 통한 데이터 카테고리 List 구현
Key는 카테고리의 name으로 구성

```JS
const categoryMap = new Map<string, category>(
  categoryList.map((category) => [category.name, category]),
);
```

### 2) 단어 치환

Map을 통한 단어 치환 구성 진행

```JS
const translationMap = new Map<string, string>();
  translateWordList.forEach((value, _) => {
    translationMap.set(value.src, value.dest);
});
```

---

### 중계 서버 구축 가이드

중계 서버를 구축하는 과정은 다음과 같습니다:

<img width="560" alt="스크린샷 2023-12-06 10 32 44" src="https://github.com/rapidglobal-seokhyeon/backend-test/assets/127168148/67f55578-b779-486c-8414-36747c8dd8c2">

1. **클라이언트 요청 수신**
   - 클라이언트는 중계 서버에 요청을 보냅니다.
2. **요청 헤더 처리**

   - 클라이언트의 Request header에는 유저 아이디가 포함되어 있습니다.
     ```
     Header: { id: ‘0000-0000-0000-0000’ }
     ```

3. **A 서버로의 요청 제한 (Rate Limit) 규칙**

   - A 서버는 각 유저 아이디마다 초당 최대 10번의 요청만 처리할 수 있도록 제한을 두고 있습니다.

4. **중계 서버의 Rate Limit**

   - 중계 서버 자체에는 Rate Limit을 적용하면 안됩니다.

5. **요청 가공과 전송**
   - RateLimit 없이 중계서버로 들어오는 요청을 A 서버의 Rate Limit에 걸리지 않도록 가공하여 A 서버로 전송합니다.

#### 중계서버에는 rate Limit을 걸면 안됩니다.

#### Rate Limit없이 들어오는 요청들을 A서버의 RateLimit에 걸리지 않게 가공하셔야 합니다.\*\*

### 코딩 테스트 - 1: 상품 카테고리 매칭

#### 목표

상품을 수집할 때 제공된 키워드를 기반으로 카테고리 목록과 매칭하여 상품에 카테고리 정보를 연결하는 프로세스를 구현합니다.

#### 과정 요약

1. **카테고리 목록**

   - 우리는 다음과 같은 형태의 카테고리 목록이 있습니다:
     ```js
     categoryList: [
       { id: 1, name: '가구' },
       { id: 2, name: '공구' },
       { id: 3, name: '의류' },
       // ...총 1000개의 카테고리
     ];
     ```

2. **상품 수집 방법**

   - 상품을 수집할 때, 카테고리 이름과 상품명을 키워드로 입력 받습니다.
   - 입력 받은 키워드를 카테고리 목록과 매칭하여 상품에 해당 카테고리를 할당합니다.

3. **예시**
   - 예를 들어, 아래와 같이 상품 정보가 수집됩니다:
     `js
{ 
  product: {
    name: '예제 상품명',
    category: {
      id: 1,      // 매칭된 카테고리 ID
      name: '가구' // 매칭된 카테고리 이름
    }
  }
}
`
     이 과정을 통해 각각의 상품에 적절한 카테고리 정보가 연결되어 상품 데이터가 구성됩니다.

### 코딩 테스트 - 2: 단어 치환

#### 목표

옵션 이름에 나타난 특정 단어들을 주어진 단어 치환 목록을 사용하여 변경합니다.

#### 과정 요약

1. **단어 치환 목록**

   - 다음은 치환할 단어와 대상 단어가 포함된 `translateWordList`입니다:
     ```js
     translateWordList: [
       { src: '블랙', dest: '검정색' },
       { src: '레드', dest: '빨간색' },
       // ...n개의 치환 규칙
     ];
     ```

2. **옵션 목록**

   - 상품 옵션 정보를 담고 있는 `optionList`는 다음과 같습니다:
     ```js
     optionList: [
       { id: 1, name: '블랙 XL' },
       { id: 2, name: '블랙 L' },
       { id: 3, name: '블랙 M' },
       { id: 4, name: '레드 XL' },
       { id: 5, name: '레드 L' },
       { id: 6, name: '레드 M' },
       // ...m개의 옵션 정보
     ];
     ```

3. **치환 규칙 적용**
   - 옵션들의 이름에 단어 치환 대상(`src`)이 있으면 해당 단어를 대체 리스트(`dest`)에 있는 단어로 변경해야 합니다.

#### 결과 예시

- 치환 후의 옵션 목록은 다음과 같이 변경될 수 있습니다:
  ```js
  // 변경 후
  updatedOptionList: [
    { id: 1, name: '검정색 XL' },
    { id: 2, name: '검정색 L' },
    { id: 3, name: '검정색 M' },
    { id: 4, name: '빨간색 XL' },
    { id: 5, name: '빨간색 L' },
    { id: 6, name: '빨간색 M' },
    // ...m개의 치환된 옵션 정보
  ];
  ```

이러한 변환 절차를 성공적으로 수행하면 모든 옵션들의 이름이 업데이트 되어 치환 목록에 따른 새로운 옵션명으로 표시됩니다.
