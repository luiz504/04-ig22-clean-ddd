import { AnswerCommentsRepository } from '~/domain/forum/application/repositories/answer-comments.repository'
import { AnswerComment } from '~/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async findById(id: string) {
    const item = this.items.find((item) => item.id.toString() === id)

    if (!item) return null

    return item
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === answerComment.id.toString(),
    )

    this.items.splice(itemIndex, 1)
  }
}
