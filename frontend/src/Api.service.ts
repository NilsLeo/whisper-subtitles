const config = {
  api: "http://localhost:8000/api",
  options: {
    headers: { "content-type": "application/json" },
  },
};

const httpGet = (endpoint: string) => {
  return fetch(`${config.api}${endpoint}`, {
    ...config.options,
  })
    .then((response) => handleResponse(response))
    .then((response) => response)
    .catch((error) => {
      console.error(error);
      throw Error(error);
    });
};

const httpPost = (endpoint:string, data: any) => {
    console.log('data', data)

  return fetch(`${config.api}${endpoint}`, {
    method: "post",
    body: data ? JSON.stringify(data) : null,
    ...config.options,
  })
    .then((response) => handleResponse(response))
    .then((response) => response)
    .catch((error) => {
      console.error(error);
      throw Error(error);
    });
};

const httpPut = (endpoint: string, data: any) => {
  return fetch(`${config.api}${endpoint}`, {
    method: "put",
    body: data ? JSON.stringify(data) : null,
    ...config.options,
  })
    .then((response) => handleResponse(response))
    .then((response) => response)
    .catch((error) => {
      console.error(error);
      throw Error(error);
    });
};

const httpDelete = (endpoint: string) => {
  return fetch(`${config.api}${endpoint}`, {
    method: "delete",
    ...config.options,
  })
    .then((response) => handleResponse(response))
    .then((response) => response)
    .catch((error) => {
      console.error(error);
      throw Error(error);
    });
};

const handleResponse = (response: any) => {
  // You can handle 400 errors as well.
  if (response.status === 200) {
    return response.json();
  } else {
    console.log('error', response)
  }
};

export default { httpGet, httpPost, httpPut, httpDelete };
