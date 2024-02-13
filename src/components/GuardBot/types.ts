import { StateFunction as _StateFunction, StateMachine as _StateMachine } from "@overreact/engine";
import { GuardBotState } from "../../state";
import { EnemyStates } from "../../types";

export type States = EnemyStates | 'idle' | 'falling' | 'jumping' | 'patrol' | 'thinking';

export type StateFunction = _StateFunction<States, GuardBotState>;

export type StateMachine = _StateMachine<States, GuardBotState>;
