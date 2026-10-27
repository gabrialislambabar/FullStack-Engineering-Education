try {
  nonExistentFunction();
} catch (error) {
  console.error(error);
  // Expected output: ReferenceError: nonExistentFunction is not defined
  // (Note: the exact output may be browser-dependent)
}

try {
  tryStatments; // The statment to be executed
} catch (exceptionVar) {
  catchStatments; // Statment that is executed if an exception is thrown in the `try` block.
} finally {
  finallyStatments; // These statments are executed regardless of whether an exception was thrown or caught.
}

try {
  throw new Error("My exception");
} catch (e) {
  logMyErrors(e);
}

try {
  myRouting();
} catch (e) {
  if (e instanceof TypeError) {
    // statments to handle TypeError
  } else if (e instanceof RangeError) {
    // statments to handle RangeError exceptions
  } else if (e instanceof EvalError) {
    // statments to handle EvalError exceptions
  } else {
    // statments to handle any specified exceptions

    logMyErrors(e); // pass exception object to error handler
  }
}
