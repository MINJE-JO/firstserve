'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SurveyQuestion } from '@/types/questionnaire';
import QuestionCard from './QuestionCard';
import { Button } from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import { supabase } from '@/lib/supabase/client';

interface QuestionnaireFormProps {
  questions: SurveyQuestion[];
}

export default function QuestionnaireForm({ questions }: QuestionnaireFormProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // 새 세션 생성
      const { data: session, error: sessionError } = await supabase
        .from('user_sessions')
        .insert({ session_token: crypto.randomUUID() })
        .select()
        .single();

      if (sessionError) throw sessionError;

      // 사용자 응답 저장
      const responses = Object.entries(answers).map(([questionId, optionId]) => ({
        session_id: session.id,
        question_id: questionId,
        selected_option_id: optionId
      }));

      const { error: responsesError } = await supabase
        .from('user_responses')
        .insert(responses);

      if (responsesError) throw responsesError;

      // 라우팅 전에 콘솔에 로그 출력
      console.log('Submitting successful, redirecting to:', `/results?sessionId=${session.id}`);

      // 라우팅
      router.push(`/results?sessionId=${session.id}`);
    } catch (error) {
      console.error('Error submitting survey:', error);
      // TODO: 사용자에게 에러 메시지 표시
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <ProgressBar progress={progress} />
      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          selectedOption={answers[currentQuestion.id]}
        />
      )}
      <div className="flex justify-between mt-6">
        <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0 || isSubmitting}>
          이전
        </Button>
        <Button onClick={handleNext} disabled={isSubmitting}>
          {currentQuestionIndex === questions.length - 1 ? '제출' : '다음'}
        </Button>
      </div>
    </div>
  );
}