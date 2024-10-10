// app/page.tsx

import Link from 'next/link'
import Button from '@/components/Button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <h1 className="text-4xl font-bold mb-4 text-center">Find Your Perfect Tennis Racket</h1>
      <p className="text-xl mb-8 text-center">Answer a few questions and get personalized recommendations</p>
      <Link href="/questionnaire">
        <Button>Start Questionnaire</Button>
      </Link>
    </div>
  )
}