import { useState } from "react";
import styled, { keyframes } from "styled-components";

const Headline = styled.h2`
  font-size: 3em;
  text-align: center;
  color: greenyellow;
`;
const Subheadline = styled.h3`
  font-size: 1.6em;
  text-align: center;
`;

const Input = styled.input`
  border-radius: 20px;
  width: 20em;
  height: 5em;
`;
const Submitbutton = styled.button`
  height: 5em;
  border-color: darkturquoise;
  border-radius: 15px;
  width: 7em;
`;
const rotate = keyframes`
from {
  transform:rotate(0deg);
}
to{
  transform:rotate(360deg);
}
`;
const Rotation = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.5rem;
`;

export default function Home() {
  const [passwordName, setPasswordName] = useState("");
  const [passwordDoc, setpasswordDoc] = useState(null);
  const [secret, setSecret] = useState("");
  // const [background, setBackground] = useState(0);

  type Props = {
    value: string;
  };
  function calcColor(length: number): string {
    // setBackground(Math.floor(Math.random()) * 40);
    return `hsl(${
      (length * 120) / 10 < 120 ? (length * 120) / 10 : 120
    },100%,50%)`;
  }
  //  (length*120)/10 < 120                         ?                                 (length*120)/10         :           120
  //HauptBedingung    hinreichende Bedingung     Prüfung erst true dann false           true                  sonst       false

  const SafeInput = styled.input<Props>`
    background: ${(props) => calcColor(props.value.length)};
    animation: ${rotate} 2s linear infinite;
    border-radius: 20px;
  `;
  SafeInput;

  const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    justify-items: center;

    background-color: #555;
  `;

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await fetch(
      `http://localhost:3333/api/passwords/${passwordName}`
    );
    const passwordDoc = await result.json();
    setpasswordDoc(passwordDoc);
  }
  return (
    <Container>
      <Headline>Want to know your Password?</Headline>
      <Subheadline>Type your Password Name here!</Subheadline>
      <Rotation>🎉</Rotation>

      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          value={passwordName}
          onChange={(event) => setPasswordName(event.target.value)}
        />
        <SafeInput
          value={secret}
          onChange={(event) => setSecret(event.target.value)}
          type="password"
        />
        <Submitbutton type="submit">Send</Submitbutton>
      </form>

      {passwordDoc && (
        <div>
          {passwordDoc.name} {passwordDoc.value}
        </div>
      )}
    </Container>
  );
}

/**
 * Exercise
 * Change the background-color of the input based
 * on the length of the password
 * At a length of 0-4 it should be a red to orange
 * At a length of around 10 it should become green
 * It should never become blue, so stop at green
 */ //background-color: hsl(${background}, 100%, 50%);
