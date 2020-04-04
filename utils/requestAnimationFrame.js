export const requestAnimationFrame = function (callback, lastTime) {
  var lastTime;
  if (typeof lastTime === 'undefined') {
    lastTime = 0
  }
  var currTime = new Date().getTime();
  var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
  lastTime = currTime + timeToCall;
  var id = setTimeout(function () {
    callback(currTime + timeToCall, lastTime);
  },
    timeToCall);
  return id;
};

export const cancelAnimationFrame = function (id) {
  clearTimeout(id);
};
