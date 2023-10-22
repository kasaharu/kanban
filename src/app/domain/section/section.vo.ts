export const COLLECTION_NAME = 'sections';
export const NAME_MAX_LENGTH = 15;

export interface Section {
  id: string;
  name: string;
  userId: string;
  orderId: number;
}

export class SectionValueObject implements Section {
  private constructor(name: string, userId: string, orderId: number, id: string) {
    this.id = id;
    this.name = name;
    this.userId = userId;
    this.orderId = orderId;
  }

  readonly id: string;
  readonly name: string;
  readonly userId: string;
  readonly orderId: number;

  static create(name: string, userId: string, orderId: number, id = 'temporary'): SectionValueObject {
    if (name.length > NAME_MAX_LENGTH) {
      throw new Error('[kanban] over section name length');
    }
    return new SectionValueObject(name, userId, orderId, id);
  }

  plainObject(): Section {
    return { id: this.id, name: this.name, userId: this.userId, orderId: this.orderId };
  }
}
