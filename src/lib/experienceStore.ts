"use client";

export type ExperienceState = 'LOADING' | 'INTRO' | 'INTERACTIVE' | 'BUILDUP' | 'REVEALED';

class ExperienceStore {
  private _state: ExperienceState = 'LOADING';
  private _energy = 0;
  private listeners = new Set<() => void>();

  constructor() {
    // No-op for SSR safety
  }

  public get state(): ExperienceState {
    return this._state;
  }

  public set state(val: ExperienceState) {
    if (this._state !== val) {
      this._state = val;
      this.emit();
    }
  }

  public get energy(): number {
    return this._energy;
  }

  public set energy(val: number) {
    const clamped = Math.max(0, Math.min(1, val));
    if (this._energy !== clamped) {
      this._energy = clamped;
      this.emit();
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit() {
    this.listeners.forEach((l) => l());
  }

  // Helper helper to reset
  public reset() {
    this._state = 'LOADING';
    this._energy = 0;
    this.emit();
  }
}

export const experienceStore = new ExperienceStore();

import { useState, useEffect } from "react";

export function useExperience() {
  const [state, setState] = useState<ExperienceState>(() => experienceStore.state);
  const [energy, setEnergy] = useState(() => experienceStore.energy);

  useEffect(() => {
    setState(experienceStore.state);
    setEnergy(experienceStore.energy);
    
    const unsub = experienceStore.subscribe(() => {
      setState(experienceStore.state);
      setEnergy(experienceStore.energy);
    });
    return unsub;
  }, []);

  return {
    state,
    energy,
    setState: (s: ExperienceState) => { experienceStore.state = s; },
    setEnergy: (e: number) => { experienceStore.energy = e; }
  };
}

export default experienceStore;
