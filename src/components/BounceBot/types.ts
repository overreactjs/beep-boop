import { StateFunction as _StateFunction, StateMachine as _StateMachine } from "@overreact/engine";
import { BounceBotState } from "../../state";
import { EnemyStates } from "../../types";

export type States = EnemyStates | 'idle' | 'jumping';

export type StateFunction = _StateFunction<States, BounceBotState>;

export type StateMachine = _StateMachine<States, BounceBotState>;
