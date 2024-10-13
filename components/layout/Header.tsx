import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-green-500 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">FirstServe</Link>
        <ul className="flex space-x-4">
          <li><Link href="/" className="text-white hover:text-green-200">Home</Link></li>
          <li><Link href="/compare" className="text-white hover:text-green-200">Compare Rackets</Link></li>
          <li><Link href="/questionnaire" className="text-white hover:text-green-200">Find Your Racket</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header