
import React from "react";
import { CreditCard, Wallet } from "lucide-react";

export default function WalletInfo() {
  return (
    <div className="mt-7 bg-gradient-to-tr from-purple-light/70 via-white to-purple/10 rounded-2xl shadow flex flex-col md:flex-row items-center justify-between px-8 py-7 gap-6">
      <div className="flex items-center gap-3">
        <Wallet className="h-8 w-8 text-purple" />
        <span className="font-bold text-xl text-purple">Wallet Balance:</span>
        <span className="text-2xl font-bold text-green-700 ml-2">$25.00</span>
      </div>
      <p className="text-gray-700 max-w-xs">
        Top up now and earn an extra <span className="text-purple font-bold">5% bonus credits</span> for your next ride. Manage all your payments and cards securely!
      </p>
      <a
        href="/rider/payments"
        className="inline-block bg-purple text-white px-5 py-2 rounded font-bold hover:bg-purple-dark transition mt-2 md:mt-0"
      >
        Add Funds
      </a>
    </div>
  );
}
