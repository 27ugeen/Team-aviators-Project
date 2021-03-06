import myLibPageMarkup from '../templates/myLibPageMarkup';
import refs from './utils/refs';
import filmListMarkupFromLocalStor from '..//templates/filmListMarkupFromLocalStor.hbs';
import drawMovieDetails from './4filmDetailsPage';
import toTop from './view/toTopButton';
import { ToLocalStorage } from './1InitialHomePage';
import { typeOfQueueForBack } from './1InitialHomePage';
import {
  buttonCheckWatched,
  buttonCheckQueue,
  activeToggle,
} from './view/buttonCheck';

function initialMyLibPage() {
  refs.homePage.innerHTML = '';
  refs.detailsPage.innerHTML = '';
  refs.myLibList.innerHTML = '';
  refs.myLibList.insertAdjacentHTML('beforeend', myLibPageMarkup);
  refs.watchedButton = document.querySelector('#watched-button');
  refs.queueButton = document.querySelector('#queue-button');
  refs.myLibHome = document.querySelector('#mylib-home');

  refs.watchedButton.addEventListener('click', () => {
    makeListOfWatched();
    typeOfQueueForBack.listType = makeLibPage;
  });
  refs.queueButton.addEventListener('click', () => {
    makeListOfQueue();
    typeOfQueueForBack.listType = makeLibPageFromQueue;
  });
  refs.myLibHome.addEventListener('click', drawMovieDetails);
  refs.myLibHome.addEventListener('click', ToLocalStorage);
}

function makeLibPage() {
  initialMyLibPage();

  makeListOfWatched();
  typeOfQueueForBack.listType = makeLibPage;
  toTop();
}

function makeLibPageFromQueue() {
  initialMyLibPage();

  makeListOfQueue();
  typeOfQueueForBack.listType = makeListOfQueue;
  toTop();
}

function makeListOfWatched() {
  refs.myLibHome.innerHTML = '';
  refs.queueButton.classList.remove('active-nav-button');
  refs.watchedButton.classList.add('active-nav-button');
  const fromLocalStorage = JSON.parse(localStorage.getItem('watched'));
  if (fromLocalStorage === null || fromLocalStorage.length === 0) {
    return refs.myLibHome.insertAdjacentHTML(
      'beforeend',
      `<div class="no-list">
      <h2 class="no-list__item">You do not have watched movies :(</h2>
        <h3 class="no-list__item">Add them :)</h3>
        </div>`,
    );
  }
  const markup = fromLocalStorage
    .map(result => filmListMarkupFromLocalStor(result))
    .join('');
  refs.myLibHome.insertAdjacentHTML('beforeend', markup);
  refs.myLibHome.addEventListener('click', activeToggle);
  refs.movieItems = document.querySelectorAll('.home__list-item');

  const storageWatchedItems = JSON.parse(localStorage.getItem('watched')) || [];
  const storageQueueItems = JSON.parse(localStorage.getItem('queue')) || [];
  const idOfWathcedItems = storageWatchedItems.map(({ id }) => id);
  const idOfQueueItems = storageQueueItems.map(({ id }) => id);
  const arrayOfMovieItems = Array.from(refs.movieItems);

  arrayOfMovieItems.map(el => {
    buttonCheckWatched(el, idOfWathcedItems);
    buttonCheckQueue(el, idOfQueueItems);
    return;
  });
}

function makeListOfQueue() {
  refs.myLibHome.innerHTML = '';
  refs.watchedButton.classList.remove('active-nav-button');
  refs.queueButton.classList.add('active-nav-button');
  const fromLocalStorage = JSON.parse(localStorage.getItem('queue'));
  if (fromLocalStorage === null || fromLocalStorage.length === 0) {
    return refs.myLibHome.insertAdjacentHTML(
      'beforeend',
      `<div class="no-list">
      <h2 class="no-list__item">There are no movies in queue list :(</h2>
        <h3 class="no-list__item">Add them :)</h3>
        </div>`,
    );
  }
  const markup = fromLocalStorage
    .map(result => filmListMarkupFromLocalStor(result))
    .join('');
  refs.myLibHome.insertAdjacentHTML('beforeend', markup);
  refs.myLibHome.addEventListener('click', activeToggle);
  refs.movieItems = document.querySelectorAll('.home__list-item');

  const storageWatchedItems = JSON.parse(localStorage.getItem('watched')) || [];
  const storageQueueItems = JSON.parse(localStorage.getItem('queue')) || [];
  const idOfWathcedItems = storageWatchedItems.map(({ id }) => id);
  const idOfQueueItems = storageQueueItems.map(({ id }) => id);
  const arrayOfMovieItems = Array.from(refs.movieItems);

  arrayOfMovieItems.map(el => {
    buttonCheckWatched(el, idOfWathcedItems);
    buttonCheckQueue(el, idOfQueueItems);
    return;
  });
}

export default makeLibPage;
