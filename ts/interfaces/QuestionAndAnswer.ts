import { AnswerImage } from "./AnswerImage";
import { CommonConstant } from "./CommonConstant";
import { QuestionImage } from "./QuestionImage";
import { User } from "./User";

export interface QuestionAndAnswer {
  id: number;

  question_title: string;

  question_type_info: CommonConstant;

  question_content: string;

  questionImages: QuestionImage[];

  answerImages: AnswerImage[];

  answer_title: string;

  answer_content: string;

  status: number;

  requested_by: number;

  requester: User;

  managed_by: number;

  requested_at?: Date;

  rejected_at?: Date;

  completed_at?: Date;

  answer_updated_at?: Date;

  answer_created_at?: Date;

  question_updated_at?: Date;

  questionUpdatedUser: User;

  created_at?: Date;

  updated_at?: Date;
}
