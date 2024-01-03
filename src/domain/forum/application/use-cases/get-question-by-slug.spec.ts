import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { UniqueEntityID } from '~/core/entities/unique-entity-id'
import { Slug } from '../../enterprise/entities/value-objects/slug'

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
    const newQuestion = Question.create({
      authorId: new UniqueEntityID('some-author-id'),
      content: 'some-content',
      title: 'Some Interesting Question',
      slug: Slug.create('some-interesting-question'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    // Act
    const { question } = await sut.execute({
      slug: 'some-interesting-question',
    })

    // Assert
    expect(question.id).toBeTruthy()
    expect(question.title).toEqual('Some Interesting Question')
  })
})
