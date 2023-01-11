import axios from "axios";
import React, { useState } from "react";


export default function AppFunctional(props) {
  const [konum, setKonum] = useState([3, 3]);
  const [hamleSayisi, setHamleSayisi] = useState(0);
  const [mesaj, setMesaj] = useState("");
  const [email, setEmail] = useState("");

  const konumAsIndex = (konum[1] - 1) * 5 + konum[0] - 1;

  function sagaGit() {
    if (konum[0] < 5) {
      setKonum([konum[0] + 1, konum[1]]);
      setHamleSayisi(hamleSayisi + 1);
    } else {
      setMesaj("Sağa gidemezsiniz.");
    }
  }

  function solaGit() {
    if (konum[0] > 1) {
      setKonum([konum[0] - 1, konum[1]]);
      setHamleSayisi(hamleSayisi + 1);
    } else {
      setMesaj("Sola gidemezsiniz.");
    }
  }

  function asagiGit() {
    if (konum[1] < 5) {
      setKonum([konum[0], konum[1] + 1]);
      //console.log(konum, konumAsIndex);
      setHamleSayisi(hamleSayisi + 1);
    } else {
      setMesaj("Aşağı gidemezsiniz.");
    }
  }

  function yukariGit() {
    if (konum[1] > 1) {
      setKonum([konum[0], konum[1] - 1]);
      setHamleSayisi(hamleSayisi + 1);
    } else {
      setMesaj("Yukarı gidemezsiniz.");
    }
  }

  function reset() {
    setKonum([3, 3]);
    setHamleSayisi(0);
    setMesaj("");
    setEmail("");
  }

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      x: konum[0],
      y: konum[1],
      steps: hamleSayisi,
      email: email,
    };
    console.log(payload);
    axios
      .post("http://localhost:9000/api/result", payload)
      .then((res) => {
        console.log(res.data);
        reset();
      })
      .catch((error) => {
        console.log("Hatalı payload", error);
      });
  };


  const yirmibes= []
  for( let i=0; i<=24 ; i++){
    yirmibes.push(i)
  }



  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar ({konum.join(", ")})</h3>
        <h3 id="steps">{hamleSayisi} kere ilerlediniz</h3>
      </div>
      <div id="grid">
   {yirmibes.map((idx) => (
          <div
            key={idx}
            className={`square${idx === konumAsIndex ? " active" : ""}`}
          >
            {idx === konumAsIndex ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{mesaj}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={solaGit} data-testid="left-butt">
          SOL
        </button>
        <button id="up" onClick={yukariGit} data-testid="up-butt">
          YUKARI
        </button>
        <button id="right" onClick={sagaGit} data-testid="right-butt">
          SAĞ
        </button>
        <button id="down" onClick={asagiGit} data-testid="down-butt">
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          onChange={onChange}
          data-testid="email"
        ></input>
        <input id="submit" type="submit" data-testid="submit-button"></input>
      </form>
    </div>
  );
}