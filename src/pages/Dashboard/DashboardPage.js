import { DashboardCard } from "./components/DashboardCard";
import { DashboardEmpty } from "./components/DashboardEmpty"

export const DashboardPage = () => {
  const orders = [
    {
      "cartList": [
        {
          "id": 10004,
          "name": "Sansevieria Futura Superba Snake Plant",
          "overview": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error unde quisquam magni vel eligendi nam.",
          "long_description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta aut, vel ipsum maxime quam quia, quaerat tempore minus odio exercitationem illum et eos, quas ipsa aperiam magnam officiis libero expedita quo voluptas deleniti sit dolore? Praesentium tempora cumque facere consectetur quia, molestiae quam, accusamus eius corrupti laudantium aliquid! Tempore laudantium unde labore voluptates repellat, dignissimos aperiam ad ipsum laborum recusandae voluptatem non dolore. Reiciendis cum quo illum. Dolorem, molestiae corporis.",
          "price": 99,
          "poster": "/product-images/4.webp",
          "rating": 5,
          "in_stock": true,
          "size": 7,
          "best_seller": true
        },
        {
          "id": 10012,
          "name": "Philodendron Red + Elite Matte",
          "overview": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error unde quisquam magni vel eligendi nam.",
          "long_description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta aut, vel ipsum maxime quam quia, quaerat tempore minus odio exercitationem illum et eos, quas ipsa aperiam magnam officiis libero expedita quo voluptas deleniti sit dolore? Praesentium tempora cumque facere consectetur quia, molestiae quam, accusamus eius corrupti laudantium aliquid! Tempore laudantium unde labore voluptates repellat, dignissimos aperiam ad ipsum laborum recusandae voluptatem non dolore. Reiciendis cum quo illum. Dolorem, molestiae corporis.",
          "price": 9,
          "poster": "/product-images/12.webp",
          "rating": 5,
          "in_stock": true,
          "size": 1,
          "best_seller": false
        }
      ],
      "amount_paid": 108,
      "numOfItems": 2,
      "user": {
        "name": "HT",
        "email": "ht@sl.com",
        "id": 2
      },
      "id": 1
    }
  ];

  return (
    <main>
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">My Dashboard</p>
      </section>

      <section>
        { orders.length && orders.map((order) => (
          <DashboardCard key={order.id} order={order} />
        )) }
      </section>

      <section>
        { !orders.length && <DashboardEmpty /> }
      </section>

    </main>
  )
}