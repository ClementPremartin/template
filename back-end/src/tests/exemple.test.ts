/// <reference types="@types/jest" />;

const addNumber = (a: number, b: number) => {
  return a + b
}
describe('When a = 1 and b = 3', () => {
  it('addNumber is equel to 4', () => {
    const result = addNumber(1, 3)

    expect(result).toBe(4)
  })
})
