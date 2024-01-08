import { Either, left, right } from '~/core/either'
import { QuestionCommentsRepository } from '../../repositories/question-comments-repository'
import { ResourceNotFoundError } from '~/domain/forum/application/use-cases/errors/resource-not-found-error'
import { NotAllowedError } from '~/domain/forum/application/use-cases/errors/not-allowed-error'

interface DeleteQuestionCommentsUseCaseRequest {
  questionCommentId: string
  authorId: string
}
type DeleteQuestionCommentsUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>
export class DeleteQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionCommentId,
    authorId,
  }: DeleteQuestionCommentsUseCaseRequest): Promise<DeleteQuestionCommentsUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== questionComment.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionCommentsRepository.delete(questionComment)

    return right({})
  }
}
