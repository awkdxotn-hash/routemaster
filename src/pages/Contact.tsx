import { useState } from "react";
import { useLang } from "../context/LanguageContext";

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 폼 제출 로직 연결 위치 (Formspree, EmailJS 등)
    setSubmitted(true);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-sm placeholder-stone-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:border-teal-300 focus-visible:bg-white transition-all";

  return (
    <main className="pt-24 pb-20 min-h-screen bg-white dark:bg-stone-900">
      <div className="max-w-3xl mx-auto px-4">

        {/* 헤더 */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-stone-800">
            {t("Contact Us", "문의하기")}
          </h1>
          <p className="text-stone-500 mt-3">
            {t(
              "Have a question about a travel route, or want to suggest a new destination? We'd love to hear from you.",
              "여행 루트에 대한 질문이나 새로운 목적지를 제안하고 싶으신가요? 연락해 주세요."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* 연락처 정보 */}
          <aside className="space-y-6">
            {[
              {
                emoji: "📧",
                titleEn: "Email",
                titleKo: "이메일",
                descEn: "awkdxotn@icloud.com",
                descKo: "awkdxotn@icloud.com",
              },
              {
                emoji: "⏰",
                titleEn: "Response Time",
                titleKo: "답변 시간",
                descEn: "Within 2 business days",
                descKo: "영업일 기준 2일 이내",
              },
              {
                emoji: "🌏",
                titleEn: "Languages",
                titleKo: "지원 언어",
                descEn: "English & Korean",
                descKo: "영어 & 한국어",
              },
            ].map((item) => (
              <div key={item.titleEn} className="flex gap-3 p-4 bg-stone-50 rounded-2xl">
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <p className="font-semibold text-stone-700 text-sm">{t(item.titleEn, item.titleKo)}</p>
                  <p className="text-stone-500 text-sm">{t(item.descEn, item.descKo)}</p>
                </div>
              </div>
            ))}

            {/* 자주 묻는 질문 */}
            <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100">
              <p className="text-sm font-bold text-teal-800 mb-2">
                {t("Common Inquiries", "주요 문의 유형")}
              </p>
              <ul className="text-sm text-teal-700 space-y-1 list-disc pl-4">
                <li>{t("Route corrections or updates", "루트 정보 수정/업데이트")}</li>
                <li>{t("New destination suggestions", "새 목적지 제안")}</li>
                <li>{t("Partnership inquiries", "제휴 문의")}</li>
                <li>{t("Privacy policy questions", "개인정보 관련 문의")}</li>
              </ul>
            </div>
          </aside>

          {/* 문의 폼 */}
          <div className="md:col-span-2">
            {submitted ? (
              <div className="text-center py-16">
                <p className="text-5xl mb-4">✅</p>
                <h2 className="text-2xl font-bold text-stone-800 mb-2">
                  {t("Message Sent!", "메시지가 전송되었습니다!")}
                </h2>
                <p className="text-stone-500">
                  {t("Thank you for reaching out. We'll get back to you within 2 business days.", "문의해 주셔서 감사합니다. 영업일 기준 2일 이내에 답변 드리겠습니다.")}
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-6 px-6 py-2 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors"
                >
                  {t("Send Another", "다시 문의하기")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* 오류 표시 영역 */}
                <div role="alert" aria-live="polite" className="sr-only" id="form-error" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-stone-500 mb-1.5">
                      {t("Your Name", "이름")} <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t("John Doe", "홍길동")}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-stone-500 mb-1.5">
                      {t("Email Address", "이메일 주소")} <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-stone-500 mb-1.5">
                    {t("Subject", "문의 유형")} <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">{t("Select a topic...", "유형을 선택하세요...")}</option>
                    <option value="route">{t("Route Information", "루트 정보 문의")}</option>
                    <option value="suggestion">{t("New Destination Suggestion", "새 목적지 제안")}</option>
                    <option value="partnership">{t("Partnership", "제휴 문의")}</option>
                    <option value="privacy">{t("Privacy Policy", "개인정보 관련")}</option>
                    <option value="other">{t("Other", "기타")}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-stone-500 mb-1.5">
                    {t("Message", "메시지")} <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t("Tell us how we can help...", "어떻게 도와드릴까요?...")}
                    required
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-colors active:scale-[0.98]"
                >
                  {t("Send Message →", "메시지 전송 →")}
                </button>

                <p className="text-xs text-stone-400 text-center">
                  {t(
                    "By submitting this form, you agree to our Privacy Policy.",
                    "양식을 제출하면 개인정보처리방침에 동의하는 것으로 간주됩니다."
                  )}{" "}
                  <a href="/privacy" className="underline text-teal-500">{t("Privacy Policy", "개인정보처리방침")}</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
