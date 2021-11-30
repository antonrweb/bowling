import { createStore } from 'redux'
import {bowlingReducer} from "./bowlingReducer";





const store = createStore(bowlingReducer)

type reducer = typeof bowlingReducer
export type AppState = ReturnType<reducer>

type ActionTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActions<T extends {[key:string]:(...args:any[])=>any}> = ReturnType<ActionTypes<T>>

export default store