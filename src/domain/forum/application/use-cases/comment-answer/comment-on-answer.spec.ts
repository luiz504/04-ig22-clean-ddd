import { CommentOnAnswerUseCase } from '../comment-answer/comment-on-answer'

import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
// SUT: System under test
let sut: CommentOnAnswerUseCase
describe('Comment On Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })
  it('should be able to comment on a answer', async () => {
    // Prepare
    const answer = makeAnswer()
    await inMemoryAnswersRepository.create(answer)

    const data = {
      content: 'Some content',
    }

    // Act
    const { answerComment } = await sut.execute({
      authorId: 'some-author-id',
      answerId: answer.id.toString(),
      ...data,
    })

    // Assert
    expect(answerComment.id.toString()).toBeTruthy()
    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      data.content,
    )
  })
})
