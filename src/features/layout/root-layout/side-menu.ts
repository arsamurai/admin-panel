import { NavigateFunction } from "react-router-dom"

import { MenuItemEntity } from "@services/general-service"

import { ROUTES } from "@shared/constants"
import { slideDown, slideUp } from "@shared/utils/helpers"

export interface FormattedMenu extends MenuItemEntity {
  active?: boolean
  activeDropdown?: boolean
  children: FormattedMenu[]
}

const findActiveMenu = (children: MenuItemEntity[], pageId: number): boolean => {
  let match = false
  children.forEach(item => {
    if (pageId !== undefined && item.comment.page_id === pageId) {
      match = true
    } else if (!match && item.children) {
      match = findActiveMenu(item.children, pageId)
    }
  })
  return match
}

const nestedMenu = (menu: MenuItemEntity[], pageId: number) => {
  const formattedMenu: FormattedMenu[] = []
  menu.forEach(item => {
    const menuItem: FormattedMenu = {
      comment: {
        id: item.comment.id,
        icon: item.comment.icon,
        title: item.comment.title,
        page_id: item.comment.page_id,
        order_id: item.comment.page_id,
        parent_id: item.comment.page_id,
      },
      children: item.children,
    }
    menuItem.active = pageId !== undefined && item.comment.page_id === pageId

    if (menuItem.children) {
      menuItem.activeDropdown = findActiveMenu(menuItem.children, pageId)

      const children: FormattedMenu[] = []
      nestedMenu(menuItem.children, pageId).map(menu => children.push(menu))
      menuItem.children = children
    }

    formattedMenu.push(menuItem)
  })

  return formattedMenu
}

const linkTo = (menu: FormattedMenu, navigate: NavigateFunction) => {
  if (menu.children.length) {
    menu.activeDropdown = !menu.activeDropdown
  } else {
    if (menu.comment.page_id !== undefined) {
      navigate(`${ROUTES.PAGE.path}/${menu.comment.page_id}`)
    }
  }
}

const enter = (el: HTMLElement) => {
  slideDown(el, 300)
}

const leave = (el: HTMLElement) => {
  slideUp(el, 300)
}

export { nestedMenu, linkTo, enter, leave }
