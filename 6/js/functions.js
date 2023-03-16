const isCheckLength = (string, length) => string.length <= length;

const isPalindrome = (string) => {
  const oneWord = string.toLowerCase().replaceAll(' ', '');
  let reverseString = '';
  for (let i = oneWord.length - 1; i >= 0; i--) {
    reverseString += oneWord.at(i);
  }
  return oneWord === reverseString;
};

const getNumber = (string) => {
  if (typeof string === 'number') {
    return Math.abs(string.toString().replaceAll('.', ''));
  }
  let numberString = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      numberString += string.at(i);
    }
  }
  return parseInt(numberString, 10);
};

const getNewString = (string, minLength, symbols) => {
  const addSymbols = minLength - string.length;
  if (addSymbols <= 0) {
    return string;
  }
  return symbols.slice(0, addSymbols % symbols.length) + symbols.repeat(addSymbols / symbols.length) + string;
};


isCheckLength('проверяемая строка', 18);
isPalindrome('Лёша на полке клопа нашёл ');
getNumber(-1.5);
getNewString('q', 4, 'werty');
