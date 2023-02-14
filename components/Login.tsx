import React from "react";
import { useMetamask } from "@thirdweb-dev/react";

function Login() {
  const connectWithMetamask = useMetamask();

  return (
    <div className="bg-[#091B18] min-h-screen flex flex-col items-center justify-center text-center">
      <div className="flex flex-col items-center mb-10">
        <img
          className="rounded-full h-56 wo-56 mb-10"
          src="https://discovery-place.imgix.net/craft3/general-images/khan-statue_180802_201041.jpg?h=355&w=355&fit=crop&auto=format%2Cenhance&q=80"
          alt="logo"
        />
        <h1 className="text-6xl text-white font-bold">
          The Genghis Khan Lottery
        </h1>
        <h2 className="text-white pt-5">
          Get started with logging in with your Metamask
        </h2>

        <button
          onClick={connectWithMetamask}
          className="bg-white px-8 py-5 mt-10 rounded-lg shadow-lg font-bold"
        >
          Login with Metamask
        </button>
      </div>
    </div>
  );
}

export default Login;
