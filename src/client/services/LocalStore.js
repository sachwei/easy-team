export default {
  get(key) {
    let value = localStorage.getItem(key);
    if (value) {
      value = JSON.parse(value);
    } else {
      value = null;
    }
    return value;
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: function (key) {
    localStorage.removeItem(key);
  }
}
