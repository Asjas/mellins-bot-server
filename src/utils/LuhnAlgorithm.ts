// https://github.com/muhammadghazali/mod10

function LuhnAlgorithm(RSA_ID: string) {
  let isValid = false;
  let checkDigit;
  let sumOfAllNumbers = 0;
  let reversedIdentifier = [];

  const identifierString = RSA_ID;
  checkDigit = identifierString.charAt(identifierString.length - 1);
  checkDigit = parseInt(checkDigit, 10);

  reversedIdentifier = identifierString
    .slice(0, identifierString.length - 1)
    .split("")
    .reverse();

  for (let i = 0; i < reversedIdentifier.length; i++) {
    reversedIdentifier[i] = parseInt(reversedIdentifier[i], 10);
  }

  let index = 0;
  let digit = 1;
  for (; index < reversedIdentifier.length; index++, digit++) {
    if (digit % 2 > 0) {
      reversedIdentifier[index] *= 2;
    }

    if (reversedIdentifier[index] > 9) {
      reversedIdentifier[index] -= 9;
    }

    sumOfAllNumbers += reversedIdentifier[index];
  }

  if ((sumOfAllNumbers % 10) + checkDigit === 10) {
    isValid = true;
  } else {
    isValid = false;
  }

  return isValid;
}

export default LuhnAlgorithm;
