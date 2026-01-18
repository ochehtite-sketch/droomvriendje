import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Download, 
  ShoppingBag, 
  Target, 
  TrendingUp,
  DollarSign,
  Calendar,
  Users,
  Search,
  Gift,
  Moon,
  Zap,
  Copy,
  Check,
  Play,
  Pause
} from 'lucide-react';
import { 
  shoppingCampaigns, 
  campaignMetrics, 
  getActiveCampaigns,
  getTotalDailyBudget,
  exportCampaignsToCSV 
} from '../data/shoppingCampaigns';

const ShoppingCampaignsDataPage = () => {
  const [copied, setCopied] = useState(null);
  const activeCampaigns = getActiveCampaigns();
  const totalBudget = getTotalDailyBudget();

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownloadCSV = () => {
    const csv = exportCampaignsToCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'droomvriendjes_shopping_campaigns.csv';
    a.click();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGHEST': return 'bg-red-100 text-red-800 border-red-200';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'ENABLED') {
      return <Badge className="bg-green-100 text-green-800"><Play className="w-3 h-3 mr-1" /> Actief</Badge>;
    }
    return <Badge className="bg-gray-100 text-gray-800"><Pause className="w-3 h-3 mr-1" /> Gepauzeerd</Badge>;
  };

  const getCampaignIcon = (name) => {
    if (name.includes('Kraamcadeau')) return <Gift className="w-5 h-5" />;
    if (name.includes('Slaapproblemen')) return <Moon className="w-5 h-5" />;
    if (name.includes('Seizoen')) return <Calendar className="w-5 h-5" />;
    if (name.includes('Duo') || name.includes('Triple')) return <Users className="w-5 h-5" />;
    return <ShoppingBag className="w-5 h-5" />;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Google Shopping Campagnes</h1>
                <p className="text-gray-600">10 campagnes voor Droomvriendjes.nl</p>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Actieve Campagnes</p>
                    <p className="text-3xl font-bold">{activeCampaigns.length}</p>
                  </div>
                  <Zap className="w-10 h-10 text-purple-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Dagelijks Budget</p>
                    <p className="text-3xl font-bold">€{totalBudget.toFixed(0)}</p>
                  </div>
                  <DollarSign className="w-10 h-10 text-green-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Target ROAS</p>
                    <p className="text-3xl font-bold">{campaignMetrics.targetROAS}%</p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-blue-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Est. Clicks/Dag</p>
                    <p className="text-3xl font-bold">300-500</p>
                  </div>
                  <Target className="w-10 h-10 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Export Button */}
          <div className="flex gap-4 mb-8">
            <Button onClick={handleDownloadCSV} className="bg-purple-600 hover:bg-purple-700">
              <Download className="w-4 h-4 mr-2" />
              Download Campagnes CSV
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="campaigns" className="space-y-4">
            <TabsList className="bg-white border">
              <TabsTrigger value="campaigns">Alle Campagnes</TabsTrigger>
              <TabsTrigger value="products">Per Product</TabsTrigger>
              <TabsTrigger value="audiences">Doelgroepen</TabsTrigger>
              <TabsTrigger value="seasonal">Seizoensgebonden</TabsTrigger>
            </TabsList>

            {/* All Campaigns Tab */}
            <TabsContent value="campaigns">
              <div className="space-y-4">
                {shoppingCampaigns.map((campaign) => (
                  <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3 bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                            {getCampaignIcon(campaign.name)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{campaign.name}</CardTitle>
                            <CardDescription>{campaign.product}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(campaign.status)}
                          <Badge className={getPriorityColor(campaign.priority)}>
                            {campaign.priority}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      {/* Title & Description */}
                      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-blue-900 text-sm">Shopping Titel</h4>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleCopy(campaign.title, `title-${campaign.id}`)}
                          >
                            {copied === `title-${campaign.id}` ? 
                              <Check className="w-4 h-4 text-green-500" /> : 
                              <Copy className="w-4 h-4" />
                            }
                          </Button>
                        </div>
                        <p className="text-blue-800 text-sm">{campaign.title}</p>
                      </div>
                      
                      <div className="mb-4 p-4 bg-green-50 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-green-900 text-sm">Beschrijving</h4>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleCopy(campaign.description, `desc-${campaign.id}`)}
                          >
                            {copied === `desc-${campaign.id}` ? 
                              <Check className="w-4 h-4 text-green-500" /> : 
                              <Copy className="w-4 h-4" />
                            }
                          </Button>
                        </div>
                        <p className="text-green-800 text-sm">{campaign.description}</p>
                      </div>

                      {/* Budget & Bidding */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500">Dagbudget</p>
                          <p className="font-bold text-gray-900">€{campaign.dailyBudget.toFixed(2)}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500">Biedstrategie</p>
                          <p className="font-bold text-gray-900 text-sm">{campaign.biddingStrategy.replace(/_/g, ' ')}</p>
                        </div>
                        {campaign.targetRoas && (
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500">Target ROAS</p>
                            <p className="font-bold text-gray-900">{campaign.targetRoas}%</p>
                          </div>
                        )}
                        {campaign.targetCpa && (
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500">Target CPA</p>
                            <p className="font-bold text-gray-900">€{campaign.targetCpa.toFixed(2)}</p>
                          </div>
                        )}
                      </div>

                      {/* Headlines */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 text-sm mb-2">Headlines</h4>
                        <div className="flex flex-wrap gap-2">
                          {campaign.headlines.map((headline, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {headline}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Custom Labels */}
                      <div>
                        <h4 className="font-semibold text-gray-700 text-sm mb-2">Custom Labels</h4>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(campaign.customLabels).map(([key, value]) => (
                            <Badge key={key} className="bg-purple-100 text-purple-800 text-xs">
                              {value}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Promotions if available */}
                      {campaign.promotions && (
                        <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
                          <h4 className="font-semibold text-red-800 text-sm mb-1">Promotie</h4>
                          <p className="text-red-700 text-sm">
                            <span className="line-through">€{campaign.promotions.originalPrice}</span>
                            {' → '}
                            <span className="font-bold">€{campaign.promotions.salePrice}</span>
                            {' '}
                            <Badge className="bg-red-500 text-white">Bespaar €{campaign.promotions.savings}</Badge>
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Per Product Tab */}
            <TabsContent value="products">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shoppingCampaigns.filter(c => c.productId.startsWith('KNUF_')).map((campaign) => (
                  <Card key={campaign.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{campaign.product}</CardTitle>
                        {getStatusBadge(campaign.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-500">Campagne</p>
                          <p className="font-medium">{campaign.name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Budget / ROAS</p>
                          <p className="font-medium">
                            €{campaign.dailyBudget}/dag | {campaign.targetRoas || campaign.targetCpa ? 
                              (campaign.targetRoas ? `${campaign.targetRoas}% ROAS` : `€${campaign.targetCpa} CPA`) : 
                              'Max Conversions'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Prioriteit</p>
                          <Badge className={getPriorityColor(campaign.priority)}>{campaign.priority}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Audiences Tab */}
            <TabsContent value="audiences">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Primaire Doelgroepen
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-900">Jonge Ouders (25-44)</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Ouders van baby's en peuters op zoek naar slaaphulpmiddelen en kwalitatief speelgoed.
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-900">Grootouders (55+)</h4>
                        <p className="text-sm text-purple-700 mt-1">
                          Op zoek naar betekenisvolle cadeaus voor kleinkinderen. Waarderen kwaliteit en veiligheid.
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-900">Cadeauzoekers</h4>
                        <p className="text-sm text-green-700 mt-1">
                          Familie en vrienden die kraamcadeaus of verjaardagscadeaus zoeken.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="w-5 h-5" />
                      Zoekintentie Segmenten
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold text-orange-900">Slaapproblemen</h4>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {['baby slaapt niet', 'white noise', 'nachtlampje baby', 'doorslapen'].map(term => (
                            <Badge key={term} variant="outline" className="text-xs">{term}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-pink-50 rounded-lg">
                        <h4 className="font-semibold text-pink-900">Kraamcadeau</h4>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {['kraamcadeau', 'babyshower', 'cadeau pasgeboren', 'origineel'].map(term => (
                            <Badge key={term} variant="outline" className="text-xs">{term}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-cyan-50 rounded-lg">
                        <h4 className="font-semibold text-cyan-900">Product Specifiek</h4>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {['slaapknuffel', 'projector nachtlamp', 'knuffel baby', 'duurzaam'].map(term => (
                            <Badge key={term} variant="outline" className="text-xs">{term}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Seasonal Tab */}
            <TabsContent value="seasonal">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Seizoensgebonden Campagnes
                  </CardTitle>
                  <CardDescription>
                    Automatische budget aanpassingen voor piekperiodes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Sinterklaas */}
                    <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-orange-500 rounded-lg">
                          <Gift className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-orange-900">Sinterklaas Periode</h3>
                          <p className="text-sm text-orange-700">15 november - 5 december</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-white rounded-lg">
                          <p className="text-xs text-gray-500">Intocht (15 nov)</p>
                          <p className="font-bold text-orange-600">+50% budget</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                          <p className="text-xs text-gray-500">Pakjesavond (5 dec)</p>
                          <p className="font-bold text-orange-600">+100% budget</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                          <p className="text-xs text-gray-500">Geschat extra</p>
                          <p className="font-bold text-orange-600">€300+</p>
                        </div>
                      </div>
                    </div>

                    {/* Kerst */}
                    <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-red-500 rounded-lg">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-red-900">Kerst Periode</h3>
                          <p className="text-sm text-red-700">10 december - 26 december</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-white rounded-lg">
                          <p className="text-xs text-gray-500">Early Bird (10-15)</p>
                          <p className="font-bold text-red-600">+50% budget</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                          <p className="text-xs text-gray-500">Rush (16-23)</p>
                          <p className="font-bold text-red-600">+150% budget</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                          <p className="text-xs text-gray-500">Geschat extra</p>
                          <p className="font-bold text-red-600">€500+</p>
                        </div>
                      </div>
                    </div>

                    {/* Kraamcadeau seizoen */}
                    <div className="p-4 bg-pink-50 rounded-xl border border-pink-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-pink-500 rounded-lg">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-pink-900">Geboortepiek</h3>
                          <p className="text-sm text-pink-700">September - Oktober (meeste geboortes)</p>
                        </div>
                      </div>
                      <p className="text-sm text-pink-800">
                        Verhoogde vraag naar kraamcadeaus. Campagne "Kraamcadeau Collectie" krijgt +30% budget boost.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ShoppingCampaignsDataPage;
