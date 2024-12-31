import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLenght] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (char) str += "!@#$%^&*~`_-=+";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, char, setPassword]);
  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    document.getElementById("myModal").classList.remove("hidden");
  }, [password]);
  useEffect(() => {
    passwordGenerator();
  }, [length, number, char, passwordGenerator]);
  const closeModal = () => {
    document.getElementById("myModal").classList.add("hidden");
  };
  const handleOK = () => {
    alert("You clicked OK!");
    closeModal(); // Close the modal after action
  };
  function handleCancel() {
    alert("You clicked Cancel!");
    closeModal(); // Close the modal after action
  }
  window.onclick = function (event) {
    var modal = document.getElementById("myModal");
    if (event.target === modal) {
      closeModal();
    }
  };
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 mb-8 rounded-md text-center justify-center"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPassword}
            className="bg-blue-700 text-white px-4 mx-1 w-auto h-9 shrink-0 rounded"
          >
            Copy
          </button>

          <div
            id="myModal"
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center hidden"
          >
            <div className="bg-white p-6 rounded-lg w-80">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
              <p className="text-center text-lg mb-4">
                Text Copeid to Clipboard..! Do You like our service.. Please
                Rate Us by clicking "Ok" or can by pressing "Cancel" leave{" "}
              </p>
              <div className="flex justify-around">
                <button
                  onClick={handleOK}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  OK
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLenght(e.target.value);
              }}
            />
            <label>Lenth : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={char}
              id="charInput"
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
