import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { 
  Download, 
  Search, 
  FileText, 
  Target, 
  Users, 
  TrendingUp,
  Copy,
  Check
} from 'lucide-react';
import {
  campaignStructure,
  keywordLists,
  negativeKeywords,
  adCopy,
  sitelinks,
  callouts,
  audiences,
  conversionActions,
  exportKeywordsToCSV,
  exportAdsToCSV,
  getKeywordStats
} from '../data/googleAdsData';

const GoogleAdsPage = () => {
  const [copied, setCopied] = useState(null);
  const keywordStats = getKeywordStats();

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownloadKeywords = () => {
    const csv = exportKeywordsToCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'droomvriendjes_keywords.csv';
    a.click();
  };

  const handleDownloadAds = () => {
    const csv = exportAdsToCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'droomvriendjes_ads.csv';
    a.click();
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Google Ads Data</h1>
            <p className="text-gray-600">Keyword lijsten, advertentieteksten en campagne structuur</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Totaal Keywords</p>
                    <p className="text-2xl font-bold text-gray-900">{keywordStats.total}</p>
                  </div>
                  <Search className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Campagnes</p>
                    <p className="text-2xl font-bold text-gray-900">{campaignStructure.campaigns.length}</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Ad Templates</p>
                    <p className="text-2xl font-bold text-gray-900">{Object.keys(adCopy).length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Conversie Acties</p>
                    <p className="text-2xl font-bold text-gray-900">{conversionActions.length}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-4 mb-8">
            <Button onClick={handleDownloadKeywords} className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Download Keywords CSV
            </Button>
            <Button onClick={handleDownloadAds} className="bg-green-600 hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              Download Ads CSV
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="keywords" className="space-y-4">
            <TabsList className="bg-white border">
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
              <TabsTrigger value="ads">Advertenties</TabsTrigger>
              <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
              <TabsTrigger value="extensions">Extensies</TabsTrigger>
              <TabsTrigger value="audiences">Doelgroepen</TabsTrigger>
            </TabsList>

            {/* Keywords Tab */}
            <TabsContent value="keywords">
              <div className="space-y-6">
                {Object.entries(keywordLists).map(([groupName, group]) => (
                  <Card key={groupName}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg capitalize">{groupName.replace(/_/g, ' ')}</CardTitle>
                        <div className="flex gap-2">
                          {group.match_types.map(mt => (
                            <Badge key={mt} variant="outline" className="text-xs">
                              {mt}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">Campagne: {group.campaign}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2 font-medium">Keyword</th>
                              <th className="text-left py-2 font-medium">Bid (€)</th>
                              <th className="text-left py-2 font-medium">Priority</th>
                              <th className="text-right py-2 font-medium">Kopieer</th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.keywords.map((kw, idx) => (
                              <tr key={idx} className="border-b last:border-0">
                                <td className="py-2 font-mono text-gray-800">{kw.keyword}</td>
                                <td className="py-2">€{kw.bid.toFixed(2)}</td>
                                <td className="py-2">
                                  <Badge className={
                                    kw.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                                    kw.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                                  }>
                                    {kw.priority}
                                  </Badge>
                                </td>
                                <td className="py-2 text-right">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleCopy(kw.keyword, `${groupName}-${idx}`)}
                                  >
                                    {copied === `${groupName}-${idx}` ? 
                                      <Check className="w-4 h-4 text-green-500" /> : 
                                      <Copy className="w-4 h-4" />
                                    }
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Negative Keywords */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-red-600">Negatieve Keywords</CardTitle>
                    <p className="text-sm text-gray-500">Account-niveau uitsluitingen</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {negativeKeywords.account_level.map((kw, idx) => (
                        <Badge key={idx} variant="outline" className="text-red-600 border-red-200">
                          -{kw}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Ads Tab */}
            <TabsContent value="ads">
              <div className="space-y-6">
                {Object.entries(adCopy).map(([adName, ad]) => (
                  <Card key={adName}>
                    <CardHeader>
                      <CardTitle className="text-lg capitalize">{adName.replace(/_/g, ' ')}</CardTitle>
                      <p className="text-sm text-gray-500">Campagne: {ad.campaign}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Headlines */}
                      <div>
                        <h4 className="font-medium mb-2 text-blue-600">Headlines ({ad.headlines.length}/15)</h4>
                        <div className="space-y-1">
                          {ad.headlines.map((h, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                              <span className="text-sm">
                                {h.pinned && <Badge className="mr-2 bg-blue-100 text-blue-800 text-xs">Pin {h.pinned}</Badge>}
                                {h.text}
                              </span>
                              <span className="text-xs text-gray-400">{h.text.length}/30</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Descriptions */}
                      <div>
                        <h4 className="font-medium mb-2 text-green-600">Descriptions ({ad.descriptions.length}/4)</h4>
                        <div className="space-y-1">
                          {ad.descriptions.map((d, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                              <span className="text-sm">
                                {d.pinned && <Badge className="mr-2 bg-green-100 text-green-800 text-xs">Pin {d.pinned}</Badge>}
                                {d.text}
                              </span>
                              <span className="text-xs text-gray-400">{d.text.length}/90</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Campaigns Tab */}
            <TabsContent value="campaigns">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campaignStructure.campaigns.map((campaign) => (
                  <Card key={campaign.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{campaign.name}</CardTitle>
                        <Badge className={
                          campaign.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                          campaign.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {campaign.priority}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-gray-500">Type</dt>
                          <dd className="font-medium">{campaign.type}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-500">Dagbudget</dt>
                          <dd className="font-medium">€{campaign.budget_daily}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-500">Strategie</dt>
                          <dd className="font-medium">{campaign.bidding_strategy.replace(/_/g, ' ')}</dd>
                        </div>
                        {campaign.target_cpa && (
                          <div className="flex justify-between">
                            <dt className="text-gray-500">Target CPA</dt>
                            <dd className="font-medium">€{campaign.target_cpa}</dd>
                          </div>
                        )}
                        {campaign.target_roas && (
                          <div className="flex justify-between">
                            <dt className="text-gray-500">Target ROAS</dt>
                            <dd className="font-medium">{campaign.target_roas}%</dd>
                          </div>
                        )}
                      </dl>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Extensions Tab */}
            <TabsContent value="extensions">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sitelinks */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sitelinks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {sitelinks.map((link, idx) => (
                        <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                          <p className="font-medium text-blue-600">{link.text}</p>
                          <p className="text-sm text-gray-600">{link.description}</p>
                          <p className="text-xs text-gray-400 mt-1">{link.url}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Callouts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Callout Extensions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {callouts.map((callout, idx) => (
                        <Badge key={idx} variant="outline" className="text-sm py-1">
                          {callout}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Audiences Tab */}
            <TabsContent value="audiences">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* In-Market */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      In-Market Audiences
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {audiences.in_market.map((aud, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          {aud}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Remarketing */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Remarketing Lijsten</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {audiences.remarketing.map((list, idx) => (
                        <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                          <p className="font-medium">{list.name}</p>
                          <p className="text-sm text-gray-600">{list.description}</p>
                          <p className="text-xs text-gray-400 mt-1">{list.duration} dagen</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Demographics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Demographics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm text-gray-500">Leeftijd</dt>
                        <dd className="flex gap-2 mt-1">
                          {audiences.demographics.age.map(a => (
                            <Badge key={a} variant="outline">{a}</Badge>
                          ))}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-500">Ouderlijke Status</dt>
                        <dd className="flex gap-2 mt-1">
                          {audiences.demographics.parental_status.map(p => (
                            <Badge key={p} variant="outline">{p}</Badge>
                          ))}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-500">Huishoudinkomen</dt>
                        <dd className="flex gap-2 mt-1">
                          {audiences.demographics.household_income.map(h => (
                            <Badge key={h} variant="outline">{h}</Badge>
                          ))}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                {/* Conversion Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Conversie Acties
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {conversionActions.map((action, idx) => (
                        <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{action.name}</p>
                            {action.primary && <Badge className="bg-green-100 text-green-800">Primary</Badge>}
                          </div>
                          <p className="text-sm text-gray-600">Waarde: €{action.default_value}</p>
                          <p className="text-xs text-gray-400">{action.attribution} Attribution</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default GoogleAdsPage;
