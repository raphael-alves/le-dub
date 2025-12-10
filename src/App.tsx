import { useMemo, useRef, useState } from 'react';

import './App.css';
import { useDubSiren, type SirenOptions } from './useDubSiren';
import BackgroundSoundSystem, { type BackgroundSoundSystemHandle } from './BackgroundSoundSystem';

const generateRandomParams = (): Partial<SirenOptions> => {
	const isSawtooth = Math.random() > 0.7;

	return {
		depth: Math.floor(Math.random() * 200) + 100, // 100 - 300
		duration: Math.random() * 0.5 + 0.4, // 0.4s - 0.9s
		frequency: Math.floor(Math.random() * 800) + 400, // 400Hz - 1200Hz
		speed: Math.floor(Math.random() * 20) + 5, // 5Hz - 25Hz
		type: isSawtooth ? ('sawtooth' as const) : ('square' as const),
	};
};

const getRandomSound = (): string => {
	const ids = [
		'jfioMpno9Rs',
		'4__LAkJI74Q',
		'DD8GIy-hNt8',
		'wanPNazQDOU',
		'1EIIn1rBfMk',
		'Y5COPMIz390',
		'7XbE4738l9k',
	];

	const randomIndex = Math.floor(Math.random() * ids.length);

	return ids[randomIndex];
};

function App() {
	const [isShake, setIsShake] = useState<boolean>(false);
	const [musicStarted, setMusicStarted] = useState<boolean>(false);
	const triggerSiren = useDubSiren();
	const soundSystemRef = useRef<BackgroundSoundSystemHandle>(null);

	const selectedSound = useMemo(() => getRandomSound(), []);

	const fireTheVibes = () => {
		triggerVisuals();
		triggerSiren(generateRandomParams());
	};

	const handleClick = (): void => {
		if (musicStarted) {
			fireTheVibes();
		}
	};

	const handleMusicStart = () => {
		if (!musicStarted) {
			setMusicStarted(true);
			fireTheVibes();
		}
	};

	const triggerVisuals = (): void => {
		setIsShake(true);
		setTimeout((): void => setIsShake(false), 500);
	};

	return (
		// biome-ignore lint/a11y/useSemanticElements: <It is done on purpose here>
		<div
			className='dub-container'
			onClick={handleClick}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					handleClick();
				}
			}}
			role='button'
			tabIndex={0}
		>
			<BackgroundSoundSystem
				isPlaying={musicStarted}
				onMusicStart={handleMusicStart}
				ref={soundSystemRef}
				startSeconds={12}
				videoId={selectedSound}
			/>

			<div className='scanlines'></div>

			<main className={isShake ? 'content-wrapper shake' : 'content-wrapper'}>
				<h1 className='main-title'>
					<span className='line-top rasta-red'>ON DIT</span>
					<br />
					<span className='line-middle'>
						<span className='rasta-gold'>LE</span>
					</span>
					<br />
					<span className='line-bottom rasta-green'>DUB.</span>
				</h1>

				<div className='subtitle-box'>
					<p className='subtitle'>Respecte le dub bordel.</p>
					<span className='lion-icon'>🦁🇯🇲🔊</span>
				</div>
			</main>

			<footer className='dub-footer'>
				<p>Clique pour le sound system</p>
			</footer>
		</div>
	);
}

export default App;
