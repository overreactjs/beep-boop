import { StateFunction as _StateFunction, StateMachine as _StateMachine } from "@overreact/engine";
import { EnemyState } from "../../../state";
import { BaseEnemyStates } from "../../../types";

export type States = BaseEnemyStates | 'idle' | 'falling' | 'jumping' | 'patrol' | 'thinking';

export type StateFunction = _StateFunction<States, EnemyState>;

export type StateMachine = _StateMachine<States, EnemyState>;
