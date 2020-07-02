import he from 'he'
import { siteTitle } from '../components/layout'

export default function generatePageTitle(pageTitle) {
  return he.decode(pageTitle) + ' \u00b7 ' + siteTitle
}
