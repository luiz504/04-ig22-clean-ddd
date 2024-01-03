import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '~/core/entities/unique-entity-id'
import { Question } from '~/domain/forum/enterprise/entities/question'

export function makeQuestion(
  override: Partial<Question> = {},
  id?: UniqueEntityID,
) {
  const newQuestion = Question.create(
    {
      authorId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return newQuestion
}
