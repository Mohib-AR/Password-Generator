import "./index.css";
import { useEffect, useState, useCallback, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [text, setText] = useState("copy");
  const [password, setPassword] = useState("");
  const [charac, setCharac] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const passRef = useRef();
  let pass = "";

  // 1-Copying the Password

  function copyPassword() {
    console.log("object");
    setText((prev) => (prev == "copy" ? (prev = "copied") : (prev = "copy")));
    if (text == "copy") {
      window.navigator.clipboard.writeText(password);
      passRef.current.select();
    }
  }

  // 2-Generating the Password

  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (charac) str += "~!@#$%^&*()_-+=?><';{}|,./`";
    if (numbers) str += "1234567890";
    for (let i = 0; i < length; i++) {
      let ind = Math.floor(Math.random() * str.length);
      pass += str[ind];
    }
    setPassword(pass);
  }, [numbers, length, charac]);

  // 3-Calling the password when mounting and then when changes occur

  useEffect(passwordGenerator, [numbers, charac, length]);

  return (
    <>
      <div className="h-screen flex flex-col pt-36 items-center bg-gradient-to-r from-blue-500 to-purple-600">
        <p className="text-5xl font-bold text-white font-serif mb-8">
          PASSWORD GENERATOR
        </p>
        <div className="bg-neutral-800 p-8 rounded-lg shadow-lg w-3/4 max-w-lg">
          <input
            type="text"
            readOnly
            value={password}
            className="w-96 h-8 text-lg"
            ref={passRef}
          />
          <button
            className="py-1  px-3 bg-blue-700 text-lg text-white"
            onClick={copyPassword}
          >
            {text}
          </button>
          <div className="flex mt-8 space-x-4 text-lg">
            <div>
              <input
                type="range"
                onChange={(e) => setlength(e.target.value)}
                min={8}
                value={length}
                max={100}
              />
              <label className="text-white"> length {length}</label>
            </div>
            <div>
              <input
                type="checkbox"
                name=""
                id=""
                onChange={() => {
                  setNumbers((prev) => !prev);
                }}
              />
              <label className="text-white">Numbers is {numbers}</label>
            </div>
            <div>
              <input
                type="checkbox"
                name=""
                id=""
                onChange={() => setCharac(!charac)}
              />
              <label className="text-white">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
