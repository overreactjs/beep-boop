export type SoundEffectConfig = {
  url: string;
  volume: number;
};

export type SoundEffect =
  | 'Explosion'
  | 'Fireball'
  | 'MenuNavigate'
  | 'MenuSelect'
  | 'PlayerCollect'
  | 'PlayerDeath'
  | 'PlayerFire'
  | 'PlayerJump'
  | 'PlayerKill'
  | 'Powerup'
  ;

