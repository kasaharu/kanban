export const COLLECTION_NAME = 'sections';
export const NAME_MAX_LENGTH = 15;

export interface Section {
  id: string;
  name: string;
  ownerId: string;
  orderId: number;
}

export class SectionValueObject implements Section {
  private constructor(name: string, ownerId: string, orderId: number, id: string) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
    this.orderId = orderId;
  }

  readonly id: string;
  readonly name: string;
  readonly ownerId: string;
  readonly orderId: number;

  static create(name: string, ownerId: string, orderId: number, id = 'temporary'): SectionValueObject {
    if (name.length > NAME_MAX_LENGTH) {
      throw new Error('[kanban] over section name length');
    }
    return new SectionValueObject(name, ownerId, orderId, id);
  }

  plainObject(): Section {
    return { id: this.id, name: this.name, ownerId: this.ownerId, orderId: this.orderId };
  }
}
