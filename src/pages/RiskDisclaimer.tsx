import React from 'react';
import { AlertTriangle, Shield, TrendingDown, Zap, Building, Fuel, Wheat, Bitcoin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const RiskDisclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-red-50 via-background to-yellow-50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-red-100 rounded-full">
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6">Risk Disclaimer</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Understanding investment risks is crucial for making informed decisions. 
            Please read this comprehensive risk assessment before investing.
          </p>
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg max-w-2xl mx-auto">
            <p className="text-red-800 font-semibold">
              ⚠️ All investments carry inherent risks including potential loss of principal
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Risk Categories</h3>
                  <nav className="space-y-2">
                    <a href="#general" className="block text-sm text-muted-foreground hover:text-primary transition-colors">General Risks</a>
                    <a href="#real-estate" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Real Estate</a>
                    <a href="#oil-gas" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Oil & Gas</a>
                    <a href="#agriculture" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Agriculture</a>
                    <a href="#crypto" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Crypto Mining</a>
                    <a href="#platform" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Platform Risks</a>
                    <a href="#considerations" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Key Considerations</a>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              {/* General Risks */}
              <section id="general">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingDown className="w-6 h-6 text-red-500" />
                  <h2 className="text-3xl font-bold text-foreground">General Investment Risks</h2>
                </div>
                <Card>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Market Risks</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Market volatility affecting asset values</li>
                          <li>• Economic downturns and recessions</li>
                          <li>• Interest rate fluctuations</li>
                          <li>• Inflation and currency devaluation</li>
                          <li>• Geopolitical events and instability</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Regulatory Risks</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Changes in financial regulations</li>
                          <li>• Tax law modifications</li>
                          <li>• Compliance requirement updates</li>
                          <li>• Cross-border regulatory differences</li>
                          <li>• Licensing and operational restrictions</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Sector-Specific Risks */}
              <section>
                <h2 className="text-3xl font-bold text-foreground mb-8">Sector-Specific Risk Analysis</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Real Estate */}
                  <Card id="real-estate">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Building className="w-6 h-6 text-blue-500" />
                        <h3 className="text-xl font-bold">Real Estate Investments</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-blue-50 p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">Property Market Risks</h5>
                          <p className="text-xs text-muted-foreground">Property values may decline due to oversupply, economic conditions, or location factors</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">Liquidity Constraints</h5>
                          <p className="text-xs text-muted-foreground">Real estate investments may be difficult to sell quickly during market downturns</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">Maintenance & Operating Costs</h5>
                          <p className="text-xs text-muted-foreground">Unexpected repairs, taxes, and management fees can reduce returns</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Oil & Gas */}
                  <Card id="oil-gas">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Fuel className="w-6 h-6 text-orange-500" />
                        <h3 className="text-xl font-bold">Oil & Gas Investments</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-orange-50 p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">Commodity Price Volatility</h5>
                          <p className="text-xs text-muted-foreground">Oil and gas prices are highly volatile and affected by global supply/demand</p>
                        </div>
                        <div className="bg-orange-50 p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">Environmental Regulations</h5>
                          <p className="text-xs text-muted-foreground">Stricter environmental laws may impact operations and profitability</p>
                        </div>
                        <div className="bg-orange-50 p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">Operational Hazards</h5>
                          <p className="text-xs text-muted-foreground">Technical failures, accidents, and exploration risks can cause significant losses</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Agriculture */}
                  <Card id="agriculture">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Wheat className="w-6 h-6 text-green-500" />
                        <h3 className="text-xl font-bold">Agriculture Investments</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-green-50 p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">Weather & Climate Risks</h5>
                          <p className="text-xs text-muted-foreground">Droughts, floods, and extreme weather can devastate crop yields</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">Commodity Price Fluctuations</h5>
                          <p className="text-xs text-muted-foreground">Agricultural commodity prices vary based on global supply and demand</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">Biological Risks</h5>
                          <p className="text-xs text-muted-foreground">Pests, diseases, and crop failures can result in total loss of investment</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Crypto Mining */}
                  <Card id="crypto">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Bitcoin className="w-6 h-6 text-yellow-500" />
                        <h3 className="text-xl font-bold">Crypto Mining Investments</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-yellow-50 p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">Extreme Price Volatility</h5>
                          <p className="text-xs text-muted-foreground">Cryptocurrency values can fluctuate dramatically, sometimes losing 50%+ in days</p>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">Regulatory Uncertainty</h5>
                          <p className="text-xs text-muted-foreground">Governments may ban or heavily regulate cryptocurrency operations</p>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded">
                          <h5 className="font-semibold text-sm mb-1">Technology Obsolescence</h5>
                          <p className="text-xs text-muted-foreground">Mining equipment becomes outdated quickly, requiring constant upgrades</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Critical Warning */}
              <section id="considerations" className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-8 h-8 text-red-600" />
                  <h2 className="text-2xl font-bold text-red-800">Critical Investment Considerations</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border border-red-200">
                      <h4 className="font-bold text-red-800 mb-2">⚠️ Never Invest More Than You Can Afford to Lose</h4>
                      <p className="text-sm text-red-700">Only invest funds that you can completely lose without affecting your financial stability or lifestyle.</p>
                    </div>
                    <div className="bg-white p-4 rounded border border-red-200">
                      <h4 className="font-bold text-red-800 mb-2">📊 Diversification is Essential</h4>
                      <p className="text-sm text-red-700">Spread investments across different sectors and asset classes to reduce overall risk exposure.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border border-red-200">
                      <h4 className="font-bold text-red-800 mb-2">🎯 No Guaranteed Returns</h4>
                      <p className="text-sm text-red-700">All projected returns are estimates. Actual performance may be significantly different or negative.</p>
                    </div>
                    <div className="bg-white p-4 rounded border border-red-200">
                      <h4 className="font-bold text-red-800 mb-2">🔍 Seek Professional Advice</h4>
                      <p className="text-sm text-red-700">Consult with qualified financial advisors before making significant investment decisions.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Risk Management Support</h2>
                <p className="text-muted-foreground mb-6">Our risk management team is available to discuss investment risks and help you make informed decisions.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Risk Management Team</h4>
                    <p className="text-sm text-muted-foreground">risk@TradeZerotrading.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Compliance Department</h4>
                    <p className="text-sm text-muted-foreground">Frankfurt, Germany</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RiskDisclaimer;