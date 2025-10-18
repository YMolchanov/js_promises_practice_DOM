'use strict';

function showNotification(message, isError = false) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = isError ? 'error' : 'success';
  div.textContent = message;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

// ---------------- FIRST PROMISE ----------------
const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  function onLeftClick(e) {
    if (e.button === 0 && !clicked) {
      clicked = true;
      document.removeEventListener('click', onLeftClick);
      resolve('First promise was resolved');
    }
  }

  document.addEventListener('click', onLeftClick);

  setTimeout(() => {
    if (!clicked) {
      document.removeEventListener('click', onLeftClick);
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

firstPromise
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message || err, true));

// ---------------- SECOND PROMISE ----------------
const secondPromise = new Promise((resolve) => {
  let resolved = false;

  function onLeftClick(e) {
    if (e.button === 0 && !resolved) {
      resolved = true;
      cleanup();
      resolve('Second promise was resolved');
    }
  }

  function onRightClick(e) {
    e.preventDefault();

    if (!resolved) {
      resolved = true;
      cleanup();
      resolve('Second promise was resolved');
    }
  }

  function cleanup() {
    document.removeEventListener('click', onLeftClick);
    document.removeEventListener('contextmenu', onRightClick);
  }

  document.addEventListener('click', onLeftClick);
  document.addEventListener('contextmenu', onRightClick);
});

secondPromise
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message || err, true));

// ---------------- THIRD PROMISE ----------------
const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;
  let resolved = false;

  function onLeftClick(e) {
    if (e.button === 0) {
      leftClicked = true;
    }
    checkResolution();
  }

  function onRightClick(e) {
    e.preventDefault();
    rightClicked = true;
    checkResolution();
  }

  function checkResolution() {
    if (leftClicked && rightClicked && !resolved) {
      resolved = true;
      cleanup();
      resolve('Third promise was resolved');
    }
  }

  function cleanup() {
    document.removeEventListener('click', onLeftClick);
    document.removeEventListener('contextmenu', onRightClick);
  }

  document.addEventListener('click', onLeftClick);
  document.addEventListener('contextmenu', onRightClick);
});

thirdPromise
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message || err, true));
