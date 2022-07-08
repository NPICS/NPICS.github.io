import React, {useEffect, useRef} from 'react';
import {
  updateARP,
  updateUSDTExchangeRate,
  updateBENDExchangeRate,
  fetchUser,
  // setIsLogin,
  clearUserData,
  fetchUser2, updateLoginState
} from 'store/app';
import {useAppDispatch} from 'store/hooks';
import Layout from './pages/Layout/index'
import {useAsync, useInterval} from "react-use";
import moment from "moment";
import {useWeb3React} from '@web3-react/core';
import {useUpdateEffect} from 'utils/hook';
import {notification} from 'antd';
import {SessionStorageKey} from 'utils/enums';
import {CHAIN_ID, injected} from 'connectors/hooks';
import ContentLoader from "react-content-loader";
import {useContract, useERC20Contract, useWETHContract} from "./hooks/useContract";

function App() {
  const action = useAppDispatch()
  const {account} = useWeb3React()
  const oldAccount = useRef<string | undefined | null>()

  const weth = useWETHContract()

  useEffect(() => {
    console.log(`Account Change => New: ${account}, Old: ${oldAccount.current}`)
    // changed account
    if (account && oldAccount.current) {
      // remove old account data
      sessionStorage.clear()
      // store new account
      sessionStorage.setItem(SessionStorageKey.WalletAuthorized, account)
      // fetch new account data
      action(clearUserData())
      action(fetchUser2())
      // make login false
      // action(setIsLogin(false))
      action(updateLoginState())
    }

    /// disconnect
    else if (oldAccount.current && !account) {
      console.log(`?????, ${oldAccount.current}, ${account}`)
      // remove all data
      sessionStorage.clear()
      // logout
      action(clearUserData())
      // action(setIsLogin(false))
      action(updateLoginState())
    }

    /// first connect
    else if (!oldAccount.current && account) {
      sessionStorage.setItem(SessionStorageKey.WalletAuthorized, account)
      action(fetchUser2())
    }

    // store old account
    oldAccount.current = account
  }, [account])

  useAsync(async () => {
    // let tx = await weth?.callStatic.transfer(`0xf26D94d535107A5e0c5a24f6Ce3eDCc8352f01e2`, 0)
  }, [])

  return <Layout/>;
}

export default App;
