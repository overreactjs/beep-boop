import { EnemyState } from "../../../state";
import { StateMachine as _StateMachine } from "../../../utils";

export type States = 'idle' | 'falling' | 'patrol';

export type StateMachine = _StateMachine<States, EnemyState>;
