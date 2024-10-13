export interface SurveyQuestion {
    id: string;
    question_text: string;
    order: number;
    created_at: string;
    updated_at: string;
    options: SurveyOption[];
  }
  
  export interface SurveyOption {
    id: string;
    question_id: string;
    option_text: string;
    value: number;
    created_at: string;
    updated_at: string;
  }