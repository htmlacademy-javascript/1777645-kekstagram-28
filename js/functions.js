const isCheckLength = (string, length) => string.length <= length;

const isPalindrome = (string) => {
  const oneWord = string.toLowerCase().replaceAll(' ', '');
  let reverseString = '';
  for (let i = oneWord.length - 1; i >= 0; i--) {
    reverseString += oneWord.at(i);
  }
  return oneWord === reverseString;
};

isCheckLength('проверяемая строка', 18);
isPalindrome('Лёша на полке клопа нашёл ');
