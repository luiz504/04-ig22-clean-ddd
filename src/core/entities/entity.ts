import { UniqueEntityID } from './unique-entity-id'

export class Entity<Props> {
  private _id: UniqueEntityID
  protected props: Props

  get id(): string {
    return this._id.toString()
  }

  constructor(props: Props, id?: string) {
    this.props = props
    this._id = new UniqueEntityID(id)
  }
}
