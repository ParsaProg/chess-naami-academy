import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress } from 'react-icons/fa';
import { MdForward10, MdReplay10 } from 'react-icons/md';

export default function ModernVideoPlayer({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTime = (Number(e.target.value) / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    
    if (!isFullscreen) {
      playerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
    
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!videoRef.current) return;

      switch (e.key) {
        case ' ':
          togglePlay();
          break;
        case 'm':
          toggleMute();
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'ArrowRight':
          videoRef.current.currentTime -= 10;
          break;
        case 'ArrowLeft':
          videoRef.current.currentTime += 10;
          break;
        case 'ArrowUp':
          setVolume(prev => Math.min(prev + 0.1, 1));
          break;
        case 'ArrowDown':
          setVolume(prev => Math.max(prev - 0.1, 0));
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted, isFullscreen]);

  useEffect(() => {
    if (!isPlaying) {
      setShowControls(true);
      return;
    }

    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);

    controlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => {
      if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    };
  }, [isPlaying, isHovered, currentTime]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <motion.div
      ref={playerRef}
      className="relative bg-black rounded-b-lg overflow-hidden w-full mx-auto"
      dir="rtl"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => {
        setIsHovered(true);
        setShowControls(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={() => {
        setShowControls(true);
        if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
      }}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full cursor-pointer"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
            videoRef.current.volume = volume;
          }
        }}
        onEnded={() => setIsPlaying(false)}
      />

      <AnimatePresence>
        {(showControls || !isPlaying) && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Progress Bar با استایل RTL */}
            <div className="mb-3 w-full relative">
              <input
                type="range"
                dir='rtl'
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1.5 bg-gray-600 rounded-full appearance-none cursor-pointer ltr-range"
                style={{
                  background: `linear-gradient(to left, #3b82f6 ${progress}%, #4b5563 ${progress}%)`
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 space-x-reverse">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label={isPlaying ? 'توقف' : 'پخش'}
                >
                  {isPlaying ? (
                    <FaPause className="w-5 h-5" />
                  ) : (
                    <FaPlay className="w-5 h-5" />
                  )}
                </button>

                <button
                  onClick={() => {
                    if (videoRef.current) videoRef.current.currentTime += 10;
                  }}
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label="عقب‌گرد ۱۰ ثانیه"
                >
                  <MdReplay10 className="w-6 h-6" />
                </button>
                <button
                  onClick={() => {
                    if (videoRef.current) videoRef.current.currentTime -= 10;
                  }}
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label="جلوبردن ۱۰ ثانیه"
                >
                  <MdForward10 className="w-6 h-6" />
                </button>

                <div className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="flex items-center">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-gray-300 transition-colors ml-2"
                    aria-label={isMuted ? 'صدا دار' : 'بی‌صدا'}
                  >
                    {isMuted || volume === 0 ? (
                      <FaVolumeMute className="w-5 h-5" />
                    ) : (
                      <FaVolumeUp className="w-5 h-5" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    dir='ltr'
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1.5 bg-gray-600 rounded-full appearance-none cursor-pointer rtl-range"
                    style={{
                      background: `linear-gradient(to left, #3b82f6 ${volume * 100}%, #4b5563 ${volume * 100}%)`
                    }}
                  />
                </div>

                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label={isFullscreen ? 'خروج از تمام‌صفحه' : 'تمام‌صفحه'}
                >
                  {isFullscreen ? (
                    <FaCompress className="w-5 h-5" />
                  ) : (
                    <FaExpand className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isPlaying && (
        <motion.button
          className="absolute inset-0 m-auto w-16 h-16 bg-black/50 rounded-full flex items-center justify-center text-white"
          onClick={togglePlay}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          aria-label="پخش"
        >
          <FaPlay className="w-8 h-8 mr-1" />
        </motion.button>
      )}

      {/* استایل های سفارشی برای RTL */}
      <style jsx global>{`
        .rtl-range {
          direction: rtl;
        }
        .rtl-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
        }
      `}</style>
    </motion.div>
  );
}