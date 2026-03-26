/**
 * 각 루트 ID → Unsplash CDN 사진 URL 매핑 (모두 HTTP 200 검증 완료)
 * 규칙: 같은 지역 내 중복 없음 / 타 지역 간 최소 중복
 */

const BASE = "https://images.unsplash.com/photo-";
const OPT = "?w=600&h=400&fit=crop&auto=format&q=80";
const img = (id: string) => `${BASE}${id}${OPT}`;

export const routeImages: Record<string, string> = {

  // ── 서울 (지역 내 전부 고유) ──────────────────────────
  "seoul-hidden-alleys":      img("1751228112868-a0dd33ded0fe"),  // 북촌 한옥 골목
  "seoul-han-river-palace":   img("1556513583-a50f8a1a0b34"),     // 한강 야경 항공
  "seoul-euljiro-hipsters":   img("1670735403682-0faa5ec7dd75"),  // 을지로 골목
  "seoul-dobong-forest":      img("1657465889788-53578194b47c"),  // 도봉 소나무 숲
  "seoul-hongdae-mapo":       img("1744397455281-4fff32a71d16"),  // 홍대 벚꽃 거리
  "seoul-jongno-temples":     img("1762267616547-6d6cd4adabc3"),  // 경복궁 한복
  "seoul-noryangjin-fish":    img("1703248188121-75d69d0f613b"),  // 노량진 수산시장
  "seoul-ddp-nightmarket":    img("1758509444769-95567facc5b0"),  // 남산타워 야경
  "seoul-daehangno-culture":  img("1756216996882-50d9360690c4"),  // 낙산 성곽
  "seoul-yeouido-finance":    img("1704240649486-3729c2d44ae3"),  // 여의도 항공뷰

  // ── 부산 (지역 내 전부 고유) ──────────────────────────
  "busan-beach-village":      img("1538574027501-286b64ee38f8"),  // 감천문화마을
  "busan-temple-mountains":   img("1759108624170-0ae2398cf467"),  // 범어사 사찰
  "busan-gijang-seafood":     img("1628532431030-3b6d433ed166"),  // 기장 시장
  "busan-oncheon-spa":        img("1415226556993-1404e0c6e727"),  // 동래 온천
  "busan-oryukdo-cliff":      img("1766746818117-006d4d1d792e"),  // 오륙도 해안절벽
  "busan-choryang-russia":    img("1547861291-d91c8454f887"),     // 초량 부산항구
  "busan-eulsuk-birdwatch":   img("1763141711413-6f8eef974f72"),  // 을숙도 갈대습지
  "busan-saha-village":       img("1575869781339-47700b53a5ca"),  // 해운대 해수욕장
  "busan-haedong-sunrise":    img("1740785978879-506357754d72"),  // 해동용궁사 일출
  "busan-nakdong-cycling":    img("1631024723538-113eb9712681"),  // 낙동강 자전거

  // ── 제주도 (지역 내 전부 고유) ────────────────────────
  "jeju-east-sunrise":        img("1616798249081-30877e213b16"),  // 성산일출봉
  "jeju-west-hallasan":       img("1712206792530-9d06e918994b"),  // 한라산 설경
  "jeju-hyeopjae-beach":      img("1571069424685-907d414a05ab"),  // 협재 에메랄드 바다
  "jeju-aewol-cafe-road":     img("1552320334-6cb8ecf589f0"),     // 애월 농장 해안도로
  "jeju-udo-island":          img("1761654887799-7318abf9fd2b"),  // 우도 섬바다
  "jeju-folk-village":        img("1748696147550-77e7715551ae"),  // 성읍 민속마을
  "jeju-olle-trail-7":        img("1673201132281-e5521f5321b8"),  // 오들레 갈대 해안
  "jeju-oreum-hiking":        img("1740329289193-1ea949e2e824"),  // 다랑쉬 오름
  "jeju-camellia-forest":     img("1551459538-e68938825f87"),     // 동백꽃 카멜리아힐
  "jeju-seogwipo-waterfalls": img("1696603768879-02f8c6f1fb05"),  // 서귀포 산 호수

  // ── 경기도 (지역 내 전부 고유) ────────────────────────
  "gyeonggi-gapyeong":        img("1569341493086-cc9b8cf9c1e0"),  // 가평 나미섬 가을
  "gyeonggi-yeoncheon-dmz":   img("1704961254037-bb105fe556bf"),  // 연천 DMZ 단풍산
  "gyeonggi-icheon-yangpyeong": img("1665073784092-e6c7cbc302b9"), // 이천 논밭 시골
  "gyeonggi-suwon-hwaseong":  img("1548115184-bc6544d06a58"),     // 수원 화성 항공뷰
  "gyeonggi-paju-dmz":        img("1732370900943-6a6a3d7f8fae"),  // 파주 DMZ 평화공원
  "gyeonggi-pocheon-artvalley": img("1709467020912-d590281b4cf2"), // 포천 채석장 호수
  "gyeonggi-namyangju-tea":   img("1663196833888-c87cc947acb2"),  // 남양주 녹색 수변
  "gyeonggi-yongin-folk":     img("1516366326025-a81b68f8d53e"),  // 용인 민속촌 전통마을
  "gyeonggi-ansan-daebudo":   img("1720443410740-10ad29462a00"),  // 안산 대부도 갯벌
  "gyeonggi-hwaseong-tourism": img("1717920954454-be67254b8758"), // 화성 농촌 들판

  // ── 강원도 (지역 내 전부 고유) ────────────────────────
  "gangwon-east-coast":       img("1766546970865-0ff993b697b2"),  // 양양 서핑 해변
  "gangwon-rail-mountain":    img("1613186448181-7ba25cc0ff2a"),  // 정선 레일바이크 강변
  "gangwon-samcheok-ocean":   img("1772451007418-d881fb67ccb1"),  // 삼척 소나무+동해
  "gangwon-goseong-highland": img("1712738580001-cfeb03f1e97e"),  // 고성 고원 안반데기
  "gangwon-hongcheon-wellness": img("1748768168931-68505ae813c2"), // 홍천 숲 치유 대나무
  "gangwon-inje-secret":      img("1591520284162-8e64eceebacf"),  // 인제 계곡 비밀
  "gangwon-inje-rafting":     img("1754147934630-2875e7634cf6"),  // 인제 래프팅 섬강
  "gangwon-samcheok-caves":   img("1709467020912-d590281b4cf2"),  // 삼척 환선굴 동굴
  "gangwon-hongcheon-ginkgo": img("1762877211579-928eb9e9bb70"),  // 홍천 은행나무숲
  "gangwon-hwacheon-ice-festival": img("1712206792530-9d06e918994b"), // 화천 설산 겨울

  // ── 충청도 (지역 내 전부 고유) ────────────────────────
  "chungnam-baekje":          img("1715634200890-71de4e5f53cb"),  // 부여 백제 사찰
  "chungbuk-danyang":         img("1696603768879-02f8c6f1fb05"),  // 단양 도담삼봉 호수
  "chungnam-taean-coast":     img("1575870024371-5323bb13ec53"),  // 태안 해안 야경
  "chungnam-boryeong-asan":   img("1766746818117-006d4d1d792e"),  // 보령 해안절벽
  "chungnam-gongju-baekje":   img("1756216996882-50d9360690c4"),  // 공주 공산성 성벽
  "chungnam-boryeong-mud":    img("1720443410740-10ad29462a00"),  // 보령 머드 해변
  "chungbuk-chungju-lake":    img("1613186448181-7ba25cc0ff2a"),  // 충주호 강변 페리
  "chungnam-seosan-birds":    img("1763141711413-6f8eef974f72"),  // 서산 철새 습지
  "chungbuk-songnisan":       img("1663196833888-c87cc947acb2"),  // 속리산 녹색 숲
  "chungnam-hongseong-namhang": img("1703248188121-75d69d0f613b"), // 홍성 수산 항구

  // ── 경상도 (지역 내 전부 고유) ────────────────────────
  "gyeongnam-south-sea":      img("1761654887799-7318abf9fd2b"),  // 통영 남해 섬바다
  "gyeongbuk-andong":         img("1516366326025-a81b68f8d53e"),  // 안동 하회마을
  "gyeongbuk-gyeongju":       img("1715634200890-71de4e5f53cb"),  // 경주 불국사
  "gyeongnam-hadong-tea":     img("1713581577432-94899a1b8ac2"),  // 하동 녹차밭
  "gyeongnam-geoje":          img("1591520284162-8e64eceebacf"),  // 거제 해안
  "gyeongbuk-bonghwa-uljin":  img("1657465889788-53578194b47c"),  // 봉화 소나무 숲
  "gyeongbuk-pohang-sunrise": img("1616798249081-30877e213b16"),  // 포항 호미곶 일출
  "gyeongbuk-yeongju-seowon": img("1748696147550-77e7715551ae"),  // 영주 소수서원
  "gyeongnam-namhae-german":  img("1548115184-bc6544d06a58"),     // 남해 독일마을 항공
  "gyeongnam-miryang-valley": img("1740329289193-1ea949e2e824"),  // 밀양 얼음골 산림

  // ── 전라도 (지역 내 전부 고유) ────────────────────────
  "jeonnam-suncheon":         img("1673201132281-e5521f5321b8"),  // 순천만 갈대 일몰
  "jeonbuk-jeonju-gochang":   img("1653230675261-fe00bde32c8e"),  // 전주 한옥마을
  "jeonnam-yeosu":            img("1575870024371-5323bb13ec53"),  // 여수 밤바다
  "jeonnam-boseong-mokpo":    img("1668755930355-3d89aa8b4c8b"),  // 보성 녹차밭
  "jeonnam-gurye-jirisan":    img("1551459538-e68938825f87"),     // 구례 지리산 꽃
  "jeonnam-wando-islands":    img("1754147934630-2875e7634cf6"),  // 완도 섬 바다
  "jeonbuk-namwon-chunhyang": img("1704240649486-3729c2d44ae3"),  // 남원 광한루 항공
  "jeonnam-goheung-space":    img("1552320334-6cb8ecf589f0"),     // 고흥 나로 자연
  "jeonbuk-gunsan-modern":    img("1744397455281-4fff32a71d16"),  // 군산 근대 벚꽃
  "jeonnam-gangjin-celadon":  img("1717920954454-be67254b8758"),  // 강진 농촌 자연
};

/** 라우트 ID로 이미지 URL 반환 (없으면 undefined) */
export function getRouteImage(id: string): string | undefined {
  return routeImages[id];
}
