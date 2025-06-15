/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { searchCoin } from "@/Redux/Coin/Action";
import { useNavigate } from "react-router-dom";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";

const SearchCoin = () => {
  const dispatch = useDispatch();
  const { coin } = useSelector((store) => store);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearchCoin = () => {
    if (keyword.trim() !== "") {
      dispatch(searchCoin(keyword));
    }
  };

  if (coin.loading) {
    return <SpinnerBackdrop />;
  }

  return (
    <div className="min-h-screen bg-white px-4 md:px-10 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 text-center mb-8">
          Search Coin
        </h2>

        {/* Search Input */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 mb-10">
          <input
            className="w-full md:w-[480px] px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Search coin..."
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchCoin()}
          />
          <button
            onClick={handleSearchCoin}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-md text-sm font-medium transition hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {/* Search Results */}
        {coin.searchCoinList?.length > 0 ? (
          <div className="overflow-x-auto rounded-md border border-gray-200">
            <table className="w-full text-gray-800 text-sm bg-white">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="py-3 px-3">Rank</th>
                  <th className="py-3 px-3">Coin</th>
                  <th className="py-3 px-3 text-right">Symbol</th>
                </tr>
              </thead>
              <tbody>
                {coin.searchCoinList?.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => navigate(`/market/${item.id}`)}
                    className="cursor-pointer hover:bg-gray-50 transition"
                  >
                    <td className="py-2.5 px-3">{item.marketCapRank}</td>
                    <td className="py-2.5 px-3 flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-7 h-7 rounded-full" />
                      <span className="font-medium">{item.name}</span>
                    </td>
                    <td className="py-2.5 px-3 text-right uppercase font-semibold">{item.symbol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-400 text-sm mt-16">No coins found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchCoin;
