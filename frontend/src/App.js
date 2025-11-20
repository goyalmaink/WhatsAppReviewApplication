import { useEffect, useState } from "react";
import { RefreshCw, MessageCircle, User, Package, Phone, Clock } from "lucide-react";

export default function App() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchReviews = async () => {
    try {
      setRefreshing(true);
      const res = await fetch("http://localhost:8000/api/reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load reviews");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-amber-50 p-4 sm:p-8" style={{
      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 92, 46, 0.03) 2px, rgba(139, 92, 46, 0.03) 4px)`
    }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block bg-amber-100 px-6 py-3 border-4 border-amber-800 shadow-lg mb-4" style={{
            boxShadow: '8px 8px 0px rgba(120, 53, 15, 0.3)'
          }}>
            <h1 className="text-3xl sm:text-5xl font-bold text-amber-900 tracking-tight" style={{
              fontFamily: 'Georgia, serif',
              textShadow: '2px 2px 0px rgba(217, 119, 6, 0.3)'
            }}>
              WhatsApp Reviews
            </h1>
          </div>
          <p className="text-amber-800 text-lg font-medium" style={{ fontFamily: 'Georgia, serif' }}>
            Customer Feedback Collection System
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-amber-200 to-amber-300 p-6 border-4 border-amber-900 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-800 text-sm font-semibold uppercase tracking-wide">Total Reviews</p>
                <p className="text-4xl font-bold text-amber-900 mt-1">{reviews.length}</p>
              </div>
              <MessageCircle className="w-12 h-12 text-amber-700" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-200 to-orange-300 p-6 border-4 border-orange-900 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-800 text-sm font-semibold uppercase tracking-wide">Unique Products</p>
                <p className="text-4xl font-bold text-orange-900 mt-1">
                  {new Set(reviews.map(r => r.product_name)).size}
                </p>
              </div>
              <Package className="w-12 h-12 text-orange-700" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-200 to-yellow-300 p-6 border-4 border-yellow-900 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-800 text-sm font-semibold uppercase tracking-wide">Active Users</p>
                <p className="text-4xl font-bold text-yellow-900 mt-1">
                  {new Set(reviews.map(r => r.user_name)).size}
                </p>
              </div>
              <User className="w-12 h-12 text-yellow-700" />
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={fetchReviews}
            disabled={refreshing}
            className="group flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-amber-50 font-bold border-4 border-amber-900 shadow-lg transition-all hover:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              boxShadow: '6px 6px 0px rgba(120, 53, 15, 0.4)',
              fontFamily: 'Georgia, serif'
            }}
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-500`} />
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>

        {loading ? (
          <div className="bg-amber-100 border-4 border-amber-800 p-16 text-center shadow-lg">
            <div className="inline-block animate-spin mb-4">
              <RefreshCw className="w-12 h-12 text-amber-700" />
            </div>
            <p className="text-2xl text-amber-900 font-bold" style={{ fontFamily: 'Georgia, serif' }}>
              Loading Reviews...
            </p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-amber-100 border-4 border-amber-800 p-16 text-center shadow-lg">
            <MessageCircle className="w-16 h-16 text-amber-600 mx-auto mb-4" />
            <p className="text-2xl text-amber-900 font-bold" style={{ fontFamily: 'Georgia, serif' }}>
              No reviews yet. Start collecting feedback!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((r, index) => (
              <div
                key={r.id}
                className="bg-gradient-to-r from-amber-50 to-yellow-50 border-4 border-amber-800 p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                style={{
                  boxShadow: '6px 6px 0px rgba(120, 53, 15, 0.3)',
                  animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-300 p-3 border-2 border-amber-900 flex-shrink-0">
                      <User className="w-6 h-6 text-amber-900" />
                    </div>
                    <div>
                      <p className="text-xs text-amber-700 font-semibold uppercase tracking-wide">Customer</p>
                      <p className="text-lg font-bold text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
                        {r.user_name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-orange-300 p-3 border-2 border-orange-900 flex-shrink-0">
                      <Package className="w-6 h-6 text-orange-900" />
                    </div>
                    <div>
                      <p className="text-xs text-orange-700 font-semibold uppercase tracking-wide">Product</p>
                      <p className="text-lg font-bold text-orange-900" style={{ fontFamily: 'Georgia, serif' }}>
                        {r.product_name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-300 p-3 border-2 border-yellow-900 flex-shrink-0">
                      <Phone className="w-6 h-6 text-yellow-900" />
                    </div>
                    <div>
                      <p className="text-xs text-yellow-700 font-semibold uppercase tracking-wide">Contact</p>
                      <p className="text-lg font-bold text-yellow-900 font-mono">
                        {r.contact_number}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-amber-300 p-3 border-2 border-amber-900 flex-shrink-0">
                      <Clock className="w-6 h-6 text-amber-900" />
                    </div>
                    <div>
                      <p className="text-xs text-amber-700 font-semibold uppercase tracking-wide">Submitted</p>
                      <p className="text-sm font-bold text-amber-900">
                        {new Date(r.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-amber-700">
                        {new Date(r.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <div className="mt-4 pt-4 border-t-4 border-amber-300">
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-800 text-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide border-2 border-amber-900">
                      Review
                    </div>
                    <p className="text-amber-900 text-lg leading-relaxed flex-1" style={{ fontFamily: 'Georgia, serif' }}>
                      "{r.product_review}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="inline-block bg-amber-800 text-amber-100 px-6 py-3 border-4 border-amber-900 shadow-lg">
            <p className="font-bold" style={{ fontFamily: 'Georgia, serif' }}>
              Powered by WhatsApp Business API • Vintage Edition
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}