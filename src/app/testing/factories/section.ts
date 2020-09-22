import { Section } from '../../domain/section/section.vo';

export const sectionFactory = (params: Partial<Section>) => {
  const defaultSection: Section = { id: '', name: '', userId: '', orderId: 1 };
  return { ...defaultSection, ...params };
};
