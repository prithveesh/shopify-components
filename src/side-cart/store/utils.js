export const fetchData = async (url, options = {}) => {
  const requestUrl = window.Shopify.routes.root + url;
  const data = await fetch(requestUrl, options);
  const response = await data.json();
  // console.log(response);
  return response;
};

export const getData = (url) => {
  return fetchData(url);
};

export const postData = (url, params) => {
  return fetchData(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
};

export const postForm = async (url, params) => {
  return fetchData(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: parseToFormData(params),
  });
};

export const parseToFormData = (params) => {
  var form_data = new FormData();
  for (var key in params) {
    form_data.append(key, params[key]);
  }
  return new URLSearchParams(Array.from(form_data)).toString();
};
