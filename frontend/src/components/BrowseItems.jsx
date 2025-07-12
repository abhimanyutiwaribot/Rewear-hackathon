import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllItems, createSwapRequest } from '../services/api';

// const DUMMY_ITEMS = [
//   {
//     id: 1,
//     image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
//     title: 'Vintage Denim Jacket',
//     brand: 'Levi’s',
//     size: 'M',
//     condition: 'Like New',
//     points: 120,
//     tags: ['denim', 'jacket', 'vintage'],
//     available: true,
//     featured: true,
//   },
//   {
//     id: 2,
//     image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
//     title: 'Floral Summer Dress',
//     brand: 'Zara',
//     size: 'S',
//     condition: 'Brand New',
//     points: 150,
//     tags: ['dress', 'floral', 'summer'],
//     available: false,
//     featured: false,
//   },
//   {
//     id: 3,
//     image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
//     title: 'Cozy Knit Sweater',
//     brand: 'H&M',
//     size: 'L',
//     condition: 'Gently Used',
//     points: 80,
//     tags: ['sweater', 'knit', 'cozy'],
//     available: true,
//     featured: false,
//   },
//   // ...add more items as needed
// ];

const CATEGORIES = ['Tops', 'Bottoms', 'Footwear', 'Outerwear'];
const BRANDS = ['Zara', 'H&M', 'Nike', 'Levi’s', 'Others'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const CONDITIONS = ['Brand New', 'Like New', 'Good', 'Fair'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'lowest', label: 'Lowest Points' },
  { value: 'popularity', label: 'Popularity' },
];

function BrowseItems() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    size: '',
    condition: '',
  });
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAllItems();
        setItems(data);
      } catch (err) {
        setError('Failed to fetch items');
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleSwapRequest = async (itemId) => {
    try {
      await createSwapRequest({ itemId, type: 'swap' });
      // Handle success (maybe show a notification)
    } catch (err) {
      // Handle error
    }
  };

  // Filter and search logic
  const filteredItems = items.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.brand.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = !filters.category || item.tags.includes(filters.category.toLowerCase());
    const matchesBrand = !filters.brand || item.brand === filters.brand;
    const matchesSize = !filters.size || item.size === filters.size;
    const matchesCondition = !filters.condition || item.condition === filters.condition;
    return matchesSearch && matchesCategory && matchesBrand && matchesSize && matchesCondition;
  });

  // Sort logic (dummy, as all items are static)
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sort === 'lowest') return a.points - b.points;
    if (sort === 'popularity') return b.id - a.id; // fake popularity
    return b.id - a.id; // newest first
  });

  // Pagination logic
  const itemsPerPage = 6;
  let pagedItems = sortedItems.slice(0, page * itemsPerPage);
  // Custom reorder: place 'Floral Summer Dress' after 'Cozy Knit Sweater'
  const sweaterIdx = pagedItems.findIndex(item => item.title === 'Cozy Knit Sweater');
  const floralIdx = pagedItems.findIndex(item => item.title === 'Floral Summer Dress');
  if (sweaterIdx !== -1 && floralIdx !== -1 && floralIdx !== sweaterIdx + 1) {
    // Remove Floral Summer Dress
    const [floralItem] = pagedItems.splice(floralIdx, 1);
    // Insert after Cozy Knit Sweater
    pagedItems.splice(sweaterIdx + 1, 0, floralItem);
  }
  const hasMore = sortedItems.length > pagedItems.length;

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  const clearFilters = () => setFilters({ category: '', brand: '', size: '', condition: '' });

  return (
    <div className="min-h-screen font-sans relative overflow-x-hidden bg-gradient-to-br from-indigo-100 via-white to-pink-100">
      {/* Animated background blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-200 opacity-30 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-pink-200 opacity-20 rounded-full blur-3xl animate-pulse z-0" />
      {/* Header/Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 sticky top-0 z-30 bg-white/70 backdrop-blur-lg shadow-lg rounded-b-2xl border-b border-indigo-100">
        <div className="flex items-center gap-2 cursor-pointer">
          <img src="https://img.icons8.com/color/48/000000/t-shirt--v2.png" alt="ReWear Logo" className="w-10 h-10" />
          <span className="font-bold text-2xl text-indigo-500 tracking-wide">ReWear</span>
        </div>
        <div className="flex gap-6 items-center">
          <Link to="/" className="text-indigo-500 font-medium hover:underline">Home</Link>
          <Link to="/browse" className="text-indigo-500 font-medium hover:underline"> Items </Link>
          <Link to="/add-item" className="text-white bg-indigo-500 rounded-lg px-4 py-2 font-semibold shadow hover:bg-indigo-600 transition-all">List an Item</Link>
          <Link to="/dashboard" className="text-indigo-500 font-medium hover:underline"> Dashboard </Link>
          <div className="ml-4">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" className="w-9 h-9 rounded-full border-2 border-indigo-200 shadow" />
          </div>
        </div>
      </nav>

      {/* Search & Filter Section */}
      <div className="bg-white/80 shadow-xl rounded-2xl max-w-6xl mx-auto mt-10 mb-8 px-8 py-6 flex flex-wrap gap-4 items-center sticky top-20 z-20 backdrop-blur-lg border border-indigo-100">
        <input
          type="text"
          placeholder="Search by name, tags, or brand..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-[180px] border border-indigo-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white/80 shadow-sm"
        />
        <select name="category" value={filters.category} onChange={handleFilterChange} className="border border-indigo-200 rounded-lg px-4 py-2 bg-white/80">
          <option value="">All Categories</option>
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select name="brand" value={filters.brand} onChange={handleFilterChange} className="border border-indigo-200 rounded-lg px-4 py-2 bg-white/80">
          <option value="">All Brands</option>
          {BRANDS.map(brand => <option key={brand} value={brand}>{brand}</option>)}
        </select>
        <select name="size" value={filters.size} onChange={handleFilterChange} className="border border-indigo-200 rounded-lg px-4 py-2 bg-white/80">
          <option value="">All Sizes</option>
          {SIZES.map(size => <option key={size} value={size}>{size}</option>)}
        </select>
        <select name="condition" value={filters.condition} onChange={handleFilterChange} className="border border-indigo-200 rounded-lg px-4 py-2 bg-white/80">
          <option value="">All Conditions</option>
          {CONDITIONS.map(cond => <option key={cond} value={cond}>{cond}</option>)}
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)} className="border border-indigo-200 rounded-lg px-4 py-2 bg-white/80">
          {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        <button onClick={clearFilters} className="ml-2 text-sm text-gray-500 hover:text-indigo-500 underline">Clear Filters</button>
      </div>

      {/* Product Grid - Reference Style */}
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Browse Clothing Items</h2>
        {/* Search & Filter Section removed as requested */}
        {/* Amazon-style Product Grid */}
        <div className="mt-6 w-full flex justify-center items-center pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl px-2 md:px-0">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : pagedItems.length === 0 ? (
              <div className="text-center text-gray-400 py-12 w-full col-span-full">No items found.</div>
            ) : (
              pagedItems.map(item => (
                <div key={item.id} className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all flex flex-col min-h-[420px]">
                  <div className="w-full h-64 flex items-center justify-center overflow-hidden rounded-t-2xl bg-gray-100">
                    <img
                      alt={item.title}
                      src={item.image}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between p-4">
                    <div>
                      <h3 className="text-base text-gray-800 font-bold mb-1 truncate">{item.title}</h3>
                      <p className="text-xs text-gray-500 mb-2">{item.brand} · {item.size} · {item.condition}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.tags.map(tag => <span key={tag} className="bg-indigo-100 text-indigo-600 text-xs px-2 py-0.5 rounded-full">#{tag}</span>)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-block bg-gradient-to-r from-pink-500 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">{item.points} pts</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${item.available ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>{item.available ? 'Available' : 'Swapped'}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button className="flex-1 bg-green-500 text-white rounded-lg px-3 py-2 font-semibold shadow transition-colors duration-200 hover:bg-green-600 hover:text-white hover:border-green-700 border border-green-500">Request Swap</button>
                      <button className="flex-1 bg-indigo-500 text-white rounded-lg px-3 py-2 font-semibold shadow transition-colors duration-200 hover:bg-pink-500 hover:text-white hover:border-pink-700 border border-indigo-500">Redeem</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Pagination / Load More */}
      {hasMore && (
        <div className="flex justify-center my-10">
          <button onClick={() => setPage(page + 1)} className="bg-gradient-to-r from-indigo-500 to-pink-400 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:from-indigo-600 hover:to-pink-500 transition-all text-lg">Load More</button>
        </div>
      )}
      {/* Extra bottom space for mobile */}
      <div className="h-16" />
    </div>
  );
}

export default BrowseItems;
