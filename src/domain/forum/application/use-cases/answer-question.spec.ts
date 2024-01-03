import { AnswerQuestionUseCase } from './answer-question'

import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswerRepository: InMemoryAnswersRepository
// SUT: System under test
let sut: AnswerQuestionUseCase
describe('Create Answer Question Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })
  it('should be able to create a question', async () => {
    const data = {
      content: 'Some content',
    }

    // Act
    const { answer } = await sut.execute({
      instructorId: 'instructor-id',
      questionId: 'question-id',
      ...data,
    })

    // Assert
    expect(answer.id).toBeTruthy()
    expect(answer).toEqual(expect.objectContaining(data))
    expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.id)
  })
})
