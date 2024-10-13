import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* 배경 이미지 */}
      <Image
        src="/tennis-court-bg.jpg"
        alt="Tennis Court Background"
        fill
        style={{ objectFit: 'cover' }}
        quality={100}
        className="z-0 opacity-50"
      />
      
      {/* 콘텐츠 */}
      <div className="z-10 text-center px-4">
        <h1 className="text-5xl font-bold mb-4 text-gray-800">
          당신에게 완벽한 테니스 라켓을 찾아보세요
        </h1>
        <p className="text-xl mb-8 text-gray-600">
          맞춤형 추천을 받거나 라켓을 직접 비교해보세요
        </p>
        <div className="space-x-4">
          <Link href="/questionnaire">
            <Button variant="primary" size="lg">
              설문 시작하기
            </Button>
          </Link>
          <Link href="/compare">
            <Button variant="secondary" size="lg">
              라켓 비교하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}