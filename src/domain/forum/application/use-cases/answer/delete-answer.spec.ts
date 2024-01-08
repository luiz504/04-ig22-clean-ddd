import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

import { DeleteAnswerUseCase } from '../answer/delete-answer'
import { UniqueEntityID } from '~/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { NotAllowedError } from '~/domain/forum/application/use-cases/errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
// SUT: System under test
let sut: DeleteAnswerUseCase
describe('Delete Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })
  it('should be able to delete a answer', async () => {
    // Prepare
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('bruce-bennet'),
      },
      new UniqueEntityID('answer-x'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    // Act
    await sut.execute({
      answerId: 'answer-x',
      authorId: 'bruce-bennet',
    })

    // Assert
    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer, from another author', async () => {
    // Prepare
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('bruce-bennet'),
      },
      new UniqueEntityID('answer-x'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    // Act
    const result = await sut.execute({
      answerId: 'answer-x',
      authorId: 'iron-man',
    })

    // Assert
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
