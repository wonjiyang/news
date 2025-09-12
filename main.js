const API_KEY = `4083262a624f4cdaaedb9b397344b994`;
let newsList = [];
let searchInput = document.getElementById('search-input');
let moreBtn = document.getElementById('more-btn');
let menus = document.getElementById('menus');
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

const getLatestNews = async () => {
  const url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    `https://study-website-be-bbb1539aa813.herokuapp.com`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log(newsList);
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
          <div class="col-lg-4">
            <img
              class="news-img-size"
              src=${news.urlToImage}
              alt=""
            />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>
              ${news.description}
            </p>
            <div>${news.source.name}*${news.publishedAt}</div>
          </div>
        </div>`
    )
    .join('');

  document.getElementById('news-board').innerHTML = newsHTML;
};

getLatestNews();
