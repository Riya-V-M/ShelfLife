import { useMemo, useState } from 'react';
import { Clock3, MapPin, ShoppingBag, SlidersHorizontal, Tag, X } from 'lucide-react';

const categories = ['All', 'Bakery', 'Vegetables', 'Fruits'];

const listings = [
  { category: 'Bakery', title: 'Organic Sourdough Loaves', vendor: 'Hearth & Grain Bakery', distance: '0.8 km', quantity: '12 loaves available', price: 'Rs. 35', original: 'Rs. 120', savings: '70%', time: '14h left', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85' },
  { category: 'Vegetables', title: 'Heirloom Tomato Crates', vendor: 'Sunridge Farms', distance: '1.2 km', quantity: '3 crates available', price: 'Rs. 85', original: 'Rs. 290', savings: '70%', time: '8h left', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=900&q=85' },
  { category: 'Fruits', title: 'Fresh Berry Medley Packs', vendor: 'Berrybrook Orchards', distance: '2.1 km', quantity: '24 packs available', price: 'Rs. 60', original: 'Rs. 190', savings: '70%', time: '6h left', image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=900&q=85' },
  { category: 'Vegetables', title: 'Rainbow Bell Pepper Bushels', vendor: 'Green Valley Co-op', distance: '1.5 km', quantity: '8 bushels available', price: 'Rs. 70', original: 'Rs. 240', savings: '70%', time: '20h left', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=900&q=85' },
  { category: 'Bakery', title: 'Cinnamon Morning Buns', vendor: 'The Daily Crumb', distance: '2.7 km', quantity: '18 buns available', price: 'Rs. 50', original: 'Rs. 145', savings: '64%', time: '11h left', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85' },
  { category: 'Fruits', title: 'Seasonal Orchard Box', vendor: 'Meadowlane Growers', distance: '3.4 km', quantity: '10 boxes available', price: 'Rs. 110', original: 'Rs. 310', savings: '65%', time: '17h left', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=85' },
];

function ListingCard({ listing, onSelect }) {
  return (
    <article
      className="listing-card"
      role="button"
      tabIndex={0}
      onClick={() => onSelect(listing)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(listing); } }}
      aria-label={`View details for ${listing.title}`}
    >
      <div className="listing-image-wrap">
        <img src={listing.image} alt={listing.title} className="listing-image" />
        <span className="category-pill">{listing.category}</span>
        <span className="save-badge">SAVE<strong>{listing.savings}</strong></span>
        <span className="time-badge"><Clock3 size={16} /> {listing.time}</span>
      </div>
      <div className="listing-content">
        <h2>{listing.title}</h2>
        <p className="meta-line"><MapPin size={17} /> {listing.vendor} <span>·</span> {listing.distance}</p>
        <p className="meta-line quantity-line"><Tag size={17} /> {listing.quantity}</p>
        <div className="listing-footer">
          <div className="price"><strong>{listing.price}</strong><del>{listing.original}</del></div>
          <button className="reserve-button" type="button" onClick={(e) => { e.stopPropagation(); alert(`Reserved: ${listing.title}`); }}>
            <ShoppingBag size={17} /> Reserve
          </button>
        </div>
      </div>
    </article>
  );
}

function BrowsePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedListing, setSelectedListing] = useState(null);

  const filteredListings = useMemo(
    () => (activeCategory === 'All' ? listings : listings.filter((l) => l.category === activeCategory)),
    [activeCategory]
  );

  return (
    <main className="marketplace-shell">
      <section id="marketplace" className="marketplace-content">
        <div className="eyebrow">LIVE MARKETPLACE</div>
        <div className="heading-row">
          <div>
            <h1>Fresh Deals Near You</h1>
            <p className="subheading">{filteredListings.length} surplus listings available within 5km</p>
          </div>
          <div className="filters" aria-label="Filter listings by category">
            <SlidersHorizontal className="filter-icon" size={23} />
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`filter-pill ${activeCategory === category ? 'active' : ''}`}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="listings-grid">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.title} listing={listing} onSelect={setSelectedListing} />
          ))}
        </div>
      </section>

      {selectedListing && (
        <div className="details-backdrop" role="presentation" onClick={() => setSelectedListing(null)}>
          <section className="details-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <button className="close-details" type="button" onClick={() => setSelectedListing(null)} aria-label="Close details">
              <X />
            </button>
            <img src={selectedListing.image} alt="" className="details-image" />
            <div className="details-body">
              <span className="details-category">{selectedListing.category}</span>
              <h2>{selectedListing.title}</h2>
              <p className="details-vendor"><MapPin size={18} /> {selectedListing.vendor} · {selectedListing.distance}</p>
              <p className="details-description">Rescued surplus from a local vendor. Fresh, carefully packed, and ready for pickup today.</p>
              <div className="details-facts"><span><Tag size={17} /> {selectedListing.quantity}</span><span><Clock3 size={17} /> {selectedListing.time}</span></div>
              <div className="details-footer">
                <div className="price"><strong>{selectedListing.price}</strong><del>{selectedListing.original}</del></div>
                <button className="reserve-button" type="button" onClick={() => alert(`Reserved: ${selectedListing.title}`)}>
                  <ShoppingBag size={17} /> Reserve
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default BrowsePage;