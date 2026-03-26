import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signUp } = useAuth();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (password !== confirm) { setErrorMessage("비밀번호가 일치하지 않습니다."); return; }
    if (password.length < 6) { setErrorMessage("비밀번호는 최소 6자 이상이어야 합니다."); return; }

    setIsLoading(true);
    const { error } = await signUp(email, password, nickname);
    if (error) {
      setErrorMessage("회원가입에 실패했습니다. 이미 사용 중인 이메일일 수 있습니다.");
      setIsLoading(false);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-stone-100 px-8 py-12 text-center">
          <div className="text-5xl mb-4">📬</div>
          <h2 className="text-xl font-bold text-stone-800 mb-2">이메일을 확인해주세요</h2>
          <p className="text-sm text-stone-500 mb-6">
            <span className="font-semibold text-amber-500">{email}</span>으로 인증 메일을 보냈습니다.
            <br />메일의 링크를 클릭한 후 로그인해주세요.
          </p>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-amber-400 hover:bg-amber-500 text-white font-semibold rounded-xl transition-colors"
          >
            로그인 페이지로
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100 flex items-center justify-center px-4"
      style={{ fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif" }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-200 mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-stone-800">
            Route<span className="text-amber-500">Master</span>
          </h1>
          <p className="mt-1 text-sm text-stone-400 tracking-widest uppercase">Your Journey, Perfected</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-stone-200/60 border border-stone-100 px-8 py-10">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-stone-800">회원가입</h2>
            <p className="text-sm text-stone-400 mt-1">새로운 여정을 시작하세요</p>
          </div>

          {errorMessage && (
            <div role="alert" className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="nickname" className="block text-xs font-medium text-stone-500">닉네임</label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="사용할 닉네임"
                required
                maxLength={20}
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 placeholder-stone-300 text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:border-amber-300 focus-visible:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-medium text-stone-500">이메일</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
                autoComplete="email"
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 placeholder-stone-300 text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:border-amber-300 focus-visible:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-medium text-stone-500">비밀번호 (최소 6자)</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                required
                autoComplete="new-password"
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 placeholder-stone-300 text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:border-amber-300 focus-visible:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="confirm" className="block text-xs font-medium text-stone-500">비밀번호 확인</label>
              <input
                id="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="비밀번호를 다시 입력하세요"
                required
                autoComplete="new-password"
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 placeholder-stone-300 text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:border-amber-300 focus-visible:bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-semibold text-sm tracking-wide shadow-md shadow-amber-200 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  가입 중...
                </span>
              ) : "회원가입"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-stone-400 mt-6">
          이미 계정이 있으신가요?{" "}
          <Link to="/login" className="text-amber-500 font-semibold hover:text-amber-600 transition-colors">
            로그인
          </Link>
        </p>
        <p className="text-center text-xs text-stone-300 mt-4">© 2026 RouteMaster. All rights reserved.</p>
      </div>
    </div>
  );
}
