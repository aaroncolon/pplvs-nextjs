import Link from 'next/link'

export default function SiteBranding() {
  return (
    <h1 className="site-branding">
      <Link href="/">
        <a>People VS</a>
      </Link>
    </h1>
  );
}
