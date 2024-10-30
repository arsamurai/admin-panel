import { createRef, useEffect, useState } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"
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

  return (
    <>
      <div
        className={cn([
          "before:fixed before:top-0 before:h-screen before:w-full before:bg-gradient-to-b before:from-slate-100 before:to-slate-50 before:content-['']",
        ])}
      >
        <div
          className={cn([
            "side-menu side-menu--collapsed group fixed left-0 top-0 z-50 h-screen",
            { "side-menu--on-hover": compactMenuOnHover },
          ])}
        >
          <div className="box fixed inset-x-0 top-0 z-10 flex h-[65px] rounded-none border-x-0 border-t-0 border-transparent bg-gradient-to-r from-theme-1 to-theme-2 shadow-lg">
            <div
              className={cn([
                "relative z-10 hidden h-full flex-none items-center overflow-hidden bg-white px-5 duration-300 xl:flex xl:w-[275px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:w-[275px] group-[.side-menu--collapsed]:xl:w-[91px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:shadow-[6px_0_12px_-4px_#0000001f]",
                "before:absolute before:right-0 before:hidden before:h-4/6 before:border-r before:border-dashed before:border-white/[0.15] before:content-[''] before:xl:block before:group-[.side-menu--collapsed.side-menu--on-hover]:xl:hidden",
                "hidden after:absolute after:left-[-1.25rem] after:z-[-1] after:h-full after:w-screen after:bg-gradient-to-r after:from-theme-1 after:to-theme-2 after:bg-[length:100vw_65px] after:bg-[1.25rem_top] after:content-['']",
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
              <a
                href=""
                className="flex items-center transition-[margin] group-[.side-menu--collapsed.side-menu--on-hover]:xl:ml-0 group-[.side-menu--collapsed]:xl:ml-2"
              >
                <div className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-white/10 transition-transform ease-in-out group-[.side-menu--collapsed.side-menu--on-hover]:xl:-rotate-180">
                  <div className="relative h-[16px] w-[16px] -rotate-45 [&_div]:bg-white">
                    <div className="absolute inset-y-0 left-0 my-auto h-[75%] w-[21%] rounded-full opacity-50"></div>
                    <div className="absolute inset-0 m-auto h-[120%] w-[21%] rounded-full"></div>
                    <div className="absolute inset-y-0 right-0 my-auto h-[75%] w-[21%] rounded-full opacity-50"></div>
                  </div>
                </div>
                <div className="ml-3.5 font-medium text-white transition-opacity group-[.side-menu--collapsed.side-menu--on-hover]:xl:opacity-100 group-[.side-menu--collapsed]:xl:opacity-0">
                  ADMIN
                </div>
              </a>
            </div>
            <div className="absolute inset-x-0 h-full transition-[padding] duration-100 xl:pl-[275px] group-[.side-menu--collapsed]:xl:pl-[91px]">
              <div className="flex h-full w-full items-center px-5">
                <a
                  href=""
                  onClick={event => {
                    event.preventDefault()
                    setActiveMobileMenu(true)
                  }}
                  className="rounded-full p-2 hover:bg-white/5 xl:hidden"
                >
                  <span className="*:size-6 *:fill-white">
                    <HomeIcon />
                  </span>
                </a>
                <Typography as="span" className="px-3 text-white xl:px-0">
                  {pageName}
                </Typography>
                <a
                  href=""
                  className="ml-auto rounded-full p-2 *:fill-white hover:bg-white/5"
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

          <div
            className="absolute inset-y-0 z-10 xl:top-[65px] xl:z-0"
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
                "relative flex h-full w-[275px] flex-col overflow-hidden rounded-none border-r border-dashed border-slate-300/70 bg-gradient-to-b from-slate-100 to-slate-50 transition-[width,margin] duration-300 xl:ml-0 group-[.side-menu--collapsed.side-menu--on-hover]:xl:w-[275px] group-[.side-menu--collapsed]:xl:w-[91px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:border-solid group-[.side-menu--collapsed.side-menu--on-hover]:xl:shadow-[6px_0_12px_-4px_#0000000f]",
                "after:fixed after:inset-0 after:z-[-1] after:bg-black/80 after:content-[''] after:xl:hidden",
                { "ml-0 after:block": activeMobileMenu },
                { "-ml-[275px] after:hidden": !activeMobileMenu },
              ])}
            >
              <div
                className={cn([
                  "fixed ml-[275px] h-10 w-10 items-center justify-center xl:hidden",
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
          </div>
        </div>
        <div
          className={cn([
            "relative z-10 mt-[65px] px-5 pb-16 pt-[31px] transition-[margin,width] duration-100 xl:ml-[91px]",
          ])}
        >
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
    </>
  )
}

export default RootLayout
