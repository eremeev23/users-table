export const debouncer = (func, ms) => {
  let cd = false,
    savedArgs,
    savedThis;

  function wrapper () {
    if (cd) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    cd = true;

    setTimeout(function () {
      cd = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}