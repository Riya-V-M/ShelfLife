import { useState } from "react";
import { Link } from "react-router-dom";

const deals = [
  { id: 'sourdough-loaf-pack', name: 'Sourdough Loaf Pack', fullName: 'Sourdough Loaf Pack (3 loaves)', store: 'Green Earth Bakery', distance: '1.2 km away', price: 40, originalPrice: 120, pickup: 'Pickup 6–8 PM', pickupWindow: 'Today, 6:00 PM – 8:00 PM', expires: 'Expires today, 11:59 PM', address: '12 MG Road, Bengaluru', category: 'Bakery' },
  { id: 'mixed-veg-box', name: 'Mixed Veg Box', fullName: 'Mixed Veg Box', store: 'FreshMart', distance: '0.8 km away', price: 60, originalPrice: 200, pickup: 'Pickup 5–7 PM', pickupWindow: 'Today, 5:00 PM – 7:00 PM', expires: 'Expires today, 11:59 PM', address: '45 Brigade Road, Bengaluru', category: 'Produce' },
  { id: 'dairy-combo', name: 'Dairy Combo (Milk+Curd)', fullName: 'Dairy Combo (Milk + Curd)', store: 'City Grocers', distance: '2.1 km away', price: 35, originalPrice: 90, pickup: 'Pickup 7–9 PM', pickupWindow: 'Today, 7:00 PM – 9:00 PM', expires: 'Expires today, 11:59 PM', address: '8 Residency Road, Bengaluru', category: 'Dairy' },
  { id: 'croissant-pack', name: 'Croissant Pack (4)', fullName: 'Croissant Pack (4 croissants)', store: 'Green Earth Bakery', distance: '1.2 km away', price: 50, originalPrice: 160, pickup: 'Pickup 6–8 PM', pickupWindow: 'Today, 6:00 PM – 8:00 PM', expires: 'Expires today, 11:59 PM', address: '12 MG Road, Bengaluru', category: 'Bakery' },
  { id: 'fruit-basket', name: 'Seasonal Fruit Basket', fullName: 'Seasonal Fruit Basket (2 kg)', store: 'FreshMart', distance: '0.8 km away', price: 70, originalPrice: 220, pickup: 'Pickup 5–7 PM', pickupWindow: 'Today, 5:00 PM – 7:00 PM', expires: 'Expires today, 11:59 PM', address: '45 Brigade Road, Bengaluru', category: 'Produce' },
  { id: 'paneer-block', name: 'Paneer Block (200g)', fullName: 'Paneer Block (200g)', store: 'City Grocers', distance: '2.1 km away', price: 45, originalPrice: 110, pickup: 'Pickup 7–9 PM', pickupWindow: 'Today, 7:00 PM – 9:00 PM', expires: 'Expires today, 11:59 PM', address: '8 Residency Road, Bengaluru', category: 'Dairy' },
  { id: 'muffin-box', name: 'Muffin Box (6)', fullName: 'Muffin Box (6 muffins)', store: 'Sunrise Bakes', distance: '1.6 km away', price: 55, originalPrice: 180, pickup: 'Pickup 6–8 PM', pickupWindow: 'Today, 6:00 PM – 8:00 PM', expires: 'Expires today, 11:59 PM', address: '3 Church Street, Bengaluru', category: 'Bakery' },
  { id: 'veg-thali-pack', name: 'Veg Thali Pack', fullName: 'Veg Thali Pack (2 meals)', store: 'Annapurna Kitchen', distance: '1.9 km away', price: 65, originalPrice: 180, pickup: 'Pickup 8–9 PM', pickupWindow: 'Today, 8:00 PM – 9:00 PM', expires: 'Expires today, 11:59 PM', address: '21 Infantry Road, Bengaluru', category: 'Meals' },
];

const stores = [...new Set(deals.map((d) => d.store))];

function DealCard({ deal }) {
  return (
    <article className="card">
      <div className="card-image" />
      <span className="badge">Expires today</span>
      <h2>{deal.name}</h2>
      <p>{deal.store}</p>
      <p>
        <span className="price">Rs. {deal.price}</span>{" "}
        <span className="original-price">Rs. {deal.originalPrice}</span>
      </p>
      <p>{deal.pickup}</p>
      <Link className="btn" to={`/deals/${deal.id}`}>
        Claim item
      </Link>
    </article>
  );
}

function BrowsePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = deals.filter((deal) => {
    const matchesQuery =
      !q ||
      deal.name.toLowerCase().includes(q) ||
      deal.store.toLowerCase().includes(q);
    return matchesQuery && (!category || deal.category === category);
  });

  return (
    <main className="page">
      <h1>Browse deals near you</h1>
      <p>{filtered.length} items available today</p>

      <input
        type="search"
        placeholder="Search for food, bakery, store..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All categories</option>
        <option value="Bakery">Bakery</option>
        <option value="Produce">Produce</option>
        <option value="Dairy">Dairy</option>
      </select>

      <div className="grid">
        {filtered.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </main>
  );
}

export default BrowsePage;