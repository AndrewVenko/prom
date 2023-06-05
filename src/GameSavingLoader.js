// Импортурем необходимые функции
import read from './reader';
import json from './parser';
import GameSaving from './GameSaving';

export default class GameSavingLoader {
  static load() {
    return new Promise((resolve, reject) => {
      read()
        .then((data) => json(data))
        .then((parsedData) => {
          const saving = new GameSaving(JSON.parse(parsedData));
          resolve(saving);
        })
        .catch(() => {
          reject(new Error('Ошибка сохранения!'));
        });
    });
  }
}
