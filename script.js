// dom elements
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const christmasTitle = document.querySelector('.christmas');
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        header.classList.remove('header--down');
      } else {
        header.classList.add('header--down');
      }
    });
  },
  { threshold: 1 }
);

observer.observe(hero);

const countdownInterval = setInterval(updateCountdown, 1000);

function updateCountdown() {
  const christmasDate = new Date(new Date().getFullYear(), 11, 25);
  const now = new Date(); // Simulated current date for testing

  const timeDifference = christmasDate - now;
  if (timeDifference < 0) {
    clearInterval(countdownInterval);
    christmasTitle.style.display = 'block';
    days.innerHTML = '00';
    hours.innerHTML = '00';
    minutes.innerHTML = '00';
    seconds.innerHTML = '00';
    return;
  }

  const d = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const h = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((timeDifference % (1000 * 60)) / 1000);
  days.innerHTML = d < 10 ? '0' + d : d;
  hours.innerHTML = h < 10 ? '0' + h : h;
  minutes.innerHTML = m < 10 ? '0' + m : m;
  seconds.innerHTML = s < 10 ? '0' + s : s;
}

// Joke button functionality
const jokeBtn = document.querySelector('.joke-btn');
const jokeQuestion = document.querySelector('.joke-question');
const jokeAnswer = document.querySelector('.joke-answer');
const JOKES_API = 'https://christmascountdown.live/api/joke';
const anotherJokeBtn = document.getElementById('another-joke');

let question, answer;

window.addEventListener('load', async () => {
  try {
    const response = await fetch(JOKES_API);

    if (response.status === 429) {
      alert('Too many requests. Please wait a moment and try again.');
      return;
    }

    if (!response.ok) {
      alert(`Failed to fetch a joke. Error: ${response.status} - ${response.statusText}`);
      return;
    }

    const data = await response.json();
    question = data.question;
    answer = data.answer;
    jokeQuestion.textContent = question;
  } catch (error) {
    console.error('Error fetching joke:', error);
    alert('Network error. Please check your connection and try again.');
  }
});

jokeBtn.addEventListener('click', async () => {
  jokeAnswer.textContent = answer;
  jokeAnswer.style.display = 'block';
});

anotherJokeBtn.addEventListener('click', async () => {
  try {
    const response = await fetch(JOKES_API);

    if (response.status === 429) {
      alert('Too many requests. Please wait a moment before requesting another joke.');
      return;
    }

    if (!response.ok) {
      alert(`Failed to fetch a joke. Error: ${response.status} - ${response.statusText}`);
      return;
    }

    const data = await response.json();
    question = data.question;
    answer = data.answer;
    jokeQuestion.textContent = question;
    jokeAnswer.style.display = 'none';
  } catch (error) {
    console.error('Error fetching joke:', error);
    alert('Network error. Please check your connection and try again.');
  }
});
