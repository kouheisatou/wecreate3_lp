import React from 'react';
import {
  HeroSection,
  AboutSection,
  MissionSection,
  ActivitiesSection,
  EventsSection,
  TeamSection,
  SponsorsSection,
  ContactSection,
} from '../components/sections';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <MissionSection />
      <ActivitiesSection />
      <EventsSection />
      <TeamSection />
      <SponsorsSection />
      <ContactSection />
    </>
  );
}