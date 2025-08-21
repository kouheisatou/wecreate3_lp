import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import {
  HeroSection,
  AboutSection,
  MissionSection,
  ActivitiesSection,
  EventsSection,
  TeamSection,
  JoinSection,
  ContactSection,
} from '../components/sections';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <MissionSection />
        <ActivitiesSection />
        <EventsSection />
        <TeamSection />
        <JoinSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}