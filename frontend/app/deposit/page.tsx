"use client";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useUserAuth } from "../utils/context/UserProvider";
import { useRouter } from "next/navigation";
import { AuthInspector } from "../utils/AuthInspector";
import { User } from "../utils/context/UserProvider";
import { CreditCard, Building2, Wallet, Clock, Zap, Shield, CheckCircle, AlertCircle, X } from "lucide-react";

export default function DepositMoney() {
  const { setIsAuth, setUser, setAmount } = useUserAuth();
  const [amountToDeposit, setAmountToDeposit] = useState<number>(1000);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card');
  const [currency, setCurrency] = useState<string>('GBP');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
  }>({
    show: false,
    type: 'success',
    title: '',
    message: ''
  });
  const router = useRouter();

  useEffect(() => {
    async function Inspector() {
      const user = await AuthInspector.isAuthenticated() as User;
      if (user) {
        setUser(user);
        setIsAuth(true);
      } else {
        setIsAuth(false);
        router.push("/");
        console.log("User is not authenticated");
      }
    }
    Inspector();


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Instant deposit',
      fee: '3.5% fee',
      time: 'Instant',
      icon: CreditCard,
      timeIcon: Zap
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      description: 'ACH transfer from your bank',
      fee: '1.5% fee',
      time: '1-3 days',
      icon: Building2,
      timeIcon: Clock
    },
    {
      id: 'crypto',
      name: 'Crypto Transfer',
      description: 'Transfer from external wallet',
      fee: '0.5% fee',
      time: '10-30 min',
      icon: Wallet,
      timeIcon: Clock
    }
  ];

  const quickAmounts = [100, 500, 1000];

  const calculateFee = () => {
    const feePercentages = { card: 0.035, bank: 0.015, crypto: 0.005 };
    return amountToDeposit * feePercentages[selectedPaymentMethod as keyof typeof feePercentages];
  };

  const showNotification = (type: 'success' | 'error', title: string, message: string) => {
    setNotification({
      show: true,
      type,
      title,
      message
    });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  const handleDeposit = async () => {
    try {
      console.log(localStorage.getItem('cryptex-token'));
      console.log(amountToDeposit);
      if (!amountToDeposit || isNaN(Number(amountToDeposit))) {
        showNotification('error', 'Invalid Amount', 'Please enter a valid amount');
        return;
      }
      
      setIsLoading(true);
      
      const res = await fetch("http://localhost:3003/account/deposit", {
        method: "POST",
        headers: {
          'content-type': "application/json",
          'authorization': `Bearer ${localStorage.getItem('cryptex-token')}`
        },
        body: JSON.stringify({ amountToDeposit }),
        credentials: "include"
      });
      console.log("yo", amountToDeposit);
      
      if (res.ok) {
        console.log("YOOOOOOOOOOo");
        const data = await res.json();
        console.log("amoutn despo");
        setAmount(data.account.amount);
        console.log(data.message);
        
        // Show success notification instead of toast
        showNotification(
          'success', 
          'Deposit Successful!', 
          `${amountToDeposit.toFixed(2)} ${currency} has been added to your account`
        );
        console.log(data);
        
      } else {
        const errorData = await res.json();
        showNotification('error', 'Deposit Failed', errorData.message || 'Please try again');
      }
    } catch (error) {
      console.log(error);
      showNotification('error', 'Network Error', 'Please check your connection and try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex items-center justify-center relative">
      {/* Custom Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-right-5 min-w-80 ${
          notification.type === 'success' 
            ? 'bg-green-600 text-white' 
            : 'bg-red-600 text-white'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-6 h-6 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
          )}
          <div className="flex-1">
            <div className="font-semibold">{notification.title}</div>
            <div className="text-sm opacity-90">{notification.message}</div>
          </div>
          <button 
            onClick={() => setNotification(prev => ({ ...prev, show: false }))}
            className="ml-2 text-white hover:text-gray-200 flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="w-full max-w-2xl">{/* Rest of content remains the same */}
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Deposit Funds</h1>
          <p className="text-gray-400">Add money to your trading account</p>
        </div>

        <div className="space-y-6">
          {/* Deposit Amount Section */}
          <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gray-700 rounded-lg">
                <Wallet className="w-5 h-5 text-gray-300" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Deposit Amount</h3>
                <p className="text-sm text-gray-400">Enter the amount you want to deposit</p>
              </div>
            </div>

            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amountToDeposit}
                    onChange={(e) => setAmountToDeposit(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium text-white placeholder-gray-400"
                    placeholder="1000"
                  />
                </div>
              </div>
              <div className="w-32">
                <label className="block text-sm font-medium text-gray-300 mb-2">Currency</label>
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                >
                  <option value="GBP">GBP</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div className="flex gap-3">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setAmountToDeposit(amount)}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors text-white border border-gray-600"
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-sm p-6">
            <div className="mb-6">
              <h3 className="font-semibold text-white mb-2">Payment Method</h3>
              <p className="text-sm text-gray-400">Choose how you want to fund your deposit</p>
            </div>

            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                const TimeIcon = method.timeIcon;
                const isSelected = selectedPaymentMethod === method.id;
                
                return (
                  <label
                    key={method.id}
                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-900/20' 
                        : 'border-gray-600 hover:border-gray-500 bg-gray-750'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={isSelected}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-2 rounded-lg mr-4 ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">{method.name}</div>
                      <div className="text-sm text-gray-400">{method.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-white">{method.fee}</div>
                      <div className="flex items-center text-sm text-gray-400 justify-end">
                        <TimeIcon className="w-3 h-3 mr-1" />
                        {method.time}
                      </div>
                    </div>
                    <div className={`ml-4 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-500'
                    }`}>
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Transaction Summary */}
          <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-sm p-6">
            <h3 className="font-semibold text-white mb-4">Transaction Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Deposit Amount</span>
                <span className="font-medium text-white">${amountToDeposit.toFixed(2)} {currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Processing Fee</span>
                <span className="font-medium text-white">${calculateFee().toFixed(2)} {currency}</span>
              </div>
              <div className="border-t border-gray-600 pt-3">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-white">Total</span>
                  <span className="font-bold text-white">${(amountToDeposit + calculateFee()).toFixed(2)} {currency}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-green-900/20 border border-green-700 rounded-xl p-4 flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-400 mt-0.5" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="font-medium text-green-300">Secure Transaction</span>
              </div>
              <p className="text-sm text-green-200">
                Your deposit is protected by bank-level encryption and 2FA verification.
              </p>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleDeposit}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-4 px-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                Continue to Payment
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>

          {/* Limits Info */}
          <div className="text-center text-sm text-gray-400">
            Minimum deposit: $10 • Maximum: $50,000 per day
          </div>
        </div>
      </div>
    </div>
  );
}