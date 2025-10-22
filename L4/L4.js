function Callback(url, callback) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
          callback("Ошибка HTTP: " + response.status);
        return;
      }
      return response.json();
    })
    .then(data => {
      if (data) callback(null, data);
    })
    .then(undefined, error => callback(error));
}

function Posts() {
  Callback('https://jsonplaceholder.typicode.com/posts', (err, posts) => {
    if (err) console.log("Ошибка: " + err);
    else {
      let sorted = posts.sort((a, b) => b.title.length - a.title.length);
      console.log("Posts:", sorted);
    }
  });
}

function Comments() {
  Callback('https://jsonplaceholder.typicode.com/comments', (err, comments) => {
    if (err) console.log("Ошибка: " + err);
    else {
      let sorted = comments.sort((a, b) => a.name.localeCompare(b.name));
      console.log("Comments:", sorted);
    }
  });
}

function UsersPr() {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(r => {
      if (!r.ok) {
       console.log("Ошибка загрузки пользователей: " + r.status);
        return [];
      }
      return r.json();
    })
    .then(users => {
      if (!users || users.length == 0) return;
      let filtered = users.map(u => ({
        id: u.id,
        name: u.name,
        username: u.username,
        email: u.email,
        phone: u.phone
      }));
     console.log("Users:", filtered);
    }, error => console.log("Ошибка сети: " + error));
}

function TodosPr() {
  return fetch('https://jsonplaceholder.typicode.com/todos')
    .then(r => {
      if (!r.ok) {
        console.log("Ошибка загрузки todos: " + r.status);
        return [];
      }
      return r.json();
    })
    .then(todos => {
      if (!todos || todos.length == 0) return;
      let filtered = todos.filter(t => !t.completed);
       console.log("Todos:", filtered);
    }, error => console.log("Ошибка сети: " + error));
}

async function PostsCommentsAsync() {
  let postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
  let commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');

  if (!postsResponse.ok || !commentsResponse.ok) {
       console.log("Ошибка загрузки данных!");
  } else {
    let posts = await postsResponse.json();
    let comments = await commentsResponse.json();
    console.log("Async Posts:", posts.sort((a, b) => b.title.length - a.title.length));
    console.log("Async Comments:", comments.sort((a, b) => a.name.localeCompare(b.name)));
  }
}

async function UsersTodosAsync() {
  let usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
  let todosResponse = await fetch('https://jsonplaceholder.typicode.com/todos');

  if (!usersResponse.ok || !todosResponse.ok) {
    console.log("Ошибка загрузки данных!");
  } else {
    let users = await usersResponse.json();
    let todos = await todosResponse.json();
    let Users = users.map(u => ({
      id: u.id,
      name: u.name,
      username: u.username,
      email: u.email,
      phone: u.phone
    }));
    let Todos = todos.filter(t => !t.completed);
    console.log("Async Users:", Users);
    console.log("Async Todos:", Todos);
  }
}

Posts();
Comments();
UsersPr();
TodosPr();
PostsCommentsAsync();
UsersTodosAsync();
