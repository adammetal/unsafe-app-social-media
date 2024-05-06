export async function getMe() {
  const response = await fetch('/auth/me');

  if (!response.ok) {
    return null;
  }

  const me = await response.json();
  return me;
}

export async function login(email, password) {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  
  return response.ok;
}

export async function getMyFeed(search) {
  const response = await fetch('/api/feed/' + search);
  const feed = await response.json();
  return feed;
}
