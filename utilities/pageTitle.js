import he from 'he'
import { siteTitle } from '../components/Layout'

export default function generatePageTitle(pageTitle) {
  return he.decode(pageTitle) + ' \u00b7 ' + siteTitle
}
