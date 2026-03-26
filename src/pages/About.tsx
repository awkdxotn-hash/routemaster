import { useLang } from "../context/LanguageContext";

export default function About() {
  const { t } = useLang();

  return (
    <main className="pt-24 pb-20 min-h-screen bg-white dark:bg-stone-900">
      <div className="max-w-3xl mx-auto px-4">

        {/* 헤더 */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 shadow-lg mb-4">
            <span className="text-white text-2xl font-bold">EK</span>
          </div>
          <h1 className="text-4xl font-extrabold text-stone-800 mt-4">
            {t("About Easy Korea Trip", "Easy Korea Trip 소개")}
          </h1>
          <p className="text-stone-500 mt-3 text-lg">
            {t("Helping the world discover rural Korea", "세계가 한국 지방을 발견하도록 돕습니다")}
          </p>
        </div>

        {/* 미션 섹션 */}
        <section className="mb-12 p-8 bg-teal-50 rounded-3xl border border-teal-100">
          <h2 className="text-2xl font-bold text-teal-800 mb-4">
            {t("Our Mission", "우리의 미션")}
          </h2>
          <p className="text-stone-700 leading-relaxed text-base">
            {t(
              "Easy Korea Trip was created with one simple goal: to show international travelers that Korea is far more than Seoul, Busan, and Jeju Island. The country's rural regions — from the misty mountain valleys of Gangwon-do to the ancient fishing villages of the southern coast — hold experiences that most guidebooks overlook entirely.",
              "Easy Korea Trip은 하나의 단순한 목표로 시작되었습니다. 바로 외국인 여행자들에게 한국이 서울, 부산, 제주도보다 훨씬 더 많은 것을 품고 있다는 사실을 보여주는 것입니다. 강원도의 안개 낀 산골 계곡부터 남해안의 고요한 어촌까지, 한국의 지방은 대부분의 가이드북이 놓치는 경험들로 가득합니다."
            )}
          </p>
        </section>

        {/* 우리가 하는 일 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">
            {t("What We Do", "우리가 하는 일")}
          </h2>
          <div className="space-y-6">
            {[
              {
                emoji: "🗺️",
                titleEn: "Curated Travel Routes",
                titleKo: "엄선된 여행 루트",
                descEn: "We research and build detailed day-by-day itineraries for Korea's lesser-known destinations — complete with local food tips, transport guides, and seasonal advice.",
                descKo: "한국의 덜 알려진 목적지에 대한 상세한 날짜별 여행 일정을 조사하고 구성합니다 — 현지 음식 팁, 교통 안내, 계절별 조언까지 포함합니다.",
              },
              {
                emoji: "🌿",
                titleEn: "Off the Beaten Path",
                titleKo: "관광 명소 밖의 한국",
                descEn: "Every route we feature is tested for authenticity. We prioritize destinations where you'll meet real locals, eat real food, and experience Korea the way Koreans do.",
                descKo: "소개하는 모든 루트는 진정성을 기준으로 검토됩니다. 현지인을 만나고, 진짜 음식을 먹고, 한국인처럼 한국을 경험할 수 있는 목적지를 우선합니다.",
              },
              {
                emoji: "🌐",
                titleEn: "Bilingual Content",
                titleKo: "영한 이중 언어 콘텐츠",
                descEn: "All content is available in both English and Korean — making it useful for international travelers and Korean locals alike.",
                descKo: "모든 콘텐츠는 영어와 한국어 두 언어로 제공됩니다 — 외국인 여행자와 한국인 모두에게 유용합니다.",
              },
            ].map((item) => (
              <div key={item.titleEn} className="flex gap-4 p-6 bg-stone-50 rounded-2xl">
                <span className="text-3xl shrink-0">{item.emoji}</span>
                <div>
                  <h3 className="font-bold text-stone-800 mb-1">{t(item.titleEn, item.titleKo)}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{t(item.descEn, item.descKo)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 지역 커버리지 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">
            {t("Regions We Cover", "커버하는 지역")}
          </h2>
          <p className="text-stone-600 leading-relaxed mb-4">
            {t(
              "Our routes currently cover 8 regions across South Korea including Seoul, Busan, Jeju Island, Gangwon-do, Gyeongsang-do, Jeolla-do, Chungcheong-do, and Gyeonggi-do. We are continuously adding new destinations and updating existing routes with the latest local information.",
              "현재 서울, 부산, 제주도, 강원도, 경상도, 전라도, 충청도, 경기도 등 대한민국 8개 지역의 루트를 제공하고 있습니다. 지속적으로 새로운 목적지를 추가하고 최신 현지 정보로 기존 루트를 업데이트하고 있습니다."
            )}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["🏙️ Seoul", "🌊 Busan", "🌺 Jeju", "🏔️ Gangwon", "⛵ Gyeongsang", "🍱 Jeolla", "⛩️ Chungcheong", "🌸 Gyeonggi"].map((r) => (
              <div key={r} className="text-center py-3 px-2 bg-teal-50 rounded-xl text-sm font-medium text-teal-700">
                {r}
              </div>
            ))}
          </div>
        </section>

        {/* 콘텐츠 정책 */}
        <section className="mb-12 p-6 bg-amber-50 rounded-2xl border border-amber-100">
          <h2 className="text-xl font-bold text-amber-800 mb-3">
            {t("Our Content Policy", "콘텐츠 정책")}
          </h2>
          <p className="text-amber-900 text-sm leading-relaxed">
            {t(
              "Easy Korea Trip provides travel information for educational and inspirational purposes only. We do not guarantee real-time accuracy of transport schedules, prices, or opening hours. Always verify current information directly with local operators before your trip. We are not affiliated with any of the destinations, hotels, or businesses mentioned on this site.",
              "Easy Korea Trip은 교육 및 영감을 위한 여행 정보를 제공합니다. 교통 일정, 가격, 운영 시간의 실시간 정확성을 보장하지 않습니다. 여행 전 반드시 현지 운영자에게 최신 정보를 직접 확인하세요. 이 사이트에 언급된 목적지, 호텔, 업체와는 제휴 관계가 없습니다."
            )}
          </p>
        </section>

        {/* 연락처 CTA */}
        <section className="text-center">
          <p className="text-stone-500 mb-4">
            {t("Questions or suggestions? We'd love to hear from you.", "질문이나 제안이 있으신가요? 연락해 주세요.")}
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-colors"
          >
            {t("Contact Us →", "문의하기 →")}
          </a>
        </section>
      </div>
    </main>
  );
}
