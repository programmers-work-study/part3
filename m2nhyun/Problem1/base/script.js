// 주어진 문제를 해결하기 위해 적절하게 코드를 수정 & 보완해주세요.

async function fetchPosts() {
  try {
    const response = await fetch("./data/input/posts.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`에러 발생: ${error}`, error);
    return undefined; // Undefined 로 에러처리하기
  }
}

for (let i = 1; i <= 5; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = `작성자 ${i}`;
  document.getElementById("authorFilter").appendChild(option);
}

async function init() {
  const posts = await fetchPosts();

  // posts 없을때 오류처리
  if (!posts) {
    document.getElementById("postList").innerHTML =
      "게시글을 불러오는 중 오류가 발생했습니다.";
    return;
  }
  renderPosts(posts);

  document
    .getElementById("authorFilter")
    .addEventListener("change", function () {
      const selectedAuthor = this.value;
      // 삼항연산자로 post 내보낼때 필터해서 내보내기
      const filteredPosts =
        selectedAuthor === "all"
          ? posts
          : posts.filter((post) => post.userId.toString() === selectedAuthor);
      renderPosts(filteredPosts);
    });
}

init();

function renderPosts(posts) {
  const postList = document.getElementById("postList");
  if (!postList) return;

  postList.innerHTML = "";

  posts.forEach((post) => {
    const div = document.createElement("div");

    const h3 = document.createElement("h3");
    h3.id = `post-title-${post.id}`;

    const p = document.createElement("p");
    p.textContent = `${post.body}`;

    div.append(h3, p);
    h3.textContent = `작성자 ${post.userId}: ${post.title}`;
    postList.appendChild(div);
  });
}
