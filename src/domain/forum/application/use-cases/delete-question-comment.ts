import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentsUseCaseRequest {
  questionCommentId: string
  authorId: string
}

export class DeleteQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionCommentId,
    authorId,
  }: DeleteQuestionCommentsUseCaseRequest): Promise<void> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error('Question comment not found.')
    }

    if (authorId !== questionComment.authorId.toString()) {
      throw new Error('Now Allowed.')
    }

    await this.questionCommentsRepository.delete(questionComment)
  }
}
