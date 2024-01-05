import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { CommentOnQuestionUseCase } from '../comment-question/comment-on-question'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
// SUT: System under test
let sut: CommentOnQuestionUseCase
describe('Comment On Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })
  it('should be able to comment on a question', async () => {
    // Prepare
    const question = makeQuestion()
    await inMemoryQuestionsRepository.create(question)

    const data = {
      content: 'Some content',
    }

    // Act
    const { questionComment } = await sut.execute({
      authorId: 'some-author-id',
      questionId: question.id.toString(),
      ...data,
    })

    // Assert
    expect(questionComment.id.toString()).toBeTruthy()
    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      data.content,
    )
  })
})
