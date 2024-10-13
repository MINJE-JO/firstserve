import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Racket } from '@/types/racket';

// cosineSimilarity 함수를 이 파일 내에서 정의합니다.
function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, _, i) => sum + a[i] * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

export async function getRecommendedRackets(sessionId: string): Promise<Racket[]> {
  const supabase = createServerComponentClient({ cookies });

  // 사용자 응답 가져오기
  const { data: userResponses, error: responsesError } = await supabase
    .from('user_responses')
    .select(`
      survey_questions!inner(question_order),
      selected_option_id
    `)
    .eq('session_id', sessionId);

  if (responsesError) {
    console.error('Error fetching user responses:', responsesError);
    return [];
  }

  // 사용자 선호도 계산
  const userPreferences = {
    power: 0,
    control: 0,
    spin: 0,
    comfort: 0,
    maneuverability: 0
  };

  for (const response of userResponses) {
    const { data: option, error: optionError } = await supabase
      .from('survey_options')
      .select('value')
      .eq('id', response.selected_option_id)
      .single();

    if (optionError) {
      console.error('Error fetching option value:', optionError);
      continue;
    }

    // TypeScript가 survey_questions 객체의 존재를 확신할 수 있도록 타입 가드를 사용합니다.
    if (response.survey_questions && 'question_order' in response.survey_questions) {
      switch (response.survey_questions.question_order) {
        case 1: // 테니스 경력
          userPreferences.control += option.value;
          userPreferences.spin += option.value;
          break;
        case 2: // 플레이 스타일
          if (option.value === 1) userPreferences.power += 2; // 공격형
          else if (option.value === 2) userPreferences.control += 2; // 수비형
          else { // 올라운드형
            userPreferences.power += 1;
            userPreferences.control += 1;
          }
          break;
        case 3: // 중요한 라켓 특성
          if (option.value === 1) userPreferences.power += 2;
          else if (option.value === 2) userPreferences.control += 2;
          else if (option.value === 3) userPreferences.spin += 2;
          else userPreferences.comfort += 2;
          break;
        case 4: // 테니스 칠 때 중요한 점
          if (option.value === 1) userPreferences.control += 2; // 정확성
          else if (option.value === 2) userPreferences.comfort += 2; // 일관성
          else if (option.value === 3) userPreferences.maneuverability += 2; // 기동성
          else userPreferences.power += 2; // 파워
          break;
      }
    }
  }

  // 모든 라켓 가져오기
  const { data: rackets, error: racketsError } = await supabase
    .from('rackets')
    .select('*');

  if (racketsError) {
    console.error('Error fetching rackets:', racketsError);
    return [];
  }

  // 각 라켓과 사용자 선호도 간의 유사도 계산
  const rankedRackets = rackets.map(racket => {
    const racketFeatures = [
      racket.power,
      racket.control,
      racket.spin,
      racket.comfort,
      racket.maneuverability
    ];
    const userPreferenceArray = [
      userPreferences.power,
      userPreferences.control,
      userPreferences.spin,
      userPreferences.comfort,
      userPreferences.maneuverability
    ];
    const similarity = cosineSimilarity(userPreferenceArray, racketFeatures);
    return { ...racket, similarity };
  });

  // 유사도에 따라 정렬하고 상위 3개 반환
  return rankedRackets
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3);
}