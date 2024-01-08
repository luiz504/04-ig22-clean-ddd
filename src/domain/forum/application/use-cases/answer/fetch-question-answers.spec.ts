import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '~/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
// SUT: System under test
let sut: FetchQuestionAnswersUseCase
describe('Fetch Answers By AnswersId Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })
  it('should be to fetch answers from a question', async () => {
    // Prepare
    const questionId = 'some-question-id'
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID(questionId) }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID(questionId) }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID(questionId) }),
    )

    // Act
    const result = await sut.execute({
      questionId: 'some-question-id',
      page: 1,
    })
    const answers = result.value?.answers
    // Assert
    expect(answers).toHaveLength(3)
  })
  it('should be to fetch question paginated answers', async () => {
    // Prepare
    const questionId = 'some-question-id'

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({ questionId: new UniqueEntityID(questionId) }),
      )
    }

    // Act
    const result = await sut.execute({ questionId, page: 2 })
    const answers = result.value?.answers

    // Assert
    expect(answers).toHaveLength(2)
  })
})
