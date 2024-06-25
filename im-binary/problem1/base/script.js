// 주어진 문제를 해결하기 위해 적절하게 코드를 수정 & 보완해주세요.

async function fetchPosts() {
  try {
    const response = await fetch("./data/input/posts.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`에러 발생: ${error}`, error);
  }
}

for (let i = 1; i <= 5; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = `작성자 ${i}`;
  document.getElementById("authorFilter").appendChild(option);
}

function renderPosts(posts) {
  const postList = document.getElementById("postList");

  posts.forEach((post) => {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    h3.textContent = `작성자 ${post.userId}: ${post.title}`;
    p.textContent = `${post.body}`;

    div.append(h3, p);
    postList.appendChild(div);
  });
}

async function init() {
  const posts = await fetchPosts();
  renderPosts(posts);
  console.log(renderPosts(posts));

  document
    .getElementById("authorFilter")
    .addEventListener("change", function () {
      const selectedAuthor = this.value;
      if (selectedAuthor === "all") {
        renderPosts(posts);
      } else {
        renderPosts(
          posts.filter((post) => post.userId.toString() === selectedAuthor + 1)
        );
      }
    });
}

init();
