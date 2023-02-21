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
    if (!isNaN(parseInt(string.at(i), 10))) {
      numberString += string.at(i);
    }
  }
  return parseInt(numberString, 10);
};

isCheckLength('проверяемая строка', 18);
isPalindrome('Лёша на полке клопа нашёл ');
getNumber(-1.5);
