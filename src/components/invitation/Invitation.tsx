"use client";

import Hero from "./Hero";
import IntroCard from "./IntroCard";
import Countdown from "./Countdown";
import Schedule from "./Schedule";
import Location from "./Location";
import Rsvp from "./Rsvp";
import Closing from "./Closing";
import MusicToggle from "./MusicToggle";

interface InvitationProps {
  musicEnabled?: boolean;
}

/**
 * Scrollable invitation — continuous cream from hero through
 * intro card → countdown → schedule torn-paper cards.
 */
export default function Invitation({ musicEnabled = true }: InvitationProps) {
  return (
    <div className="relative mx-auto w-full max-w-invite overflow-x-clip bg-ivory">
      <Hero />
      <IntroCard />
      <Countdown />
      <Schedule />
      <Location />
      <Rsvp />
      <Closing />
      <MusicToggle enabled={musicEnabled} />
    </div>
  );
}
