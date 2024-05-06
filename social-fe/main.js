import { getMe, getMyFeed, login } from "./src/api";
import "./style.css";

const root = document.querySelector("#app");

const routes = {
  "/login": loginPage,
  "/feed": feed,
  "/": feed,
};

function main() {
  const {
    location: { pathname },
  } = window;
  const routeFn = routes[pathname];

  if (!routeFn) {
    return notFound();
  }

  routeFn();
}

function notFound() {
  console.log(404);
}

function loginPage() {
  root.innerHTML = `
    <div>
      <form id="login-form">
        <div>
          <input name="email" type="email" placeholder="Email address" required>
        </div>
        <div>
          <input name="password" type="password" placeholder="Password" required>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  `;

  const form = document.querySelector("#login-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const email = data.get("email").toString();
    const password = data.get("password").toString();
    
    if (await login(email, password)) {
      window.location.pathname = "/feed";
      return;
    } else {
      console.log("error in login");
    }
  });
}

async function feed() {
  const me = await getMe();

  if (me === null) {
    window.location.pathname = "/login";
    return;
  }

  const { location: { search } } = window;

  const feed = await getMyFeed(search);
  
  root.innerHTML = '';
  for (const post of feed) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'post__title';
    titleDiv.innerHTML = post.userId;

    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'post__body';
    bodyDiv.innerText = post.body;

    postDiv.append(titleDiv, bodyDiv);
    root.append(postDiv);
  }
}

main();
