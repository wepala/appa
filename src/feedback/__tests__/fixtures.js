export const mockStories = [
  {
    id: '101',
    title: 'Story 1',
  },
  {
    id: '102',
    title: 'Story 2',
  },
  {
    id: '103',
    title: 'Story 3',
  },
];

it('Should have fixtures', () => {
  expect(mockStories).toBeArray();
});
