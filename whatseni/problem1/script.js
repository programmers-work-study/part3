async function fetchPosts() {
  try {
    const response = await fetch("./data/input/posts.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`에러 발생: ${error}`, error);
  }
}

function renderPosts(posts) {
  const postListEl = document.getElementById('postList');
  postListEl.innerHTML = "";
  posts.map((post, idx) => {
    const el = document.createElement('div');
    const temp = `
      <h3>작성자 ${post.userId}</h3>
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    `;
    el.innerHTML = temp;
    postListEl.appendChild(el);
  })
}

async function init() {
  const posts = await fetchPosts();
  renderPosts(posts);

  document
    .getElementById("authorFilter")
    .addEventListener("change", function () {
      const selectedAuthor = this.value;
      if (selectedAuthor === "all") {
        renderPosts(posts);
      } else {
        const filterPosts = posts.filter((post) => post.userId.toString() === selectedAuthor);
        renderPosts(filterPosts);
      }
    });
}

for (let i = 1; i <= 10; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = `작성자 ${i}`;
  document.getElementById("authorFilter").appendChild(option);
}

init();