async function fetchPosts() {
  try {
    const response = await fetch("./data/input/posts.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`에러 발생: ${error}`, error);
    return null; // undefined 대신 null 반환
  }
}

function createAuthorOptions() {
  const authorFilter = document.getElementById("authorFilter");
  if (!authorFilter) return;

  for (let i = 1; i <= 10; i++) {
    const option = document.createElement("option");
    option.value = i.toString();
    option.textContent = `작성자 ${i}`;
    authorFilter.appendChild(option);
  }
}

async function init() {
  createAuthorOptions();
  const posts = await fetchPosts();

  const postList = document.getElementById("postList");
  if (!postList) return;

  if (!posts) {
    postList.innerHTML = "게시글을 불러오는 중 오류가 발생했습니다.";
    return;
  }

  renderPosts(posts);

  const authorFilter = document.getElementById("authorFilter");
  if (authorFilter) {
    authorFilter.addEventListener("change", function () {
      const selectedAuthor = this.value;
      const filteredPosts =
        selectedAuthor === "all"
          ? posts
          : posts.filter((post) => post.userId.toString() === selectedAuthor);
      renderPosts(filteredPosts);
    });
  }
}

function renderPosts(posts) {
  const postList = document.getElementById("postList");
  if (!postList) return;

  postList.innerHTML = "";

  posts.forEach((post) => {
    const div = document.createElement("div");
    div.className = "post-card";

    const h3 = document.createElement("h3");
    h3.id = `post-title-${post.id}`;
    h3.textContent = `작성자 ${post.userId}: ${post.title}`;

    const p = document.createElement("p");
    p.textContent = post.body;

    div.append(h3, p);
    postList.appendChild(div);
  });
}

init();
