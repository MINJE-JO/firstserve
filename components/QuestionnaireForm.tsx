// components/QuestionnaireForm.tsx

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Question } from '@/lib/questions'
import { supabase } from '@/lib/supabase'
import Button from '@/components/Button'

interface QuestionnaireFormProps {
  questions: Question[]
}

export default function QuestionnaireForm({ questions }: QuestionnaireFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const router = useRouter()

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: answer }))
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      submitAnswers()
    }
  }

  const submitAnswers = async () => {
    const { error } = await supabase
      .from('user_responses')
      .insert({
        session_id: crypto.randomUUID(),
        responses: answers
      })

    if (error) {
      console.error('Error submitting answers:', error)
      // Handle error (show message to user, etc.)
    } else {
      router.push('/result')
    }
  }

  const currentQ = questions[currentQuestion]

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{currentQ.text}</h2>
      <div className="space-y-2">
        {currentQ.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(option)}
            className="w-full justify-start"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  )
}