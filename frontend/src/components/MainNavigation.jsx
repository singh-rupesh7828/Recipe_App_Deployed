import { LuHouse, LuPlus, LuSettings, LuSparkles } from 'react-icons/lu'
import { NavLink } from 'react-router-dom'

const navigationItems = [
  { label: 'Home', icon: LuHouse, to: '/' },
  { label: 'Add', icon: LuPlus, to: '/add' },
  { label: 'Generate', icon: LuSparkles, to: '/generate' },
  { label: 'Manage', icon: LuSettings, to: '/manage' },
]

const layouts = {
  home: {
    nav: 'mt-[23px] flex h-[59px] items-center justify-around rounded-[16px] bg-white px-2 shadow-[0_2px_4px_rgba(0,0,0,0.08)] md:mt-[19px] md:h-[54px] md:rounded-[14px] md:px-5',
    link: 'h-[40px] min-w-[40px] px-2.5 md:h-[48px] md:px-3.5',
  },
  compact: {
    nav: 'flex h-full items-center gap-1 md:gap-2',
    link: 'h-[38px] min-w-[38px] px-2.5 md:h-[44px] md:px-3',
  },
}

function MainNavigation({ layout = 'home' }) {
  const { nav, link } = layouts[layout]

  return (
    <nav aria-label="Main navigation" className={nav}>
      {navigationItems.map(({ label, icon: Icon, to }) => (
        <NavLink
          aria-label={label}
          className={({ isActive }) =>
            `flex items-center justify-center gap-1.5 rounded-full text-[13px] transition-colors md:text-[14px] ${link} ${
              isActive
                ? 'bg-[#e8f5e9] text-[#4caf50]'
                : 'text-[#607987] hover:bg-[#f3fff7]'
            }`
          }
          end={to === '/'}
          key={label}
          to={to}
        >
          <Icon aria-hidden="true" size={18} strokeWidth={2} />
          <span className="hidden md:inline">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default MainNavigation
