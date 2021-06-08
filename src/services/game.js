const API_PREFIX = process.env.REACT_APP_API_PREFIX;

export const saveGame = (data, savedId) => {
  const userId = localStorage.getItem("userId");
  let method = "POST";
  let url = `${API_PREFIX}/users`;
  if (savedId) {
    method = "PUT";
    url = `${API_PREFIX}/users/${savedId}`;
  }

  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ ...data, id: userId }),
  });
};

export const getUser = (userId) => {
  return fetch(`${API_PREFIX}/users/${userId}`).then((res) => res.json());
};
