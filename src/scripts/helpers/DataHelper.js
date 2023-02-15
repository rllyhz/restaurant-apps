const truncateString = (stringData, totalWords = 20) => {
  const result = [];
  const words = stringData.split(' ');

  for (let index = 0; index < words.length; index += 1) {
    if (index < totalWords) {
      result.push(words[index]);
    } else {
      break;
    }
  }

  return result.join(' ').concat('...');
};

export default truncateString;
