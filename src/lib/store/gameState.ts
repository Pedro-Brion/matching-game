import { writable, type Writable } from "svelte/store";

export enum State {
  Ready = "ready",
  Playing = "playing",
  Matching = "matching",
  GameOver = "gameover",
  Paused = "paused",
}

export enum ActionType {
  Click = "click",
  KeyDown = "keydown",
  FinishedMatching = "finished",
}

export type Action = {
  type: ActionType;
  data?: any;
};

export const useState = (game: GameMachine) => {
  const state = writable<State>(State.Ready);

  const send = (event: Action) => {
    state.update((state) => game(state, event));
  };
  return { state, send };
};

export type GameMachine = (state: State, event: Action) => State;
