import Link from 'next/link'

import { menuPrimary } from '../lib/menus'

class NavigationMain extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      menuOpen: false
    }

    this.handleMenuToggle = this.handleMenuToggle.bind(this)
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this)
  }

  handleMenuToggle(e) {
    e.preventDefault()
    this.toggleMenu()
  }

  handleMenuItemClick(e) {
    this.toggleMenu()
  }

  toggleMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  doMenuToggleClasses() {
    let classes = 'menu-toggle'
    if (this.state.menuOpen) {
      return classes + ' menu-toggle--open'
    } 
    return classes
  }

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
        let href = "/[...slug]"
        if (child.skipCatchAll) {
          href = `/${item.slug}/${child.slug}`
        }
        return (
          <li key={child.slug}>
            <Link href={href} as={`/${item.slug}/${child.slug}`}>
              <a onClick={this.handleMenuItemClick}>{child.label}</a>
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
          <Link href="/[...slug]" as={`/${item.slug}`}>
            <a onClick={this.handleMenuItemClick}>{item.label}</a>
          </Link>
          {(subItems.length) ? this.doSubMenu(subItems) : null}
        </li>
      )
    })
  }

  render() {
    return (
      <>
        <button 
          onClick={this.handleMenuToggle} 
          className={this.doMenuToggleClasses()}
          aria-expanded={this.state.menuOpen}
          aria-controls="primary-menu">
          Menu
        </button>

        <nav id="primary-menu" className="menu menu--primary" aria-expanded={this.state.menuOpen}>
          <ul>
            {this.doNavItems()}
          </ul>
        </nav>
      </>
    )
  }
}

export default NavigationMain
