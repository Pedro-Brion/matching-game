import { writable } from 'svelte/store';

export enum State {
  Ready = 'ready',
  Playing  = 'playing',
  GameOver = 'gameover'
}
type GameState = State.Playing | State.Ready | State.GameOver;

export enum ActionType {
  Click = 'click',
  Esc = 'esc',
}

export type Action = {
  type:ActionType,
  data:Object,
}

export const useState = (game)=>{
  const state =  writable<GameState>(State.Ready)

  const send = (event: Action) =>{
    state.update(()=> game(state, event))
  }
  return { state, send}
}