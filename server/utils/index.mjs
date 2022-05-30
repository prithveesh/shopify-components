import fetch from 'node-fetch';
import { config } from '../partners/index.mjs';

export const getPartner = (url) => {
  return url.split('/')[1];
};

export const getUrl = (url) => {
  return `${url.split('/').slice(2).join('/')}`;
};

export const getData = async (url) => {
  const partner = getPartner(url);
  const { path, headers } = config[partner];
  const response = await fetch(`${path}${getUrl(url)}`, {
    headers,
  });
  const data = await response.json();
  return data;
};

export const postData = async (url, body) => {
  const partner = getPartner(url);
  const { path, headers } = config[partner];
  const response = await fetch(`${path}/${getUrl(url)}`, {
    method: 'post',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};
