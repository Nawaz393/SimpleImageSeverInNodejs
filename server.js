const State = (function () {
  function useState(initialValue) {
    let _val = initialValue;

    let _state = () => {
      return _val;
    };

    let _setState = (newVal) => {
      _val = newVal;
    };

    return [_state, _setState];
  }
  return {useState};
})();

let [count, setCount] = State.useState(1);

console.log(count()); // 1
