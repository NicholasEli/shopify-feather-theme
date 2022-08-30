export const isSame = function(arr1, arr2) {
  if (arr1.length !== arr2.length) return null;

  let frequency = {};
  arr2.forEach( function(key) {
    frequency[key] ? (frequency[key] = frequency[key] + 1) : (frequency[key] = 1);
  });

  arr1.forEach( function(key) {
    if (frequency[key] && frequency[key] !== 0) frequency[key] = frequency[key] - 1;
  });

  let same = true;
  for (const key in frequency) {
      if (frequency[key] === 1) same = false;
  }

  return same;
}