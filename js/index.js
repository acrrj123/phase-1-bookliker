document.addEventListener("DOMContentLoaded", function() {

  fetch('http://localhost:3000/books')
  .then(resp => resp.json())
  .then(booksArray => booksArray.forEach(book => renderTitles(book)))

  function renderTitles(book) {
    //console.log(book.title)
    const list = document.getElementById('list')
    const li = document.createElement('li')
    li.textContent = book.title
    list.append(li)
    li.addEventListener('click', () => renderBookInfo(book))
  }

  function renderBookInfo(book) {
    //console.log(book)
    const div = document.getElementById('show-panel')
    //console.log(div)
    div.innerHTML = ''
    const img = document.createElement('img')
    img.src = `${book.img_url}`
    const title = document.createElement('h4')
    title.textContent = `${book.title}`
    const subtitle = document.createElement('h4')
    subtitle.textContent = `${book.subtitle}`
    const author = document.createElement('h4')
    author.textContent = `${book.author}`
    const p = document.createElement('p')
    p.textContent = `${book.description}`
    div.append(img, title, subtitle, author, p)
    const ul = document.createElement('ul')
    ul.id = 'list-of-users'
    const users = book.users
    users.forEach(user => {
      const liUser = document.createElement('li')
      liUser.textContent = user.username
      liUser.id = user.id
      //liUser.name = user.username
      ul.appendChild(liUser)
      div.appendChild(ul)
    })
    const button = document.createElement('button')
    button.textContent = 'Like'
    button.id = `${book.id}`
    div.appendChild(button)
    button.addEventListener('click', () => likeBook(book))
  }

  function likeBook(book) {
    console.log(book.users)
  }


});
