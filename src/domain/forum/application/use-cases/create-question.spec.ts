import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { CreateQuestionUseCase } from './create-question'

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
    const { question } = await sut.execute({
      authorId: 'some-author-id',
      ...data,
    })

    // Assert
    expect(question.id).toBeTruthy()
    expect(question).toEqual(expect.objectContaining(data))
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
  })
})
