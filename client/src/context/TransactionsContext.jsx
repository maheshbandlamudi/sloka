import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

export const TransactionProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [currentAccount, setCurrentAccount] = useState("");
  const[isLoading, setIsLoading] = useState(false);
  const[transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    console.log("handlechange",formData)
  };

  const checkWalletConnection = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        //getAllTransactions();
      } else {
        console.log("No accounts found");
      }

      console.log(accounts);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");

      const { addressTo, amount, message, keyword } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);
      console.log(parsedAmount);

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208', //21,000 Gwei
          value: parsedAmount._hex, // in Gwei
        }]
      });

      const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

      setIsLoading(true);
      console.log(`Loading - ${transactionHash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log("Success");

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());

    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkWalletConnection();
  }, []);
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
