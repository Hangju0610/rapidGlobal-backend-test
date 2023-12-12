import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  proxy() {
    //API 호출
    return true;
  }

  /**
   * 코딩 테스트 - 1: 상품 카테고리 매칭
   *
   * 목표
   * 상품을 수집할 때 제공된 키워드를 기반으로 카테고리 목록과 매칭하여 상품에 카테고리 정보를 연결하는 프로세스를 구현합니다.
   */
  challenge1(): number {
    //함수 실행 시간 반환
    const categoryList = [
      { id: 1, name: '가구' },
      { id: 2, name: '공구' },
      { id: 3, name: '의류' },
    ];
    [...new Array(10000)].forEach((_, index) => {
      categoryList.push({ id: index + 4, name: `카테고리${index + 4}` });
    });

    // interface 구성
    interface category {
      id: number;
      name: string;
    }

    /**
     * categoryList를 Map 자료구조로 변환
     * Map은 hashTable로 구현하기 한다.
     * category를 더욱 빠르게 찾기 위한 방법
     */
    const categoryMap = new Map<string, category>(
      categoryList.map((category) => [category.name, category]),
    );

    const start = Date.now();

    const product = {
      id: 1,
      name: '의자',
      keyword: '카테고리10001',
    };

    /**
     * keyword를 Key로 하여 데이터를 더욱 빠르게 가져온다.
     */
    const category = categoryMap.get(product.keyword);

    const answer = {
      id: product.id,
      name: product.name,
      category,
    };
    const end = Date.now();
    return end - start;
  }

  /**
   * 코딩 테스트 - 2: 단어 치환
   *
   * 목표
   * 옵션 이름에 나타난 특정 단어들을 주어진 단어 치환 목록을 사용하여 변경합니다.
   */
  challenge2(): number {
    const translateWordList = [
      { src: '블랙', dest: '검정색' },
      { src: '레드', dest: '빨간색' },
    ];
    [...new Array(10000)].forEach((_, index) => {
      translateWordList.push({ src: index.toString(), dest: `A` });
    });

    // 띄워쓰기 오타 수정
    const optionList = [
      { id: 1, name: '블랙 XL' },
      { id: 2, name: '블랙 L' },
      { id: 3, name: '블랙 M' },
      { id: 4, name: '레드 XL' },
      { id: 5, name: '레드 L' },
      { id: 6, name: '레드 M' },
    ];
    [...new Array(50)].forEach((_, index) => {
      optionList.push({ id: index + 7, name: `블랙 ${index + 7}` });
    });

    // Map으로 변환
    const translationMap = new Map<string, string>();
    translateWordList.forEach((value, _) => {
      translationMap.set(value.src, value.dest);
    });

    const start = Date.now();

    // 특정 단어 조회 후 치환 작업
    optionList.forEach((data, _) => {
      // 공백을 통해 단어 구분
      const words = data.name.split(' ');
      // 단어 치환 작업 진행
      const translatedWords = words.map(
        // 단어가 있을 경우 치환하고, 없는 경우 기존 단어로 사용
        (word) => translationMap.get(word) || word,
      );
      data.name = translatedWords.join(' ');
    });

    const end = Date.now();
    return end - start;
  }
}
