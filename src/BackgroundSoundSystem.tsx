import React, {
	forwardRef,
	type ReactNode,
	type Ref,
	useEffect,
	useImperativeHandle,
	useRef,
} from 'react';
import type { YouTubeEvent, YouTubeProps } from 'react-youtube';
import YouTube from 'react-youtube';

export interface BackgroundSoundSystemHandle {
	play: () => void;
}

interface Props {
	videoId: string;
	onMusicStart: () => void;
	startSeconds?: number;
	isPlaying: boolean;
}

interface YouTubePlayer {
	unMute: () => void;
	setVolume: (volume: number) => void;
	playVideo: () => void;
}

const BackgroundSoundSystem = forwardRef(
	(props: Props, ref: Ref<BackgroundSoundSystemHandle>): ReactNode => {
		const { isPlaying, onMusicStart, startSeconds = 0, videoId } = props;
		const playerRef = useRef<YouTubePlayer | null>(null);

		useImperativeHandle(ref, () => ({
			play: () => {
				if (playerRef.current) {
					playerRef.current.unMute();
					playerRef.current.setVolume(60);
					playerRef.current.playVideo();
				}
			},
		}));

		const opts: YouTubeProps['opts'] = {
			height: '100%',
			width: '100%',
			playerVars: {
				autoplay: 0,
				controls: 0,
				fs: 0,
				modestbranding: 1,
				playInline: 1,
				rel: 0,
				start: startSeconds,
			},
		};

		useEffect(() => {
			if (isPlaying && playerRef.current) {
				playerRef.current.unMute();
				playerRef.current.setVolume(60);
				playerRef.current.playVideo();
			}
		}, [isPlaying]);

		const onPlay = () => {
			onMusicStart();
		};

		const onReady = (event: YouTubeEvent) => {
			playerRef.current = event.target;
		};

		const onEnd = (event: YouTubeEvent) => {
			event.target.seekTo(startSeconds);
			event.target.playVideo();
		};

		const containerStyle: React.CSSProperties = isPlaying
			? {
					opacity: 0,
					position: 'absolute',
					pointerEvents: 'none',
					zIndex: -100,
				}
			: {
					cursor: 'pointer',
					height: '100%',
					left: 0,
					opacity: 0.01,
					position: 'fixed',
					top: 0,
					width: '100%',
					zIndex: 100,
				};

		return (
			<div style={containerStyle}>
				<YouTube
					onEnd={onEnd}
					onError={(e) => console.error('YouTube Error:', e)}
					onPlay={onPlay}
					onReady={onReady}
					opts={opts}
					style={{ width: '100%', height: '100%' }}
					videoId={videoId}
				/>
			</div>
		);
	},
);

export default BackgroundSoundSystem;
