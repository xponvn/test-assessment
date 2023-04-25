import { TestEntity } from '@test-assessment/cms-graphql-api';

export const transformListTest = (data: TestEntity[]) => {
  return data.map((item) => {
    const attributes = item.attributes;
    const position = attributes.position;
    return {
      name: attributes.name,
      published: attributes.publishedAt,
      sent: 1,
      submitted: 1,
      author: 'hien.nguyen@xpon.ai',
      position: position?.data?.attributes?.name || '__',
      level: attributes.level,
    };
  });
};
