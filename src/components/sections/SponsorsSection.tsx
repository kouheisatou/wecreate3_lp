'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Section, Button, SponsorLogo } from '../ui';
import { Sponsor, fetchSponsors, filterActiveItems, sortByOrder, pickSponsorLogo, hasSponsorLogo } from '../../utils';

export const SponsorsSection: React.FC = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  // Show only first 8 sponsors on home page
  const displayedSponsors = sponsors.slice(0, 8);

  useEffect(() => {
    const loadSponsors = async () => {
      try {
        setLoading(true);
        const data = await fetchSponsors();
        const activeSponsors = filterActiveItems(data);
        const sortedSponsors = sortByOrder(activeSponsors);
        setSponsors(sortedSponsors);
      } catch (err) {
        console.error('Error loading sponsors:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSponsors();
  }, []);

  // スポンサーはorder順でシンプルに表示

  return (
    <Section id="sponsors">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 px-4 unique-header">
            スポンサー
          </h2>
          <div className="decorative-divider"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            WeCreate3の活動を支援してくださっている企業・団体の皆様です。
          </p>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-8 px-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-48 mx-auto"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="bg-gray-200 h-24 rounded-lg"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="px-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8">
                {displayedSponsors.map((sponsor) => (
                  <div key={sponsor.id} className="bg-white rounded-lg shadow-sm p-4 md:p-6 flex items-center justify-center hover:shadow-md transition-shadow min-h-[120px] md:min-h-[140px]">
                    {sponsor.website_url ? (
                      <a
                        href={sponsor.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:opacity-80 transition-opacity text-center w-full h-full flex items-center justify-center"
                        title={sponsor.name}
                      >
                        <SponsorLogo
                          sponsor={sponsor}
                          width={200}
                          height={100}
                          className="max-w-full max-h-16 md:max-h-20 object-contain mx-auto"
                          textClassName="text-sm md:text-base font-medium text-gray-900 leading-relaxed px-2 text-center"
                        />
                      </a>
                    ) : (
                      <SponsorLogo
                        sponsor={sponsor}
                        width={200}
                        height={100}
                        className="max-w-full max-h-16 md:max-h-20 object-contain mx-auto"
                        textClassName="text-sm md:text-base font-medium text-gray-900 leading-relaxed px-2 text-center"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* View More Button */}
            {sponsors.length > 8 && (
              <div className="text-center mt-12 px-4">
                <Button
                  variant="unique"
                  size="md"
                  href="/sponsors/"
                >
                  すべてのスポンサーを見る
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Section>
  );
};