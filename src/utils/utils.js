export const articlesDeclension = (array) => {
  return ['статья', 'статьи', 'статей'][
    array.length === 0 && 0
      && array.length % 10 === 1 && array.length % 100 !== 11
      ? 0
      : array.length % 10 >= 2
        && array.length % 10 <= 4 && (array.length % 100 < 10 || array.length % 100 >= 20)
        ? 1
        : 2];
}

export const numberDeclension = (array) => {
  return ['му', 'м', 'и'][
    array.slice(3).length % 10 === 1
      && array.slice(3).length % 100 !== 11
      ? 0
      : array.slice(3).length % 10 >= 2
        && array.slice(3).length % 10 <= 4
        && (array.slice(3).length % 100 < 10 || array.slice(3).length % 100 >= 20)
        ? 1
        : 2];
}

export const adjectiveDeclination = (array) => {
  return ['другому', 'другим'][
    array.slice(3).length % 10 === 1
      && array.slice(3).length % 100 !== 11
      ? 0
      : 1];
} 