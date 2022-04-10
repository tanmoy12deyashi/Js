// import react hooks
import { useEffect, useState } from 'react';

// set prefix
const PREFIX = 'tmd-chat-app-';

// export local storage function
export default function useLocalStorage(key, initialValue) {
  // set local storage key
  const prefixedKey = PREFIX + key;

  // use state hooks
  const [value, setValue] = useState(() => {
    // get local storage value
    const jsonValue = localStorage.getItem(prefixedKey);

    // check local storage value
    if (jsonValue != null) return JSON.parse(jsonValue);

    // check initial value
    if (typeof initialValue === 'function') return initialValue();
    else return initialValue;
  });

  // use effect hooks
  useEffect(() => {
    // update local storage
    //localStorage.setItem("tmd-chat-app-isReady", true);

    // set value into local storage
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  // return state
  return [value, setValue]
}
