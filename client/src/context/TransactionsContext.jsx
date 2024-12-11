import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

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
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    console.log("handlechange", formData);
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const transactionContract = getEthereumContract();


      const availableTransactions = await transactionContract.getAllTransactions();
      const structuredTransactions = availableTransactions.map((obj)=>(
        {
          addressTo: obj.receiver,
          addressFrom: obj.sender,
          timestamp: new Date(obj.timestamp.toNumber() * 1000).toLocaleString(),
          message: obj.message,
          keyword: obj.keyword,
          amount: parseInt(obj.amount._hex) * (10 ** -18)
        }
      ))
      console.log(structuredTransactions)
      console.log(availableTransactions)
      setTransactions(structuredTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  const checkWalletConnection = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        //getAllTransactions();
        getAllTransactions();
      } else {
        console.log("No accounts found");
      }

      console.log(accounts);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const checkIfTransactionExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();

      window.localStorage.setItem("transactionCount", transactionCount);
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
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", //21,000 Gwei
            value: parsedAmount._hex, // in Gwei
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      setIsLoading(true);
      console.log(`Loading - ${transactionHash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log("Success");

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
      window.reload()
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkWalletConnection();
    checkIfTransactionExist();
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
        transactions, isLoading
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
