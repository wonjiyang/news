// const API_KEY = `4083262a624f4cdaaedb9b397344b994`;
const API_KEY = ``;
let url = new URL(
  // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`
);
let newsList = [];
let searchInput = document.getElementById('search-input');
let moreBtn = document.getElementById('more-btn');
let menus = document.getElementById('menus');
const menusBtn = document.querySelectorAll('.menus button');
let searchBtn = document.getElementById('search-btn');
let submitBtn = document.getElementById('search-submit');
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

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

const getNews = async () => {
  try {
    url.searchParams.set('page', page);
    url.searchParams.set('pageSize', pageSize);
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error('No result for this search');
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      pagiNationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`
  );
  getNews();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  page = 1;
  url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`
  );
  getNews();
};

const handleSearch = async () => {
  const keyword = document.getElementById('search-input').value;
  url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`
  );
  getNews();
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

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">${errorMessage}</div>`;
  document.getElementById('news-board').innerHTML = errorHTML;
};

const pagiNationRender = () => {
  const totalPages = Math.ceil(totalResults / pageSize);
  const pageGroup = Math.ceil(page / groupSize);
  let lastPage = pageGroup * groupSize;
  if (lastPage > totalPages) lastPage = totalPages;
  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = '';

  if (page > 1) {
    paginationHTML += `
      <li class="page-item" onclick="moveToPage(1)">
        <a class="page-link" href="#" aria-label="First">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>`;

    paginationHTML += `
      <li class="page-item" onclick="moveToPage(${page - 1})">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&lt;</span>
        </a>
      </li>`;
  }

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `
      <li class="page-item ${i === page ? 'active' : ''}" 
          onclick="moveToPage(${i})">
        <a class="page-link" href="#">${i}</a>
      </li>`;
  }

  if (page < totalPages) {
    paginationHTML += `
      <li class="page-item" onclick="moveToPage(${page + 1})">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&gt;</span>
        </a>
      </li>`;

    paginationHTML += `
      <li class="page-item" onclick="moveToPage(${totalPages})">
        <a class="page-link" href="#" aria-label="Last">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>`;
  }

  document.querySelector('.pagination').innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
  console.log('d', pageNum);
  page = pageNum;
  getNews();
};

getLatestNews();
