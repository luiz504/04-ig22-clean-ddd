import { ResourceNotFoundError } from '~/domain/forum/application/use-cases/errors/resource-not-found-error'

import { Either, left, right } from '~/core/either'
import { NotAllowedError } from '~/domain/forum/application/use-cases/errors/not-allowed-error'
import { Question } from '~/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '~/domain/forum/application/repositories/question-repository'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return right({ question })
  }
}
