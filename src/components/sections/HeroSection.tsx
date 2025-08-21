import React from 'react';
import { Button } from '../ui';

export const HeroSection: React.FC = () => {
    const stats = [
        { number: '10+', label: '参加大学' },
        { number: '10+', label: '参加サークル' },
        { number: '複数回', label: 'イベント開催' },
    ];

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center marble-background-alt">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* メインキャッチコピー */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight drop-shadow-sm">
                    WeCreate3
                </h1>

                {/* サブキャッチコピー */}
                <p className="text-2xl md:text-3xl text-gray-600 font-medium mb-6 drop-shadow-sm">
                    学生が創るWeb3とメタバースの未来
                </p>

                {/* 説明文 */}
                <p className="text-xl text-gray-500 max-w-4xl mx-auto mb-16 leading-relaxed drop-shadow-sm">
                    Web3とメタバースの認識拡大を目的に活動している学生団体。
                    <br className="hidden md:block" />
                    全国の大学生が集結し、新しいテクノロジーの可能性を創出しています。
                </p>

                {/* CTAボタン */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
                    <Button variant="primary" size="lg" href="#events" className="px-12 py-5 text-xl">
                        最新イベントに参加する
                    </Button>
                    <Button variant="outline" size="lg" href="#join" className="px-12 py-5 text-xl">
                        コミュニティに参加する
                    </Button>
                </div>
            </div>
        </section>
    );
};
