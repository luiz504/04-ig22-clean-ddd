import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { makeQuestion } from 'test/factories/make-question'

import { UniqueEntityID } from '~/core/entities/unique-entity-id'
import { EditQuestionUseCase } from '../question/edit-question'
import { NotAllowedError } from '~/domain/forum/application/use-cases/errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
// SUT: System under test
let sut: EditQuestionUseCase
describe('Edit Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to edit a question title and description', async () => {
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
      title: 'New Question Title',
      content: 'New Question Content',
    })

    // Assert
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'New Question Title',
      content: 'New Question Content',
    })
  })

  it('should not be able to edit a question, from another author', async () => {
    // Prepare
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('bruce-bennet'),
      },
      new UniqueEntityID('question-x'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    // Act
    const result = await sut.execute({
      questionId: 'question-x',
      authorId: 'iron-man',
      title: 'New Question Title',
      content: 'New Question Content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
