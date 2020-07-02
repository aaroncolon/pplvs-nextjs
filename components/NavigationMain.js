import Link from 'next/link'

import { menuPrimary } from '../lib/menus'

class NavigationMain extends React.Component {
  doSubMenu(subItems) {
    return (
      <ul className="sub-menu">
        {subItems}
      </ul>
    )
  }

  doNavSubItems(item) {
    if (item.children.length) {
      return item.children.map((child) => {
        return (
          <li key={child.slug}>
            <Link href={`/${item.slug}/${child.slug}`} as={`/${item.slug}/${child.slug}`}>
              <a>{child.label}</a>
            </Link>
          </li>
        )
      })
    }
    return []
  }

  doNavItems() {
    return menuPrimary.map((item) => {
      const subItems = this.doNavSubItems(item)
      return (
        <li key={item.slug}>
          <Link href={`/[${item.slug}]`} as={`/${item.slug}`}>
            <a>{item.label}</a>
          </Link>
          {(subItems.length) ? this.doSubMenu(subItems) : null}
        </li>
      )
    })
  }

  render() {
    return (
      <nav className="menu menu--primary">
        <ul>
          {this.doNavItems()}
        </ul>
      </nav>
    )
  }
}

export default NavigationMain
