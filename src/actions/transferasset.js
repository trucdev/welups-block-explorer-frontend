import Asset from "../api/asset";
import { notification } from "antd";
import { API_ADDR } from "../config/config";

export const TRANSFER_NONE = "TRANSFER_NONE";
export const TRANSFER_REQUESTING = "TRANSFER_REQUESTING";
export const TRANSFER_SUCCESS = "TRANSFER_SUCCESS";
export const TRANSFER_FAIL = "TRANSFER_FAIL";
export function reset() {
  return {
    type: TRANSFER_NONE,
  };
}
export function request() {
  return {
    type: TRANSFER_REQUESTING,
  };
}
export function success(tranID) {
  return {
    type: TRANSFER_SUCCESS,
    payload: {
      tranID: tranID,
    },
  };
}
export function fail(tranID) {
  return {
    type: TRANSFER_FAIL,
    payload: {
      tranID: tranID,
    },
  };
}

export function transferAsset(fromPrivKey, to, amount, assetName) {
  return async (dispatch) => {
    dispatch(request());
    const res1 = await Asset.transfer(fromPrivKey, to, amount, assetName);
    if (!res1.result) {
      dispatch(fail());
      notification.error({
        message: "Failed!",
        description: `Transfer has failed`,
      });
      return;
    }
    let flag = false;
    let timer;
    function checkTransactionStatus() {
      if (flag) {
        clearInterval(timer);
        return;
      }
      fetch(`${API_ADDR}/transactions/${res1.tranID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      })
        .then((res) => res.json())
        .then((res) => {
          if(res.status&&res.status==="success"){
            if (res.data.ret && res.data.ret === "SUCESS") {
              dispatch(success(res1.tranID));
            } else {
              dispatch(fail(res1.tranID));
            }
            flag = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    timer = setInterval(checkTransactionStatus, 6000);
  };
}

export const TRANSFER_TOKENS_INIT = "TRANSFER_TOKENS_INIT";
export const TRANSFER_TOKENS_UPDATE = "TRANSFER_TOKENS_UPDATE";

export function initTokens() {
  return {
    type: TRANSFER_TOKENS_INIT,
  };
}
export function updateTokens(tokens) {
  return {
    type: TRANSFER_TOKENS_UPDATE,
    payload: tokens,
  };
}

export function loadTokens(offset, limit) {
  return (dispatch) => {
    fetch(`${API_ADDR}/assets?offset=${offset}&limit=${limit}`, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(updatePageTokensTotal(res.data.total_assets));
          const tokens = res.data.result.map(item => {
            const token = item.abbr;
            return token;
          })
        dispatch(updateTokens(tokens ? tokens : []));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export const TRANSFER_PAGE_TOKENS_INIT = "TRANSFER_PAGE_TOKENS_INIT";
export const TRANSFER_PAGE_TOKENS_UPDATE = "TRANSFER_PAGE_TOKENS_UPDATE";
export const TRANSFER_PAGE_TOKENS_TOTAL_UPDATE =
  "TRANSFER_PAGE_TOKENS_TOTAL_UPDATE";

export function initPageTokens() {
  return {
    type: TRANSFER_PAGE_TOKENS_INIT,
  };
}
export function updatePageTokens() {
  return {
    type: TRANSFER_PAGE_TOKENS_UPDATE,
  };
}

export function updatePageTokensTotal(total) {
  return {
    type: TRANSFER_PAGE_TOKENS_TOTAL_UPDATE,
    payload: total,
  };
}
