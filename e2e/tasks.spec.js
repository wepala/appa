describe.skip('tasks navigator', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('render navigation to view today and backlog', async () => {
    await expect(element(by.id('TasksNavigator'))).toBeVisible();
  });
});
