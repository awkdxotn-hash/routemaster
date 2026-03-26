import { useLang } from "../context/LanguageContext";

export default function PrivacyPolicy() {
  const { t } = useLang();

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-stone-800 mb-3 pb-2 border-b border-stone-100">{title}</h2>
      <div className="text-stone-600 text-sm leading-relaxed space-y-3">{children}</div>
    </section>
  );

  return (
    <main className="pt-24 pb-20 min-h-screen bg-white dark:bg-stone-900">
      <div className="max-w-3xl mx-auto px-4">

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-stone-800">
            {t("Privacy Policy", "개인정보처리방침")}
          </h1>
          <p className="text-stone-400 mt-2 text-sm">
            {t("Last updated: March 2026", "최종 업데이트: 2026년 3월")}
          </p>
        </div>

        <Section title={t("1. Introduction", "1. 소개")}>
          <p>
            {t(
              "Easy Korea Trip ('we', 'us', or 'our') operates the website easykoreatrip.com. This Privacy Policy explains how we collect, use, and protect information when you visit our website. By using our site, you agree to the collection and use of information in accordance with this policy.",
              "Easy Korea Trip('우리', '당사')은 easykoreatrip.com 웹사이트를 운영합니다. 본 개인정보처리방침은 귀하가 당사 웹사이트를 방문할 때 정보를 수집, 사용 및 보호하는 방법을 설명합니다. 사이트를 이용함으로써 귀하는 본 방침에 따른 정보 수집 및 사용에 동의하게 됩니다."
            )}
          </p>
        </Section>

        <Section title={t("2. Information We Collect", "2. 수집하는 정보")}>
          <p>
            {t(
              "We may collect the following types of information:",
              "당사는 다음과 같은 유형의 정보를 수집할 수 있습니다:"
            )}
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t("Usage data (pages visited, time spent, browser type, device type)", "사용 데이터 (방문한 페이지, 체류 시간, 브라우저 유형, 기기 유형)")}</li>
            <li>{t("IP address (anonymized)", "IP 주소 (익명 처리)")}</li>
            <li>{t("Contact form submissions (name and email address, if provided)", "문의 양식 제출 내용 (제공된 경우 이름 및 이메일 주소)")}</li>
            <li>{t("Cookie and tracking data (see Section 4)", "쿠키 및 추적 데이터 (섹션 4 참조)")}</li>
          </ul>
        </Section>

        <Section title={t("3. How We Use Your Information", "3. 정보 이용 목적")}>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t("To provide and improve our travel content and services", "여행 콘텐츠 및 서비스 제공 및 개선")}</li>
            <li>{t("To respond to your inquiries submitted via the contact form", "문의 양식을 통해 제출된 문의에 답변")}</li>
            <li>{t("To analyze website traffic and user behavior to improve user experience", "사용자 경험 개선을 위한 웹사이트 트래픽 및 사용자 행동 분석")}</li>
            <li>{t("To display relevant advertisements via Google AdSense", "Google AdSense를 통한 관련 광고 표시")}</li>
          </ul>
        </Section>

        <Section title={t("4. Cookies & Google AdSense", "4. 쿠키 & Google AdSense")}>
          <p>
            {t(
              "We use cookies — small text files stored on your device — to enhance your browsing experience and to serve personalized advertisements.",
              "당사는 귀하의 브라우징 경험 향상 및 맞춤 광고 제공을 위해 쿠키(기기에 저장되는 소형 텍스트 파일)를 사용합니다."
            )}
          </p>
          <p className="font-semibold text-stone-700">
            {t("Google AdSense & Third-Party Advertising:", "Google AdSense 및 제3자 광고:")}
          </p>
          <p>
            {t(
              "This website uses Google AdSense, an advertising service provided by Google LLC. Google and its partners use cookies to serve advertisements based on your prior visits to this website and other websites on the internet. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to this site and/or other sites on the Internet.",
              "이 웹사이트는 Google LLC에서 제공하는 광고 서비스인 Google AdSense를 사용합니다. Google과 파트너사는 이 웹사이트 및 인터넷 상의 다른 웹사이트에 대한 귀하의 이전 방문을 기반으로 광고를 게재하기 위해 쿠키를 사용합니다."
            )}
          </p>
          <p>
            {t(
              "You may opt out of personalized advertising by visiting Google's Ads Settings at: https://adssettings.google.com. You can also opt out of a third-party vendor's use of cookies by visiting the Network Advertising Initiative opt-out page at: http://www.networkadvertising.org/choices/",
              "귀하는 https://adssettings.google.com 에서 Google의 광고 설정을 방문하여 맞춤 광고를 거부할 수 있습니다. 또한 http://www.networkadvertising.org/choices/ 에서 제3자 공급업체의 쿠키 사용을 거부할 수 있습니다."
            )}
          </p>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-800">
            {t(
              "Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to sites on the Internet. Users may opt out of personalized advertising by visiting www.aboutads.info.",
              "Google을 포함한 제3자 공급업체는 이 웹사이트 또는 다른 웹사이트에 대한 사용자의 이전 방문을 기반으로 광고를 게재하기 위해 쿠키를 사용합니다. 사용자는 www.aboutads.info 를 방문하여 맞춤 광고를 거부할 수 있습니다."
            )}
          </div>
        </Section>

        <Section title={t("5. Third-Party Services", "5. 제3자 서비스")}>
          <p>{t("We use the following third-party services:", "당사는 다음 제3자 서비스를 이용합니다:")}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Google Analytics</strong> — {t("Website traffic analysis. Google's privacy policy: https://policies.google.com/privacy", "웹사이트 트래픽 분석. Google 개인정보처리방침: https://policies.google.com/privacy")}
            </li>
            <li>
              <strong>Google AdSense</strong> — {t("Advertisement display. Opt-out available at https://adssettings.google.com", "광고 표시. https://adssettings.google.com 에서 거부 가능")}
            </li>
            <li>
              <strong>Google Maps</strong> — {t("Embedded map links. Google's privacy policy applies.", "임베드 지도 링크. Google 개인정보처리방침 적용.")}
            </li>
          </ul>
        </Section>

        <Section title={t("6. Data Security", "6. 데이터 보안")}>
          <p>
            {t(
              "We use commercially reasonable security measures to protect your information. However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security of data transmitted to our site.",
              "당사는 귀하의 정보를 보호하기 위해 상업적으로 합리적인 보안 조치를 사용합니다. 그러나 인터넷을 통한 전송 방법은 100% 안전하지 않습니다. 당사 사이트에 전송된 데이터의 절대적인 보안을 보장할 수 없습니다."
            )}
          </p>
        </Section>

        <Section title={t("7. Children's Privacy", "7. 아동 개인정보")}>
          <p>
            {t(
              "Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately.",
              "당사 웹사이트는 13세 미만 아동을 대상으로 하지 않습니다. 당사는 고의로 13세 미만 아동의 개인정보를 수집하지 않습니다. 의도치 않게 그러한 정보를 수집했다고 생각되시면 즉시 연락해 주세요."
            )}
          </p>
        </Section>

        <Section title={t("8. Your Rights", "8. 귀하의 권리")}>
          <p>{t("You have the right to:", "귀하는 다음의 권리를 가집니다:")}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t("Request access to personal data we hold about you", "당사가 보유한 귀하의 개인 데이터에 대한 접근 요청")}</li>
            <li>{t("Request correction or deletion of your personal data", "개인 데이터의 수정 또는 삭제 요청")}</li>
            <li>{t("Opt out of personalized advertising (see Section 4)", "맞춤 광고 거부 (섹션 4 참조)")}</li>
            <li>{t("Withdraw consent at any time", "언제든지 동의 철회")}</li>
          </ul>
        </Section>

        <Section title={t("9. Changes to This Policy", "9. 방침 변경")}>
          <p>
            {t(
              "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with an updated date. We recommend reviewing this page periodically.",
              "당사는 이 개인정보처리방침을 수시로 업데이트할 수 있습니다. 변경사항이 있을 경우 업데이트된 날짜와 함께 이 페이지에 새로운 방침을 게시하여 알려드립니다. 주기적으로 이 페이지를 검토하시기 바랍니다."
            )}
          </p>
        </Section>

        <Section title={t("10. Contact", "10. 문의")}>
          <p>
            {t(
              "If you have any questions about this Privacy Policy, please contact us through our Contact page.",
              "본 개인정보처리방침에 대한 질문이 있으시면 문의 페이지를 통해 연락해 주세요."
            )}
          </p>
          <a href="/contact" className="text-teal-600 underline">
            {t("Go to Contact Page →", "문의 페이지로 이동 →")}
          </a>
        </Section>
      </div>
    </main>
  );
}
