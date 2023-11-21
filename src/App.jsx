import { useState } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import Navbar from './navbar';

function App() {
  const [length, setlength] = useState(8);
  const [allownumber, setallownumber] = useState(false);
  const [allowchar, setallowchar] = useState(false);
  const [Password, setPassword] = useState('');
  const passwordref = useRef(null);

  const passwordgeneraotr = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (allowchar) {
      str += '!@#$%^&*/;:';
    }
    if (allownumber) {
      str += '0123456789';
    }
    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [allowchar, allownumber, length, setPassword]);

  const copytoclipboard = useCallback(() => {
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  useEffect(() => {
    passwordgeneraotr();
  }, [allowchar, allownumber, length, passwordgeneraotr]);

  return (
    <>
      <Navbar />
      <div className=" w-full font-code  max-w-4xl mx-auto  shadow-md shadow-blue-500/50 rounded-lg px-4 py-6 my-52  text-yellow-900 bg-gray-950">
        <h1 className=" text-yellow-900 my-5 text-3xl text-center">
          Password Generator
        </h1>
        <div className="flex shadow-lg rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Password}
            placeholder="Password"
            readOnly
            ref={passwordref}
            className="outline-none w-full py-1 text-2xl px-3 "
          />
          <button
            className="py-2 px-3 bg-blue-500 hover:bg-blue-900 hover:text-white
           "
            onClick={copytoclipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex mx-9 text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              className="cursor-pointer"
              min={6}
              max={100}
              value={length}
              onChange={(e) => {
                setlength(e.target.value);
              }}
              name="range"
            />
            <label htmlFor="range">Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1 ">
            <input
              type="checkbox"
              name="number"
              defaultChecked={allownumber}
              id="number-input"
              onChange={() => {
                setallownumber((prev) => !prev);
              }}
            />
            <label htmlFor="number">numbers</label>
          </div>
          <div className="flex items-center gap-x-1 ">
            <input
              type="checkbox"
              name="charecter"
              defaultChecked={allowchar}
              id="char-allowed"
              onChange={() => {
                setallowchar((prev) => !prev);
              }}
            />
            <label htmlFor="charecter">charecter</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
