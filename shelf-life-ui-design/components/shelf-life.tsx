'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  Clock3,
  Leaf,
  MapPin,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  ShoppingBasket,
  Tag,
  Trash2,
} from 'lucide-react'

type Product = {
  id: number
  title: string
  producer: string
  distance: string
  category: string
  available: string
  time: string
  discount: string
  price: number
  original: number
  image: string
}

const products: Product[] = [
  { id: 1, title: 'Heritage Carrot Sacks', producer: 'Rootdown Farm', distance: '1.9 km', category: 'Produce', available: '4 sacks available', time: '18h left', discount: '70%', price: 2.4, original: 8, image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=900&q=85' },
  { id: 2, title: 'Artisan Rye Bread Batch', producer: 'Common Loaf', distance: '0.8 km', category: 'Bakery', available: '6 loaves available', time: '9h left', discount: '70%', price: 1.95, original: 6.5, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85' },
  { id: 3, title: 'Meadow Milk & Cream', producer: 'Willow Dairy', distance: '3.4 km', category: 'Dairy', available: '8 bundles available', time: '22h left', discount: '45%', price: 3.8, original: 7, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=85' },
  { id: 4, title: 'Market Garden Greens', producer: 'Larkspur Gardens', distance: '2.2 km', category: 'Produce', available: '10 bunches available', time: '14h left', discount: '55%', price: 2.75, original: 6, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85' },
  { id: 5, title: 'Stoneground Pantry Box', producer: 'Mill & Mason', distance: '4.1 km', category: 'Pantry', available: '3 boxes available', time: '2d left', discount: '40%', price: 8.4, original: 14, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85' },
  { id: 6, title: 'Citrus & Orchard Mix', producer: 'Good Soil Co-op', distance: '1.2 km', category: 'Fruit', available: '7 crates available', time: '12h left', discount: '60%', price: 4.2, original: 10.5, image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=900&q=85' },
  { id: 7, title: 'Cultured Yogurt Trio', producer: 'Willow Dairy', distance: '2.7 km', category: 'Dairy', available: '5 tubs available', time: '11h left', discount: '50%', price: 3.25, original: 6.5, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85' },
  { id: 8, title: 'Rosemary Focaccia', producer: 'Common Loaf', distance: '1.1 km', category: 'Bakery', available: '9 pieces available', time: '7h left', discount: '60%', price: 2.2, original: 5.5, image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=900&q=85' },
  { id: 9, title: 'Rainbow Root Bundle', producer: 'Rootdown Farm', distance: '2.4 km', category: 'Produce', available: '12 bundles available', time: '16h left', discount: '45%', price: 3.3, original: 6, image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=900&q=85' },
  { id: 10, title: 'Free-Range Egg Dozen', producer: 'Meadow Rise', distance: '3.8 km', category: 'Dairy', available: '6 dozen available', time: '20h left', discount: '40%', price: 3.6, original: 6, image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=900&q=85' },
  { id: 11, title: 'Heirloom Tomato Crate', producer: 'Larkspur Gardens', distance: '2.9 km', category: 'Produce', available: '4 crates available', time: '10h left', discount: '55%', price: 4.5, original: 10, image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=85' },
  { id: 12, title: 'Wildflower Honey Jar', producer: 'Good Soil Co-op', distance: '4.6 km', category: 'Pantry', available: '8 jars available', time: '2d left', discount: '35%', price: 5.2, original: 8, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=85' },
  { id: 13, title: 'Seasonal Soup Pack', producer: 'Mill & Mason', distance: '1.7 km', category: 'Pantry', available: '7 packs available', time: '15h left', discount: '50%', price: 4.75, original: 9.5, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=85' },
  { id: 14, title: 'Pear & Plum Basket', producer: 'Orchard Lane', distance: '3.1 km', category: 'Fruit', available: '5 baskets available', time: '13h left', discount: '50%', price: 4.8, original: 9.5, image: 'https://images.unsplash.com/photo-1490474418585-ba9bad1a8f?auto=format&fit=crop&w=900&q=85' },
  { id: 15, title: 'Seeded Sourdough Loaf', producer: 'Common Loaf', distance: '0.9 km', category: 'Bakery', available: '11 loaves available', time: '6h left', discount: '45%', price: 3.3, original: 6, image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=900&q=85' },
  { id: 16, title: 'Crisp Salad Kit', producer: 'Larkspur Gardens', distance: '1.5 km', category: 'Produce', available: '9 kits available', time: '8h left', discount: '60%', price: 3.2, original: 8, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85' },
]

function money(value: number) {
  return `$${value.toFixed(2)}`
}

function formatHold(seconds: number) { return `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}` }

function HoldBanner({ seconds, compact = false }: { seconds: number; compact?: boolean }) {
  const urgent = seconds <= 60
  return <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${urgent ? 'animate-pulse bg-[#7a0c0c]/25 text-[#ff8d78]' : 'bg-[#e8741a]/15 text-[#f0a164]'}`}><Clock3 className="size-3.5" />{compact ? formatHold(seconds) : `Held for you for ${formatHold(seconds)}`}</span>
}

function Header({ page, setPage, cartCount, holdSeconds }: { page: 'browse' | 'cart'; setPage: (page: 'browse' | 'cart') => void; cartCount: number; holdSeconds: number }) {
  return (
    <header className="sticky top-4 z-20 mx-auto flex w-[calc(100%-2rem)] max-w-[1320px] items-center justify-between rounded-[24px] border border-white/10 bg-[#24251f]/85 px-4 py-3 backdrop-blur-xl sm:px-5">
      <button onClick={() => setPage('browse')} className="flex items-center gap-3" aria-label="Go to ShelfLife browse">
        <span className="grid size-10 place-items-center rounded-[14px] bg-[#2f3a17] text-[#e4e8d4]"><Leaf className="size-5" strokeWidth={2.2} /></span>
        <span className="font-heading text-xl font-bold tracking-[-0.06em]"><span className="text-[#e4e8d4]">Shelf</span><span className="text-[#e8741a]">Life</span></span>
      </button>
      <nav className="flex items-center gap-2" aria-label="Primary navigation">
        <button onClick={() => setPage('browse')} className={`hidden rounded-full px-4 py-2 text-sm font-semibold transition sm:block ${page === 'browse' ? 'bg-[#b33a0c] text-white' : 'text-[#9b9b91] hover:bg-white/10 hover:text-white'}`}>Browse Deals</button>
        <button onClick={() => setPage('cart')} className="relative grid size-10 place-items-center rounded-full bg-white/10 text-[#e4e8d4] transition hover:bg-white/15" aria-label={`Open reservations, ${cartCount} items`}>
          <ShoppingBasket className="size-[18px]" />
          {holdSeconds > 0 && <span className="hidden text-[11px] text-[#f0a164] lg:inline">{formatHold(holdSeconds)}</span>}
          {cartCount > 0 && <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-[#e8741a] text-[10px] font-bold text-white">{cartCount}</span>}
        </button>
        <button className="hidden rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-[#a5a59a] transition hover:bg-white/15 hover:text-white sm:block">Sign In</button>
      </nav>
    </header>
  )
}

function FilterBar({ query, setQuery, activeFilter, setActiveFilter }: { query: string; setQuery: (value: string) => void; activeFilter: string; setActiveFilter: (value: string) => void }) {
  return (
    <div className="flex flex-col gap-3 rounded-[26px] border border-white/[0.06] bg-[#20201d] p-3 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-3 rounded-[18px] bg-[#292923] px-4 py-3 text-[#8a8a80]">
        <Search className="size-[18px] shrink-0" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search nearby surplus..." className="min-w-0 flex-1 bg-transparent text-sm text-[#e4e8d4] outline-none placeholder:text-[#77776e]" aria-label="Search nearby surplus" />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-0.5">
        {['All deals', 'Produce', 'Under 2 km', 'Ending soon'].map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={`shrink-0 rounded-full px-4 py-3 text-xs font-semibold transition ${activeFilter === filter ? 'bg-[#e8741a] text-white' : 'bg-[#292923] text-[#9c9c91] hover:bg-[#34342d] hover:text-[#e4e8d4]'}`}>{filter}</button>)}
      </div>
    </div>
  )
}

function ProductCard({ product, addToCart, isReserved }: { product: Product; addToCart: (product: Product) => void; isReserved: boolean }) {
  return (
    <article className="group overflow-hidden rounded-[30px] border border-white/[0.06] bg-[#202020] transition duration-300 hover:-translate-y-1 hover:border-white/10">
      <div className="relative h-[260px] overflow-hidden">
        <img src={product.image} alt={product.title} className="size-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/70" />
        <span className="absolute left-5 top-5 rounded-full bg-[#25251f]/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#d2d4c1]">{product.category}</span>
        <span className="absolute right-0 top-5 rounded-l-full bg-[#7a0c0c] px-4 py-2 font-heading text-xl font-bold text-white">{product.discount}</span>
        <span className="absolute bottom-5 left-5 flex items-center gap-1.5 rounded-full bg-[#25251f]/90 px-3 py-1.5 text-xs font-semibold text-[#f0a164]"><Clock3 className="size-3.5" />{product.time}</span>
      </div>
      <div className="flex flex-col gap-3 p-6">
        <h2 className="font-heading text-[21px] font-bold leading-tight tracking-[-0.04em] text-[#e4e8d4]">{product.title}</h2>
        <div className="flex flex-col gap-2 text-xs text-[#8a8a80]"><span className="flex items-center gap-2"><MapPin className="size-3.5 text-[#a1a18f]" />{product.producer} <span className="text-[#5f6058]">·</span> {product.distance}</span><span className="flex items-center gap-2"><Tag className="size-3.5 text-[#a1a18f]" />{product.available}</span></div>
        <div className="mt-2 flex items-center justify-between gap-3"><div className="flex items-baseline gap-2"><span className="font-heading text-2xl font-bold tracking-[-0.06em] text-[#e8741a]">{money(product.price)}</span><span className="text-xs text-[#77776e] line-through">{money(product.original)}</span></div><button onClick={() => addToCart(product)} className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition ${isReserved ? 'bg-[#52622b] text-[#e4e8d4]' : 'bg-[#2f3a17] text-[#dbe2bf] hover:bg-[#41501e]'}`}>{isReserved ? <Check className="size-3.5" /> : <ShoppingBag className="size-3.5" />}{isReserved ? 'Reserved ✓' : 'Reserve'}</button></div>
      </div>
    </article>
  )
}

function Browse({ cart, addToCart }: { cart: Product[]; addToCart: (product: Product) => void }) {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All deals')
  const filtered = products.filter((product) => product.title.toLowerCase().includes(query.toLowerCase()) || product.producer.toLowerCase().includes(query.toLowerCase())).filter((product) => activeFilter === 'All deals' || activeFilter === 'Produce' && product.category === 'Produce' || activeFilter === 'Under 2 km' && Number.parseFloat(product.distance) < 2 || activeFilter === 'Ending soon' && product.time.includes('h'))
  return <main className="mx-auto w-[calc(100%-2rem)] max-w-[1320px] pb-16 pt-14 sm:pt-20"><div className="mb-9 flex flex-col gap-3"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8741a]">Rescue good food</p><h1 className="max-w-[680px] font-heading text-4xl font-bold leading-[1.05] tracking-[-0.07em] text-[#e4e8d4] sm:text-6xl">Good food deserves<br /><span className="text-[#8d9671]">a little more time.</span></h1><p className="max-w-[520px] text-sm leading-6 text-[#8a8a80]">Fresh surplus from farms, bakers, and makers near you — rescued before it goes to waste.</p></div><FilterBar query={query} setQuery={setQuery} activeFilter={activeFilter} setActiveFilter={setActiveFilter} /><div className="mb-5 mt-10 flex items-center justify-between"><h2 className="font-heading text-xl font-bold tracking-[-0.04em] text-[#e4e8d4]">Nearby deals <span className="ml-2 text-sm font-normal text-[#77776e]">{filtered.length} available</span></h2><span className="hidden text-xs text-[#77776e] sm:block">Sorted by distance</span></div><div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">{filtered.map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} isReserved={cart.some((item) => item.id === product.id)} />)}</div></main>
}

function Quantity({ value, onChange }: { value: number; onChange: (value: number) => void }) { return <div className="flex items-center gap-2 rounded-full bg-[#292923] p-1"><button onClick={() => onChange(Math.max(1, value - 1))} className="grid size-7 place-items-center rounded-full text-[#9c9c91] transition hover:bg-white/10 hover:text-white" aria-label="Decrease quantity"><Minus className="size-3.5" /></button><span className="min-w-4 text-center text-xs font-semibold text-[#e4e8d4]">{value}</span><button onClick={() => onChange(value + 1)} className="grid size-7 place-items-center rounded-full text-[#9c9c91] transition hover:bg-white/10 hover:text-white" aria-label="Increase quantity"><Plus className="size-3.5" /></button></div> }

function Cart({ cart, removeFromCart, updateQuantity, setPage, holdSeconds, expiredItems, reAddItems }: { cart: Product[]; removeFromCart: (id: number) => void; updateQuantity: (id: number, quantity: number) => void; setPage: (page: 'browse' | 'cart') => void; holdSeconds: number; expiredItems: Product[]; reAddItems: () => void }) {
  const subtotal = cart.reduce((sum, product) => sum + product.price * (product as Product & { quantity?: number }).quantity!, 0)
  const saved = cart.reduce((sum, product) => sum + (product.original - product.price) * (product as Product & { quantity?: number }).quantity!, 0)
  return <main className="mx-auto w-[calc(100%-2rem)] max-w-[1320px] pb-16 pt-14 sm:pt-20"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div>{holdSeconds > 0 && <HoldBanner seconds={holdSeconds} />}{expiredItems.length > 0 && <div className="mt-3 flex flex-wrap items-center gap-3 rounded-[18px] bg-[#7a0c0c]/20 px-4 py-3 text-sm text-[#ffb0a0]"><span>Your hold expired and items were released</span><button onClick={reAddItems} className="rounded-full bg-[#e8741a] px-3 py-1.5 text-xs font-bold text-white">Re-add items</button></div>}</div></div><div className="mb-10"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8741a]">Your rescued food</p><h1 className="mt-2 font-heading text-4xl font-bold tracking-[-0.07em] text-[#e4e8d4] sm:text-5xl">Reservations</h1><p className="mt-3 text-sm text-[#8a8a80]">Hold your picks now, then collect them while they&apos;re at their best.</p></div>{cart.length === 0 ? <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[30px] border border-white/[0.06] bg-[#202020] text-center"><span className="mb-5 grid size-16 place-items-center rounded-full bg-[#2f3a17] text-[#dbe2bf]"><Leaf className="size-7" /></span><h2 className="font-heading text-2xl font-bold text-[#e4e8d4]">Nothing reserved yet</h2><p className="mt-2 text-sm text-[#8a8a80]">The good stuff is waiting nearby.</p><button onClick={() => setPage('browse')} className="mt-6 rounded-full bg-[#b33a0c] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#d25014]">Browse Deals</button></div> : <div className="grid items-start gap-5 lg:grid-cols-[1.4fr_0.8fr]"><section className="flex flex-col gap-3">{cart.map((product) => { const quantity = (product as Product & { quantity?: number }).quantity ?? 1; return <div key={product.id} className="flex flex-wrap items-center gap-4 rounded-[26px] border border-white/[0.06] bg-[#202020] p-4 sm:flex-nowrap sm:p-5"><img src={product.image} alt="" className="size-20 rounded-[18px] object-cover" /><div className="min-w-0 flex-1"><h2 className="truncate font-heading text-lg font-bold tracking-[-0.04em] text-[#e4e8d4]">{product.title}</h2><p className="mt-1 flex items-center gap-1.5 text-xs text-[#8a8a80]"><MapPin className="size-3.5" />{product.producer} · {product.distance}</p><span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#e8741a]/15 px-2.5 py-1 text-[11px] font-semibold text-[#f0a164]"><Clock3 className="size-3" />{product.time}</span></div><Quantity value={quantity} onChange={(value) => updateQuantity(product.id, value)} /><div className="flex min-w-[74px] flex-col items-end"><span className="font-heading text-lg font-bold text-[#e8741a]">{money(product.price * quantity)}</span><span className="text-xs text-[#77776e] line-through">{money(product.original * quantity)}</span></div><button onClick={() => removeFromCart(product.id)} className="rounded-full p-2 text-[#77776e] transition hover:bg-[#7a0c0c]/20 hover:text-[#ef8c78]" aria-label={`Remove ${product.title}`}><Trash2 className="size-4" /></button></div> })}</section><aside className="rounded-[30px] border border-white/[0.06] bg-[#202020] p-6 sm:p-7 lg:sticky lg:top-28"><h2 className="font-heading text-2xl font-bold tracking-[-0.05em] text-[#e4e8d4]">Order summary</h2><div className="mt-7 flex flex-col gap-4 text-sm"><div className="flex justify-between text-[#9b9b91]"><span>Subtotal</span><span className="font-semibold text-[#e4e8d4]">{money(subtotal)}</span></div><div className="flex justify-between text-[#8d9671]"><span>You saved</span><span className="font-semibold">−{money(saved)}</span></div></div><div className="my-6 h-px bg-white/[0.08]" /><div className="rounded-[18px] bg-[#2f3a17]/50 p-4 text-xs leading-5 text-[#c7cfaa]"><p className="font-semibold text-[#e4e8d4]">Pickup while it&apos;s fresh</p><p className="mt-1">Your producers will confirm a pickup window after reservation. Most items expire within 24 hours.</p></div><button className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#b33a0c] py-4 text-sm font-bold text-white transition hover:bg-[#d25014]">Confirm Reservation <ArrowRight className="size-4" /></button><p className="mt-4 text-center text-[11px] leading-4 text-[#77776e]">No payment today · pay the producer at pickup</p></aside></div>}</main>
}

export default function ShelfLife() {
  const [page, setPage] = useState<'browse' | 'cart'>('browse')
  const [cart, setCart] = useState<(Product & { quantity: number })[]>([])
  const [holdStart, setHoldStart] = useState<number | null>(null)
  const [holdSeconds, setHoldSeconds] = useState(0)
  const [expiredItems, setExpiredItems] = useState<Product[]>([])
  useEffect(() => { const saved = window.localStorage.getItem('shelflife-hold-start'); if (saved) setHoldStart(Number(saved)) }, [])
  useEffect(() => { if (!holdStart) return; const tick = () => setHoldSeconds(Math.max(0, 900 - Math.floor((Date.now() - holdStart) / 1000))); tick(); const timer = window.setInterval(tick, 1000); return () => window.clearInterval(timer) }, [holdStart])
  useEffect(() => { if (cart.length && !holdStart) { const now = Date.now(); window.localStorage.setItem('shelflife-hold-start', String(now)); setHoldStart(now) } if (!cart.length && holdStart) { window.localStorage.removeItem('shelflife-hold-start'); setHoldStart(null); setHoldSeconds(0) } }, [cart.length, holdStart])
  useEffect(() => { if (holdStart && holdSeconds === 0 && Date.now() - holdStart >= 900000 && cart.length) { setExpiredItems(cart); setCart([]); window.localStorage.removeItem('shelflife-hold-start'); setHoldStart(null); /* Wire real stock release here when inventory backend exists. */ } }, [holdSeconds, holdStart, cart])
  const addToCart = (product: Product) => setCart((current) => current.some((item) => item.id === product.id) ? current : [...current, { ...product, quantity: 1 }])
  const removeFromCart = (id: number) => setCart((current) => current.filter((item) => item.id !== id))
  const updateQuantity = (id: number, quantity: number) => setCart((current) => current.map((item) => item.id === id ? { ...item, quantity } : item))
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart])
  const reAddItems = () => { expiredItems.forEach((product) => addToCart(product)); setExpiredItems([]) }
  return <div className="min-h-screen bg-[#1c1a14] text-[#e4e8d4]"><Header page={page} setPage={setPage} cartCount={cartCount} holdSeconds={holdSeconds} />{page === 'browse' ? <Browse cart={cart} addToCart={addToCart} /> : <Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} setPage={setPage} holdSeconds={holdSeconds} expiredItems={expiredItems} reAddItems={reAddItems} />}</div>
}
