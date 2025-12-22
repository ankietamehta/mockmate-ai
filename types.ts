
export interface InterviewQuestion {
  id: number;
  question: string;
  context: string;
}

export interface InterviewState {
  jobTitle: string;
  jobDescription: string;
  questions: InterviewQuestion[];
  currentQuestionIndex: number;
  isGenerating: boolean;
  isStarted: boolean;
  isFinished: boolean;
  recordings: Blob[];
}

export enum AppStage {
  SETUP = 'setup',
  GENERATING = 'generating',
  INTERVIEW = 'interview',
  RESULT = 'result'
}
