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

for (let i = 1; i <= 10; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = `작성자 ${i}`;
  document.getElementById("authorFilter").appendChild(option);
}

async function init() {
  const posts = await fetchPosts();
  renderPosts(posts);

  document.getElementById("authorFilter").addEventListener("change", function (event) {
    const selectedAuthor = event.target.value;
    if (selectedAuthor === "all") {
      renderPosts(posts);
    } else {
      renderPosts(posts.filter((post) => post.userId.toString() === selectedAuthor));
    }
  });
}

init();

function renderPosts(posts) {
  const $postList = document.querySelector("#postList");
  if ($postList) {
    $postList.innerHTML = posts
      .map(
        (post) => `
    <div>
      <h3>작성자 ${post.userId}</h3>
      <h3>${post.title}</h3>
      <p>
      ${post.body}
      </p>
    </div>`
      )
      .join("");
  }
}
