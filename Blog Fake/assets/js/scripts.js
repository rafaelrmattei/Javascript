let postArea = document.querySelector('.posts')

const readPosts = async () => {

  postArea.innerHTML = 'Loading...'

  let response = await fetch('https://jsonplaceholder.typicode.com/posts')
  let json = await response.json()

  if (json.length > 0) {
    postArea.innerHTML = ''
    for (let i in json) {
      postArea.append(createElementPost(json[i].title, json[i].body))
    }
  } else postArea.innerHTML = '0 posts founded'

}

const addPost = async (title, body) => {
  let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title, 
      body,
      userId: 2
    })
  })
  let json = await response.json()
  await readPosts()
  postArea.prepend(createElementPost(json.title, json.body))
  cleanFields()
}

const createElementPost = (title, body) => {
  let div = document.createElement('div')
  let h1 = document.createElement('h1')
  let hr = document.createElement('hr')
  h1.innerHTML = title
  div.append(h1)
  div.append(body)
  div.append(hr)
  return div
}

document.querySelector('#insertButton').addEventListener('click', () => {
  let title = document.querySelector('#titleField').value
  let body = document.querySelector('#bodyField').value
  if (title && body) {
    addPost(title, body)
  } else alert('Fill all fields')
})

const cleanFields = () => {
  document.querySelector('#titleField').value = ''
  document.querySelector('#bodyField').value = ''
}


readPosts()