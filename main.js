// const API_KEY = `4083262a624f4cdaaedb9b397344b994`;
const API_KEY = ``;
const PAGE_SIZE = 20;
let newsList = [];
let searchInput = document.getElementById('search-input');
let moreBtn = document.getElementById('more-btn');
let menus = document.getElementById('menus');
const menusBtn = document.querySelectorAll('.menus button');
let searchBtn = document.getElementById('search-btn');
let submitBtn = document.getElementById('search-submit');

searchBtn.addEventListener('click', () => {
  submitBtn.classList.toggle('active-se');
  searchInput.classList.toggle('active-se');
});

moreBtn.addEventListener('click', () => {
  moreBtn.classList.toggle('active');
  menus.classList.toggle('active');
});

menusBtn.forEach((menu) =>
  menu.addEventListener('click', (event) => getNewsByCategory(event))
);

const getLatestNews = async () => {
  const url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=${PAGE_SIZE}`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log(newsList);
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  const url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}&pageSize=${PAGE_SIZE}`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
};

const handleSearch = async () => {
  const keyword = document.getElementById('search-input').value;
  const url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}&pageSize=${PAGE_SIZE}`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
};

const render = () => {
  const newsHTML = newsList
    .map((news) => {
      let description = news.description ? news.description : '내용없음';
      if (description && description.length > 200) {
        description = description.slice(0, 200) + '...';
      }
      const imageUrl = news.urlToImage || '/images/no-img.png';
      const sourceName = news.source.name ? news.source.name : 'no-source';
      const publishedDate = moment(news.publishedAt).startOf('day').fromNow();

      return `<div class="row news">
          <div class="col-lg-4">
            <img
              class="news-img-size"
              src=${imageUrl}
            />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>
              ${description}
            </p>
            <div>${sourceName} * ${publishedDate}</div>
          </div>
        </div>`;
    })
    .join('');
  document.getElementById('news-board').innerHTML = newsHTML;
};

getLatestNews();
