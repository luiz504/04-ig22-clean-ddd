import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

import { makeAnswer } from 'test/factories/make-answer'

import { UniqueEntityID } from '~/core/entities/unique-entity-id'
import { EditAnswerUseCase } from '../answer/edit-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
// SUT: System under test
let sut: EditAnswerUseCase
describe('Edit Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })
  it('should be able to edit a answer title and description', async () => {
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

      content: 'New Answer Content',
    })

    // Assert
    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'New Answer Content',
    })
  })

  it('should not be able to edit a answer, from another author', async () => {
    // Prepare
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('bruce-bennet'),
      },
      new UniqueEntityID('answer-x'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    // Act
    expect(
      sut.execute({
        answerId: 'answer-x',
        authorId: 'iron-man',
        content: 'New Answer Content',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
