import { Either, left, right } from '~/core/either'
import { AnswerCommentsRepository } from '../../repositories/answer-comments.repository'

interface DeleteAnswerCommentsUseCaseRequest {
  answerCommentId: string
  authorId: string
}
type DeleteAnswerCommentsUseCaseResponse = Either<string, object>
export class DeleteAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentsUseCaseRequest): Promise<DeleteAnswerCommentsUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      return left('Answer comment not found.')
    }

    if (authorId !== answerComment.authorId.toString()) {
      return left('Now Allowed.')
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right({})
  }
}
