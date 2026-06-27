import React, { useRef, useState, useEffect } from 'react'
import { useSong } from '../../home/hooks/useSong'
import { useAuth } from '../../auth/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import './player.scss'

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2]

const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00'
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
}

const Player = () => {
    const { song, favorites, handleToggleFavorite } = useSong()
    const { user } = useAuth()
    const navigate = useNavigate()

    const audioRef = useRef(null)
    const progressRef = useRef(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [speed, setSpeed] = useState(1)
    const [volume, setVolume] = useState(1)
    const [showSpeed, setShowSpeed] = useState(false)
    const [isMuted, setIsMuted] = useState(false)

    // Reset player and play when song changes
    useEffect(() => {
        if (audioRef.current && song?.url) {
            audioRef.current.load()
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(err => console.log("Playback error: ", err))
            setCurrentTime(0)
        }
    }, [song?.url])

    const togglePlay = () => {
        const audio = audioRef.current
        if (!audio) return
        if (isPlaying) {
            audio.pause()
        } else {
            audio.play()
        }
        setIsPlaying(!isPlaying)
    }

    const skip = (secs) => {
        const audio = audioRef.current
        if (!audio) return
        audio.currentTime = Math.min(Math.max(audio.currentTime + secs, 0), duration)
    }

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime)
    }

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration)
    }

    const handleProgressClick = (e) => {
        const bar = progressRef.current
        const rect = bar.getBoundingClientRect()
        const ratio = (e.clientX - rect.left) / rect.width
        const newTime = ratio * duration
        audioRef.current.currentTime = newTime
        setCurrentTime(newTime)
    }

    const handleSpeedChange = (s) => {
        setSpeed(s)
        audioRef.current.playbackRate = s
        setShowSpeed(false)
    }

    const handleVolume = (e) => {
        const val = parseFloat(e.target.value)
        setVolume(val)
        audioRef.current.volume = val
        setIsMuted(val === 0)
    }

    const toggleMute = () => {
        const audio = audioRef.current
        if (isMuted) {
            audio.volume = volume || 0.5
            setIsMuted(false)
        } else {
            audio.volume = 0
            setIsMuted(true)
        }
    }

    const handleSongEnd = () => {
        setIsPlaying(false)
        setCurrentTime(0)
    }

    const isSongFavorited = (songId) => {
        return favorites.some((fav) => fav._id === songId)
    }

    const handleFavoriteClick = async (e, songId) => {
        e.stopPropagation()
        if (!user) {
            navigate("/login")
            return
        }
        await handleToggleFavorite(songId)
    }

    const progress = duration ? (currentTime / duration) * 100 : 0

    if (!song) return null

    return (
        <div className="player">
            <audio
                ref={audioRef}
                src={song.url}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleSongEnd}
            />

            {/* Left Column: Song Details + Favorite */}
            <div className="player__left">
                <img
                    className="player__poster"
                    src={song.posterUrl}
                    alt={song.title}
                    onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300";
                    }}
                />
                <div className="player__meta">
                    <p className="player__title" title={song.title}>{song.title}</p>
                    <span className="player__mood">{song.mood}</span>
                </div>
                <button
                    className={`player__favorite-btn ${isSongFavorited(song._id) ? 'favorited' : ''}`}
                    onClick={(e) => handleFavoriteClick(e, song._id)}
                    title={isSongFavorited(song._id) ? "Remove from Favorites" : "Add to Favorites"}
                >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </button>
            </div>

            {/* Center Column: Playback Controls & Progress Bar */}
            <div className="player__center">
                <div className="player__controls">
                    {/* Shuffle Icon (Mock) */}
                    <button className="player__btn player__btn--meta" title="Shuffle">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>
                        </svg>
                    </button>

                    {/* Skip Back 5s */}
                    <button className="player__btn player__btn--skip" onClick={() => skip(-5)} title="Back 5s">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/>
                        </svg>
                    </button>

                    {/* Play / Pause */}
                    <button className="player__btn player__btn--play" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
                        {isPlaying ? (
                            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                                <rect x="6" y="4" width="4" height="16" rx="1"/>
                                <rect x="14" y="4" width="4" height="16" rx="1"/>
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                                <path d="M8 5.14v14l11-7-11-7z"/>
                            </svg>
                        )}
                    </button>

                    {/* Skip Forward 5s */}
                    <button className="player__btn player__btn--skip" onClick={() => skip(5)} title="Forward 5s">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <path d="M13 17l5-5-5-5M6 17l5-5-5-5"/>
                        </svg>
                    </button>

                    {/* Repeat Icon (Mock) */}
                    <button className="player__btn player__btn--meta" title="Repeat">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/>
                        </svg>
                    </button>
                </div>

                <div className="player__progress-wrap">
                    <span className="player__time">{formatTime(currentTime)}</span>
                    <div
                        className="player__progress"
                        ref={progressRef}
                        onClick={handleProgressClick}
                    >
                        <div className="player__progress-fill" style={{ width: `${progress}%` }} />
                        <div className="player__progress-thumb" style={{ left: `${progress}%` }} />
                    </div>
                    <span className="player__time">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Right Column: Speed & Volume */}
            <div className="player__right">
                {/* Speed picker */}
                <div className="player__speed-wrap">
                    <button
                        className="player__btn player__btn--speed"
                        onClick={() => setShowSpeed(!showSpeed)}
                        title="Playback speed"
                    >
                        {speed}×
                    </button>
                    {showSpeed && (
                        <div className="player__speed-menu">
                            {SPEED_OPTIONS.map((s) => (
                                <button
                                    key={s}
                                    className={`player__speed-option ${s === speed ? 'active' : ''}`}
                                    onClick={() => handleSpeedChange(s)}
                                >
                                    {s}×
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Volume */}
                <div className="player__volume">
                    <button className="player__btn player__btn--vol" onClick={toggleMute} title="Mute">
                        {isMuted || volume === 0 ? (
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.87 8.87 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18L19 19.27 20.27 18 5.27 3 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                            </svg>
                        )}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolume}
                        className="player__volume-slider"
                    />
                </div>
            </div>
        </div> 
    )
}

export default Player