import { getData, getPartner } from './utils/index.mjs';

const store = {};

const getProductHandle = (url) => {
  return url.split('/').pop();
};

export async function getCart(url) {
  const partner = getPartner(url);
  const handle = getProductHandle(url);
  if (store[partner]?.[handle]) {
    return store[partner][handle];
  }
  store[partner] = {};
  const data = await getData(url);
  store[partner][handle] = data;
  return data;
}

export const products = async function (req, res) {
  const data = await getCart(req.url);
  res.send(data);
};

export default products;
