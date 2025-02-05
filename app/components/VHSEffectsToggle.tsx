'use client'

import { useState } from 'react'

export default function VHSEffectsToggle() {
    const [effectsEnabled, setEffectsEnabled] = useState(false)

    const toggleEffects = () => {
        const vhsScreen = document.querySelector('.vhs-screen')
        vhsScreen?.classList.toggle('effects-disabled')
        setEffectsEnabled(!effectsEnabled)
    }

    return (
        <button
            className="vhs-effects-toggle"
            onClick={toggleEffects}
            aria-label="Toggle VHS effects"
        >
            {effectsEnabled ? 'VHS: OFF' : 'VHS: ON'}
        </button>
    )
}
    