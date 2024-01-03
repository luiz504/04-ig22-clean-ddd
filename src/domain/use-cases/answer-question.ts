import { Answer } from '../entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  private answersRepository: AnswersRepository

  constructor(answerRepository: AnswersRepository) {
    this.answersRepository = answerRepository
  }

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({ content, authorId: instructorId, questionId })

    await this.answersRepository.create(answer)

    return answer
  }
}
