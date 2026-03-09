import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { 
  Shield, 
  TrendingUp, 
  Users, 
  Award,
  Target,
  Zap,
  Globe,
  BarChart3,
  Building,
  Fuel,
  Wheat,
  Cpu
} from 'lucide-react';

const stats = [
  { label: 'Years of Experience', value: '8+', icon: Award },
  { label: 'Global Investors', value: '50,000+', icon: Users },
  { label: 'Countries Served', value: '120+', icon: Globe },
  { label: 'Total Returns Paid', value: '$500M+', icon: BarChart3 },
];

const sectors = [
  {
    icon: Building,
    title: 'Real Estate',
    description: 'Premium commercial and residential properties across Europe with guaranteed rental yields'
  },
  {
    icon: Fuel,
    title: 'Oil & Gas',
    description: 'Strategic investments in energy projects and petroleum exploration ventures'
  },
  {
    icon: Wheat,
    title: 'Agriculture',
    description: 'Sustainable farming operations and agricultural technology investments'
  },
  {
    icon: Cpu,
    title: 'Crypto Mining',
    description: 'State-of-the-art mining facilities powered by renewable energy sources'
  }
];

const team = [
  {
    name: 'Alexander Petrov',
    role: 'CEO & Founder',
    bio: 'Former European Investment Bank executive with 15+ years in diversified investments',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Isabella Martinez',
    role: 'Head of Operations',
    bio: 'Ex-Goldman Sachs portfolio manager specializing in alternative investments',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Marcus Weber',
    role: 'Chief Investment Officer',
    bio: 'Former Deutsche Bank senior analyst with expertise in European markets',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
];

const values = [
  {
    icon: Shield,
    title: 'Security First',
    description: 'European regulatory compliance and multi-layer security protocols protect your investments'
  },
  {
    icon: TrendingUp,
    title: 'Proven Results',
    description: 'Consistent returns across Real Estate, Energy, Agriculture, and Technology sectors'
  },
  {
    icon: Target,
    title: 'Transparency',
    description: 'Real-time portfolio tracking and complete transaction transparency'
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Cutting-edge investment strategies and continuous market analysis'
  }
];

export const AboutPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
            <Award className="w-4 h-4 mr-2" />
            Industry Leaders Since 2016
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {t('aboutTitle').split(' ').slice(0, 1).join(' ')} <br />
            <span className="text-gradient-primary">{t('aboutSubtitle')}</span>
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('ourMissionDesc')}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="crypto-card p-6 text-center">
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">
              {t('ourMission')}
            </h2>
            <div className="crypto-card p-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('ourMissionDesc')}
              </p>
            </div>
          </div>
        </section>

        {/* Investment Sectors Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              {t('investmentCategories')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Diversified portfolio across high-growth industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sectors.map((sector, index) => (
              <Card key={index} className="crypto-card text-center p-6">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <sector.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{t('realEstate')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {t('realEstateDesc')}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              {t('ourValues')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="crypto-card text-center p-6">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{t('transparency')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {t('transparencyDesc')}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Meet Our <span className="text-gradient-primary">Team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals from top financial institutions and tech companies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="crypto-card text-center">
                <CardHeader>
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};