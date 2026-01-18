import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { 
  Download, 
  Search, 
  Target, 
  TrendingUp,
  DollarSign,
  Copy,
  Check,
  Filter,
  Zap,
  Star,
  ShoppingBag
} from 'lucide-react';
import { 
  keywordCategories, 
  keywordStats, 
  getAllKeywords,
  getHighPriorityKeywords,
  exportKeywordsToCSV,
  exportKeywordsForGoogleAds
} from '../data/keywordsData';

const KeywordsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copied, setCopied] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCopyAll = (keywords) => {
    navigator.clipboard.writeText(keywords.join('\n'));
    setCopied('all');
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownloadCSV = () => {
    const csv = exportKeywordsToCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'droomvriendjes_keywords_300.csv';
    a.click();
  };

  const handleDownloadGoogleAds = () => {
    const csv = exportKeywordsForGoogleAds();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'google_ads_keywords_import.csv';
    a.click();
  };

  const filteredCategories = selectedCategory === 'all' 
    ? keywordCategories 
    : keywordCategories.filter(cat => cat.id === selectedCategory);

  const getPriorityBadge = (priority) => {
    if (priority === 'HIGHEST') return <Badge className="bg-red-500 text-white"><Star className="w-3 h-3 mr-1" />Hoogste</Badge>;
    if (priority === 'HIGH') return <Badge className="bg-orange-500 text-white"><Zap className="w-3 h-3 mr-1" />Hoog</Badge>;
    return null;
  };

  const getMatchTypeBadge = (matchType) => {
    switch (matchType) {
      case 'EXACT_MATCH': return <Badge className="bg-green-100 text-green-800">Exact</Badge>;
      case 'PHRASE_MATCH': return <Badge className="bg-blue-100 text-blue-800">Phrase</Badge>;
      case 'BROAD_MATCH': return <Badge className="bg-gray-100 text-gray-800">Broad</Badge>;
      default: return null;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-xl">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">300 Google Ads Keywords</h1>
                <p className="text-gray-600">Geoptimaliseerd voor knuffelbeer campagnes</p>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Totaal Keywords</p>
                    <p className="text-3xl font-bold">{keywordStats.totalKeywords}</p>
                  </div>
                  <Search className="w-10 h-10 text-blue-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Hoge Prioriteit</p>
                    <p className="text-3xl font-bold">{keywordStats.highPriorityKeywords}</p>
                  </div>
                  <Zap className="w-10 h-10 text-orange-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Gem. Bod</p>
                    <p className="text-3xl font-bold">€{keywordStats.averageSuggestedBid}</p>
                  </div>
                  <DollarSign className="w-10 h-10 text-green-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Categorieën</p>
                    <p className="text-3xl font-bold">{keywordStats.categories}</p>
                  </div>
                  <Target className="w-10 h-10 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Download Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button onClick={handleDownloadCSV} className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Download Alle Keywords (CSV)
            </Button>
            <Button onClick={handleDownloadGoogleAds} className="bg-green-600 hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              Download Google Ads Import
            </Button>
            <Button 
              onClick={() => handleCopyAll(getHighPriorityKeywords())} 
              variant="outline"
            >
              {copied === 'all' ? <Check className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
              Kopieer Hoge Prioriteit ({keywordStats.highPriorityKeywords})
            </Button>
          </div>

          {/* Filter */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">Filter:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={selectedCategory === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('all')}
                  >
                    Alle ({keywordStats.totalKeywords})
                  </Button>
                  {keywordCategories.map(cat => (
                    <Button 
                      key={cat.id}
                      variant={selectedCategory === cat.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.name.split(' ')[0]} ({cat.keywords.length})
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Keyword Categories */}
          <div className="space-y-6">
            {filteredCategories.map((category) => (
              <Card key={category.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {category.name}
                        {getPriorityBadge(category.priority)}
                      </CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getMatchTypeBadge(category.matchType)}
                      <Badge variant="outline">€{category.suggestedBid}/klik</Badge>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleCopyAll(category.keywords)}
                      >
                        {copied === category.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex flex-wrap gap-2">
                    {category.keywords.map((keyword, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-purple-100 transition-colors"
                        onClick={() => handleCopy(keyword, `${category.id}-${idx}`)}
                      >
                        {copied === `${category.id}-${idx}` ? (
                          <Check className="w-3 h-3 mr-1 text-green-500" />
                        ) : null}
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tips Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Tips voor Gebruik
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-50 rounded-xl">
                  <h3 className="font-semibold text-green-900 mb-2">✅ Beste Practices</h3>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Verdeel keywords over aparte Ad Groups per categorie</li>
                    <li>• Begin met "Koop-intent" en "Cadeau" keywords</li>
                    <li>• Gebruik Exact Match voor hoge prioriteit keywords</li>
                    <li>• Monitor en pas biedingen aan na 2 weken</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <h3 className="font-semibold text-blue-900 mb-2">🎯 Jouw Unieke Voordeel</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Focus op "slaapknuffel" niche - minder concurrentie!</li>
                    <li>• Highlight "nachtlampje" en "white noise" features</li>
                    <li>• Target "baby slaapproblemen" zoektermen</li>
                    <li>• Gebruik "kraamcadeau" voor hoge conversie</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default KeywordsPage;
