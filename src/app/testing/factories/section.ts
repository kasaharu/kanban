import { Section } from '../../domain/models';

export const sectionFactory = (params: Partial<Section>) => {
  const defaultSection: Section = { id: '', name: '', userId: '', orderId: 1 };
  return { ...defaultSection, ...params };
};
