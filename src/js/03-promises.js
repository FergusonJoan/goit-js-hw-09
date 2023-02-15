import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector('[name=delay]'),
  delayStep: document.querySelector('[name=step]'),
  amount: document.querySelector('[name=amount]'),
  submit: document.querySelector('[type=submit]'),
};

const onSumbit = event => {
  event.preventDefault();
  let delay = +refs.firstDelay.value;
  let step = +refs.delayStep.value;
  let amount = +refs.amount.value;

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(success => {
        Notiflix.Notify.success('success');
      })
      .catch(error => {
        Notiflix.Notify.failure('error');
      });
    delay += step;
  }
  event.currentTarget.reset();
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

refs.form.addEventListener('submit', onSumbit);
