import { useState } from 'react'
import { LuChefHat, LuEye, LuEyeOff, LuLockKeyhole, LuMail, LuUserRound, } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import api from '../axios'

function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      await api.post("/auth/register", {
        username: name,
        gmail: email,
        password: password
      })

      navigate('/')
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occured during creation")
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <main className="min-h-screen bg-[#f3fff7] px-3.75 pb-8 pt-16.5 font-sans text-[#17212b] sm:pt-17">
      <Link
        aria-label="My Recipes home"
        className="mx-auto mb-7.25 flex w-fit items-center gap-2.75 sm:mb-7.25"
        to="/"
      >
        <span className="flex h-10.5 w-10.5 items-center justify-center rounded-[14px] bg-[#4caf50] text-white shadow-[0_2px_4px_rgba(0,0,0,0.14)]">
          <LuChefHat aria-hidden="true" size={24} />
        </span>
        <span className="text-[20px] font-semibold">My Recipes</span>
      </Link>

      <section className="mx-auto w-full max-w-95.75 rounded-[21px] border border-[#e6f2e8] bg-white px-5.25 pb-5.25 pt-6.25 shadow-[0_15px_22px_rgba(29,61,39,0.14)] sm:px-5.5 sm:pt-6.75">
        <div className="mb-5.25 text-center">
          <h1 className="text-[20px] font-semibold leading-7">
            Create your account
          </h1>
          <p className="mx-auto mt-2.5 max-w-77.5 text-[13px] leading-5 text-[#607587]">
            Start saving favorites and building your personal recipe
            collection.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-[12px] font-semibold" htmlFor="full-name">
            Full name
            <span className="relative mt-1.5 flex h-10.75 items-center rounded-full border border-[#d7edda] bg-[#fbfffd] px-3.25 text-[#607987] focus-within:border-[#91ce98] focus-within:ring-2 focus-within:ring-[#c8e6c9]/60">
              <LuUserRound aria-hidden="true" size={17} />
              <input
                autoComplete="name"
                className="ml-2.5 h-full min-w-0 flex-1 bg-transparent text-[13px] font-normal text-[#26343d] outline-none placeholder:text-[#8396a3]"
                id="full-name"
                name="name"
                placeholder="Your name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </span>
          </label>

          <label
            className="block text-[12px] font-semibold"
            htmlFor="email-address"
          >
            Email address
            <span className="mt-1.5 flex h-10.75 items-center rounded-full border border-[#d7edda] bg-[#fbfffd] px-3.25 text-[#607987] focus-within:border-[#91ce98] focus-within:ring-2 focus-within:ring-[#c8e6c9]/60">
              <LuMail aria-hidden="true" size={17} />
              <input
                autoComplete="email"
                className="ml-2.5 h-full min-w-0 flex-1 bg-transparent text-[13px] font-normal text-[#26343d] outline-none placeholder:text-[#8396a3]"
                id="email-address"
                name="email"
                placeholder="you@example.com"
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </span>
          </label>

          <label
            className="block text-[12px] font-semibold"
            htmlFor="account-password"
          >
            Password
            <span className="mt-1.5 flex h-10.75 items-center rounded-full border border-[#d7edda] bg-[#fbfffd] px-3.25 text-[#607987] focus-within:border-[#91ce98] focus-within:ring-2 focus-within:ring-[#c8e6c9]/60">
              <LuLockKeyhole aria-hidden="true" size={17} />
              <input
                autoComplete="new-password"
                className="ml-2.5 h-full min-w-0 flex-1 bg-transparent text-[13px] font-normal text-[#26343d] outline-none placeholder:text-[#8396a3]"
                id="account-password"
                minLength={8}
                name="password"
                placeholder="At least 8 characters"
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
          </label>

          <button
            className="h-10.75 w-full rounded-full bg-[#4caf50] text-[12px] font-semibold text-white shadow-[0_3px_5px_rgba(0,0,0,0.15)] transition-colors hover:bg-[#43a047] disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
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

        <div className="my-5 flex items-center gap-2.5">
          <span className="h-px flex-1 bg-[#e8f5e9]" />
          <span className="text-[10px] font-medium text-[#607587]">
            ALREADY HAVE AN ACCOUNT?
          </span>
          <span className="h-px flex-1 bg-[#e8f5e9]" />
        </div>

        <Link
          className="flex h-10.75 w-full items-center justify-center rounded-full border border-[#4caf50] text-[12px] font-medium text-[#43a047] transition-colors hover:bg-[#f3fff7]"
          to="/login"
        >
          Log in instead
        </Link>
      </section>

      <p className="mx-auto mt-5.5 text-center text-[11px] leading-5 text-[#607587]">
        By continuing, you agree to keep your kitchen delicious.
      </p>
    </main>
  )
}

export default RegisterPage
