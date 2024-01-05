import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { GetQuestionBySlugUseCase } from '../question/get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '~/domain/forum/enterprise/entities/value-objects/slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
// SUT: System under test
let sut: GetQuestionBySlugUseCase
describe('Get Question by Slug Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })
  it('should be get a question by Slug', async () => {
    // Prepare
    const newQuestion = makeQuestion({ slug: Slug.create('example-question') })

    await inMemoryQuestionsRepository.create(newQuestion)

    // Act
    const { question } = await sut.execute({
      slug: 'example-question',
    })

    // Assert
    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})
