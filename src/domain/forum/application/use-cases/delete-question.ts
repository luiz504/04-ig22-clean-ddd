import { QuestionsRepository } from '../repositories/question-repository'

interface DeleteQuestionUseCaseRequest {
  questionId: string
  authorId: string
}
// interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<void> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Now Allowed.')
    }

    await this.questionRepository.delete(question)

    // return {}
  }
}
