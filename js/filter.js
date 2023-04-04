const Filter = { DEFAULT: 'filter-default', RANDOM: 'filter-random', DISCUSSED: 'filter-discussed' };
const RANGE = 0.5;
const PICTURE_COUNT = 10;
const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');
const imgFiltersButtons = document.querySelectorAll('.img-filters__button');

const randomSort = () => Math.random() - RANGE;
const discussedSort = (a, b) => b.comments.length - a.comments.length;

const whichFilterChosen = (currentFilter, array) => {
  switch (currentFilter) {
    case Filter.DEFAULT:
      return array;
    case Filter.RANDOM:
      return [...array].sort(randomSort).slice(0, PICTURE_COUNT);
    case Filter.DISCUSSED:
      return [...array].sort(discussedSort);
  }
};

const onFilterClick = (array, cb) => {
  imgFilters.classList.remove('img-filters--inactive');

  imgFiltersForm.addEventListener('click', (evt) => {
    imgFiltersButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
    if (evt.target.matches('.img-filters__button')) {
      evt.target.classList.add('img-filters__button--active');
      const currentFilter = evt.target.id;
      cb(whichFilterChosen(currentFilter, array));
    }
  });
};

export { onFilterClick };
