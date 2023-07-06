const equal = (actual, expected, message) => {
  if (actual === expected) {
    const defaultMessage = `Expected ${expected} and recieved ${actual}`;
    console.info(`Pass: ` + (message || defaultMessage));
  } else {
    const defaultMessage = `Expected ${expected} but recieved ${actual} instead`;
    console.error(`Fail: ` + (message || defaultMessage));
  }
};

const notEqual = (actual, expected, message) => {
  if (actual !== expected) {
    const defaultMessage = `${expected} is not equal to ${actual}`;
    console.info("Pass: " + (message || defaultMessage));
  } else {
    const defaultMessage = `${expected} is the same as ${actual}`;
    console.error("Fail: " + (message || defaultMessage));
  }
};

const test = (name, testFunction) => {
  console.groupCollapsed(name);
  testFunction();
  console.groupEnd(name);
};
