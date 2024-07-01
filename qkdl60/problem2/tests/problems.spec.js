const {test} = require("@playwright/test");

async function createDummyTodos(page, count = 3) {
  for (let i = 0; i < count; i++) {
    await page.type("#newTodo", `할 일 ${i}`);
    await page.click('button[onclick="addTodo()"]');
  }
}

test.describe("Todo List 기능 구현하기", () => {
  test("TC 1. 할 일이 정상적으로 생성된다.", async ({page}) => {
    await page.goto("./base");

    const todoText = "새로운 할 일";
    await page.type("#newTodo", todoText);
    await page.click('button[onclick="addTodo()"]');

    await page.waitForSelector(".todo", {timeout: 100});
    const createdTodoText = await page.$eval(".todo", (el) => el.textContent);
    console.assert(createdTodoText.includes(todoText), "새로운 할 일이 추가되지 않았습니다.");
  });

  test("TC 2. 작성된 할 일이 정상적으로 조회된다.", async ({page}) => {
    await page.goto("./base");
    await createDummyTodos(page);

    for (let i = 0; i < 3; i++) {
      const todoText = await page.$eval(`.todo:nth-child(${i + 1})`, (el) => el.textContent);
      console.assert(todoText.includes(`할 일 ${i}`), `할 일 ${i}가 목록에 표시되지 않았습니다.`);
    }
  });

  test("TC 3. 작성된 할 일이 정상적으로 삭제된다.", async ({page}) => {
    await page.goto("./base");

    await createDummyTodos(page);
    await page.click(".todo button", {timeout: 100});

    const todos = await page.$$(".todo");
    console.assert(todos.length === 2, "할 일이 정확하게 삭제되지 않았습니다.");
  });
});
