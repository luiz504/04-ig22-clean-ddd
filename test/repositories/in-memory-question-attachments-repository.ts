import { PaginationParams } from '~/core/repositories/pagination-params'
import { QuestionAttachmentsRepository } from '~/domain/forum/application/repositories/question-attachment-repository'
import { QuestionAttachment } from '~/domain/forum/enterprise/entities/question-attachment'

import { QuestionComment } from '~/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  public items: QuestionAttachment[] = []

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    const questionAttachments = this.items.filter(
      (item) => item.questionId.toString() === questionId,
    )

    return questionAttachments
  }
}
