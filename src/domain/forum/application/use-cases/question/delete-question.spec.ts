import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { makeQuestion } from 'test/factories/make-question'

import { DeleteQuestionUseCase } from '../question/delete-question'
import { UniqueEntityID } from '~/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
// SUT: System under test
let sut: DeleteQuestionUseCase
describe('Delete Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to delete a question', async () => {
    // Prepare
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('bruce-bennet'),
      },
      new UniqueEntityID('question-x'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    // Act
    await sut.execute({
      questionId: 'question-x',
      authorId: 'bruce-bennet',
    })

    // Assert
    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question, from another author', async () => {
    // Prepare
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('bruce-bennet'),
      },
      new UniqueEntityID('question-x'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    // Act
    expect(
      sut.execute({
        questionId: 'question-x',
        authorId: 'iron-man',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
