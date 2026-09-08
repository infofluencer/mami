"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Envelope from "./Envelope";
import Invitation from "./Invitation";

/**
 * Orchestrator: video/glow envelope → fade in scrollable <Invitation/>.
 * Body scroll locked until open completes; music enabled on first tap.
 */
export default function InvitationExperience() {
  const [isOpen, setIsOpen] = useState(false);
  /** Invitation mounted under video while it plays / fades */
  const [showContent, setShowContent] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      document.body.classList.add("scroll-locked");
    } else {
      document.body.classList.remove("scroll-locked");
    }
    return () => document.body.classList.remove("scroll-locked");
  }, [isOpen]);

  const handleOpenStart = useCallback(() => setShowContent(true), []);
  const handleOpenComplete = useCallback(() => setIsOpen(true), []);
  const handleFirstInteraction = useCallback(() => setMusicEnabled(true), []);

  return (
    <div className="mx-auto w-full max-w-[100vw] overflow-x-clip">
      {!isOpen && (
        <Envelope
          onOpenStart={handleOpenStart}
          onOpenComplete={handleOpenComplete}
          onFirstInteraction={handleFirstInteraction}
        />
      )}

      <motion.div
        className={!isOpen ? "pointer-events-none" : undefined}
        aria-hidden={!isOpen}
        initial={{ opacity: 0 }}
        animate={{
          opacity: showContent || isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {(showContent || isOpen) && (
          <Invitation musicEnabled={musicEnabled} />
        )}
      </motion.div>
    </div>
  );
}
