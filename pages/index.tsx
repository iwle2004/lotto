import type { NextPage } from 'next'
import Head from 'next/head'
import Header from "../components/Header";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import Login from "../components/Login";
import Loading from "../components/Loading";
import { useState } from "react";
import { ethers } from "ethers";
import { currency } from "../constant";
import { contractAddress } from "../contract";
import CountdownTimer from "../components/CountdownTimer";

const Home: NextPage = () => {
  const address = useAddress();
  const [quantity, setQuantity] = useState<number>(1);

  const { contract, isLoading, error } = useContract(contractAddress);
  const { data: remainingTickets, isLoading: isReadingRemainingTicket } =
    useContractRead(contract, "RemainingTickets");
  const { data: ticketPrice } = useContractRead(contract, "ticketPrice");
  const { data: CurrentWinningReward } = useContractRead(
    contract,
    "CurrentWinningReward"
  );

  console.log(remainingTickets);

  if (isLoading) return <Loading />;
  if (!address) return <Login />;

  return (
    <div className="bg-[#091B18] min-h-screen flex flex-col">
      <Head>
        <title>Genghis</title>
      </Head>

      <div className="flex-1">
        <Header />

        {/* Uldsen ticketnii too bolon pot nd hed bgag haruldag box */}
        <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5">
          <div className="stats-container">
            <h1 className="text-white text-5xl font-semibold text-center">
              The Next Draw
            </h1>

            <div className="flex justify-between p-2 space-x-2">
              <div className="stats">
                <h2 className="text-sm">Total Pool</h2>
                <p className="text-xl">
                  {CurrentWinningReward &&
                    ethers.utils.formatEther(CurrentWinningReward.toString())}
                  {""} {currency}
                </p>
              </div>

              <div className="stats">
                <h2 className="test-sm">Tickets Remaining</h2>
                <p className="text-xl">{remainingTickets?.toNumber()}</p>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="mt-5 mb-3">
              <CountdownTimer />
            </div>
          </div>

          <div className="stats-container space-y-2">
            <div className="stats-container">
              <div className="flex justify-between items-center text-white pb-2">
                <h2>Price Per Ticket</h2>
                <p>
                  {ticketPrice &&
                    ethers.utils.formatEther(ticketPrice.toString())}
                  {""} {currency}
                </p>
              </div>

              <div className="flex text-white items-center space-x-2 bg-[#091B18] border-[#004337] border p-4">
                <p>TICKETS</p>
                <input
                  className="flex w-full bg-transparent text-right outline-none"
                  type="number"
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2 mt-5">
                <div className="flex items-center justify-between text-emerald-300 text-s italic font-bold">
                  <p>Total cost of tickets</p>
                  <p>0.999</p>
                </div>

                <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                  <p>Service fees</p>
                  <p>0.001 MATIC</p>
                </div>

                <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                  <p>+ Network fees</p>
                  <p>TBC</p>
                </div>
              </div>

              <button className="mt-5 w-full bg-gradient-to-br from-orange-500 to-emerald-600 px-10 py-5 rounded-md text-white shadow-xl disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed">
                Buy Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;