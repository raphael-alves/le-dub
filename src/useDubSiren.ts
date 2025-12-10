import { useCallback, useEffect, useRef } from 'react';

declare global {
	interface Window {
		webkitAudioContext: typeof AudioContext;
	}
}

export interface SirenOptions {
	depth: number;
	duration: number;
	frequency: number;
	speed: number;
	type: OscillatorType;
}

const DEFAULT_OPTIONS: SirenOptions = {
	depth: 200,
	duration: 0.6,
	frequency: 750,
	speed: 12,
	type: 'square',
};

export const useDubSiren = () => {
	const audioCtxRef = useRef<AudioContext | null>(null);

	useEffect(() => {
		if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
			return;
		}

		try {
			const AudioContextClass = window.AudioContext || window.webkitAudioContext;

			if (!AudioContextClass) {
				console.error('Web Audio API not supported.');
				return;
			}

			audioCtxRef.current = new AudioContextClass();
		} catch (error) {
			console.error('Could not create AudioContext: ', error);
		}

		return () => {
			if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
				audioCtxRef.current.close().catch(console.error);
				audioCtxRef.current = null;
			}
		};
	}, []);

	const triggerSiren = useCallback((options?: Partial<SirenOptions>): void => {
		const ctx = audioCtxRef.current;

		if (!ctx || ctx.state === 'closed') {
			console.warn('AudioContext is missing or closed.');

			return;
		}

		const { depth, duration, frequency, speed, type } = {
			...DEFAULT_OPTIONS,
			...options,
		};

		if (ctx.state === 'suspended') {
			ctx.resume().catch(console.error);
		}

		if (duration <= 0.1) {
			return;
		}

		const now = ctx.currentTime;

		const mainOsc = ctx.createOscillator();
		mainOsc.type = type;
		mainOsc.frequency.setValueAtTime(frequency, now);

		const lfo = ctx.createOscillator();
		lfo.type = 'triangle';
		lfo.frequency.setValueAtTime(speed, now);

		const mainGain = ctx.createGain();
		const lfoGain = ctx.createGain();

		lfo.connect(lfoGain);
		lfoGain.gain.setValueAtTime(depth, now);
		lfoGain.connect(mainOsc.frequency);

		mainOsc.connect(mainGain);
		mainGain.connect(ctx.destination);

		mainGain.gain.setValueAtTime(0, now);
		mainGain.gain.linearRampToValueAtTime(0.3, now + 0.05);
		mainGain.gain.linearRampToValueAtTime(0, now + duration);

		lfo.start(now);
		mainOsc.start(now);

		const stopTime = now + duration + 0.1;
		mainOsc.stop(stopTime);
		lfo.stop(stopTime);

		mainOsc.onended = (): void => {
			try {
				mainOsc.disconnect();
				mainGain.disconnect();
				lfo.disconnect();
				lfoGain.disconnect();
			} catch (e) {
				console.error(e);
			}
		};
	}, []);

	return triggerSiren;
};
