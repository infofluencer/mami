"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Envelope from "./Envelope";
import Invitation from "./Invitation";
import { invitationConfig } from "@config";

/**
 * Orchestrator: davetiye.mp4 plays → near the end,
 * homepage slowly fades in while davetiye slowly fades out.
 */
export default function InvitationExperience() {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const fadeSec = invitationConfig.openTransition.videoFadeSeconds;

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
    <div className="relative mx-auto w-full max-w-[100vw] overflow-x-clip">
      {/* Homepage under the video — fades in slowly with the crossfade */}
      <motion.div
        className={!isOpen ? "pointer-events-none" : undefined}
        aria-hidden={!isOpen}
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent || isOpen ? 1 : 0 }}
        transition={{ duration: fadeSec, ease: [0.22, 1, 0.36, 1] }}
      >
        {(showContent || isOpen) && (
          <Invitation musicEnabled={musicEnabled} />
        )}
      </motion.div>

      {!isOpen && (
        <Envelope
          onOpenStart={handleOpenStart}
          onOpenComplete={handleOpenComplete}
          onFirstInteraction={handleFirstInteraction}
        />
      )}
    </div>
  );
}
