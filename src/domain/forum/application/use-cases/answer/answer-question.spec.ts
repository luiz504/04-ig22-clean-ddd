import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

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
    const result = await sut.execute({
      instructorId: 'instructor-id',
      questionId: 'question-id',
      ...data,
    })

    // Assert
    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.items[0]).toEqual(result.value?.answer)
  })
})
