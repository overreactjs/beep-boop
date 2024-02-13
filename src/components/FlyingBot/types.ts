import { StateFunction as _StateFunction, StateMachine as _StateMachine } from "@overreact/engine";
import { EnemyState } from "../../state";
import { EnemyStates } from "../../types";

export type States = EnemyStates | 'idle' | 'patrol';

export type StateFunction = _StateFunction<States, EnemyState>;

export type StateMachine = _StateMachine<States, EnemyState>;
