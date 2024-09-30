import { Section } from '../../domain/section/section.vo';

export const sectionFactory = (params: Partial<Section>) => {
  const defaultSection: Section = { id: '', name: '', ownerId: '', orderId: 1 };
  return { ...defaultSection, ...params };
};
