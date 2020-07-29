import Link from 'next/link'

export default function SiteBranding() {
  return (
    <h1 className="site-branding">
      <Link href="/">
        <a className="site-title">People <b>VS</b></a>
      </Link>
    </h1>
  );
}
