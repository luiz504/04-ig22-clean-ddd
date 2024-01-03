import { UniqueEntityID } from '~/core/entities/unique-entity-id'
import { Question } from '~/domain/forum/enterprise/entities/question'

export function makeQuestion(override: Partial<Question> = {}) {
  const newQuestion = Question.create({
    authorId: new UniqueEntityID('some-author-id'),
    title: 'Question Title Example',
    content: 'Question Content Example',
    ...override,
  })

  return newQuestion
}
