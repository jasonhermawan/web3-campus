import { Box } from "@mantine/core";
import React, { useState } from "react";
import Header from "@/components/Header";
import { 
  CreditCard, 
  Send, 
  MoreHorizontal, 
  Eye, 
  EyeOff, 
  ArrowDownLeft,
  Shield,
  Zap,
  CheckCircle,
  Users,
  BookOpen,
  Wallet,
  GraduationCap,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const Landing = () => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const features = [
    {
      title: "Secure Payments",
      description: "Bank-level security with end-to-end encryption. Your transactions are protected with advanced fraud detection.",
      icon: Shield,
      gradient: "from-blue-50 to-cyan-50",
      border: "border-blue-100",
      iconBg: "bg-blue-500"
    },
    {
      title: "Instant Transfers",
      description: "Lightning-fast payments with real-time processing. Get paid instantly without waiting for bank clearances.",
      icon: Zap,
      gradient: "from-purple-50 to-pink-50",
      border: "border-purple-100",
      iconBg: "bg-purple-500"
    },
    {
      title: "Easy Integration",
      description: "Simple API integration with comprehensive documentation. Get up and running in minutes, not hours.",
      icon: CheckCircle,
      gradient: "from-green-50 to-emerald-50",
      border: "border-green-100",
      iconBg: "bg-green-500"
    },
    {
      title: "Multi-User Support",
      description: "Manage multiple team members and clients with role-based access control and permission management.",
      icon: Users,
      gradient: "from-orange-50 to-red-50",
      border: "border-orange-100",
      iconBg: "bg-orange-500"
    },
    {
      title: "Multiple Payment Methods",
      description: "Accept payments via credit cards, debit cards, UPI, net banking, and digital wallets all in one place.",
      icon: CreditCard,
      gradient: "from-teal-50 to-cyan-50",
      border: "border-teal-100",
      iconBg: "bg-teal-500"
    },
    {
      title: "Detailed Analytics",
      description: "Comprehensive reports and analytics to track your payments, revenue trends, and business insights.",
      icon: BookOpen,
      gradient: "from-indigo-50 to-purple-50",
      border: "border-indigo-100",
      iconBg: "bg-indigo-500"
    }
  ];

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const handleWalletConnect = () => {
    setIsWalletConnected(!isWalletConnected);
  };

  const FeatureCard = ({ feature }) => {
    const IconComponent = feature.icon;
    
    return (
      <div className={`bg-gradient-to-br ${feature.gradient} p-8 rounded-2xl border ${feature.border} hover:shadow-lg transition-all duration-300 hover:scale-105`}>
        <div className={`w-12 h-12 ${feature.iconBg} rounded-xl flex items-center justify-center mb-4`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-black mb-3">{feature.title}</h3>
        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
      </div>
    );
  };

  const PaymentActionButton = ({ icon: Icon, onClick }) => (
    <button 
      className="bg-gray-100 hover:bg-gray-200 rounded-xl p-3 transition-all duration-300 hover:scale-105"
      onClick={onClick}
    >
      <Icon className="w-5 h-5 text-gray-600 mx-auto mb-1" />
    </button>
  );

  return (
    <>
      <Box>
        <Header withBorder={false} />
        
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-pink-50 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-to-br from-orange-200/40 via-pink-300/50 to-purple-300/40 rounded-full blur-3xl" />
            <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-300/30 via-cyan-300/40 to-teal-300/30 rounded-full blur-2xl" />
            <div className="absolute bottom-1/3 right-1/5 w-72 h-72 bg-gradient-to-br from-pink-300/35 via-rose-300/45 to-orange-300/35 rounded-full blur-2xl" />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between px-6 max-w-7xl mx-auto pt-8">
            {/* Left Side - Text Content */}
            <div className="lg:w-1/2 mb-12 lg:mb-0 pt-20 pl-4">
              <div className="text-gray-500 text-sm mb-4 font-medium">— For Freelance</div>
              <h1 className="text-black text-6xl font-bold mb-6 leading-tight">
                Payment Made<br />
                <span className="relative">
                  Easy.
                  <div className="absolute bottom-2 left-0 w-full h-1 bg-black rounded-full" />
                </span>
              </h1>
              
              <p className="text-gray-600 text-lg mb-8 max-w-md leading-relaxed">
                Free Payment Gateway. Supports Networking,<br />
                Credit, Debit Cards, UPI etc.
              </p>
              
              <div className="flex space-x-4 mb-16">
                <button className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Side - Payment Interface */}
            <div className="lg:w-1/2 relative h-[600px] pt-8">
              {/* Current Balance Card */}
              <div className="absolute top-0 right-0 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 w-48 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-gray-500 text-xs font-medium">Current Balance</div>
                  <button 
                    onClick={toggleBalanceVisibility}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={isBalanceVisible ? "Hide balance" : "Show balance"}
                  >
                    {isBalanceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-black text-xl font-bold mb-3">
                  {isBalanceVisible ? '$290.5' : '••••••'}
                </div>
                <button className="bg-black text-white px-4 py-2 rounded-lg text-xs w-full hover:bg-gray-800 transition-all duration-300">
                  Add More
                </button>
              </div>

              {/* Main Payment Card */}
              <div className="absolute top-16 right-12 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-3xl p-6 w-80 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">AJ</span>
                    </div>
                    <div>
                      <div className="text-black font-semibold text-sm">Aily Jenifer</div>
                      <div className="text-gray-500 text-xs">Premium</div>
                    </div>
                  </div>
                  <button aria-label="More options">
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="mb-1">
                  <div className="text-black text-3xl font-bold mb-1">
                    {isBalanceVisible ? '$ 6421.50' : '$ ••••••'}
                  </div>
                  <div className="text-gray-500 text-sm mb-4">Balance</div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="text-gray-400 text-sm">•••• •••• ••••</div>
                  <div className="text-black font-mono text-sm font-semibold">3567</div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <PaymentActionButton icon={Send} onClick={() => console.log('Send clicked')} />
                  <PaymentActionButton icon={ArrowDownLeft} onClick={() => console.log('Receive clicked')} />
                  <PaymentActionButton icon={CreditCard} onClick={() => console.log('Card clicked')} />
                </div>

                <button className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300">
                  Pay
                </button>
              </div>

              {/* Outstanding Card */}
              <div className="absolute top-64 left-8 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 w-44 shadow-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <div className="text-black text-sm font-semibold">Outstanding</div>
                </div>
                <div className="text-black text-xl font-bold mb-1">$89.5</div>
                <button className="bg-black text-white px-4 py-2 rounded-lg text-xs w-full hover:bg-gray-800 transition-all duration-300">
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </Box>

      {/* Student Login Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/20 via-purple-400/30 to-pink-400/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-indigo-400/25 via-cyan-400/35 to-teal-400/25 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Side - Content */}
            <div className="lg:w-1/2">
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="w-6 h-6 text-indigo-600" />
                <span className="text-indigo-600 font-semibold text-sm">— For Students</span>
              </div>
              
              <h2 className="text-5xl font-bold text-black mb-6 leading-tight">
                Student Portal<br />
                <span className="relative text-indigo-600">
                  Access
                  <div className="absolute bottom-2 left-0 w-full h-1 bg-indigo-600 rounded-full"></div>
                </span>
              </h2>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Connect your wallet to access exclusive student features, manage payments, 
                and unlock special discounts on educational services.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">Access to educational payment plans</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">Special student discounts and offers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">Secure transactions with crypto payments</span>
                </div>
              </div>
            </div>

            {/* Right Side - Wallet Connection */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-8 w-full max-w-md shadow-2xl">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Wallet className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">Student Login</h3>
                  <p className="text-gray-600">Connect your wallet to get started</p>
                </div>

                {!isWalletConnected ? (
                  <div className="space-y-4">
                    <button 
                      onClick={handleWalletConnect}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 group"
                    >
                      <Wallet className="w-5 h-5" />
                      <span>Connect Wallet</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-4">Supported wallets:</p>
                      <div className="flex justify-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-bold">MM</span>
                        </div>
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-bold">CB</span>
                        </div>
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-bold">WC</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black mb-1">Wallet Connected!</h4>
                      <p className="text-sm text-gray-600 mb-4">0x742d...5B4a</p>
                    </div>
                    <button className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center space-x-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Access Student Portal</span>
                    </button>
                    <button 
                      onClick={handleWalletConnect}
                      className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Disconnect Wallet
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Feature Overview</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover the powerful features that make PayEasy the perfect payment solution for freelancers and businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;