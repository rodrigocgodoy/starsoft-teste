import { ImageResponse } from 'next/og'

export const alt = 'Starsoft — Marketplace de NFTs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
          background: '#191a20',
        }}
      >
        <div style={{ display: 'flex', fontSize: 96, fontWeight: 800, color: '#ff8310' }}>
          starsoft
        </div>
        <div style={{ display: 'flex', fontSize: 40, color: '#cccccc' }}>
          Marketplace de NFTs on-chain
        </div>
      </div>
    ),
    size,
  )
}
