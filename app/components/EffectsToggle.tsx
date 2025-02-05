'use client'

import { useState, useEffect } from 'react'

export default function EffectsToggle() {
    const [effectsEnabled, setEffectsEnabled] = useState(true)

    const toggleEffects = () => {
        setEffectsEnabled(!effectsEnabled)
        document.documentElement.classList.toggle('effects-disabled')
    }

    return (
        <button
            className="effects-toggle"
            onClick={toggleEffects}
            aria-label="Toggle visual effects"
        >
            {effectsEnabled ? 'EFFECTS: ON' : 'EFFECTS: OFF'}
        </button>
    )
}