import { AnswerCommentsRepository } from '../../repositories/answer-comments.repository'

interface DeleteAnswerCommentsUseCaseRequest {
  answerCommentId: string
  authorId: string
}

export class DeleteAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentsUseCaseRequest): Promise<void> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Answer comment not found.')
    }

    if (authorId !== answerComment.authorId.toString()) {
      throw new Error('Now Allowed.')
    }

    await this.answerCommentsRepository.delete(answerComment)
  }
}
