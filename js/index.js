document.addEventListener("DOMContentLoaded", function() {

  fetch('http://localhost:3000/books')
  .then(resp => resp.json())
  .then(booksArray => booksArray.forEach(book => renderTitles(book)))

  function renderTitles(book) {
    //console.log(book.title)
    const listContainer = document.getElementById('list')
    const title = document.createElement('li')
    title.textContent = book.title
    listContainer.append(title)
    title.addEventListener('click', () => renderDetails(book))
  }

  const likeBtn = document.createElement('button')

  function renderDetails(book) {
    //console.log(book)
    const panel = document.getElementById('show-panel')
    //console.log(panel)
    panel.innerHTML = ''
    const img = document.createElement('img')
    img.src = `${book.img_url}`
    const titlePanel = document.createElement('h4')
    titlePanel.textContent = `${book.title}`
    const subtitle = document.createElement('h4')
    subtitle.textContent = `${book.subtitle}`
    const author = document.createElement('h4')
    author.textContent = `${book.author}`
    const description = document.createElement('p')
    description.textContent = `${book.description}`
    panel.append(img, titlePanel, subtitle, author, description)
    const listOfUsers = document.createElement('ul')
    //console.log(book.users)
    book.users.forEach(user => {
      const liUser = document.createElement('li')
      liUser.textContent = user.username
      //console.log(user.username)
      //liUser.id = user.id
      listOfUsers.appendChild(liUser)
      panel.appendChild(listOfUsers)
    })
    likeBtn.textContent = 'Like'
    //likeBtn.id = `${book.id}`
    panel.appendChild(likeBtn)
    likeBtn.addEventListener('click', () => handleLikeClick(book, book.users))
  }

  function handleLikeClick(book, usersArr) {
    //console.log(book.id, usersArr)

    if(likeBtn.textContent === 'Like') {
      usersArr.push({"id": 1, "username": "pouros"})
      fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({users: usersArr})
      })
      .then(resp => resp.json())
      .then(book => renderUnlike(book))
    }

    else if(likeBtn.textContent === 'Unlike') {
      usersArr.pop()
      fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({users: usersArr})
      })
      .then(resp => resp.json())
      .then(book => renderDetails(book))
    }
  }

  function renderUnlike(book) {
    //console.log(book)
    const panel = document.getElementById('show-panel')
    //console.log(panel)
    panel.innerHTML = ''
    const img = document.createElement('img')
    img.src = `${book.img_url}`
    const titlePanel = document.createElement('h4')
    titlePanel.textContent = `${book.title}`
    const subtitle = document.createElement('h4')
    subtitle.textContent = `${book.subtitle}`
    const author = document.createElement('h4')
    author.textContent = `${book.author}`
    const description = document.createElement('p')
    description.textContent = `${book.description}`
    panel.append(img, titlePanel, subtitle, author, description)
    const listOfUsers = document.createElement('ul')
    //console.log(book.users)
    book.users.forEach(user => {
      const liUser = document.createElement('li')
      liUser.textContent = user.username
      //console.log(user.username)
      //liUser.id = user.id
      listOfUsers.appendChild(liUser)
      panel.appendChild(listOfUsers)
    })
    likeBtn.textContent = 'Unlike'
    //likeBtn.id = `${book.id}`
    panel.appendChild(likeBtn)
    likeBtn.addEventListener('click', () => handleLikeClick(book, book.users))
  }
})
  
