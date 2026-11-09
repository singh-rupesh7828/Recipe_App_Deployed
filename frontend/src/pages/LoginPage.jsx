import { useState } from 'react'
import {
  LuChefHat,
  LuEye,
  LuEyeOff,
  LuLockKeyhole,
  LuMail,
} from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import api from '../axios'

function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      await api.post('/auth/signin', {
        emailOrUsername,
        password,
      })
      navigate('/')
    } catch (error) {
      setMessage(
        error?.response?.data?.message ||
          'Unable to sign in. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f3fff7] px-[15px] pb-8 pt-[66px] font-sans text-[#17212b] sm:pt-[68px]">
      <Link
        aria-label="My Recipes home"
        className="mx-auto mb-[29px] flex w-fit items-center gap-[11px]"
        to="/"
      >
        <span className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] bg-[#4caf50] text-white shadow-[0_2px_4px_rgba(0,0,0,0.14)]">
          <LuChefHat aria-hidden="true" size={24} />
        </span>
        <span className="text-[20px] font-semibold">My Recipes</span>
      </Link>

      <section className="mx-auto w-full max-w-[383px] rounded-[21px] border border-[#e6f2e8] bg-white px-[21px] pb-[21px] pt-[25px] shadow-[0_15px_22px_rgba(29,61,39,0.14)] sm:px-[22px] sm:pt-[27px]">
        <div className="mb-[21px] text-center">
          <h1 className="text-[20px] font-semibold leading-7">Welcome back</h1>
          <p className="mt-[10px] text-[13px] leading-[20px] text-[#607587]">
            Log in to save recipes and keep your kitchen organized.
          </p>
        </div>

        <form className="space-y-[16px]" onSubmit={handleSubmit}>
          <label
            className="block text-[12px] font-semibold"
            htmlFor="login-email"
          >
            Email or username
            <span className="mt-[6px] flex h-[43px] items-center rounded-full border border-[#d7edda] bg-[#fbfffd] px-[13px] text-[#607987] focus-within:border-[#91ce98] focus-within:ring-2 focus-within:ring-[#c8e6c9]/60">
              <LuMail aria-hidden="true" size={17} />
              <input
                autoComplete="username"
                className="ml-[10px] h-full min-w-0 flex-1 bg-transparent text-[13px] font-normal text-[#26343d] outline-none placeholder:text-[#8396a3]"
                id="login-email"
                name="emailOrUsername"
                placeholder="Email or username"
                required
                type="text"
                value={emailOrUsername}
                onChange={(event) => setEmailOrUsername(event.target.value)}
              />
            </span>
          </label>

          <div>
            <div className="mb-[6px]">
              <label
                className="text-[12px] font-semibold"
                htmlFor="login-password"
              >
                Password
              </label>
            </div>
            <span className="flex h-[43px] items-center rounded-full border border-[#d7edda] bg-[#fbfffd] px-[13px] text-[#607987] focus-within:border-[#91ce98] focus-within:ring-2 focus-within:ring-[#c8e6c9]/60">
              <LuLockKeyhole aria-hidden="true" size={17} />
              <input
                autoComplete="current-password"
                className="ml-[10px] h-full min-w-0 flex-1 bg-transparent text-[13px] font-normal text-[#26343d] outline-none placeholder:text-[#8396a3]"
                id="login-password"
                name="password"
                placeholder="Enter your password"
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="ml-2 flex shrink-0 items-center justify-center rounded-full p-1 hover:bg-[#e8f5e9]"
                onClick={() => setShowPassword((visible) => !visible)}
                type="button"
              >
                {showPassword ? (
                  <LuEyeOff aria-hidden="true" size={15} />
                ) : (
                  <LuEye aria-hidden="true" size={15} />
                )}
              </button>
            </span>
          </div>

          <button
            className="h-[43px] w-full rounded-full bg-[#4caf50] text-[12px] font-semibold text-white shadow-[0_3px_5px_rgba(0,0,0,0.15)] transition-colors hover:bg-[#43a047] disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        {message && (
          <p
            aria-live="polite"
            className="mt-3 text-center text-[12px] text-[#607587]"
          >
            {message}
          </p>
        )}

        <div className="my-[20px] flex items-center gap-[10px]">
          <span className="h-px flex-1 bg-[#e8f5e9]" />
          <span className="text-[10px] font-medium text-[#607587]">
            NEW TO MY RECIPES?
          </span>
          <span className="h-px flex-1 bg-[#e8f5e9]" />
        </div>

        <Link
          className="flex h-[43px] w-full items-center justify-center rounded-full border border-[#4caf50] text-[12px] font-medium text-[#43a047] transition-colors hover:bg-[#f3fff7]"
          to="/register"
        >
          Create an account
        </Link>
      </section>

      <p className="mx-auto mt-[22px] text-center text-[11px] leading-5 text-[#607587]">
        By continuing, you agree to keep your kitchen delicious.
      </p>
    </main>
  )
}

export default LoginPage
