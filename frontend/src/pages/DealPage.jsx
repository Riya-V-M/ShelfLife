import { useParams } from "react-router-dom";
import { useState } from "react";

const deals = [
  { id: 'sourdough-loaf-pack', fullName: 'Sourdough Loaf Pack (3 loaves)', store: 'Green Earth Bakery', distance: '1.2 km away', price: 40, originalPrice: 120, pickupWindow: 'Today, 6:00 PM – 8:00 PM', expires: 'Expires today, 11:59 PM', address: '12 MG Road, Bengaluru' },
  { id: 'mixed-veg-box', fullName: 'Mixed Veg Box', store: 'FreshMart', distance: '0.8 km away', price: 60, originalPrice: 200, pickupWindow: 'Today, 5:00 PM – 7:00 PM', expires: 'Expires today, 11:59 PM', address: '45 Brigade Road, Bengaluru' },
  { id: 'dairy-combo', fullName: 'Dairy Combo (Milk + Curd)', store: 'City Grocers', distance: '2.1 km away', price: 35, originalPrice: 90, pickupWindow: 'Today, 7:00 PM – 9:00 PM', expires: 'Expires today, 11:59 PM', address: '8 Residency Road, Bengaluru' },
  { id: 'croissant-pack', fullName: 'Croissant Pack (4 croissants)', store: 'Green Earth Bakery', distance: '1.2 km away', price: 50, originalPrice: 160, pickupWindow: 'Today, 6:00 PM – 8:00 PM', expires: 'Expires today, 11:59 PM', address: '12 MG Road, Bengaluru' },
  { id: 'fruit-basket', fullName: 'Seasonal Fruit Basket (2 kg)', store: 'FreshMart', distance: '0.8 km away', price: 70, originalPrice: 220, pickupWindow: 'Today, 5:00 PM – 7:00 PM', expires: 'Expires today, 11:59 PM', address: '45 Brigade Road, Bengaluru' },
  { id: 'paneer-block', fullName: 'Paneer Block (200g)', store: 'City Grocers', distance: '2.1 km away', price: 45, originalPrice: 110, pickupWindow: 'Today, 7:00 PM – 9:00 PM', expires: 'Expires today, 11:59 PM', address: '8 Residency Road, Bengaluru' },
  { id: 'muffin-box', fullName: 'Muffin Box (6 muffins)', store: 'Sunrise Bakes', distance: '1.6 km away', price: 55, originalPrice: 180, pickupWindow: 'Today, 6:00 PM – 8:00 PM', expires: 'Expires today, 11:59 PM', address: '3 Church Street, Bengaluru' },
  { id: 'veg-thali-pack', fullName: 'Veg Thali Pack (2 meals)', store: 'Annapurna Kitchen', distance: '1.9 km away', price: 65, originalPrice: 180, pickupWindow: 'Today, 8:00 PM – 9:00 PM', expires: 'Expires today, 11:59 PM', address: '21 Infantry Road, Bengaluru' },
];

function DealPage() {
  const { id } = useParams();
  const deal = deals.find((d) => d.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!deal) return <p>Item not found.</p>;

  const discount = Math.round((1 - deal.price / deal.originalPrice) * 100);

  return (
    <main className="page">
      <div className="detail">
        <div className="detail-image" />
        <section>
          <span className="badge">{deal.expires}</span>
          <h1>{deal.fullName}</h1>
          <p>{deal.store} · {deal.distance}</p>

          <p>
            <span className="price">Rs. {deal.price}</span>{" "}
            <span className="original-price">Rs. {deal.originalPrice}</span>{" "}
            <span className="discount">{discount}% off</span>
          </p>

          <p>Pickup window: {deal.pickupWindow}</p>
          <p>Store address: {deal.address}</p>

          <div className="qty">
            <button onClick={() => setQuantity((n) => Math.max(1, n - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((n) => Math.min(5, n + 1))}>+</button>
          </div>

          <button className="btn">Claim item →</button>
        </section>
      </div>
    </main>
  );
}

export default DealPage;