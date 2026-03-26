export interface TransportStep {
  ko: string;
  en: string;
}

export interface HubOption {
  method: string;       // 교통수단 (KO)
  methodEn: string;
  duration: string;
  cost: string;
  costEn: string;
  steps: TransportStep[];
  mapQuery?: string;    // Google Maps 검색어
}

export interface HubInfo {
  hubId: string;
  nameKo: string;
  nameEn: string;
  emoji: string;
  options: HubOption[];
}

export interface RouteTransport {
  firstStopKo: string;
  firstStopEn: string;
  hubs: HubInfo[];
}

// 전체 허브 → 루트 첫 목적지 교통 데이터
export const routeTransport: Record<string, RouteTransport> = {

  // ── 서울 ──────────────────────────────────────────────
  "seoul-hidden-alleys": {
    firstStopKo: "익선동 골목 / 북촌 한옥마을", firstStopEn: "Ikseon-dong / Bukchon Hanok Village",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "공항철도+지하철", methodEn: "AREX + Subway", duration: "약 70분", cost: "₩4,150~", costEn: "₩4,150~",
          steps: [{ ko: "AREX 직통 → 서울역 (43분)", en: "AREX Express → Seoul Station (43min)" }, { ko: "1호선 → 종각역 하차", en: "Line 1 → Jongak Station" }, { ko: "도보 10분으로 익선동 도착", en: "10min walk to Ikseon-dong" }] },
        { method: "공항버스 6001", methodEn: "Airport Bus 6001", duration: "약 70분", cost: "₩17,000", costEn: "₩17,000",
          steps: [{ ko: "인천공항 1층 버스 정류장 탑승", en: "Board at T1/T2 Bus Stop" }, { ko: "종로 5가 하차 → 도보 5분", en: "Get off at Jongno 5-ga → 5min walk" }] }
      ]},
      { hubId: "gimpo", nameKo: "김포공항", nameEn: "Gimpo Airport", emoji: "🛫", options: [
        { method: "5호선 지하철", methodEn: "Subway Line 5", duration: "약 40분", cost: "₩1,500", costEn: "₩1,500",
          steps: [{ ko: "5호선 김포공항역 탑승", en: "Board Line 5 at Gimpo Airport" }, { ko: "광화문역 하차 → 도보 15분", en: "Alight at Gwanghwamun → 15min walk" }] }
      ]},
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "1호선 / 4호선", methodEn: "Subway Line 1/4", duration: "약 15분", cost: "₩1,500", costEn: "₩1,500",
          steps: [{ ko: "서울역 → 종각역 (1호선 2정거장)", en: "Seoul Station → Jongak (Line 1, 2 stops)" }, { ko: "도보 10분으로 익선동", en: "10min walk to Ikseon-dong" }] }
      ]},
    ],
  },

  "seoul-han-river-palace": {
    firstStopKo: "반포 한강공원 / 창덕궁", firstStopEn: "Banpo Han River Park / Changdeokgung",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "공항철도+지하철", methodEn: "AREX + Subway", duration: "약 80분", cost: "₩4,150~", costEn: "₩4,150~",
          steps: [{ ko: "AREX → 서울역 → 4호선 혜화역", en: "AREX → Seoul Stn → Line 4 Hyehwa" }, { ko: "택시 또는 버스로 반포 한강공원 이동 (20분)", en: "Taxi/bus to Banpo Han River Park (20min)" }] }
      ]},
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "지하철 4호선", methodEn: "Subway Line 4", duration: "약 20분", cost: "₩1,500", costEn: "₩1,500",
          steps: [{ ko: "서울역 → 명동 → 동대문역사문화공원", en: "Seoul Stn → Myeongdong → DDP" }, { ko: "3호선 환승 → 안국역 → 창덕궁 도보 5분", en: "Transfer Line 3 → Anguk → Changdeokgung 5min walk" }] }
      ]},
    ],
  },

  "seoul-euljiro-hipsters": {
    firstStopKo: "을지로3가 인쇄 골목", firstStopEn: "Euljiro 3-ga Print Alley",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "공항철도+지하철", methodEn: "AREX + Subway", duration: "약 65분", cost: "₩4,150~", costEn: "₩4,150~",
          steps: [{ ko: "AREX → 서울역 → 2호선 을지로3가역 (20분)", en: "AREX → Seoul Stn → Line 2 Euljiro 3-ga (20min)" }] }
      ]},
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "지하철 2호선", methodEn: "Subway Line 2", duration: "약 20분", cost: "₩1,500", costEn: "₩1,500",
          steps: [{ ko: "서울역 → 시청역 → 을지로3가역", en: "Seoul Stn → City Hall → Euljiro 3-ga" }] }
      ]},
    ],
  },

  "seoul-noryangjin-fish": {
    firstStopKo: "노량진 수산물시장", firstStopEn: "Noryangjin Fish Market",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "공항철도+지하철", methodEn: "AREX + Subway", duration: "약 80분", cost: "₩4,150~", costEn: "₩4,150~",
          steps: [{ ko: "AREX → 서울역 → 1호선 노량진역 (10분)", en: "AREX → Seoul Stn → Line 1 Noryangjin (10min)" }] }
      ]},
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "지하철 1호선", methodEn: "Subway Line 1", duration: "약 10분", cost: "₩1,500", costEn: "₩1,500",
          steps: [{ ko: "서울역 → 노량진역 (1호선 3정거장)", en: "Seoul Stn → Noryangjin (Line 1, 3 stops)" }] }
      ]},
    ],
  },

  // 나머지 서울 루트는 서울역/공항 기준 비슷한 패턴 적용
  "seoul-dobong-forest": {
    firstStopKo: "도봉산역", firstStopEn: "Dobongsan Station (Trail Start)",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "공항철도+지하철", methodEn: "AREX + Subway", duration: "약 90분", cost: "₩4,150~", costEn: "₩4,150~",
          steps: [{ ko: "AREX → 서울역 → 1호선 → 창동역 → 7호선 도봉산역", en: "AREX → Seoul Stn → Line 1 → Changdong → Line 7 Dobongsan" }] }
      ]},
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "지하철 1호선+7호선", methodEn: "Subway Line 1+7", duration: "약 50분", cost: "₩1,750", costEn: "₩1,750",
          steps: [{ ko: "서울역 → 1호선 창동역 → 7호선 도봉산역", en: "Seoul Stn → Line 1 Changdong → Line 7 Dobongsan" }] }
      ]},
    ],
  },

  "seoul-hongdae-mapo": {
    firstStopKo: "홍대 프리마켓 / 경의선 숲길", firstStopEn: "Hongdae Free Market / Gyeongui Line Forest",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "공항철도 직통", methodEn: "AREX Express", duration: "약 55분", cost: "₩9,500", costEn: "₩9,500",
          steps: [{ ko: "AREX 직통 → 홍대입구역 직접 정차", en: "AREX Express → Stops at Hongik Univ. Station directly" }] }
      ]},
      { hubId: "gimpo", nameKo: "김포공항", nameEn: "Gimpo Airport", emoji: "🛫", options: [
        { method: "공항철도", methodEn: "AREX", duration: "약 20분", cost: "₩1,750", costEn: "₩1,750",
          steps: [{ ko: "김포공항역 → AREX → 홍대입구역 (3정거장)", en: "Gimpo Airport → AREX → Hongik Univ. (3 stops)" }] }
      ]},
    ],
  },

  "seoul-jongno-temples": {
    firstStopKo: "조계사 / 인사동", firstStopEn: "Jogyesa Temple / Insadong",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "공항버스 6001", methodEn: "Airport Bus 6001", duration: "약 70분", cost: "₩17,000", costEn: "₩17,000",
          steps: [{ ko: "인천공항 → 종로 3가 정차 → 도보 5분으로 조계사", en: "Incheon Airport → Jongno 3-ga stop → 5min walk to Jogyesa" }] }
      ]},
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "지하철 1호선", methodEn: "Subway Line 1", duration: "약 10분", cost: "₩1,500", costEn: "₩1,500",
          steps: [{ ko: "서울역 → 종각역 (2정거장) → 도보 5분 인사동", en: "Seoul Stn → Jongak (2 stops) → 5min walk to Insadong" }] }
      ]},
    ],
  },

  "seoul-ddp-nightmarket": {
    firstStopKo: "동대문 디자인 플라자 (DDP)", firstStopEn: "Dongdaemun Design Plaza (DDP)",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "공항철도+지하철", methodEn: "AREX + Subway", duration: "약 75분", cost: "₩4,150~", costEn: "₩4,150~",
          steps: [{ ko: "AREX → 서울역 → 4호선 동대문역사문화공원역", en: "AREX → Seoul Stn → Line 4 DDP Station" }] }
      ]},
    ],
  },

  "seoul-daehangno-culture": {
    firstStopKo: "마로니에 공원 / 낙산공원 성곽", firstStopEn: "Marronnier Park / Naksan City Wall",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "공항철도+지하철", methodEn: "AREX + Subway", duration: "약 80분", cost: "₩4,150~", costEn: "₩4,150~",
          steps: [{ ko: "AREX → 서울역 → 4호선 혜화역 (마로니에 공원 도보 3분)", en: "AREX → Seoul Stn → Line 4 Hyehwa (3min walk to Marronnier Park)" }] }
      ]},
    ],
  },

  "seoul-yeouido-finance": {
    firstStopKo: "여의도 한강공원 (벚꽃로)", firstStopEn: "Yeouido Han River Park (Cherry Blossom Road)",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "공항철도+지하철", methodEn: "AREX + Subway", duration: "약 70분", cost: "₩4,150~", costEn: "₩4,150~",
          steps: [{ ko: "AREX → 서울역 → 1호선 → 신길역 → 5호선 여의도역", en: "AREX → Seoul Stn → Line 1 → Singil → Line 5 Yeouido" }] }
      ]},
    ],
  },

  // ── 부산 ──────────────────────────────────────────────
  "busan-beach-village": {
    firstStopKo: "감천문화마을", firstStopEn: "Gamcheon Culture Village",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "국내선 항공", methodEn: "Domestic Flight", duration: "약 1시간 (비행) + 이동 40분", cost: "₩50,000~150,000", costEn: "₩50,000~150,000",
          steps: [{ ko: "인천공항 → 김해공항 (에어부산, 제주항공 등 1시간)", en: "Incheon → Gimhae Airport (1h, AirBusan/Jeju Air)" }, { ko: "김해공항 → 부산도시철도 2호선 → 토성역 하차 (40분)", en: "Gimhae → Busan Metro Line 2 → Tosŏng Station (40min)" }, { ko: "마을버스 1-1 탑승 → 감천문화마을 (10분)", en: "Village Bus 1-1 → Gamcheon Culture Village (10min)" }] },
        { method: "KTX", methodEn: "KTX High-Speed Train", duration: "약 3시간 30분 (서울경유)", cost: "₩59,800~", costEn: "₩59,800~",
          steps: [{ ko: "인천공항 → AREX → 서울역 (43분)", en: "Incheon Airport → AREX → Seoul Station (43min)" }, { ko: "KTX 서울역 → 부산역 (2시간 30분)", en: "KTX Seoul Station → Busan Station (2h30min)" }, { ko: "부산역 → 1호선 → 토성역 → 마을버스", en: "Busan Station → Line 1 → Tosŏng → Village Bus" }] }
      ]},
      { hubId: "gimpo", nameKo: "김포공항", nameEn: "Gimpo Airport", emoji: "🛫", options: [
        { method: "국내선 항공", methodEn: "Domestic Flight", duration: "약 1시간 (비행) + 이동 40분", cost: "₩40,000~120,000", costEn: "₩40,000~120,000",
          steps: [{ ko: "김포공항 → 김해공항 (에어부산 등, 50분)", en: "Gimpo → Gimhae Airport (50min)" }, { ko: "김해공항 → 부산도시철도 → 토성역 → 마을버스", en: "Gimhae → Metro → Tosŏng → Village Bus" }] }
      ]},
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "KTX", methodEn: "KTX High-Speed Train", duration: "약 2시간 50분", cost: "₩59,800~", costEn: "₩59,800~",
          steps: [{ ko: "KTX 서울역 → 부산역 (2시간 30분, 매시 출발)", en: "KTX Seoul Station → Busan Station (2h30min, hourly)" }, { ko: "부산역 → 1호선 → 토성역 (15분)", en: "Busan Station → Line 1 → Tosŏng (15min)" }, { ko: "마을버스 1-1 → 감천문화마을 정류장", en: "Village Bus 1-1 → Gamcheon stop" }] }
      ]},
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 4시간 30분", cost: "₩23,400~33,100", costEn: "₩23,400~33,100",
          steps: [{ ko: "강남 터미널 → 부산사상버스터미널 (4.5시간, 수시 운행)", en: "Gangnam Terminal → Busan Sasang Bus Terminal (4.5h, frequent)" }, { ko: "사상역 → 2호선 → 서면 → 1호선 → 토성역", en: "Sasang → Line 2 → Seomyeon → Line 1 → Tosŏng" }] }
      ]},
    ],
  },

  "busan-haedong-sunrise": {
    firstStopKo: "해동용궁사 (일출 명소)", firstStopEn: "Haedong Yonggungsa Temple (Sunrise Spot)",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "항공+버스", methodEn: "Flight + Bus", duration: "약 2시간 30분", cost: "₩55,000~", costEn: "₩55,000~",
          steps: [{ ko: "인천 → 김해공항 (1시간)", en: "Incheon → Gimhae Airport (1h)" }, { ko: "김해 → 부산역 도시철도 (40분) → 해운대역 (30분)", en: "Gimhae → Busan Station (40min) → Haeundae (30min)" }, { ko: "해운대역 앞 181번 버스 → 해동용궁사 (30분)", en: "Bus 181 from Haeundae → Haedong Yonggungsa (30min)" }] }
      ]},
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "KTX+지하철+버스", methodEn: "KTX + Metro + Bus", duration: "약 3시간 30분", cost: "₩62,000~", costEn: "₩62,000~",
          steps: [{ ko: "KTX 서울역 → 부산역 (2.5h) → 도시철도 2호선 해운대역", en: "KTX → Busan Station → Metro Line 2 → Haeundae" }, { ko: "해운대역 앞 181번 버스 → 해동용궁사 (30분)", en: "Bus 181 → Haedong Yonggungsa (30min)" }] }
      ]},
    ],
  },

  "busan-saha-village": {
    firstStopKo: "암남공원 / 송도 해수욕장", firstStopEn: "Amnam Park / Songdo Beach",
    hubs: [
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "KTX+버스", methodEn: "KTX + Bus", duration: "약 3시간", cost: "₩59,800~", costEn: "₩59,800~",
          steps: [{ ko: "KTX → 부산역 → 1호선 자갈치역 → 도보 또는 버스 30번 송도", en: "KTX → Busan Stn → Line 1 Jagalchi → Bus 30 to Songdo" }] }
      ]},
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "항공+지하철", methodEn: "Flight + Metro", duration: "약 2시간 30분", cost: "₩55,000~", costEn: "₩55,000~",
          steps: [{ ko: "인천 → 김해공항 → 부산 도시철도 2호선 → 서면 → 1호선 자갈치역", en: "Incheon → Gimhae → Metro Line 2 → Seomyeon → Line 1 Jagalchi" }] }
      ]},
    ],
  },

  // 부산 기타 루트 공통 허브
  "busan-temple-mountains": {
    firstStopKo: "범어사", firstStopEn: "Beomeosa Temple",
    hubs: [
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "KTX+지하철", methodEn: "KTX + Metro", duration: "약 3시간", cost: "₩59,800~", costEn: "₩59,800~",
          steps: [{ ko: "KTX → 부산역 → 1호선 범어사역 → 도보 20분", en: "KTX → Busan Stn → Line 1 Beomeosa → 20min walk" }] }
      ]},
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "항공+지하철", methodEn: "Flight + Metro", duration: "약 2시간 30분", cost: "₩55,000~", costEn: "₩55,000~",
          steps: [{ ko: "인천 → 김해 → 도시철도 2호선 → 서면 → 1호선 범어사역", en: "Incheon → Gimhae → Metro → Seomyeon → Beomeosa Station" }] }
      ]},
    ],
  },

  "busan-gijang-seafood": {
    firstStopKo: "기장 중앙시장", firstStopEn: "Gijang Jungang Market",
    hubs: [
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "KTX+동해선", methodEn: "KTX + Donghae Line", duration: "약 3시간 30분", cost: "₩62,000~", costEn: "₩62,000~",
          steps: [{ ko: "KTX → 부산역 → 동해선 기장역 (30분)", en: "KTX → Busan Station → Donghae Line Gijang (30min)" }] }
      ]},
    ],
  },

  "busan-oncheon-spa": {
    firstStopKo: "허심청 온천 (동래)", firstStopEn: "Hurshimchung Spa (Dongnae)",
    hubs: [
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "KTX+지하철", methodEn: "KTX + Metro", duration: "약 3시간", cost: "₩59,800~", costEn: "₩59,800~",
          steps: [{ ko: "KTX → 부산역 → 1호선 온천장역 (20분)", en: "KTX → Busan Station → Line 1 Oncheonjang (20min)" }] }
      ]},
    ],
  },

  "busan-oryukdo-cliff": {
    firstStopKo: "오륙도 스카이워크", firstStopEn: "Oryukdo Skywalk",
    hubs: [
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "KTX+버스", methodEn: "KTX + Bus", duration: "약 3시간 30분", cost: "₩59,800~", costEn: "₩59,800~",
          steps: [{ ko: "KTX → 부산역 → 101번 버스 → 오륙도 스카이워크 (1시간)", en: "KTX → Busan Station → Bus 101 → Oryukdo Skywalk (1h)" }] }
      ]},
    ],
  },

  "busan-choryang-russia": {
    firstStopKo: "초량 이바구길 / 차이나타운", firstStopEn: "Choryang Ibagu-gil / Chinatown",
    hubs: [
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "KTX", methodEn: "KTX", duration: "약 2시간 45분", cost: "₩59,800~", costEn: "₩59,800~",
          steps: [{ ko: "KTX → 부산역 (도보 5분으로 초량 이바구길)", en: "KTX → Busan Station (5min walk to Choryang Ibagu-gil)" }] }
      ]},
    ],
  },

  "busan-eulsuk-birdwatch": {
    firstStopKo: "을숙도 생태공원", firstStopEn: "Eulsuk Eco Park",
    hubs: [
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "KTX+버스", methodEn: "KTX + Bus", duration: "약 3시간 30분", cost: "₩59,800~", costEn: "₩59,800~",
          steps: [{ ko: "KTX → 부산역 → 1호선 하단역 → 도보 15분 을숙도", en: "KTX → Busan Stn → Line 1 Hadan → 15min walk to Eulsuk" }] }
      ]},
    ],
  },

  "busan-nakdong-cycling": {
    firstStopKo: "낙동강 하구 자전거 출발지", firstStopEn: "Nakdong Estuary Cycling Start",
    hubs: [
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "KTX+버스", methodEn: "KTX + Bus", duration: "약 3시간 30분", cost: "₩59,800~", costEn: "₩59,800~",
          steps: [{ ko: "KTX → 부산사상역 → 자전거 대여 후 낙동강 자전거길 출발", en: "KTX → Busan Sasang → Rent bike → Nakdong River Bike Path" }] }
      ]},
    ],
  },

  // ── 제주도 ────────────────────────────────────────────
  "jeju-east-sunrise": {
    firstStopKo: "성산일출봉", firstStopEn: "Seongsan Ilchulbong",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "항공+버스", methodEn: "Flight + Bus", duration: "약 2시간 30분", cost: "₩60,000~180,000", costEn: "₩60,000~180,000",
          steps: [{ ko: "인천공항 → 제주공항 (1시간 10분, 하루 수십 편)", en: "Incheon → Jeju Airport (1h10min, dozens of daily flights)" }, { ko: "제주공항 → 급행 101번 버스 → 성산일출봉 (1시간 20분)", en: "Jeju Airport → Express Bus 101 → Seongsan Ilchulbong (1h20min)" }] }
      ]},
      { hubId: "gimpo", nameKo: "김포공항", nameEn: "Gimpo Airport", emoji: "🛫", options: [
        { method: "항공+버스", methodEn: "Flight + Bus", duration: "약 2시간 30분", cost: "₩50,000~150,000", costEn: "₩50,000~150,000",
          steps: [{ ko: "김포공항 → 제주공항 (55분)", en: "Gimpo → Jeju Airport (55min)" }, { ko: "제주공항 → 버스 101번 → 성산 (1시간 20분)", en: "Jeju Airport → Bus 101 → Seongsan (1h20min)" }] }
      ]},
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "지하철+항공", methodEn: "Subway + Flight", duration: "약 2시간 30분", cost: "₩55,000~", costEn: "₩55,000~",
          steps: [{ ko: "서울역 → 공항철도 → 김포공항 (30분)", en: "Seoul Station → AREX → Gimpo Airport (30min)" }, { ko: "김포공항 → 제주공항 (55분) → 버스 101번 성산", en: "Gimpo → Jeju (55min) → Bus 101 to Seongsan" }] }
      ]},
    ],
  },

  "jeju-west-hallasan": {
    firstStopKo: "한라산 성판악 탐방로 / 영실 탐방로", firstStopEn: "Hallasan Seongpanak / Yeongsil Trail",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "항공+버스", methodEn: "Flight + Bus", duration: "약 2시간", cost: "₩60,000~180,000", costEn: "₩60,000~180,000",
          steps: [{ ko: "인천 → 제주공항 (1시간 10분)", en: "Incheon → Jeju Airport (1h10min)" }, { ko: "제주공항 → 281번 버스 → 성판악 입구 (1시간)", en: "Jeju Airport → Bus 281 → Seongpanak Entrance (1h)" }] }
      ]},
      { hubId: "gimpo", nameKo: "김포공항", nameEn: "Gimpo Airport", emoji: "🛫", options: [
        { method: "항공+버스", methodEn: "Flight + Bus", duration: "약 2시간", cost: "₩50,000~", costEn: "₩50,000~",
          steps: [{ ko: "김포 → 제주공항 (55분) → 281번 버스 성판악", en: "Gimpo → Jeju (55min) → Bus 281 to Seongpanak" }] }
      ]},
    ],
  },

  "jeju-hyeopjae-beach": {
    firstStopKo: "협재 해수욕장", firstStopEn: "Hyeopjae Beach",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "항공+버스", methodEn: "Flight + Bus", duration: "약 2시간", cost: "₩60,000~", costEn: "₩60,000~",
          steps: [{ ko: "인천 → 제주공항 → 102번 버스 → 협재 (45분)", en: "Incheon → Jeju Airport → Bus 102 → Hyeopjae (45min)" }] }
      ]},
    ],
  },

  "jeju-aewol-cafe-road": {
    firstStopKo: "애월 해안도로 카페거리", firstStopEn: "Aewol Coastal Road Cafes",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "항공+렌터카/버스", methodEn: "Flight + Rental Car / Bus", duration: "약 1시간 45분", cost: "₩60,000~ + 렌터카", costEn: "₩60,000~ + Car Rental",
          steps: [{ ko: "인천 → 제주공항 → 렌터카 (애월까지 20분) 또는 702번 버스 (35분)", en: "Incheon → Jeju Airport → Rental car (20min to Aewol) or Bus 702 (35min)" }] }
      ]},
    ],
  },

  "jeju-udo-island": {
    firstStopKo: "우도 (성산항 출발)", firstStopEn: "Udo Island (Ferry from Seongsanhang)",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "항공+버스+배", methodEn: "Flight + Bus + Ferry", duration: "약 3시간", cost: "₩65,000~ + 선박 ₩5,500", costEn: "₩65,000~ + Ferry ₩5,500",
          steps: [{ ko: "인천 → 제주공항 → 버스 101번 → 성산항 (1h20m) → 우도 페리 (15분)", en: "Incheon → Jeju → Bus 101 → Seongsanhang (1h20m) → Ferry to Udo (15min)" }] }
      ]},
    ],
  },

  "jeju-folk-village": {
    firstStopKo: "성읍 민속마을", firstStopEn: "Seongeup Folk Village",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "항공+버스", methodEn: "Flight + Bus", duration: "약 2시간", cost: "₩60,000~", costEn: "₩60,000~",
          steps: [{ ko: "인천 → 제주공항 → 101번 버스 → 표선방면 하차 → 성읍 (1시간)", en: "Incheon → Jeju Airport → Bus 101 → Pyoseon direction → Seongeup (1h)" }] }
      ]},
    ],
  },

  "jeju-olle-trail-7": {
    firstStopKo: "외돌개 / 서귀포 칠십리 공원", firstStopEn: "Oedolgae Rock / Chilsimni Park",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "항공+버스", methodEn: "Flight + Bus", duration: "약 2시간", cost: "₩60,000~", costEn: "₩60,000~",
          steps: [{ ko: "인천 → 제주공항 → 600번 버스 → 서귀포 시내 (1시간) → 외돌개 버스 (10분)", en: "Incheon → Jeju → Bus 600 → Seogwipo City (1h) → Bus to Oedolgae (10min)" }] }
      ]},
    ],
  },

  "jeju-oreum-hiking": {
    firstStopKo: "다랑쉬 오름 / 새별오름", firstStopEn: "Darangswi Oreum / Saebyeol Oreum",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "항공+렌터카", methodEn: "Flight + Rental Car", duration: "약 1시간 45분", cost: "₩60,000~ + 렌터카", costEn: "₩60,000~ + Car Rental",
          steps: [{ ko: "인천 → 제주공항 → 렌터카 필수 (대중교통 접근 불편)", en: "Incheon → Jeju Airport → Rental car strongly recommended (limited public transit)" }, { ko: "제주공항 → 다랑쉬 오름 주차장 (35분)", en: "Jeju Airport → Darangswi Oreum Parking (35min)" }] }
      ]},
    ],
  },

  "jeju-camellia-forest": {
    firstStopKo: "카멜리아힐 / 위미 동백나무 숲", firstStopEn: "Camellia Hill / Wimi Camellia Forest",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "항공+버스", methodEn: "Flight + Bus", duration: "약 2시간", cost: "₩60,000~", costEn: "₩60,000~",
          steps: [{ ko: "인천 → 제주공항 → 600번 급행 → 서귀포 → 위미 방면 버스", en: "Incheon → Jeju → Express 600 → Seogwipo → Bus toward Wimi" }] }
      ]},
    ],
  },

  "jeju-seogwipo-waterfalls": {
    firstStopKo: "정방폭포 / 천지연 폭포", firstStopEn: "Jeongbang / Cheonjiyeon Waterfall",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "항공+버스", methodEn: "Flight + Bus", duration: "약 2시간", cost: "₩60,000~", costEn: "₩60,000~",
          steps: [{ ko: "인천 → 제주공항 → 600번 급행버스 → 서귀포시청 (1시간)", en: "Incheon → Jeju Airport → Express Bus 600 → Seogwipo City Hall (1h)" }, { ko: "시내버스 → 정방폭포 (10분)", en: "Local bus to Jeongbang Waterfall (10min)" }] }
      ]},
    ],
  },

  // ── 경기도 ────────────────────────────────────────────
  "gyeonggi-gapyeong": {
    firstStopKo: "나미섬 (청평춘천 방면)", firstStopEn: "Nami Island",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "공항철도+ITX", methodEn: "AREX + ITX-Cheongchun", duration: "약 2시간", cost: "₩12,000~", costEn: "₩12,000~",
          steps: [{ ko: "AREX → 용산역 → ITX 청춘 → 가평역 (1시간 30분)", en: "AREX → Yongsan → ITX-Cheongchun → Gapyeong Station (1h30min)" }, { ko: "가평역 → 셔틀버스 → 나미섬 선착장 → 배 (5분)", en: "Gapyeong Station → Shuttle Bus → Nami Island Dock → Ferry (5min)" }] }
      ]},
      { hubId: "dong-seoul", nameKo: "동서울터미널", nameEn: "Dong-Seoul Bus Terminal", emoji: "🚌", options: [
        { method: "버스", methodEn: "Bus", duration: "약 1시간 20분", cost: "₩4,700~", costEn: "₩4,700~",
          steps: [{ ko: "동서울터미널 → 가평터미널 (수시운행)", en: "Dong-Seoul Terminal → Gapyeong Terminal (frequent)" }, { ko: "가평 → 나미섬 선착장 (택시 10분 또는 셔틀)", en: "Gapyeong → Nami Island Dock (taxi 10min or shuttle)" }] }
      ]},
    ],
  },

  "gyeonggi-suwon-hwaseong": {
    firstStopKo: "수원 화성 (장안문)", firstStopEn: "Hwaseong Fortress (Janganmun Gate)",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "공항버스", methodEn: "Airport Bus", duration: "약 70분", cost: "₩10,000~", costEn: "₩10,000~",
          steps: [{ ko: "인천공항 → 수원역 직행 버스 (수시 운행)", en: "Incheon Airport → Suwon Station Direct Bus (frequent)" }, { ko: "수원역 → 11번 마을버스 → 화성 장안문 (15분)", en: "Suwon Station → Village Bus 11 → Hwaseong Janganmun (15min)" }] }
      ]},
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "지하철 1호선", methodEn: "Subway Line 1", duration: "약 50분", cost: "₩2,150", costEn: "₩2,150",
          steps: [{ ko: "서울역 → 1호선 수원역 (급행 40분)", en: "Seoul Station → Line 1 Suwon (Express 40min)" }, { ko: "수원역 → 11번 마을버스 → 화성", en: "Suwon → Village Bus 11 → Hwaseong" }] }
      ]},
    ],
  },

  "gyeonggi-paju-dmz": {
    firstStopKo: "임진각 평화공원 / 도라 전망대", firstStopEn: "Imjingak Peace Park / Dora Observatory",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "공항버스+기차", methodEn: "Airport Bus + Train", duration: "약 2시간", cost: "₩5,000~", costEn: "₩5,000~",
          steps: [{ ko: "AREX → 서울역 → 경의중앙선 문산역 (50분) → 버스 099 임진각", en: "AREX → Seoul Stn → Gyeongui Line Munsan (50min) → Bus 099 to Imjingak" }] }
      ]},
      { hubId: "dong-seoul", nameKo: "동서울터미널", nameEn: "Dong-Seoul Bus Terminal", emoji: "🚌", options: [
        { method: "버스+기차", methodEn: "Bus + Train", duration: "약 2시간", cost: "₩5,000~", costEn: "₩5,000~",
          steps: [{ ko: "지하철 → 서울역 → 경의중앙선 문산 → 버스 임진각", en: "Subway → Seoul Station → Munsan Train → Bus to Imjingak" }] }
      ]},
    ],
  },

  "gyeonggi-yeoncheon-dmz": {
    firstStopKo: "철원 평화전망대 / 한탄강 주상절리", firstStopEn: "Cheorwon Peace Observatory / Hantan River Cliffs",
    hubs: [
      { hubId: "dong-seoul", nameKo: "동서울터미널", nameEn: "Dong-Seoul Bus Terminal", emoji: "🚌", options: [
        { method: "버스", methodEn: "Bus", duration: "약 1시간 50분", cost: "₩9,700~", costEn: "₩9,700~",
          steps: [{ ko: "동서울터미널 → 철원터미널 (2시간, 수시)", en: "Dong-Seoul Terminal → Cheorwon Terminal (2h, frequent)" }, { ko: "철원터미널 → 택시 또는 투어버스로 평화전망대", en: "Cheorwon Terminal → Taxi or Tour Bus to Peace Observatory" }] }
      ]},
    ],
  },

  "gyeonggi-icheon-yangpyeong": {
    firstStopKo: "이천 도자기마을 (세계도자기 엑스포)", firstStopEn: "Icheon Ceramics Village",
    hubs: [
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "버스", methodEn: "Bus", duration: "약 1시간", cost: "₩4,200~", costEn: "₩4,200~",
          steps: [{ ko: "강남터미널 → 이천터미널 (50분, 수시)", en: "Gangnam Terminal → Icheon Terminal (50min, frequent)" }] }
      ]},
      { hubId: "dong-seoul", nameKo: "동서울터미널", nameEn: "Dong-Seoul Bus Terminal", emoji: "🚌", options: [
        { method: "버스", methodEn: "Bus", duration: "약 1시간 10분", cost: "₩4,200~", costEn: "₩4,200~",
          steps: [{ ko: "동서울터미널 → 이천터미널 (1시간, 수시)", en: "Dong-Seoul Terminal → Icheon Terminal (1h, frequent)" }] }
      ]},
    ],
  },

  "gyeonggi-pocheon-artvalley": {
    firstStopKo: "포천 아트밸리 채석장 호수", firstStopEn: "Pocheon Art Valley Quarry Lake",
    hubs: [
      { hubId: "dong-seoul", nameKo: "동서울터미널", nameEn: "Dong-Seoul Bus Terminal", emoji: "🚌", options: [
        { method: "버스", methodEn: "Bus", duration: "약 1시간 20분", cost: "₩4,500~", costEn: "₩4,500~",
          steps: [{ ko: "동서울터미널 → 포천터미널 (1시간 10분)", en: "Dong-Seoul → Pocheon Terminal (1h10min)" }, { ko: "포천터미널 → 아트밸리행 버스 (138번)", en: "Pocheon Terminal → Bus 138 to Art Valley" }] }
      ]},
    ],
  },

  "gyeonggi-namyangju-tea": {
    firstStopKo: "물의 정원 / 팔당대교 카페거리", firstStopEn: "Mulbyeol Water Garden / Paldang Cafe Strip",
    hubs: [
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "경의중앙선", methodEn: "Gyeongui-Jungang Line", duration: "약 40분", cost: "₩1,750", costEn: "₩1,750",
          steps: [{ ko: "서울역 → 경의중앙선 → 팔당역 (40분)", en: "Seoul Station → Gyeongui-Jungang Line → Paldang Station (40min)" }] }
      ]},
    ],
  },

  "gyeonggi-yongin-folk": {
    firstStopKo: "한국민속촌", firstStopEn: "Korean Folk Village",
    hubs: [
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "버스 or 지하철", methodEn: "Bus or Subway", duration: "약 1시간 10분", cost: "₩2,150~", costEn: "₩2,150~",
          steps: [{ ko: "강남 → 지하철 신분당선 → 수원 → 민속촌 셔틀버스", en: "Gangnam → Sinbundang Line → Suwon → Folk Village Shuttle" }] }
      ]},
    ],
  },

  "gyeonggi-ansan-daebudo": {
    firstStopKo: "대부도 갯벌 체험장", firstStopEn: "Daebudo Tidal Flat Experience",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "지하철+버스", methodEn: "Subway + Bus", duration: "약 1시간 30분", cost: "₩2,500~", costEn: "₩2,500~",
          steps: [{ ko: "공항철도 → 안산역 → 버스 → 대부도 (30분)", en: "AREX → Ansan Station → Bus → Daebudo (30min)" }] }
      ]},
    ],
  },

  "gyeonggi-hwaseong-tourism": {
    firstStopKo: "화성시 코스모스 들판 / 고암저수지", firstStopEn: "Hwaseong Cosmos Road / Goam Reservoir",
    hubs: [
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "지하철+버스", methodEn: "Subway + Bus", duration: "약 1시간 20분", cost: "₩2,500~", costEn: "₩2,500~",
          steps: [{ ko: "서울역 → 1호선 → 병점역 → 버스 50 → 화성 들판", en: "Seoul Stn → Line 1 → Byeongjeom → Bus 50 → Hwaseong Farmland" }] }
      ]},
    ],
  },

  // ── 강원도 ────────────────────────────────────────────
  "gangwon-east-coast": {
    firstStopKo: "속초 중앙시장 / 속초 해수욕장", firstStopEn: "Sokcho Market / Sokcho Beach",
    hubs: [
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "공항철도+버스", methodEn: "AREX + Bus", duration: "약 3시간", cost: "₩23,500~", costEn: "₩23,500~",
          steps: [{ ko: "AREX → 동서울터미널 (1시간) → 속초 고속버스 (2시간 30분)", en: "AREX → Dong-Seoul Terminal (1h) → Sokcho Express Bus (2h30min)" }] }
      ]},
      { hubId: "dong-seoul", nameKo: "동서울터미널", nameEn: "Dong-Seoul Bus Terminal", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 2시간 30분", cost: "₩19,000~25,000", costEn: "₩19,000~25,000",
          steps: [{ ko: "동서울터미널 → 속초터미널 (2시간 30분, 매시 운행)", en: "Dong-Seoul Terminal → Sokcho Terminal (2h30min, hourly)" }] }
      ]},
    ],
  },

  "gangwon-rail-mountain": {
    firstStopKo: "정선 레일바이크 (구절리역)", firstStopEn: "Jeongseon Rail Bike (Gujeol-ri Station)",
    hubs: [
      { hubId: "dong-seoul", nameKo: "동서울터미널", nameEn: "Dong-Seoul Bus Terminal", emoji: "🚌", options: [
        { method: "버스", methodEn: "Bus", duration: "약 2시간 40분", cost: "₩15,000~", costEn: "₩15,000~",
          steps: [{ ko: "동서울터미널 → 정선터미널 (2시간 30분)", en: "Dong-Seoul Terminal → Jeongseon Terminal (2h30min)" }, { ko: "정선터미널 → 레일바이크 셔틀 (20분)", en: "Jeongseon Terminal → Rail Bike Shuttle (20min)" }] }
      ]},
    ],
  },

  "gangwon-samcheok-ocean": {
    firstStopKo: "삼척 해양 레일바이크 / 장호항", firstStopEn: "Samcheok Ocean Rail Bike / Jangho Port",
    hubs: [
      { hubId: "dong-seoul", nameKo: "동서울터미널", nameEn: "Dong-Seoul Bus Terminal", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 3시간", cost: "₩22,000~", costEn: "₩22,000~",
          steps: [{ ko: "동서울터미널 → 삼척터미널 (3시간)", en: "Dong-Seoul Terminal → Samcheok Terminal (3h)" }] }
      ]},
    ],
  },

  "gangwon-goseong-highland": {
    firstStopKo: "화진포 호수 / 안반데기 고원", firstStopEn: "Hwajinpo Lake / Anbandegi Highland Farm",
    hubs: [
      { hubId: "dong-seoul", nameKo: "동서울터미널", nameEn: "Dong-Seoul Bus Terminal", emoji: "🚌", options: [
        { method: "버스", methodEn: "Bus", duration: "약 3시간 30분", cost: "₩22,000~", costEn: "₩22,000~",
          steps: [{ ko: "동서울 → 속초 → 간성터미널 → 화진포 (현지 택시 필요)", en: "Dong-Seoul → Sokcho → Ganseong Terminal → Hwajinpo (local taxi needed)" }] }
      ]},
    ],
  },

  "gangwon-hongcheon-wellness": {
    firstStopKo: "홍천강 래프팅 / 웰리힐리파크", firstStopEn: "Hongcheon River Rafting / Wellihill Park",
    hubs: [
      { hubId: "dong-seoul", nameKo: "동서울터미널", nameEn: "Dong-Seoul Bus Terminal", emoji: "🚌", options: [
        { method: "버스", methodEn: "Bus", duration: "약 1시간 30분", cost: "₩8,000~", costEn: "₩8,000~",
          steps: [{ ko: "동서울터미널 → 홍천터미널 (1시간 20분, 수시 운행)", en: "Dong-Seoul Terminal → Hongcheon Terminal (1h20min, frequent)" }] }
      ]},
    ],
  },

  "gangwon-inje-secret": {
    firstStopKo: "내린천 / 방태산 계곡", firstStopEn: "Naerincheon Valley / Bangtaesan Valley",
    hubs: [
      { hubId: "dong-seoul", nameKo: "동서울터미널", nameEn: "Dong-Seoul Bus Terminal", emoji: "🚌", options: [
        { method: "버스", methodEn: "Bus", duration: "약 2시간", cost: "₩12,000~", costEn: "₩12,000~",
          steps: [{ ko: "동서울터미널 → 인제터미널 (1시간 50분)", en: "Dong-Seoul Terminal → Inje Terminal (1h50min)" }] }
      ]},
    ],
  },

  "gangwon-inje-rafting": {
    firstStopKo: "내린천 래프팅 (인제)", firstStopEn: "Naerincheon Whitewater Rafting (Inje)",
    hubs: [
      { hubId: "dong-seoul", nameKo: "동서울터미널", nameEn: "Dong-Seoul Bus Terminal", emoji: "🚌", options: [
        { method: "버스", methodEn: "Bus", duration: "약 1시간 50분", cost: "₩12,000~", costEn: "₩12,000~",
          steps: [{ ko: "동서울터미널 → 인제터미널 → 래프팅 업체 픽업", en: "Dong-Seoul → Inje Terminal → Rafting operator pickup" }] }
      ]},
    ],
  },

  "gangwon-samcheok-caves": {
    firstStopKo: "환선굴 (삼척)", firstStopEn: "Hwanseon Cave (Samcheok)",
    hubs: [
      { hubId: "dong-seoul", nameKo: "동서울터미널", nameEn: "Dong-Seoul Bus Terminal", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 3시간 30분", cost: "₩22,000~", costEn: "₩22,000~",
          steps: [{ ko: "동서울 → 삼척터미널 (3시간) → 버스 환선굴 방면", en: "Dong-Seoul → Samcheok Terminal (3h) → Bus to Hwanseon Cave" }] }
      ]},
    ],
  },

  "gangwon-hongcheon-ginkgo": {
    firstStopKo: "홍천 은행나무 숲 (10월 한정)", firstStopEn: "Hongcheon Ginkgo Forest (October Only)",
    hubs: [
      { hubId: "dong-seoul", nameKo: "동서울터미널", nameEn: "Dong-Seoul Bus Terminal", emoji: "🚌", options: [
        { method: "버스", methodEn: "Bus", duration: "약 1시간 40분", cost: "₩8,000~", costEn: "₩8,000~",
          steps: [{ ko: "동서울터미널 → 홍천터미널 → 은행나무숲 셔틀 (10월 운행)", en: "Dong-Seoul → Hongcheon → Ginkgo Forest Shuttle (October service)" }] }
      ]},
    ],
  },

  "gangwon-hwacheon-ice-festival": {
    firstStopKo: "화천 산천어 축제 (1월-2월)", firstStopEn: "Hwacheon Ice Fishing Festival (Jan-Feb)",
    hubs: [
      { hubId: "dong-seoul", nameKo: "동서울터미널", nameEn: "Dong-Seoul Bus Terminal", emoji: "🚌", options: [
        { method: "고속버스 (축제 시즌 전용)", methodEn: "Express Bus (Festival Season)", duration: "약 2시간", cost: "₩10,500~", costEn: "₩10,500~",
          steps: [{ ko: "동서울터미널 → 화천터미널 (1시간 50분, 축제 기간 증편)", en: "Dong-Seoul → Hwacheon Terminal (1h50min, extra buses during festival)" }] }
      ]},
    ],
  },

  // ── 충청도 ────────────────────────────────────────────
  "chungnam-baekje": {
    firstStopKo: "공산성 / 국립공주박물관", firstStopEn: "Gongsanseong Fortress / National Gongju Museum",
    hubs: [
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 1시간 40분", cost: "₩10,700~", costEn: "₩10,700~",
          steps: [{ ko: "강남터미널 → 공주터미널 (1시간 30분)", en: "Gangnam Terminal → Gongju Terminal (1h30min)" }] }
      ]},
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "KTX+버스", methodEn: "KTX + Bus", duration: "약 1시간 30분", cost: "₩21,700~", costEn: "₩21,700~",
          steps: [{ ko: "KTX 서울역 → 공주역 (50분) → 버스 → 시내 (20분)", en: "KTX Seoul → Gongju Station (50min) → Bus → City Center (20min)" }] }
      ]},
    ],
  },

  "chungbuk-danyang": {
    firstStopKo: "도담삼봉 / 고수동굴", firstStopEn: "Dodamsambong Peaks / Gosu Cave",
    hubs: [
      { hubId: "dong-seoul", nameKo: "동서울터미널", nameEn: "Dong-Seoul Bus Terminal", emoji: "🚌", options: [
        { method: "버스", methodEn: "Bus", duration: "약 2시간", cost: "₩14,000~", costEn: "₩14,000~",
          steps: [{ ko: "동서울터미널 → 단양터미널 (2시간, 수시)", en: "Dong-Seoul Terminal → Danyang Terminal (2h, frequent)" }] }
      ]},
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "무궁화호+버스", methodEn: "Train + Bus", duration: "약 2시간 30분", cost: "₩14,400~", costEn: "₩14,400~",
          steps: [{ ko: "서울역 → 청량리역 → 무궁화호 단양역 (2시간)", en: "Seoul → Cheongnyangni → Train to Danyang Station (2h)" }] }
      ]},
    ],
  },

  "chungnam-taean-coast": {
    firstStopKo: "신두리 해안사구 / 몽산포 해수욕장", firstStopEn: "Sinduri Coastal Sand Dunes / Mongsanpo Beach",
    hubs: [
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 2시간 20분", cost: "₩14,200~", costEn: "₩14,200~",
          steps: [{ ko: "강남터미널 → 태안터미널 (2시간 10분)", en: "Gangnam Terminal → Taean Terminal (2h10min)" }] }
      ]},
    ],
  },

  "chungnam-boryeong-asan": {
    firstStopKo: "대천 해수욕장 / 보령 머드 축제장", firstStopEn: "Daecheon Beach / Boryeong Mud Festival",
    hubs: [
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 2시간", cost: "₩14,700~", costEn: "₩14,700~",
          steps: [{ ko: "강남터미널 → 대천터미널 (1시간 50분, 수시)", en: "Gangnam Terminal → Daecheon Terminal (1h50min, frequent)" }] }
      ]},
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "KTX+버스", methodEn: "KTX + Bus", duration: "약 1시간 40분", cost: "₩33,000~", costEn: "₩33,000~",
          steps: [{ ko: "KTX 서울역 → 신대전역 (50분) → 버스 대천", en: "KTX Seoul → Daejeon (50min) → Bus to Daecheon" }] }
      ]},
    ],
  },

  "chungnam-gongju-baekje": {
    firstStopKo: "공산성 / 송산리 고분군", firstStopEn: "Gongsanseong Fortress / Songsan-ri Royal Tombs",
    hubs: [
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 1시간 40분", cost: "₩10,700~", costEn: "₩10,700~",
          steps: [{ ko: "강남터미널 → 공주터미널 (1시간 30분)", en: "Gangnam Terminal → Gongju Terminal (1h30min)" }] }
      ]},
    ],
  },

  "chungnam-boryeong-mud": {
    firstStopKo: "대천 해수욕장 (머드 체험)", firstStopEn: "Daecheon Beach (Mud Experience)",
    hubs: [
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 2시간", cost: "₩14,700~", costEn: "₩14,700~",
          steps: [{ ko: "강남터미널 → 대천터미널 (1시간 50분)", en: "Gangnam Terminal → Daecheon Terminal (1h50min)" }] }
      ]},
    ],
  },

  "chungbuk-chungju-lake": {
    firstStopKo: "충주호 선착장 (탄금호)", firstStopEn: "Chungju Lake Ferry Dock",
    hubs: [
      { hubId: "dong-seoul", nameKo: "동서울터미널", nameEn: "Dong-Seoul Bus Terminal", emoji: "🚌", options: [
        { method: "버스", methodEn: "Bus", duration: "약 1시간 40분", cost: "₩9,400~", costEn: "₩9,400~",
          steps: [{ ko: "동서울터미널 → 충주터미널 (1시간 30분)", en: "Dong-Seoul Terminal → Chungju Terminal (1h30min)" }] }
      ]},
    ],
  },

  "chungnam-seosan-birds": {
    firstStopKo: "천수만 철새 도래지 / 간월호", firstStopEn: "Cheonsu Bay Bird Sanctuary / Ganwol Lake",
    hubs: [
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 2시간", cost: "₩13,000~", costEn: "₩13,000~",
          steps: [{ ko: "강남터미널 → 서산터미널 (1시간 50분) → 버스 천수만", en: "Gangnam Terminal → Seosan Terminal (1h50min) → Bus to Cheonsu Bay" }] }
      ]},
    ],
  },

  "chungbuk-songnisan": {
    firstStopKo: "법주사 / 속리산 국립공원", firstStopEn: "Beopjusa Temple / Songnisan National Park",
    hubs: [
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 2시간 30분", cost: "₩13,900~", costEn: "₩13,900~",
          steps: [{ ko: "강남터미널 → 속리산터미널 (2시간 20분, 법주사 도보 5분)", en: "Gangnam Terminal → Songnisan Terminal (2h20min, 5min walk to Beopjusa)" }] }
      ]},
    ],
  },

  "chungnam-hongseong-namhang": {
    firstStopKo: "홍성 남항 웅천 수산물 시장", firstStopEn: "Hongseong Namhang Seafood Market",
    hubs: [
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 2시간", cost: "₩12,000~", costEn: "₩12,000~",
          steps: [{ ko: "강남터미널 → 홍성터미널 (1시간 50분) → 택시 15분 남항", en: "Gangnam Terminal → Hongseong Terminal (1h50min) → Taxi 15min to Namhang" }] }
      ]},
    ],
  },

  // ── 경상도 ────────────────────────────────────────────
  "gyeongnam-south-sea": {
    firstStopKo: "통영 케이블카 / 소매물도 선착장", firstStopEn: "Tongyeong Cable Car / Somaemuldo Ferry",
    hubs: [
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "KTX+버스", methodEn: "KTX + Bus", duration: "약 3시간 30분", cost: "₩42,000~", costEn: "₩42,000~",
          steps: [{ ko: "KTX 서울역 → 진주역 (2시간 20분) → 버스 → 통영터미널 (50분)", en: "KTX Seoul → Jinju Station (2h20min) → Bus → Tongyeong Terminal (50min)" }] }
      ]},
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 4시간", cost: "₩22,000~31,000", costEn: "₩22,000~31,000",
          steps: [{ ko: "강남터미널 → 통영터미널 (4시간, 수시)", en: "Gangnam Terminal → Tongyeong Terminal (4h, frequent)" }] }
      ]},
    ],
  },

  "gyeongbuk-andong": {
    firstStopKo: "하회마을 / 도산서원", firstStopEn: "Hahoe Folk Village / Dosan Seowon",
    hubs: [
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "KTX+버스", methodEn: "KTX + Bus", duration: "약 2시간 30분", cost: "₩30,000~", costEn: "₩30,000~",
          steps: [{ ko: "KTX 서울역 → 동대구역 (1시간 40분) → 버스 안동터미널 (50분)", en: "KTX Seoul → Dongdaegu (1h40min) → Bus Andong Terminal (50min)" }, { ko: "안동터미널 → 하회마을 버스 46번 (30분)", en: "Andong Terminal → Hahoe Village Bus 46 (30min)" }] }
      ]},
      { hubId: "dong-seoul", nameKo: "동서울터미널", nameEn: "Dong-Seoul Bus Terminal", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 3시간 30분", cost: "₩22,200~", costEn: "₩22,200~",
          steps: [{ ko: "동서울터미널 → 안동터미널 (3시간 30분, 수시)", en: "Dong-Seoul Terminal → Andong Terminal (3h30min, frequent)" }] }
      ]},
    ],
  },

  "gyeongbuk-gyeongju": {
    firstStopKo: "불국사 / 첨성대", firstStopEn: "Bulguksa Temple / Cheomseongdae Observatory",
    hubs: [
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "KTX", methodEn: "KTX", duration: "약 2시간 10분", cost: "₩47,000~", costEn: "₩47,000~",
          steps: [{ ko: "KTX 서울역 → 신경주역 (2시간 10분)", en: "KTX Seoul Station → Singyeongju Station (2h10min)" }, { ko: "신경주역 → 700번 버스 → 불국사 (30분)", en: "Singyeongju → Bus 700 → Bulguksa Temple (30min)" }] }
      ]},
      { hubId: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️", options: [
        { method: "공항철도+KTX", methodEn: "AREX + KTX", duration: "약 3시간", cost: "₩51,000~", costEn: "₩51,000~",
          steps: [{ ko: "AREX → 서울역 (43분) → KTX → 신경주역 (2시간 10분)", en: "AREX → Seoul Stn (43min) → KTX → Singyeongju (2h10min)" }] }
      ]},
    ],
  },

  "gyeongnam-hadong-tea": {
    firstStopKo: "화개장터 / 쌍계사 녹차밭", firstStopEn: "Hwagae Market / Ssanggye Temple Tea Fields",
    hubs: [
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 4시간", cost: "₩28,000~", costEn: "₩28,000~",
          steps: [{ ko: "강남터미널 → 하동터미널 (3시간 50분)", en: "Gangnam Terminal → Hadong Terminal (3h50min)" }] }
      ]},
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "KTX+버스", methodEn: "KTX + Bus", duration: "약 3시간 30분", cost: "₩50,000~", costEn: "₩50,000~",
          steps: [{ ko: "KTX → 진주역 (2h20m) → 버스 하동 (40분)", en: "KTX → Jinju (2h20min) → Bus to Hadong (40min)" }] }
      ]},
    ],
  },

  "gyeongnam-geoje": {
    firstStopKo: "거제 윈디힐 / 외도 보타니아", firstStopEn: "Geoje Windy Hill / Oedo Botania Island",
    hubs: [
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 4시간", cost: "₩28,000~", costEn: "₩28,000~",
          steps: [{ ko: "강남터미널 → 고현터미널 (거제) 4시간, 수시 운행", en: "Gangnam Terminal → Gohyeon Terminal (Geoje) 4h, frequent" }] }
      ]},
    ],
  },

  "gyeongbuk-bonghwa-uljin": {
    firstStopKo: "춘양 소나무 숲 / 울진 망양정", firstStopEn: "Chunyang Red Pine Forest / Uljin Mangyang Pavilion",
    hubs: [
      { hubId: "dong-seoul", nameKo: "동서울터미널", nameEn: "Dong-Seoul Bus Terminal", emoji: "🚌", options: [
        { method: "버스", methodEn: "Bus", duration: "약 3시간 30분", cost: "₩25,000~", costEn: "₩25,000~",
          steps: [{ ko: "동서울터미널 → 울진터미널 (3시간 30분)", en: "Dong-Seoul Terminal → Uljin Terminal (3h30min)" }] }
      ]},
    ],
  },

  "gyeongbuk-pohang-sunrise": {
    firstStopKo: "호미곶 해맞이 광장", firstStopEn: "Homigot Sunrise Cape",
    hubs: [
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "KTX+버스", methodEn: "KTX + Bus", duration: "약 3시간", cost: "₩45,000~", costEn: "₩45,000~",
          steps: [{ ko: "KTX → 동대구역 (1h40m) → 포항역 버스 (50분) → 호미곶 버스 200 (40분)", en: "KTX → Dongdaegu (1h40m) → Bus to Pohang (50min) → Bus 200 to Homigot (40min)" }] }
      ]},
    ],
  },

  "gyeongbuk-yeongju-seowon": {
    firstStopKo: "소수서원 (유네스코) / 선비촌", firstStopEn: "Sosu Seowon (UNESCO) / Seonbichon Village",
    hubs: [
      { hubId: "dong-seoul", nameKo: "동서울터미널", nameEn: "Dong-Seoul Bus Terminal", emoji: "🚌", options: [
        { method: "버스", methodEn: "Bus", duration: "약 2시간 40분", cost: "₩18,000~", costEn: "₩18,000~",
          steps: [{ ko: "동서울터미널 → 영주터미널 (2시간 30분)", en: "Dong-Seoul Terminal → Yeongju Terminal (2h30min)" }] }
      ]},
    ],
  },

  "gyeongnam-namhae-german": {
    firstStopKo: "남해 독일마을 / 보리암 절벽 사찰", firstStopEn: "Namhae German Village / Boriam Cliff Temple",
    hubs: [
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 4시간 30분", cost: "₩30,000~", costEn: "₩30,000~",
          steps: [{ ko: "강남터미널 → 남해터미널 (4시간 20분, 수시)", en: "Gangnam Terminal → Namhae Terminal (4h20min, frequent)" }] }
      ]},
    ],
  },

  "gyeongnam-miryang-valley": {
    firstStopKo: "밀양 얼음골 (여름) / 표충사", firstStopEn: "Miryang Ice Valley (Summer) / Pyochungsa Temple",
    hubs: [
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "KTX+버스", methodEn: "KTX + Bus", duration: "약 3시간", cost: "₩45,000~", costEn: "₩45,000~",
          steps: [{ ko: "KTX → 밀양역 (2시간 20분) → 버스 밀양 얼음골 (40분)", en: "KTX → Miryang Station (2h20min) → Bus to Ice Valley (40min)" }] }
      ]},
    ],
  },

  // ── 전라도 ────────────────────────────────────────────
  "jeonnam-suncheon": {
    firstStopKo: "순천만 국가정원 / 갈대밭", firstStopEn: "Suncheon Bay National Garden / Reed Fields",
    hubs: [
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "KTX", methodEn: "KTX", duration: "약 2시간 30분", cost: "₩42,000~", costEn: "₩42,000~",
          steps: [{ ko: "KTX 서울역 → 순천역 (2시간 20분)", en: "KTX Seoul Station → Suncheon Station (2h20min)" }, { ko: "순천역 → 버스 68번 → 순천만 국가정원 (20분)", en: "Suncheon Station → Bus 68 → Suncheon Bay Garden (20min)" }] }
      ]},
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 3시간 30분", cost: "₩22,000~31,000", costEn: "₩22,000~31,000",
          steps: [{ ko: "강남터미널 → 순천터미널 (3시간 20분)", en: "Gangnam Terminal → Suncheon Terminal (3h20min)" }] }
      ]},
    ],
  },

  "jeonbuk-jeonju-gochang": {
    firstStopKo: "전주 한옥마을 (경기전)", firstStopEn: "Jeonju Hanok Village (Gyeonggijeon Shrine)",
    hubs: [
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "KTX", methodEn: "KTX", duration: "약 1시간 40분", cost: "₩26,400~", costEn: "₩26,400~",
          steps: [{ ko: "KTX 서울역 → 전주역 (1시간 35분, 하루 다수 운행)", en: "KTX Seoul Station → Jeonju Station (1h35min, many daily services)" }, { ko: "전주역 → 버스 79번 → 한옥마을 (20분)", en: "Jeonju Station → Bus 79 → Hanok Village (20min)" }] }
      ]},
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 2시간 30분", cost: "₩12,200~17,300", costEn: "₩12,200~17,300",
          steps: [{ ko: "강남터미널 → 전주터미널 (2시간 20분, 수시)", en: "Gangnam Terminal → Jeonju Terminal (2h20min, frequent)" }] }
      ]},
    ],
  },

  "jeonnam-yeosu": {
    firstStopKo: "여수 밤바다 / 해상 케이블카", firstStopEn: "Yeosu Night Ocean / Maritime Cable Car",
    hubs: [
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "KTX", methodEn: "KTX", duration: "약 2시간 50분", cost: "₩43,500~", costEn: "₩43,500~",
          steps: [{ ko: "KTX 서울역 → 여수엑스포역 (2시간 45분)", en: "KTX Seoul → Yeosu EXPO Station (2h45min)" }] }
      ]},
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 4시간", cost: "₩24,300~", costEn: "₩24,300~",
          steps: [{ ko: "강남터미널 → 여수터미널 (4시간, 수시)", en: "Gangnam Terminal → Yeosu Terminal (4h, frequent)" }] }
      ]},
    ],
  },

  "jeonnam-boseong-mokpo": {
    firstStopKo: "보성 녹차밭 (대한다원)", firstStopEn: "Boseong Tea Fields (Daehan Dawon)",
    hubs: [
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 3시간 30분", cost: "₩20,000~", costEn: "₩20,000~",
          steps: [{ ko: "강남터미널 → 보성터미널 (3시간 20분)", en: "Gangnam Terminal → Boseong Terminal (3h20min)" }, { ko: "보성터미널 → 버스 → 대한다원 녹차밭 (15분)", en: "Boseong Terminal → Bus → Daehan Dawon Tea Fields (15min)" }] }
      ]},
    ],
  },

  "jeonnam-gurye-jirisan": {
    firstStopKo: "화엄사 / 산수유마을 (봄)", firstStopEn: "Hwaeomsa Temple / Sansuyu Village (Spring)",
    hubs: [
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 3시간 30분", cost: "₩21,000~", costEn: "₩21,000~",
          steps: [{ ko: "강남터미널 → 구례터미널 (3시간 20분)", en: "Gangnam Terminal → Gurye Terminal (3h20min)" }] }
      ]},
    ],
  },

  "jeonnam-wando-islands": {
    firstStopKo: "청산도 슬로우길 / 완도항", firstStopEn: "Cheongsan Island Slow Path / Wando Port",
    hubs: [
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "고속버스+배", methodEn: "Express Bus + Ferry", duration: "약 4시간", cost: "₩23,000~ + 선박", costEn: "₩23,000~ + Ferry",
          steps: [{ ko: "강남터미널 → 완도터미널 (3시간 30분)", en: "Gangnam Terminal → Wando Terminal (3h30min)" }, { ko: "완도항 → 청산도 배 (50분, 하루 4회)", en: "Wando Port → Cheongsan Island Ferry (50min, 4 times/day)" }] }
      ]},
    ],
  },

  "jeonbuk-namwon-chunhyang": {
    firstStopKo: "광한루원 / 국립민속국악원", firstStopEn: "Gwanghallu Garden / National Folk Music Center",
    hubs: [
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "KTX", methodEn: "KTX", duration: "약 1시간 50분", cost: "₩29,600~", costEn: "₩29,600~",
          steps: [{ ko: "KTX 서울역 → 남원역 (1시간 45분) → 도보 15분 광한루원", en: "KTX Seoul → Namwon Station (1h45min) → 15min walk to Gwanghallu" }] }
      ]},
    ],
  },

  "jeonnam-goheung-space": {
    firstStopKo: "나로우주센터 / 소록도", firstStopEn: "Naro Space Center / Sorokdo Island",
    hubs: [
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 4시간", cost: "₩25,000~", costEn: "₩25,000~",
          steps: [{ ko: "강남터미널 → 고흥터미널 (3시간 50분)", en: "Gangnam Terminal → Goheung Terminal (3h50min)" }] }
      ]},
    ],
  },

  "jeonbuk-gunsan-modern": {
    firstStopKo: "군산 근대역사박물관 / 히로타 일본 가옥", firstStopEn: "Gunsan Modern History Museum / Hirota Japanese House",
    hubs: [
      { hubId: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄", options: [
        { method: "KTX+버스", methodEn: "KTX + Bus", duration: "약 1시간 50분", cost: "₩24,000~", costEn: "₩24,000~",
          steps: [{ ko: "KTX 서울역 → 익산역 (50분) → 버스 군산 (40분)", en: "KTX Seoul → Iksan Station (50min) → Bus to Gunsan (40min)" }] }
      ]},
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 2시간 30분", cost: "₩13,800~", costEn: "₩13,800~",
          steps: [{ ko: "강남터미널 → 군산터미널 (2시간 20분, 수시)", en: "Gangnam Terminal → Gunsan Terminal (2h20min, frequent)" }] }
      ]},
    ],
  },

  "jeonnam-gangjin-celadon": {
    firstStopKo: "강진 청자박물관 / 고려 가마터", firstStopEn: "Gangjin Celadon Museum / Ancient Kiln Valley",
    hubs: [
      { hubId: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal (Gangnam)", emoji: "🚌", options: [
        { method: "고속버스", methodEn: "Express Bus", duration: "약 4시간", cost: "₩23,000~", costEn: "₩23,000~",
          steps: [{ ko: "강남터미널 → 강진터미널 (3시간 50분)", en: "Gangnam Terminal → Gangjin Terminal (3h50min)" }] }
      ]},
    ],
  },
};

// 허브 목록 (UI용)
export const HUBS = [
  { id: "incheon", nameKo: "인천국제공항", nameEn: "Incheon Int'l Airport", emoji: "✈️" },
  { id: "gimpo", nameKo: "김포공항", nameEn: "Gimpo Airport", emoji: "🛫" },
  { id: "seoul-station", nameKo: "서울역 (KTX)", nameEn: "Seoul Station (KTX)", emoji: "🚄" },
  { id: "gangnam-terminal", nameKo: "서울고속버스터미널", nameEn: "Seoul Express Bus Terminal", emoji: "🚌" },
  { id: "dong-seoul", nameKo: "동서울터미널", nameEn: "Dong-Seoul Bus Terminal", emoji: "🚌" },
];
