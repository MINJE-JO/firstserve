import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Racket } from '@/types/racket';

async function getRacketDetails(id: string): Promise<Racket | null> {
  const supabase = createServerComponentClient({ cookies });
  
  const { data, error } = await supabase
    .from('rackets')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching racket details:', error);
    return null;
  }

  return data;
}

export default async function RacketDetailPage({ params }: { params: { id: string } }) {
  const racket = await getRacketDetails(params.id);

  if (!racket) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{racket.brand} {racket.model}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={racket.image_url}
            alt={`${racket.brand} ${racket.model}`}
            width={500}
            height={500}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">상세 스펙</h2>
          <ul className="space-y-2">
            <li><strong>무게:</strong> {racket.weight}g</li>
            <li><strong>밸런스:</strong> {racket.balance}mm</li>
            <li><strong>스윙웨이트:</strong> {racket.swingweight}</li>
            <li><strong>강성:</strong> {racket.stiffness}</li>
            <li><strong>파워:</strong> {racket.power}/10</li>
            <li><strong>컨트롤:</strong> {racket.control}/10</li>
            <li><strong>스핀:</strong> {racket.spin}/10</li>
            <li><strong>안정성:</strong> {racket.stability}/10</li>
            <li><strong>편안함:</strong> {racket.comfort}/10</li>
            <li><strong>조작성:</strong> {racket.maneuverability}/10</li>
          </ul>
          <p className="mt-6">{racket.description}</p>
          <Link href="/results" className="mt-8 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            추천 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}