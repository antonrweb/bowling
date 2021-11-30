import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";

import {actions} from "./Redux/bowlingReducer";
import {AppState} from "./Redux/Redux";

import pinsImage from './assets/kegles.png'

const Container = styled.div`
  margin: 0 auto;
  width: 1080px;
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: ${window.innerHeight}px;
`
const Header = styled.header`
  justify-content: center;
  display: flex;
`
const Main = styled.main`
  display: flex;
  flex-direction: column;
`
const ScoreBoard = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  height: 100px;
  padding: 10px;
  width: 200px;
  border: 2px solid black;
  border-radius: 10px;
  box-shadow: 2px 2px 2px grey;
  text-align: center;
`

const Stage = styled.div`
`
const Score = styled.div`
`
const CurrentScore = styled.div`
`
const Footer = styled.footer`
  height: 100px;
  text-align: end;
`
const BowlingAlley = styled.div`
  text-align: center;
`
const Pins = styled.img`
  width: 150px;
  height: 150px;
`

const Frames = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  column-gap: 15px;
  align-items: center;
`

const Frame = styled.span`
  padding: 25px;
  border: 2px solid grey;
  border-radius: 30%;
  box-shadow: 2px 2px 2px grey;
  font-size: 20px;
`

const Button = styled.button`
  padding: 15px;
  width: 150px;
  font-size: 16px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 2px 2px 2px grey;
`

const ButtonKnock = styled.button`
  padding: 15px;
  width: 150px;
  font-size: 16px;
  color: white;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 2px 2px 2px grey;
  background-color: red;
`

const Buttons = styled.div`
  justify-content: center;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  margin-bottom: 25px;
`

const Range = styled.div`
  width: 400px;
`

const StartGame = styled.button`
  padding: 15px;
  width: 150px;
  font-size: 16px;
  color: white;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 2px 2px 2px grey;
  background-color: green;
`

const Finished = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${window.innerHeight}px;
  flex-direction: column;
  row-gap: 15px;
  font-size: 20px;
`

function App() {

  const dispatch = useDispatch()

  const bowlingAlley = useSelector((state: AppState) => state)

  const [countPins, setCountPins] = useState(0)

  useEffect(() => {
    setCountPins(bowlingAlley.currentPins)
  }, [bowlingAlley.currentPins])

  const randomSkittles = () => {
    setCountPins(Math.floor(Math.random() * bowlingAlley.currentPins + 1))
  }
  const strike = () => {
    if (bowlingAlley.currentPins === 10) {
      setCountPins(10)
    }

  }

  const startGame = () => dispatch(actions.gameStartAC())

  const knockPins = () => {
    dispatch(actions.knockPinsAC(countPins))
  }
  const tryAgain = () => {
    dispatch(actions.tryAgain())
  }

  if (bowlingAlley.gameOver) {
    return <Finished>
      Total score: {bowlingAlley.totalScore}
      <div>
        <StartGame onClick={tryAgain}>Try again</StartGame>
      </div>
    </Finished>
  }

  return (
    <Container>
      <Header>
        <h1>Bowling</h1>
      </Header>
      {bowlingAlley.isStarted ?
        <Main>
          <ScoreBoard>
            <Stage>Frame:{bowlingAlley.currentFrame === 11 ? ' Bonus game' : bowlingAlley.currentFrame}</Stage>
            <Score>Score:{bowlingAlley.totalScore}</Score>
            {bowlingAlley.currentKnockScore.length > 0 &&
            <CurrentScore>CurrentKnock:{bowlingAlley.currentKnockScore}</CurrentScore>}
          </ScoreBoard>
          <BowlingAlley>
            <Pins src={pinsImage}/>
            {bowlingAlley.currentPins}
          </BowlingAlley>
          <Range>
            <input
              type='range'
              value={countPins}
              min='0'
              max={bowlingAlley.currentPins}
              onChange={(e) => setCountPins(Number(e.target.value))}
            />
            {countPins}
          </Range>
          <Buttons>
            <Button onClick={randomSkittles}>Random</Button>
            <Button disabled={bowlingAlley.currentPins !== 10} onClick={strike}>Strike</Button>
            <ButtonKnock onClick={knockPins}>Knock pins</ButtonKnock>
          </Buttons>
          <Frames>
            {bowlingAlley.frames.map(frame => {
              return (
                <Frame>
                            <span>
                                {frame.score[0]}
                            </span>
                  {frame.score[0] !== 10 && `|`}
                  <span>
                                {frame.score[1]}
                            </span>
                </Frame>
              )
            })}
          </Frames>
        </Main>
        :
        <Buttons>
          <StartGame onClick={startGame}>Start game</StartGame>
        </Buttons>
      }
      <Footer>
        <h3>Justice-it</h3>
      </Footer>
    </Container>
  );
}

export default App;
