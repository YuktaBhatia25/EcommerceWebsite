import { getSessionData } from "./authService"

export async function createOrder(cartList, totalAmount, user) {
  const browserData = getSessionData();
  const order = {
    cartList,
    totalAmount,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    numOfItems: cartList.length,
    amountPaid: totalAmount
  };

  const res = await fetch(`${process.env.REACT_APP_API_URL}660/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${browserData.token}`,
    },
    body: JSON.stringify(order)
  });

  if(!res.ok) {
    // eslint-disable-next-line no-throw-literal
    throw { message: res.statusText, status: res.status};
  }

  const data = await res.json();
  return data;
}