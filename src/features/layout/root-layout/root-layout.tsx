import { createRef, useEffect, useState } from "react"
import { Link, Outlet, useNavigate, useParams } from "react-router-dom"
import { Transition } from "react-transition-group"
import SimpleBar from "simplebar"

import { useGeneral } from "@features/general-provider"

import { Loading } from "@shared/ui/loading"
import { Typography } from "@shared/ui/typography"
import { cn } from "@shared/utils/cn"

import ChevronIcon from "@assets/icons/chevron.svg"
import CloseIcon from "@assets/icons/close.svg"
import HomeIcon from "@assets/icons/home.svg"
import ZoomIcon from "@assets/icons/zoom.svg"

import { getSvgById } from "./menu-icons"
import { FormattedMenu, enter, leave, linkTo, nestedMenu } from "./side-menu"

const RootLayout = () => {
  const { general, isLoading } = useGeneral()
  const { id } = useParams()
  const page = general?.pages?.find(page => page.id === Number(id))
  const pageName = isLoading ? "Завантаження..." : (page?.title ?? "Головна")
  const [compactMenuOnHover, setCompactMenuOnHover] = useState(false)
  const [activeMobileMenu, setActiveMobileMenu] = useState(false)
  const navigate = useNavigate()
  const [formattedMenu, setFormattedMenu] = useState<FormattedMenu[]>([])
  const scrollableRef = createRef<HTMLDivElement>()

  const [topBarActive, setTopBarActive] = useState(false)

  const requestFullscreen = () => {
    const el = document.documentElement
    if (el.requestFullscreen) {
      el.requestFullscreen()
    }
  }

  useEffect(() => {
    if (scrollableRef.current) {
      new SimpleBar(scrollableRef.current)
    }
    if (general?.menu) {
      setFormattedMenu(nestedMenu(general?.menu, Number(id)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, general?.menu])

  window.onscroll = () => {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      setTopBarActive(true)
    } else {
      setTopBarActive(false)
    }
  }

  return (
    <>
      <div
        className={cn([
          "background group relative min-h-screen bg-gradient-to-b from-slate-200/70 to-slate-50",
          "before:fixed before:top-0 before:h-[370px] before:w-screen before:bg-gradient-to-t before:from-theme-1/80 before:to-theme-2 before:transition-[opacity,height] before:duration-300 before:ease-in-out before:content-[''] [&.background--hidden]:before:opacity-0",
          "after:fixed after:top-0 after:h-[370px] after:w-screen after:bg-texture-white after:bg-contain after:bg-fixed after:bg-[center_-13rem] after:bg-no-repeat after:transition-[opacity,height] after:duration-300 after:ease-in-out after:content-[''] [&.background--hidden]:after:opacity-0",
          topBarActive && "background--hidden",
        ])}
      >
        <div
          className={cn([
            "side-menu group fixed inset-y-0 left-0 top-0 z-50 shadow-xl transition-[margin,padding] duration-300 xl:ml-0 xl:py-3.5 xl:pl-3.5 xl:shadow-none",
            "side-menu--collapsed after:fixed after:inset-0 after:bg-black/80 after:content-[''] after:xl:hidden",
            { "side-menu--on-hover": compactMenuOnHover },
            { "ml-0 after:block": activeMobileMenu },
            { "-ml-[275px] after:hidden": !activeMobileMenu },
          ])}
        >
          <div
            className={cn([
              "fixed z-50 ml-[275px] h-10 w-10 items-center justify-center xl:hidden",
              { flex: activeMobileMenu },
              { hidden: !activeMobileMenu },
            ])}
          >
            <a
              href=""
              onClick={event => {
                event.preventDefault()
                setActiveMobileMenu(false)
              }}
              className="ml-5 mt-5"
            >
              <span className="text-white *:size-4 *:fill-white">
                <CloseIcon />
              </span>
            </a>
          </div>
          <div
            className={cn([
              "box relative z-20 flex h-full w-[275px] flex-col overflow-hidden rounded-none bg-white/[0.95] transition-[width] duration-300 xl:rounded-xl group-[.side-menu--collapsed.side-menu--on-hover]:xl:w-[275px] group-[.side-menu--collapsed]:xl:w-[91px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:shadow-[6px_0_12px_-4px_#0000000f]",
            ])}
            onMouseOver={event => {
              event.preventDefault()
              setCompactMenuOnHover(true)
            }}
            onMouseLeave={event => {
              event.preventDefault()
              setCompactMenuOnHover(false)
            }}
          >
            <div
              className={cn([
                "relative z-10 hidden h-[65px] w-[275px] flex-none items-center overflow-hidden px-5 duration-300 xl:flex group-[.side-menu--collapsed.side-menu--on-hover]:xl:w-[275px] group-[.side-menu--collapsed]:xl:w-[91px]",
              ])}
            >
              <Link
                to="/"
                className="flex items-center transition-[margin] duration-300 group-[.side-menu--collapsed.side-menu--on-hover]:xl:ml-0 group-[.side-menu--collapsed]:xl:ml-2"
              >
                <div className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-gradient-to-b from-theme-1 to-theme-2/80 transition-transform ease-in-out group-[.side-menu--collapsed.side-menu--on-hover]:xl:-rotate-180">
                  <div className="relative h-[16px] w-[16px] -rotate-45 [&_div]:bg-white">
                    <div className="absolute inset-y-0 left-0 my-auto h-[75%] w-[21%] rounded-full opacity-50"></div>
                    <div className="absolute inset-0 m-auto h-[120%] w-[21%] rounded-full"></div>
                    <div className="absolute inset-y-0 right-0 my-auto h-[75%] w-[21%] rounded-full opacity-50"></div>
                  </div>
                </div>
                <div className="ml-3.5 font-medium transition-opacity group-[.side-menu--collapsed.side-menu--on-hover]:xl:opacity-100 group-[.side-menu--collapsed]:xl:opacity-0">
                  ADMIN
                </div>
              </Link>
            </div>
            <div
              ref={scrollableRef}
              className={cn([
                "z-20 h-full w-full overflow-y-auto overflow-x-hidden px-5 pb-3 [-webkit-mask-image:-webkit-linear-gradient(top,rgba(0,0,0,0),black_30px)] [&:-webkit-scrollbar]:w-0 [&:-webkit-scrollbar]:bg-transparent",
                "[&_.simplebar-content]:p-0 [&_.simplebar-track.simplebar-vertical]:mr-0.5 [&_.simplebar-track.simplebar-vertical]:w-[10px] [&_.simplebar-track.simplebar-vertical_.simplebar-scrollbar]:before:bg-slate-400/30",
              ])}
            >
              <ul className="scrollable">
                {formattedMenu.map((menu, menuKey) => (
                  <li key={menuKey}>
                    <a
                      href=""
                      className={cn([
                        "side-menu__link",
                        { "side-menu__link--active": menu.active },
                        {
                          "side-menu__link--active-dropdown": menu.activeDropdown,
                        },
                      ])}
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        linkTo(menu, navigate)
                        setFormattedMenu([...formattedMenu])
                      }}
                    >
                      <span className="side-menu__link__icon *:size-5">
                        {getSvgById(menu.comment.icon)}
                      </span>
                      <div className="side-menu__link__title">{menu.comment.title}</div>
                      {!!menu.children.length && (
                        <span className="side-menu__link__chevron *:size-5 *:fill-black">
                          <ChevronIcon />
                        </span>
                      )}
                    </a>
                    {!!menu.children.length && (
                      <Transition
                        in={menu.activeDropdown}
                        onEnter={enter}
                        onExit={leave}
                        timeout={300}
                      >
                        <ul
                          className={cn(
                            { block: menu.activeDropdown },
                            { hidden: !menu.activeDropdown },
                          )}
                        >
                          {menu.children.map((children, childrenKey) => (
                            <li key={childrenKey}>
                              <a
                                href="#"
                                className={cn([
                                  "side-menu__link",
                                  { "side-menu__link--active": children.active },
                                  {
                                    "side-menu__link--active-dropdown": children.activeDropdown,
                                  },
                                ])}
                                onClick={(event: React.MouseEvent) => {
                                  event.preventDefault()
                                  linkTo(children, navigate)
                                  setFormattedMenu([...formattedMenu])
                                }}
                              >
                                <span className="side-menu__link__icon *:size-5">
                                  {getSvgById(menu.comment.icon)}
                                </span>
                                <div className="side-menu__link__title">
                                  {children.comment.title}
                                </div>
                                {!!children.children.length && (
                                  <span className="side-menu__link__chevron *:size-5 *:fill-black">
                                    <ChevronIcon />
                                  </span>
                                )}
                              </a>
                              {!!children.children.length && (
                                <Transition
                                  in={children.activeDropdown}
                                  onEnter={enter}
                                  onExit={leave}
                                  timeout={300}
                                >
                                  <ul
                                    className={cn(
                                      {
                                        block: children.activeDropdown,
                                      },
                                      { hidden: !children.activeDropdown },
                                    )}
                                  >
                                    {children.children.map((lastChildren, lastChildrenKey) => (
                                      <li key={lastChildrenKey}>
                                        <a
                                          href="#"
                                          className={cn([
                                            "side-menu__link",
                                            {
                                              "side-menu__link--active": lastChildren.active,
                                            },
                                            {
                                              "side-menu__link--active-dropdown":
                                                lastChildren.activeDropdown,
                                            },
                                          ])}
                                          onClick={(event: React.MouseEvent) => {
                                            event.preventDefault()
                                            linkTo(lastChildren, navigate)
                                            setFormattedMenu([...formattedMenu])
                                          }}
                                        >
                                          <div className="side-menu__link__title">
                                            {lastChildren.comment.title}
                                          </div>
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </Transition>
                              )}
                            </li>
                          ))}
                        </ul>
                      </Transition>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="fixed inset-x-0 top-0 mt-3.5 h-[65px] transition-[margin] duration-100 xl:ml-[275px] group-[.side-menu--collapsed]:xl:ml-[90px]">
            <div
              className={cn([
                "top-bar group absolute left-0 right-0 mx-5 h-full xl:left-3.5",
                "before:absolute before:inset-x-0 before:top-0 before:-mt-[15px] before:h-[20px] before:backdrop-blur before:content-['']",
                topBarActive && "top-bar--active",
              ])}
            >
              <div className="box group-[.top-bar--active]:box container flex h-full w-full items-center border-transparent bg-transparent shadow-none transition-[padding,background-color,border-color] duration-300 ease-in-out group-[.top-bar--active]:border-transparent group-[.top-bar--active]:bg-transparent group-[.top-bar--active]:bg-gradient-to-r group-[.top-bar--active]:from-theme-1 group-[.top-bar--active]:to-theme-2 group-[.top-bar--active]:px-5">
                <div className="flex items-center gap-1 xl:hidden">
                  <a
                    href=""
                    onClick={event => {
                      event.preventDefault()
                      setActiveMobileMenu(true)
                    }}
                    className="rounded-full p-2 text-white hover:bg-white/5"
                  >
                    <span className="*:size-6 *:fill-white">
                      <HomeIcon />
                    </span>
                  </a>
                </div>
                <Typography as="span" className="flex-1 px-3 text-white xl:px-0">
                  {pageName}
                </Typography>
                <a
                  href=""
                  className="rounded-full p-2 *:fill-white hover:bg-white/5"
                  onClick={e => {
                    e.preventDefault()
                    requestFullscreen()
                  }}
                >
                  <ZoomIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className={cn([
            "mode group relative z-10 pb-16 pt-[54px] transition-[margin,width] duration-100 xl:ml-[91px] xl:pl-3.5",
            { "mode--light": !topBarActive },
          ])}
        >
          <div className="mt-16 px-5">
            <div className="container">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
    </>
  )
}

export default RootLayout
