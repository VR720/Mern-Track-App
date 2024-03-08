import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState("");

  useEffect(() => {
    getTransactions().then((transactions) => {
      setTransactions(transactions);
      console.log(transactions);
    });
  }, []);

  async function getTransactions() {
    const url = `${window.location.origin}/api/transactions`;
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = `${window.location.origin}/api/transactions`;
    const price = name.split(" ")[0];
    // console.log(url);
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description,
        datetime,
      }),
    }).then((response) => {
      response.json().then((json) => {
        console.log("result", json);
      });
    });
  }

  let balance = 0;
  // console.log(balance);
  for (const transaction of transactions) {
    balance = balance + transaction.price;
    // console.log("all price", transaction.price);
  }
  // console.log(balance);

  balance = balance.toFixed(2);
  const fraction = balance.split(".")[1];
  balance = balance.split(".")[0];
  // console.log("balance", balance);

  return (
    <main>
      <h1>
        {balance}

        <span>{fraction}</span>
      </h1>
      <form action="" onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"price and name"}
          />
          <input
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            type="datetime-local"
          />
        </div>
        <div className="description">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={"description"}
          />
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        {transactions.length > 0 &&
          transactions.map((transaction, index) => (
            <div key={index} className="transaction">
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
              </div>
              <div className="right">
                {/* console.log(transaction.price); */}
                <div
                  className={
                    "price " + (transaction.price < 0 ? "red" : "green")
                  }
                >
                  {transaction.price}
                </div>
                <div className="datetime">{transaction.datetime}</div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default App;
