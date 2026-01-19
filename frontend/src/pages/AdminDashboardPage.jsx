import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Package, Users, Euro, TrendingUp, ShoppingCart, Truck, 
  Settings, LogOut, ExternalLink, RefreshCw, Calendar,
  ArrowUpRight, ArrowDownRight, Clock, CheckCircle, XCircle,
  AlertTriangle, BarChart3, Target, ShoppingBag, Mail
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboardPage = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [funnel, setFunnel] = useState(null);
  const [popularProducts, setPopularProducts] = useState([]);
  const [abandonedCarts, setAbandonedCarts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    const token = localStorage.getItem('admin_token');
    
    try {
      const response = await fetch(`${API_URL}/api/admin/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setFunnel(data.funnel || null);
        setPopularProducts(data.popular_products || []);
        setAbandonedCarts(data.abandoned_carts || []);
        setRecentOrders(data.recent_orders || []);
        setTopCustomers(data.top_customers || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock, label: 'In afwachting' },
      paid: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Betaald' },
      shipped: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Truck, label: 'Verzonden' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle, label: 'Geannuleerd' },
      failed: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle, label: 'Mislukt' }
    };
    const c = config[status] || config.pending;
    const Icon = c.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
        <Icon className="w-3 h-3" />
        {c.label}
      </span>
    );
  };

  const getFunnelColor = (rate) => {
    if (rate >= 70) return 'text-green-600';
    if (rate >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900" data-testid="admin-dashboard-title">Admin Dashboard</h1>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                {admin?.username || 'Admin'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={fetchDashboardData} variant="outline" size="sm" data-testid="refresh-btn">
                <RefreshCw className="w-4 h-4 mr-2" />
                Vernieuwen
              </Button>
              <Button onClick={handleLogout} variant="outline" size="sm" className="text-red-600 hover:bg-red-50" data-testid="logout-btn">
                <LogOut className="w-4 h-4 mr-2" />
                Uitloggen
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white" data-testid="revenue-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Totale Omzet</p>
                  <p className="text-3xl font-bold mt-1">€{stats?.total_revenue?.toFixed(2) || '0.00'}</p>
                  <p className="text-purple-200 text-sm mt-2 flex items-center gap-1">
                    <ArrowUpRight className="w-4 h-4" />
                    +{stats?.revenue_growth || 0}% deze maand
                  </p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Euro className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white" data-testid="orders-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Bestellingen</p>
                  <p className="text-3xl font-bold mt-1">{stats?.total_orders || 0}</p>
                  <p className="text-blue-200 text-sm mt-2">
                    {stats?.orders_today || 0} vandaag
                  </p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <ShoppingCart className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white" data-testid="customers-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Klanten</p>
                  <p className="text-3xl font-bold mt-1">{stats?.total_customers || 0}</p>
                  <p className="text-green-200 text-sm mt-2">
                    {stats?.new_customers_week || 0} deze week nieuw
                  </p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Users className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white" data-testid="conversion-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Conversie</p>
                  <p className="text-3xl font-bold mt-1">{stats?.conversion_rate || 0}%</p>
                  <p className="text-orange-200 text-sm mt-2 flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    Checkout → Betaald
                  </p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <TrendingUp className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Funnel Analytics */}
        {funnel && (
          <Card className="mb-8" data-testid="funnel-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                Conversietrechter - Waar Mensen Afhaken
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Funnel Visualization */}
                <div className="relative">
                  {/* Step 1: Checkout Started */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-full bg-purple-100 rounded-lg p-4 relative">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-gray-900">1. Checkout Gestart</p>
                          <p className="text-sm text-gray-600">Klanten die naar checkout gingen</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-purple-600">{funnel.checkout_started}</p>
                          <p className="text-sm text-gray-500">100%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Drop-off indicator */}
                  <div className="flex items-center gap-2 ml-4 mb-2">
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-600 font-medium">
                      {funnel.abandoned_checkouts} afgehaakt ({funnel.abandoned_rate}%)
                    </span>
                  </div>

                  {/* Step 2: Order Created */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-11/12 bg-blue-100 rounded-lg p-4 ml-auto">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-gray-900">2. Bestelling Aangemaakt</p>
                          <p className="text-sm text-gray-600">Klanten die op 'Betalen' klikten</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">{funnel.orders_created}</p>
                          <p className={`text-sm ${getFunnelColor(funnel.checkout_to_order_rate)}`}>
                            {funnel.checkout_to_order_rate}% van checkout
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Drop-off indicator */}
                  <div className="flex items-center gap-2 ml-8 mb-2">
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-600 font-medium">
                      {funnel.payment_failures} mislukt/afgebroken ({funnel.payment_failure_rate}%)
                    </span>
                  </div>

                  {/* Step 3: Payment Completed */}
                  <div className="flex items-center gap-4">
                    <div className="w-10/12 bg-green-100 rounded-lg p-4 ml-auto">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-gray-900">3. Betaling Voltooid</p>
                          <p className="text-sm text-gray-600">Succesvolle betalingen</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">{funnel.payments_completed}</p>
                          <p className={`text-sm ${getFunnelColor(funnel.order_to_payment_rate)}`}>
                            {funnel.order_to_payment_rate}% van bestellingen
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Totale Conversie</p>
                    <p className={`text-2xl font-bold ${getFunnelColor(funnel.overall_conversion)}`}>
                      {funnel.overall_conversion}%
                    </p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-gray-600">Verlaten Winkelwagens</p>
                    <p className="text-2xl font-bold text-red-600">{funnel.abandoned_checkouts}</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-600">Mislukte Betalingen</p>
                    <p className="text-2xl font-bold text-yellow-600">{funnel.payment_failures}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Order Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats?.pending_orders || 0}</div>
              <div className="text-sm text-gray-500">In afwachting</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats?.paid_orders || 0}</div>
              <div className="text-sm text-gray-500">Betaald</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats?.shipped_orders || 0}</div>
              <div className="text-sm text-gray-500">Verzonden</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats?.delivered_orders || 0}</div>
              <div className="text-sm text-gray-500">Afgeleverd</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats?.cancelled_orders || 0}</div>
              <div className="text-sm text-gray-500">Geannuleerd</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link to="/admin/orders" data-testid="orders-link">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-purple-200">
              <CardContent className="p-6 text-center">
                <Package className="w-10 h-10 mx-auto text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900">Bestellingen</h3>
                <p className="text-sm text-gray-500">Beheer & Verzenden</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/admin/merchant-feed" data-testid="merchant-link">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-200">
              <CardContent className="p-6 text-center">
                <ShoppingCart className="w-10 h-10 mx-auto text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900">Product Feed</h3>
                <p className="text-sm text-gray-500">Google Merchant</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/admin/shopping-campaigns" data-testid="ads-link">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-green-200">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-10 h-10 mx-auto text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900">Google Ads</h3>
                <p className="text-sm text-gray-500">Campagnes</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/admin/keywords" data-testid="keywords-link">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-orange-200">
              <CardContent className="p-6 text-center">
                <Settings className="w-10 h-10 mx-auto text-orange-600 mb-3" />
                <h3 className="font-semibold text-gray-900">Keywords</h3>
                <p className="text-sm text-gray-500">SEO & Ads</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card data-testid="recent-orders-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Recente Bestellingen
                </CardTitle>
                <Link to="/admin/orders" className="text-purple-600 hover:text-purple-700 text-sm flex items-center gap-1">
                  Alle bekijken <ExternalLink className="w-4 h-4" />
                </Link>
              </CardHeader>
              <CardContent>
                {recentOrders.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Geen recente bestellingen</p>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.order_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <Package className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">#{order.order_id?.slice(-8).toUpperCase()}</p>
                            <p className="text-sm text-gray-500">{order.customer_name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">€{order.total_amount?.toFixed(2)}</p>
                          {getStatusBadge(order.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Popular Products */}
            <Card className="mt-6" data-testid="popular-products-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-green-600" />
                  Populaire Producten
                </CardTitle>
              </CardHeader>
              <CardContent>
                {popularProducts.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Nog geen verkopen</p>
                ) : (
                  <div className="space-y-4">
                    {popularProducts.map((product, index) => (
                      <div key={product.name} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-400' : 'bg-gray-300'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.count}x verkocht</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">€{product.revenue?.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {/* Abandoned Carts */}
            <Card data-testid="abandoned-carts-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Verlaten Winkelwagens
                </CardTitle>
              </CardHeader>
              <CardContent>
                {abandonedCarts.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Geen verlaten winkelwagens</p>
                ) : (
                  <div className="space-y-4">
                    {abandonedCarts.map((cart, index) => (
                      <div key={index} className="p-3 bg-red-50 rounded-lg border border-red-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Mail className="w-4 h-4 text-red-500" />
                          <p className="text-sm font-medium text-gray-900 truncate">{cart.email}</p>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{cart.items_count} items</span>
                          <span className="font-semibold text-red-600">€{cart.total_amount?.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                    <p className="text-xs text-gray-500 text-center mt-4">
                      Tip: Stuur een herinnering naar deze klanten!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top Customers */}
            <Card className="mt-6" data-testid="top-customers-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Top Klanten
                </CardTitle>
              </CardHeader>
              <CardContent>
                {topCustomers.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Geen klantgegevens</p>
                ) : (
                  <div className="space-y-4">
                    {topCustomers.map((customer, index) => (
                      <div key={customer.email} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-400' : 'bg-gray-300'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{customer.name}</p>
                          <p className="text-sm text-gray-500 truncate">{customer.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">€{customer.total_spent?.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">{customer.order_count} orders</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats Card */}
            <Card className="mt-6" data-testid="today-stats-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Vandaag
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Omzet</span>
                    <span className="font-semibold text-green-600">€{stats?.revenue_today?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Bestellingen</span>
                    <span className="font-semibold">{stats?.orders_today || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Nieuwe klanten</span>
                    <span className="font-semibold">{stats?.new_customers_today || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Te verzenden</span>
                    <span className="font-semibold text-orange-600">{stats?.to_ship || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
