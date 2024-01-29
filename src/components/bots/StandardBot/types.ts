import { EnemyState } from "../../../state";
import { StateBehaviour as _StateBehaviour, StateMachine as _StateMachine } from "../../../utils";

export type States = 'idle' | 'falling' | 'jumping' | 'patrol' | 'thinking' | 'stunned';

export type StateBehaviour = _StateBehaviour<States, EnemyState>;

export type StateMachine = _StateMachine<States, EnemyState>;
