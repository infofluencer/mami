"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { invitationConfig } from "@config";

type Phase = "closed" | "playing" | "glow" | "fading" | "done";

interface EnvelopeProps {
  /** Mount main invitation under the video (start crossfade) */
  onOpenStart: () => void;
  /** Video overlay gone — unlock scroll / full interaction */
  onOpenComplete: () => void;
  onFirstInteraction: () => void;
}

const easeOut: Transition["ease"] = [0.22, 1, 0.36, 1];

function GlowParticles({ active }: { active: boolean }) {
  const { glowColors } = invitationConfig.openTransition;

  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        x: (i % 7) * 14 - 42 + (i % 3) * 4,
        delay: (i % 5) * 0.08,
        size: 3 + (i % 4),
        drift: 40 + (i % 6) * 18,
      })),
    []
  );

  if (!active) return null;

  return (
    <>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: p.size,
            height: p.size,
            marginLeft: p.x,
            background: glowColors.core,
            filter: "blur(1.5px)",
            boxShadow: `0 0 8px ${glowColors.mid}`,
          }}
          initial={{ opacity: 0, y: 0, scale: 0.4 }}
          animate={{
            opacity: [0, 0.9, 0],
            y: -p.drift,
            scale: [0.4, 1.2, 0.6],
            x: [p.id % 2 === 0 ? -8 : 8, p.id % 2 === 0 ? -20 : 20],
          }}
          transition={{
            duration: 1.1,
            delay: 0.25 + p.delay,
            ease: "easeOut",
          }}
          aria-hidden
        />
      ))}
    </>
  );
}

/**
 * Intro: poster → tap plays /davetiye.mp4 → near the end:
 * homepage fades in, davetiye fades out (same time).
 */
export default function Envelope({
  onOpenStart,
  onOpenComplete,
  onFirstInteraction,
}: EnvelopeProps) {
  const [phase, setPhase] = useState<Phase>("closed");
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const doneTimer = useRef<ReturnType<typeof setTimeout>>();
  const openingRef = useRef(false);
  const revealedRef = useRef(false);
  const fadingRef = useRef(false);
  const playWhenReadyRef = useRef(false);

  const { texts, assets, openTransition: ot } = invitationConfig;
  const videoSrc = assets.introVideo;
  const posterSrc = assets.introPoster;
  const fadeSec = ot.videoFadeSeconds;
  const revealAt = ot.revealMainAtProgress;

  const finishOpen = useCallback(() => {
    setPhase("done");
    onOpenComplete();
  }, [onOpenComplete]);

  const beginCrossfade = useCallback(() => {
    if (fadingRef.current) return;
    fadingRef.current = true;
    if (!revealedRef.current) {
      revealedRef.current = true;
      onOpenStart();
    }
    setPhase("fading");
    if (doneTimer.current) clearTimeout(doneTimer.current);
    doneTimer.current = setTimeout(finishOpen, fadeSec * 1000);
  }, [onOpenStart, finishOpen, fadeSec]);

  const startGlowFallback = useCallback(() => {
    playWhenReadyRef.current = false;
    setPhase("glow");
    if (!revealedRef.current) {
      revealedRef.current = true;
      onOpenStart();
    }
    const ms = (reduced ? ot.reducedDuration : ot.duration) * 1000;
    doneTimer.current = setTimeout(finishOpen, ms);
  }, [reduced, ot, onOpenStart, finishOpen]);

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      startGlowFallback();
      return;
    }
    video.muted = true;
    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => startGlowFallback());
    }
  }, [startGlowFallback]);

  const handleVideoEnded = useCallback(() => {
    beginCrossfade();
  }, [beginCrossfade]);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration || fadingRef.current) return;
    if (video.currentTime / video.duration >= revealAt) {
      beginCrossfade();
    }
  }, [revealAt, beginCrossfade]);

  const handleCanPlay = useCallback(() => {
    if (playWhenReadyRef.current) {
      playWhenReadyRef.current = false;
      tryPlay();
    }
  }, [tryPlay]);

  // Kick off buffering as soon as the poster screen mounts
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;
    try {
      video.preload = "auto";
      video.load();
    } catch {
      /* ignore */
    }
  }, [reduced, videoSrc]);

  useEffect(
    () => () => {
      if (doneTimer.current) clearTimeout(doneTimer.current);
    },
    []
  );

  const handleOpen = useCallback(() => {
    if (openingRef.current || phase !== "closed") return;
    openingRef.current = true;
    onFirstInteraction();

    if (reduced) {
      startGlowFallback();
      return;
    }

    const video = videoRef.current;
    if (!video) {
      startGlowFallback();
      return;
    }

    setPhase("playing");

    // HAVE_CURRENT_DATA (2+) — play now; otherwise wait for canplay
    if (video.readyState >= 2) {
      tryPlay();
    } else {
      playWhenReadyRef.current = true;
      try {
        video.load();
      } catch {
        /* ignore */
      }
      // Safety: don't hang forever on slow networks
      window.setTimeout(() => {
        if (playWhenReadyRef.current) {
          playWhenReadyRef.current = false;
          tryPlay();
        }
      }, 2500);
    }
  }, [phase, reduced, onFirstInteraction, startGlowFallback, tryPlay]);

  const handleVideoError = useCallback(() => {
    if (openingRef.current) {
      startGlowFallback();
    }
  }, [startGlowFallback]);

  if (phase === "done") return null;

  const isClosed = phase === "closed";
  const isGlow = phase === "glow";
  const isFading = phase === "fading";
  const showVideoLayer = isClosed || phase === "playing" || isFading;

  const glowGradient = `radial-gradient(circle, ${ot.glowColors.core} 0%, ${ot.glowColors.mid} 28%, ${ot.glowColors.edge} 55%, transparent 72%)`;
  const glowGrowDuration = reduced ? ot.reducedDuration * 0.55 : ot.duration * 0.72;

  return (
    <AnimatePresence>
      <motion.div
        key="envelope-screen"
        className="fixed inset-0 z-50 overflow-hidden bg-transparent"
        animate={{
          backgroundColor: isClosed
            ? "rgba(243, 237, 219, 1)"
            : "rgba(243, 237, 219, 0)",
        }}
        transition={{
          backgroundColor: { duration: fadeSec * 0.6, ease: easeOut },
        }}
      >
        {showVideoLayer && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: isFading ? 0 : 1 }}
            transition={{ duration: fadeSec, ease: easeOut }}
          >
            <div
              className="relative h-full max-h-full w-auto max-w-full"
              style={{ aspectRatio: "9 / 16" }}
            >
              <video
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc}
                playsInline
                preload="auto"
                muted
                onEnded={handleVideoEnded}
                onError={handleVideoError}
                onTimeUpdate={handleTimeUpdate}
                onCanPlay={handleCanPlay}
                onLoadedData={() => {
                  const v = videoRef.current;
                  if (v && v.paused) {
                    try {
                      v.currentTime = 0;
                    } catch {
                      /* ignore */
                    }
                  }
                }}
                className="absolute inset-0 h-full w-full object-contain"
                aria-label="Davetiye açılış videosu"
              />
            </div>
          </motion.div>
        )}

        {isClosed && (
          <button
            type="button"
            onClick={handleOpen}
            className="absolute inset-0 z-40 flex cursor-pointer flex-col items-center justify-end pb-[10vh]"
            aria-label={texts.tapToOpenTr}
          >
            <motion.span
              className="flex flex-col items-center gap-2 text-gold-dark"
              animate={
                reduced
                  ? undefined
                  : { opacity: [0.55, 1, 0.55], y: [0, -5, 0] }
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden
              >
                <path
                  d="M12 19 L12 5 M6 11 L12 5 L18 11"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-display text-xs uppercase tracking-[0.3em]">
                {texts.tapToOpenTr}
              </span>
            </motion.span>
          </button>
        )}

        <p className="sr-only" aria-live="polite">
          {isClosed
            ? `${texts.tapToOpen} — ${texts.tapToOpenTr}`
            : "Davetiye açılıyor"}
        </p>

        <AnimatePresence>
          {isGlow && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-hidden
            >
              <motion.div
                className="absolute left-1/2 top-1/2 -ml-10 -mt-10 h-20 w-20 rounded-full"
                style={{
                  background: glowGradient,
                  filter: reduced ? "none" : "blur(28px)",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  reduced
                    ? { scale: 1, opacity: [0, 0.5, 0] }
                    : {
                        scale: [0, ot.glowPeakScale * 0.35, ot.glowPeakScale],
                        opacity: [
                          0,
                          ot.flashPeakOpacity,
                          ot.flashPeakOpacity,
                          0,
                        ],
                      }
                }
                transition={
                  reduced
                    ? { duration: ot.reducedDuration, ease: easeOut }
                    : {
                        scale: {
                          duration: glowGrowDuration,
                          ease: easeOut,
                          times: [0, 0.45, 1],
                        },
                        opacity: {
                          duration: ot.duration,
                          ease: easeOut,
                          times: [0, 0.35, 0.72, 1],
                        },
                      }
                }
              />
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 50% 48%, ${ot.glowColors.core}cc 0%, ${ot.glowColors.mid}66 40%, transparent 70%)`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, reduced ? 0.35 : 0.55, 0] }}
                transition={{
                  duration: reduced ? ot.reducedDuration : ot.duration,
                  ease: easeOut,
                  times: [0, 0.55, 1],
                }}
              />
              {ot.particles && !reduced && <GlowParticles active />}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
