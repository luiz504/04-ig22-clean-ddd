import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { makeQuestion } from 'test/factories/make-question'

import { FetchRecentQuestionsUseCase } from '../question/fetch-recent-questions'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
// SUT: System under test
let sut: FetchRecentQuestionsUseCase
describe('Fetch Recent Questions Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })
  it('should be to fetch recent questions', async () => {
    // Prepare

    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 23) }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 20) }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 18) }),
    )

    // Act
    const { questions } = await sut.execute({ page: 1 })

    // Assert

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })
  it('should be to fetch paginated recent questions', async () => {
    // Prepare

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(
        makeQuestion({ createdAt: new Date(2022, 0, i) }),
      )
    }

    // Act
    const { questions } = await sut.execute({ page: 2 })

    // Assert
    expect(questions).toHaveLength(2)
  })
})
