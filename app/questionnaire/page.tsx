export const dynamic = 'force-dynamic'

import { Suspense } from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { SurveyQuestion } from '@/types/questionnaire';
import QuestionnaireForm from '@/components/questionnaire/QuestionnaireForm';
import Loading from '@/components/ui/Loading';

async function getQuestions(): Promise<SurveyQuestion[]> {
  const supabase = createServerComponentClient({ cookies });
  
  const { data, error } = await supabase
    .from('survey_questions')
    .select(`
      *,
      options:survey_options(*)
    `)
    .order('question_order');

  if (error) {
    console.error('Error fetching questions:', error);
    return [];
  }

  return data || [];
}

export default async function QuestionnairePage() {
  const questions = await getQuestions();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">테니스 라켓 선호도 설문</h1>
      <Suspense fallback={<Loading />}>
        <QuestionnaireForm questions={questions} />
      </Suspense>
    </div>
  );
}