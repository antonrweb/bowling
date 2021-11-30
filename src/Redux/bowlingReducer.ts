import {InferActions} from "./Redux";


interface frame {
    score: Array<number> | any,
    countKnocks: number,
}

const initialState = {
    frames: [] as Array<frame>,
    currentFrame: 1,
    currentPins: 10,
    totalScore: 0,
    countStrikes: 1,
    spare: 0,
    currentKnockScore: [] as Array<number>,
    currentCountKnocks: 0,
    gameOver: false,
    isStarted: false,
}
const maxKnock = 2

type initialStateType = typeof initialState

const KNOCKPINS = 'KNOCK-PINS'
const GAMESTART = 'GAME-START'
const TRYAGAIN = 'TRY-AGAIN'

export const bowlingReducer = (state: initialStateType = initialState, action: actions): initialStateType => {
    switch (action.type) {
        case KNOCKPINS:
            const spare = action.payload < 10 && state.spare !== 2 ? ++state.spare : 2
            const currentKnockScore = [...state.currentKnockScore, action.payload]
            const currentCountKnocks = ++state.currentCountKnocks
            const bonusGame = action.payload === 10 ? 11 : 10
            let gameOver = state.currentFrame === bonusGame && spare === 2 ? true : false
            if (state.currentFrame === 11) {
                gameOver = state.currentFrame + 1 === 12 ? true : false
            }

            return {
                ...state,
                currentCountKnocks: spare !== maxKnock ? currentCountKnocks : 0,
                frames: spare === maxKnock
                    ?
                    [...state.frames, {
                        score: currentKnockScore,
                        countKnocks: currentCountKnocks
                    }]
                    :
                    [...state.frames],
                currentFrame: spare === maxKnock || state.currentPins === 0
                    ?
                    ++state.currentFrame
                    :
                    state.currentFrame,
                spare: action.payload < 10 && spare !== maxKnock ? ++state.spare : 0,
                totalScore: state.countStrikes > 0 && action.payload === 10
                    ?
                    action.payload * state.countStrikes + state.totalScore
                    :
                    action.payload + state.totalScore,
                countStrikes: action.payload === 10
                    ?
                    state.countStrikes < 3
                        ?
                        ++state.countStrikes
                        :
                        state.countStrikes
                    :
                    1,
                currentPins: action.payload < 10 && spare !== maxKnock
                    ?
                    state.currentPins - action.payload
                    :
                    10,
                currentKnockScore: spare !== maxKnock
                    ?
                    [...state.currentKnockScore, action.payload]
                    :
                    [],
                gameOver
            }
        case GAMESTART:
            return {
                ...state,
                isStarted: true,
            }
        case TRYAGAIN:
            return {
                ...state,
                ...initialState,
                gameOver: false,
                isStarted: true,
            }
        default:
            return state
    }
}

type actions = InferActions<typeof actions>

export const actions = {
    knockPinsAC(payload: number) {
        return {
            type: KNOCKPINS,
            payload
        } as const
    },
    gameStartAC() {
        return {
            type: GAMESTART,
        } as const
    },
    tryAgain() {
        return {
            type: TRYAGAIN,
        } as const
    }
}
