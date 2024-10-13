import { SurveyQuestion } from '@/types/questionnaire';
import { Button } from '../ui/Button';

interface QuestionCardProps {
  question: SurveyQuestion;
  onAnswer: (questionId: string, optionId: string) => void;
  selectedOption?: string;
}

export default function QuestionCard({ question, onAnswer, selectedOption }: QuestionCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">{question.question_text}</h2>
      <div className="space-y-2">
        {question.options.map((option) => (
          <Button
            key={option.id}
            onClick={() => onAnswer(question.id, option.id)}
            variant={selectedOption === option.id ? 'primary' : 'secondary'}
            className="w-full text-left justify-start"
          >
            {option.option_text}
          </Button>
        ))}
      </div>
    </div>
  );
}