// components/Footer.tsx

import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; 2024 FirstServe. All rights reserved.</p>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer