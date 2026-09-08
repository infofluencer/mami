"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { invitationConfig } from "@config";

interface MusicToggleProps {
  enabled: boolean;
}

/**
 * Floating play/pause (bottom-right).
 * Autoplay attempts after `enabled` becomes true (first user gesture).
 */
export default function MusicToggle({ enabled }: MusicToggleProps) {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const triedAutoplay = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const audio = new Audio(invitationConfig.assets.music);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!enabled || triedAutoplay.current || reduced) return;
    triedAutoplay.current = true;

    const audio = audioRef.current;
    if (!audio) return;

    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        /* Autoplay may still fail — user can tap the toggle */
        setPlaying(false);
      });
  }, [enabled, reduced]);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
        setError(false);
      }
    } catch {
      setError(true);
      setPlaying(false);
    }
  }, [playing]);

  if (!enabled) return null;

  return (
    <motion.button
      type="button"
      onClick={toggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: reduced ? 0 : 0.6 }}
      className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gold-hairline bg-ivory-light/92 shadow-card backdrop-blur-sm transition-colors hover:border-gold hover:bg-ivory"
      aria-label={playing ? "Müziği durdur" : "Müziği başlat"}
      title={
        error
          ? "Müzik dosyası bulunamadı — /public/assets/music.mp3 ekleyin"
          : undefined
      }
    >
      {playing ? (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-gold-dark"
          fill="currentColor"
          aria-hidden
        >
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-gold-dark"
          fill="currentColor"
          aria-hidden
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </motion.button>
  );
}
