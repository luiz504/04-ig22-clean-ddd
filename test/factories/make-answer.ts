import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '~/core/entities/unique-entity-id'
import { Answer } from '~/domain/forum/enterprise/entities/answer'

export function makeAnswer(
  override: Partial<Answer> = {},
  id?: UniqueEntityID,
) {
  const newAnswer = Answer.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return newAnswer
}
