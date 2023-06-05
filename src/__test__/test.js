import GameSavingLoader from '../GameSavingLoader';
import GameSaving from '../GameSaving';

// Моки для эмуляции чтения и парсинга данных
jest.mock('./reader', () => ({
  default: jest.fn(() => Promise.resolve('mocked data')),
}));

jest.mock('./parser', () => ({
  default: jest.fn((data) => Promise.resolve(JSON.stringify(data))),
}));

describe('GameSavingLoader', () => {
  it('должен загрузить и разобрать сохранение игры', () => {
    const expectedSaving = new GameSaving({
      id: 9,
      created: 1546300800,
      userInfo: {
        id: 1,
        name: 'Hitman',
        level: 10,
        points: 2000,
      },
    });
    return GameSavingLoader.load()
      .then((saving) => {
        expect(saving).toEqual(expectedSaving);
      });
  });

  it('должен обрабатывать ошибку загрузки', () => {
    const expectedError = new Error('Ошибка сохранения!');

    // Мок, эмулирующий ошибку чтения
    jest.mock('./reader', () => ({
      default: jest.fn(() => Promise.reject(new Error('Ошибка сохранения!'))),
    }));

    return GameSavingLoader.load()
      .catch((error) => {
        expect(error).toEqual(expectedError);
      });
  });
});
