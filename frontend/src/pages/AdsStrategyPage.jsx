import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { 
  Download, 
  Target, 
  TrendingUp,
  DollarSign,
  Copy,
  Check,
  Calendar,
  AlertTriangle,
  Zap,
  Star,
  Ban,
  PieChart,
  Clock,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Percent
} from 'lucide-react';
import { 
  extendedKeywordCategories,
  negativeKeywords,
  adGroupConfig,
  seasonModifiers,
  budgetAllocation,
  qualityScoreTips,
  monitoringChecklist,
  exportNegativeKeywords,
  exportFullCampaignStructure
} from '../data/advancedKeywordsData';

const AdsStrategyPage = () => {
  const [copied, setCopied] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownloadNegatives = () => {
    const content = exportNegativeKeywords();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'negative_keywords.txt';
    a.click();
  };

  const handleDownloadFull = () => {
    const csv = exportFullCampaignStructure();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'full_campaign_structure.csv';
    a.click();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGHEST': return 'bg-red-500 text-white';
      case 'HIGH': return 'bg-orange-500 text-white';
      case 'MEDIUM': return 'bg-yellow-500 text-black';
      case 'LOW': return 'bg-gray-400 text-white';
      default: return 'bg-gray-300';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-br from-green-500 to-blue-500 p-3 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Google Ads Strategie</h1>
                <p className="text-gray-600">500+ keywords, negative keywords, seizoen modifiers & budget allocatie</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="pt-4 pb-4">
                <p className="text-purple-100 text-xs">Totaal Keywords</p>
                <p className="text-2xl font-bold">500+</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
              <CardContent className="pt-4 pb-4">
                <p className="text-red-100 text-xs">Negative Keywords</p>
                <p className="text-2xl font-bold">{negativeKeywords.general.length}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="pt-4 pb-4">
                <p className="text-green-100 text-xs">Ad Groups</p>
                <p className="text-2xl font-bold">{adGroupConfig.length}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <CardContent className="pt-4 pb-4">
                <p className="text-orange-100 text-xs">Seizoen Events</p>
                <p className="text-2xl font-bold">{seasonModifiers.length}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="pt-4 pb-4">
                <p className="text-blue-100 text-xs">Budget/dag</p>
                <p className="text-2xl font-bold">€{budgetAllocation.example.dailyBudget}</p>
              </CardContent>
            </Card>
          </div>

          {/* Download Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button onClick={handleDownloadFull} className="bg-green-600 hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              Download Volledige Campagne CSV
            </Button>
            <Button onClick={handleDownloadNegatives} variant="destructive">
              <Ban className="w-4 h-4 mr-2" />
              Download Negative Keywords
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="adgroups" className="space-y-4">
            <TabsList className="bg-white border flex-wrap h-auto p-1">
              <TabsTrigger value="adgroups">Ad Groups</TabsTrigger>
              <TabsTrigger value="keywords">Extra Keywords</TabsTrigger>
              <TabsTrigger value="negatives">Negative Keywords</TabsTrigger>
              <TabsTrigger value="seasons">Seizoen Modifiers</TabsTrigger>
              <TabsTrigger value="budget">Budget Allocatie</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            </TabsList>

            {/* Ad Groups Tab */}
            <TabsContent value="adgroups">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {adGroupConfig.map((group) => (
                  <Card key={group.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <Badge variant="outline">{group.budgetPercent}% budget</Badge>
                      </div>
                      <CardDescription>{group.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-xs text-green-600">CPC Range</p>
                          <p className="font-bold text-green-800">
                            €{group.cpcRange.min} - €{group.cpcRange.max}
                          </p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-xs text-blue-600">Strategie</p>
                          <p className="font-bold text-blue-800 text-sm">
                            {group.strategy.replace(/_/g, ' ')}
                          </p>
                        </div>
                      </div>
                      {group.targetRoas && (
                        <Badge className="bg-purple-100 text-purple-800">Target ROAS: {group.targetRoas}%</Badge>
                      )}
                      {group.targetCpa && (
                        <Badge className="bg-orange-100 text-orange-800">Target CPA: €{group.targetCpa}</Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Extra Keywords Tab */}
            <TabsContent value="keywords">
              <div className="space-y-4">
                {extendedKeywordCategories.map((category) => (
                  <Card key={category.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {category.name}
                            <Badge className={getPriorityColor(category.priority)}>
                              {category.priority}
                            </Badge>
                          </CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">€{category.suggestedBid}/klik</Badge>
                          <Badge variant="outline">{category.keywords.length} keywords</Badge>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(category.keywords.join('\n'));
                              handleCopy('', category.id);
                            }}
                          >
                            {copied === category.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1">
                        {category.keywords.slice(0, 15).map((kw, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">{kw}</Badge>
                        ))}
                        {category.keywords.length > 15 && (
                          <Badge className="bg-gray-200 text-gray-600">+{category.keywords.length - 15} meer</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Negative Keywords Tab */}
            <TabsContent value="negatives">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700">
                    <Ban className="w-5 h-5" />
                    Negative Keywords - CRUCIAAL!
                  </CardTitle>
                  <CardDescription>
                    Deze keywords uitsluiten voorkomt geldverspilling aan irrelevante clicks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      Algemene Uitsluitingen ({negativeKeywords.general.length})
                    </h3>
                    <div className="flex flex-wrap gap-2 p-4 bg-red-50 rounded-lg">
                      {negativeKeywords.general.map((kw, idx) => (
                        <Badge key={idx} variant="destructive" className="text-xs">
                          -{kw}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Irrelevante Zoektermen ({negativeKeywords.irrelevant.length})</h3>
                    <div className="flex flex-wrap gap-2 p-4 bg-orange-50 rounded-lg">
                      {negativeKeywords.irrelevant.map((kw, idx) => (
                        <Badge key={idx} className="bg-orange-200 text-orange-800 text-xs">
                          -{kw}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleDownloadNegatives} variant="destructive" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Alle Negative Keywords
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Season Modifiers Tab */}
            <TabsContent value="seasons">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {seasonModifiers.map((season, idx) => (
                  <Card key={idx} style={{ borderLeftColor: season.color, borderLeftWidth: '4px' }}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{season.name}</CardTitle>
                        <Badge 
                          className={season.bidModifier > 0 ? 'bg-green-500' : 'bg-red-500'}
                        >
                          {season.bidModifier > 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                          {season.bidModifier > 0 ? '+' : ''}{season.bidModifier}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {season.period}
                      </div>
                      {season.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {season.keywords.map((kw, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{kw}</Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Budget Tab */}
            <TabsContent value="budget">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Budget Allocatie (€{budgetAllocation.example.dailyBudget}/dag)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {budgetAllocation.example.allocation.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{item.adGroup}</span>
                          <span className="text-gray-600">€{item.amount}/dag ({item.percent}%)</span>
                        </div>
                        <Progress value={item.percent} className="h-3" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                    <h3 className="font-semibold text-blue-900 mb-3">💡 Budget Tips</h3>
                    <ul className="text-sm text-blue-800 space-y-2">
                      <li>• <strong>Start met €25/dag</strong> voor voldoende data</li>
                      <li>• <strong>Verhoog Koop Intent</strong> als conversies goed zijn</li>
                      <li>• <strong>Seizoen budget:</strong> +50-150% rond feestdagen</li>
                      <li>• <strong>Test budget:</strong> Houd 8% voor nieuwe keywords</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Monitoring Tab */}
            <TabsContent value="monitoring">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      Dagelijks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {monitoringChecklist.daily.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-green-500" />
                      Wekelijks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {monitoringChecklist.weekly.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-purple-500" />
                      Maandelijks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {monitoringChecklist.monthly.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Quality Score Tips */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Quality Score Optimalisatie
                  </CardTitle>
                  <CardDescription>Hogere Quality Score = lagere CPC!</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {qualityScoreTips.map((tip, idx) => (
                      <div key={idx} className="p-4 bg-yellow-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-yellow-900">{tip.title}</h4>
                          <Badge className={tip.impact === 'HIGH' ? 'bg-red-500' : 'bg-yellow-500'}>
                            {tip.impact}
                          </Badge>
                        </div>
                        <p className="text-sm text-yellow-800">{tip.description}</p>
                      </div>
                    ))}
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

export default AdsStrategyPage;
