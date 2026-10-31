import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Building2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { loginAdmin } from './api';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await loginAdmin(email, password);
      if (res.success && res.token) {
        localStorage.setItem('adminToken', res.token);
        localStorage.setItem('adminUser', JSON.stringify(res.user));
        onLoginSuccess(res.user);
      } else {
        setError(res.message || 'Unable to sign in. Please check your credentials.');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="admin-layout admin-login-layout min-h-screen bg-[#f5f6f8] text-[#18243e] md:grid md:grid-cols-[1.05fr_0.95fr]"
      style={{ backgroundColor: '#f5f6f8' }}
    >
      <section
        className="relative flex min-h-[300px] flex-col overflow-hidden bg-[#101b3c] px-6 py-7 text-white sm:px-10 sm:py-9 md:min-h-screen md:px-10 md:py-12 lg:px-14"
        style={{ background: 'radial-gradient(ellipse at 75% 15%, rgba(86, 109, 177, 0.32), transparent 42%), linear-gradient(145deg, #101b3c 0%, #172650 58%, #101b3c 100%)' }}
      >
        <div className="pointer-events-none absolute -right-36 -top-40 h-[440px] w-[440px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-20 -top-24 h-[310px] w-[310px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-48 -left-32 h-[440px] w-[440px] rounded-full bg-[#f26635]/10 blur-3xl" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[#ffb286]">
            <Building2 size={23} strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-[15px] font-extrabold tracking-[0.12em] text-white">ARBAN CITY</p>
            <p className="mt-0.5 text-[10px] font-semibold tracking-[0.24em] text-white/55">SECTOR ZERO · ADMIN</p>
          </div>
        </div>

        <div className="relative z-10 my-auto max-w-xl py-12 lg:py-0">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-semibold tracking-wide text-white/80">
            <Sparkles size={14} className="text-[#ffad7d]" style={{ color: '#ffad7d' }} />
            YOUR PROJECT, AT A GLANCE
          </div>
          <p className="max-w-lg text-4xl font-semibold leading-[1.12] tracking-[-0.04em] sm:text-5xl">
            A smarter way to manage
            <span className="mt-1 block text-[#ffad7d]" style={{ color: '#ffad7d' }}>Arban City.</span>
          </p>
          <p className="mt-5 max-w-md text-sm leading-6 text-white/65 sm:text-base sm:leading-7">
            Keep your website content, project updates and customer enquiries in one place.
          </p>

          <div className="mt-9 grid max-w-md grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <ShieldCheck size={19} className="mb-3 text-[#ffad7d]" style={{ color: '#ffad7d' }} />
              <p className="text-sm font-bold text-white">Secure access</p>
              <p className="mt-1 text-xs leading-5 text-white/55">For authorised administrators</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <Building2 size={19} className="mb-3 text-[#ffad7d]" style={{ color: '#ffad7d' }} />
              <p className="text-sm font-bold text-white">One workspace</p>
              <p className="mt-1 text-xs leading-5 text-white/55">Manage your project website</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-xs font-medium text-white/45">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Arban City administrative portal
        </div>
      </section>

      <section
        className="flex min-h-[500px] items-center justify-center px-5 py-10 sm:px-10 md:min-h-screen md:px-8 lg:px-12"
        style={{ backgroundColor: '#fff' }}
      >
        <div className="w-full max-w-[420px]">
          <button
            type="button"
            onClick={onBackToSite}
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#68748a] transition-colors hover:text-[#111d46]"
          >
            <ArrowLeft size={16} />
            Back to website
          </button>

          <div className="mb-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f26635]" style={{ color: '#f26635' }}>Admin portal</p>
            <h1 className="text-2xl font-extrabold tracking-tight text-[#111d46]">Welcome back</h1>
            <p className="mt-2 text-sm leading-6 text-[#758096]">
              Sign in with your administrator account to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-5 text-red-700"
              >
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="admin-email" className="mb-2 block text-sm font-bold text-[#27334d]">
                Email address
              </label>
              <div className="relative">
                <Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#98a1b1]" />
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded-xl border border-[#dfe3ea] bg-white py-3.5 pl-11 pr-4 text-sm text-[#18243e] outline-none transition placeholder:text-[#a5adba] hover:border-[#bac2cf] focus:border-[#f26635] focus:ring-4 focus:ring-[#f26635]/10"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="admin-password" className="block text-sm font-bold text-[#27334d]">
                  Password
                </label>
              </div>
              <div className="relative">
                <LockKeyhole size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#98a1b1]" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-[#dfe3ea] bg-white py-3.5 pl-11 pr-12 text-sm text-[#18243e] outline-none transition placeholder:text-[#a5adba] hover:border-[#bac2cf] focus:border-[#f26635] focus:ring-4 focus:ring-[#f26635]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#8791a2] transition hover:bg-[#f1f3f6] hover:text-[#27334d]"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#111d46] px-5 py-3.5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(17,29,70,0.16)] transition hover:bg-[#1b2b60] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-65"
              style={{ backgroundColor: '#111d46' }}
            >
              <span>{loading ? 'Signing in…' : 'Sign in to dashboard'}</span>
              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs font-medium text-[#929aaa]">
            <ShieldCheck size={15} />
            Authorised access only
          </div>
          <p className="mt-8 text-center text-xs text-[#a2a9b5]">
            © 2026 Arban City · Administrative Portal
          </p>
        </div>
      </section>
    </main>
  );
}
