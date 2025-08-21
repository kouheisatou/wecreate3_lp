import React from 'react';
import { Button } from '../ui';

export const HeroSection: React.FC = () => {
    const stats = [
        { number: '10+', label: '参加大学' },
        { number: '10+', label: '参加サークル' },
        { number: '複数回', label: 'イベント開催' },
    ];

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center marble-background-alt pt-16 md:pt-0">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                {/* メインキャッチコピー */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight drop-shadow-sm unique-header">
                    WeCreate3
                </h1>

                {/* サブキャッチコピー */}
                <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 font-medium mb-4 md:mb-6 drop-shadow-sm px-4">
                    学生が創るWeb3とメタバースの未来
                </p>

                {/* 説明文 */}
                <p className="text-lg sm:text-xl text-gray-500 max-w-4xl mx-auto mb-12 md:mb-16 leading-relaxed drop-shadow-sm px-4">
                    Web3とメタバースの認識拡大を目的に活動している学生団体。
                    <br className="hidden sm:block" />
                    全国の大学生が集結し、新しいテクノロジーの可能性を創出しています。
                </p>

                {/* CTAボタン */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16 md:mb-20 px-4">
                    <Button variant="unique" size="lg" href="#events" className="px-8 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl touch-manipulation">
                        最新イベントに参加する
                    </Button>
                    <Button variant="unique" size="lg" href="#join" className="px-8 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl touch-manipulation">
                        コミュニティに参加する
                    </Button>
                </div>

                {/* 装飾的な区切り線 */}
                <div className="decorative-divider"></div>
            </div>
        </section>
    );
};
