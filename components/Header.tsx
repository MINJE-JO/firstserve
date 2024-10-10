// components/Header.tsx

import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-green-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">FirstServe</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/questionnaire" className="hover:underline">Find Your Racket</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header