const JSON_HEADER = { 'Content-Type': 'application/json' };
export const POST_DATA = (bodyData, endpoint, method) => {
  const config = {
    method: method || 'POST',
    mode: 'cors',
    headers: Object.assign({}, JSON_HEADER),
    body: JSON.stringify(bodyData),
  };
  return fetch(endpoint, config)
    .then((response) => response.json())
    .then((res) => res)
    .catch((err) => err);
};

export const DELETE_RECORD = (endpoint) => {
  const config = {
    method: 'DELETE',
    mode: 'cors',
    headers: Object.assign({}, JSON_HEADER),
  };
  return fetch(endpoint, config)
    .then((response) => response.json())
    .then((res) => res)
    .catch((err) => err);
};
