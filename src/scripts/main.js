'use strict';

function showNotification(message, isError = false) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = isError ? 'error' : 'success';
  div.textContent = message;
  document.body.appendChild(div);

  // Автоматично прибираємо через 3 секунди
  setTimeout(() => div.remove(), 3000);
}

// ---------------- FIRST PROMISE ----------------
const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  // Ліва кнопка миші
  document.addEventListener('click', (e) => {
    if (e.button === 0 && !clicked) {
      // 0 = left click
      clicked = true;
      resolve('First promise was resolved on a left click in the document');
    }
  });

  // Якщо не клікнули протягом 3 секунд → reject з Error
  setTimeout(() => {
    if (!clicked) {
      reject(
        new Error('First promise was rejected in 3 seconds if not clicked'),
      );
    }
  }, 3000);
});

firstPromise
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message || String(err), true));

// ---------------- SECOND PROMISE ----------------
const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 || e.button === 2) {
      // left or right click
      resolve('Second promise was resolved');
    }
  });
});

secondPromise
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message || String(err), true));
// ніколи не відхиляється, але на всяк випадок

// ---------------- THIRD PROMISE ----------------
const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve(
        '3rd promise was resolved only after both left & right clicks happened',
      );
    }
  });
});

thirdPromise
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message || String(err), true));

// Щоб працювало праве натискання без контекстного меню
document.addEventListener('contextmenu', (e) => e.preventDefault());
