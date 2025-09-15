'use client';

import React, { useState, useEffect } from 'react';
import { Container, Section, SponsorLogo } from '../../components/ui';
import { Sponsor, fetchSponsors, filterActiveItems, sortByOrder, pickSponsorLogo, hasSponsorLogo } from '../../utils';

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="py-8 md:py-16">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            スポンサー一覧
          </h1>
          <div className="decorative-divider"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            WeCreate3の活動を支援してくださっている企業・団体の皆様をご紹介します。
            皆様のご支援により、学生のWeb3・メタバース分野での学習と成長を促進することができています。
          </p>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-12">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-6">
                <div className="h-8 bg-gray-200 rounded w-64 mx-auto"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(6)].map((_, j) => (
                    <div key={j} className="bg-gray-200 h-32 rounded-lg"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : sponsors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">現在、表示可能なスポンサー情報がありません。</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {sponsors.map((sponsor) => (
              <div key={sponsor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-[2/1] flex items-center justify-center p-6 bg-gray-50">
                  {sponsor.website_url ? (
                    <a
                      href={sponsor.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-80 transition-opacity w-full h-full flex items-center justify-center"
                      title={sponsor.name}
                    >
                      <SponsorLogo
                        sponsor={sponsor}
                        width={300}
                        height={150}
                        className="max-w-full max-h-full object-contain"
                        textClassName="text-lg md:text-xl font-bold text-gray-900 text-center leading-relaxed px-4"
                      />
                    </a>
                  ) : (
                    <SponsorLogo
                      sponsor={sponsor}
                      width={300}
                      height={150}
                      className="max-w-full max-h-full object-contain"
                      textClassName="text-lg md:text-xl font-bold text-gray-900 text-center leading-relaxed px-4"
                    />
                  )}
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {sponsor.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {sponsor.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                      {sponsor.category}
                    </span>
                    {sponsor.website_url && (
                      <a
                        href={sponsor.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        サイトを見る
                        <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}