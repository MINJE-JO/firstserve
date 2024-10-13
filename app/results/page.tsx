import { getRecommendedRackets } from '@/lib/utils/recommendation';
import RacketCard from '@/components/rackets/RacketCard';

export default async function ResultsPage({
  searchParams
}: {
  searchParams: { sessionId: string }
}) {
  const { sessionId } = searchParams;
  const recommendedRackets = await getRecommendedRackets(sessionId);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">추천 라켓</h1>
      {recommendedRackets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedRackets.map((racket) => (
            <RacketCard key={racket.id} racket={racket} />
          ))}
        </div>
      ) : (
        <p className="text-center">추천할 라켓을 찾지 못했습니다.</p>
      )}
    </div>
  );
}