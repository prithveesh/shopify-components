import { getData, getPartner } from './utils/index.mjs';

const store = {};

const getPartnerStore = (url) => {
  const partnerName = getPartner(url);
  return store[partnerName] || (store[partnerName] = {});
};

export async function initCart(url, partner) {
  const data = await getData(url);
  partner.items = data.items?.reduce((acc, item) => {
    acc[item.key] = item;
    return acc;
  }, {});
  partner.cart = data;
}

export async function getCart(url, partner) {
  if (!partner.cart) {
    await initCart(url, partner);
  }
  return partner.cart;
}

export async function addCart(req, res) {
  const partner = getPartnerStore(req.url);
  const data = await getCart(req.url, partner);
  res.send(data);
}

export async function changeCart(req, res) {
  const partner = getPartnerStore(req.url);
  const { line, quantity } = req.body;
  const index = +line - 1;
  if (+quantity === 0) {
    const itemRemoved = partner.cart.items.splice(index, 1)[0];
    partner.cart.total_price -= itemRemoved.price * itemRemoved.quantity;
  } else {
    const itemToBeUpdated = partner.cart.items[index];
    const change = +quantity - partner.cart.items[index].quantity;
    partner.cart.total_price += change * itemToBeUpdated.price;
    itemToBeUpdated.quantity = quantity;
  }
  partner.cart.original_total_price = partner.cart.items_subtotal_price =
    partner.cart.total_price;
  res.send(partner.cart);
}

export const cart = async function (req, res) {
  const partner = getPartnerStore(req.url);
  try {
    const data = await getCart(req.url, partner);
    res.send(data);
  } catch (e) {
    console.log(e);
    res.send({});
  }
};
