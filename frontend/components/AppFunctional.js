import axios from "axios";
import React, { useState } from "react";

//(y-1)*3+(x-1)

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.

  //1)konumu state'te tuttum.
  const [konum, setKonum] = useState([2, 2]);

  //2hamle sayısını tutmak için ikinci state

  const [hamleSayisi, setHamleSayisi] = useState(0);

  //hata mesajı için;
  const [mesaj, setMesaj] = useState("");
  const [email, setEmail] = useState("");

  const konumAsIndex = (konum[1] - 1) * 3 + konum[0] - 1;
  console.log(konum, konumAsIndex);

  function sagaGit() {
    if (konum[0] < 3) {
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
    if (konum[1] < 3) {
      setKonum([konum[0], konum[1] + 1]);
      setHamleSayisi(hamleSayisi + 1);
    } else {
      setMesaj("aşağı gidemezsiniz");
    }
  }

  function yukariGit() {
    if (konum[1] > 1) {
      setKonum([konum[0], konum[1] - 1]);
      setHamleSayisi(hamleSayisi + 1);
    } else {
      setMesaj("yukarı gidemezsiniz");
    }
  }

  function reset() {
    setKonum([2, 2]);
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

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        {console.log(konum)}
        <h3 id="coordinates">Koordinatlar ({konum.join(", ")})</h3>
        <h3 id="steps">{hamleSayisi} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
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
        <button id="left" onClick={solaGit} data-testid="left-button">
          SOL
        </button>
        <button id="up" onClick={yukariGit} data-testid="up-button">
          YUKARI
        </button>
        <button id="right" onClick={sagaGit} data-testid="right-button">
          SAĞ
        </button>
        <button id="down" onClick={asagiGit} data-testid="down-button">
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
          data-testid="email-input"
        ></input>
        <input id="submit" type="submit" data-testid="submit-button"></input>
      </form>
    </div>
  );
}
