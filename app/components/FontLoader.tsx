'use client';

const fonts = [
    {
        name: 'Prettywise Black',
        family: "'Prettywise-Black', serif",
        weight: '900',
        style: 'normal'
    },
    {
        name: 'Prettywise Bold',
        family: "'Prettywise-Bold', serif",
        weight: '700',
        style: 'normal'
    },
    {
        name: 'Prettywise Light',
        family: "'Prettywise-Light', serif",
        weight: '300',
        style: 'normal'
    },
    {
        name: 'Prettywise Regular',
        family: "'Prettywise-Regular', serif",
        weight: '400',
        style: 'normal'
    },
    // Add more fonts as needed
];

export function getRandomFont() {
    const randomIndex = Math.floor(Math.random() * fonts.length);
    return fonts[randomIndex];
} 