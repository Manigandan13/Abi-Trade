import { useEffect, useRef, useState } from "react";
import { AssetTable } from "./AssetTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinDetails, fetchCoinList } from "@/Redux/Coin/Action";
import { sendMessage } from "@/Redux/Chat/Action";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";
import { ChevronLeftIcon, ChevronRightIcon, MessageCircle } from "lucide-react";
import ReactMarkdown from 'react-markdown';

const Home = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState("all");
  const { coin, chatBot, auth } = useSelector((store) => store);
  const [isBotRelease, setIsBotRelease] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCoinList(page));
  }, [page]);

  useEffect(() => {
    dispatch(fetchCoinDetails({ coinId: "bitcoin", jwt: auth.jwt || localStorage.getItem("jwt") }));
  }, []);

  const handlePageChange = (page) => setPage(page);
  const handleBotRelease = () => setIsBotRelease(!isBotRelease);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() && !chatBot.loading) {
      dispatch(sendMessage({ prompt: inputValue, jwt: auth.jwt || localStorage.getItem("jwt") }));
      setInputValue("");
    }
  };

  const handleChange = (event) => setInputValue(event.target.value);

  useEffect(() => {
    if (isBotRelease && chatContainerRef.current) {
      chatContainerRef.current.parentElement.scrollTop = 0;
    }
  }, [isBotRelease]);
  

  if (coin.loading) return <SpinnerBackdrop />;

  const coinList = coin.coinList || [];
  const noCoinsAvailable = category === "all" && coinList.length === 0;

  return (
    <div className="relative bg-white min-h-screen text-gray-900">
      <div className="lg:flex">
        <div className="w-full p-3 md:p-6 lg:p-8">

          {coin.error && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-3 rounded-md text-sm font-medium shadow-sm mb-4">
              We're using an external API to fetch coin data. Due to rate limits, please wait and refresh.
            </div>
          )}

          {noCoinsAvailable ? (
            <div className="flex justify-center items-center h-[50vh]">
              <p className="text-gray-500 text-sm md:text-base">No coins available. Try again later.</p>
            </div>
          ) : (
            <AssetTable category={category} coins={coinList} />
          )}

          {category === "all" && !noCoinsAvailable && (
            <div className="flex justify-center items-center gap-2 mt-6">
              {page > 0 && (
                <button
                  onClick={() => handlePageChange(page - 1)}
                  className="px-3 py-2 text-xs md:text-sm border border-gray-400 text-gray-700 rounded-md hover:bg-gray-100 transition"
                >
                  <ChevronLeftIcon className="h-4 w-4 inline mr-1" /> Previous
                </button>
              )}
              {[0, 1, 2].map((num) => (
                <button
                  key={num}
                  onClick={() => handlePageChange(num)}
                  className={`px-3 py-2 text-xs md:text-sm rounded-md font-medium ${
                    page === num
                      ? "bg-black text-white"
                      : "border border-gray-400 text-gray-700 hover:bg-gray-100"
                  }`}
                  disabled={num !== 0 && coinList.length < 10}
                >
                  {num + 1}
                </button>
              ))}
              {coinList.length >= 10 && (
                <button
                  onClick={() => {
                    if (page < 2) handlePageChange(page + 1);
                  }}
                  className={`px-3 py-2 text-xs md:text-sm border border-gray-400 rounded-md transition ${
                    page < 2 ? "text-gray-700 hover:bg-gray-100" : "text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={page >= 2}
                >
                  Next <ChevronRightIcon className="h-4 w-4 inline ml-1" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Chatbot */}
      {/* Chatbot */}
      <section className="fixed bottom-5 right-5 z-50 flex flex-col justify-end items-end gap-3">
        {isBotRelease && (
          <div className="rounded-lg w-[18rem] md:w-[24rem] h-[65vh] border border-gray-300 bg-white text-gray-900 flex flex-col shadow-lg">
            <div className="flex justify-between items-center border-b border-gray-300 px-4 py-3 bg-gray-100 rounded-t-lg">
              <p className="text-sm font-semibold">Crypto Chat Bot</p>
              <button onClick={handleBotRelease} className="text-gray-500 hover:text-red-500 transition">✖</button>
            </div>

            <div className="h-full flex flex-col overflow-y-auto px-4 py-3 gap-3">
              <div className="self-start bg-gray-50 px-4 py-3 rounded-md border border-gray-300 text-sm">
                <p>Hi, {auth.user?.fullName || "User"} 👋</p>
                <p>Ask crypto questions:</p>
                <ul className="list-disc ml-5 text-xs text-gray-500 mt-1">
                  <li>We're using gemini flash model - Free Model. So the data may be old.</li>
                </ul>
              </div>

              {chatBot.messages.map((item, index) => (
                <div key={index} className={`${item.role === "user" ? "self-end" : "self-start"} max-w-[85%]`}>
                  {item.role === "user" ? (
                    <div className="bg-black text-white px-4 py-2 rounded-full shadow-sm text-sm">
                      {item.prompt}
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-300 px-4 py-3 rounded-md text-sm prose prose-sm">
                      <ReactMarkdown>{item.ans}</ReactMarkdown>
                    </div>
                  )}
                </div>
              ))}

              {chatBot.loading && <div className="text-sm text-gray-500">Fetching data...</div>}
              <div ref={chatContainerRef} />
            </div>

            <div className="border-t border-gray-300 flex items-center px-2">
              <input
                type="text"
                placeholder="Ask me something..."
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 bg-white text-gray-900 outline-none placeholder:text-gray-400 text-sm"
              />
              <button
                onClick={() => {
                  if (inputValue.trim()) {
                    dispatch(sendMessage({ prompt: inputValue, jwt: auth.jwt || localStorage.getItem("jwt") }));
                    setInputValue("");
                  }
                }}
                disabled={chatBot.loading}
                className={`p-2 ml-2 rounded-full transition ${chatBot.loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-black hover:bg-gray-900'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Chatbot Floating Button */}
        <div
          onClick={handleBotRelease}
          className="cursor-pointer bg-black p-4 rounded-full hover:scale-105 transition shadow-md"
        >
          <MessageCircle size={24} className="text-white rotate-[-90deg]" />
        </div>
      </section>
    </div>
  );
};

export default Home;


