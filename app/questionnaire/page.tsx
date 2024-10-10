// app/questionnaire/page.tsx

import { fetchQuestions } from '@/lib/questions'
import QuestionnaireForm from '@/components/QuestionnaireForm'

export default async function QuestionnairePage() {
  const questions = await fetchQuestions()

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Find Your Perfect Tennis Racket</h1>
      <QuestionnaireForm questions={questions} />
    </div>
  )
}