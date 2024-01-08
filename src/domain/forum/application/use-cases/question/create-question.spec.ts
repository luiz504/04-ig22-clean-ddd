import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { CreateQuestionUseCase } from '../question/create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
// SUT: System under test
let sut: CreateQuestionUseCase
describe('Create Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to create a question', async () => {
    const data = {
      content: 'Some content',
      title: 'Some Question',
    }

    // Act
    const result = await sut.execute({
      authorId: 'some-author-id',
      ...data,
    })

    // Assert
    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
  })
})
