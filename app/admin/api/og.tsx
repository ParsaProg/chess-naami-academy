import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  
  // Extract dynamic parameters
  const title = searchParams.get('title') || "آکادمی شطرنج نعامی"
  const description = searchParams.get('description') || "آموزشگاه شطرنج استاد نعامی با ۱۴ سال فعالیت مستمر در زمینه آموزش شطرنج، به صورت حضوری و آنلاین"
  const imageUrl = searchParams.get('image') || 'https://github.com/ParsaProg/chess-naami-academy/blob/main/public/assets/images/mr-naami.png?raw=true'

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          color: 'white',
          padding: '80px',
          flexDirection: 'column',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            style={{
              width: '100%',
              height: '300px',
              objectFit: 'cover',
              marginBottom: '40px',
              borderRadius: '12px',
            }}
          />
        )}
        <h1
          style={{
            fontSize: '72px',
            lineHeight: '1.1',
            marginBottom: '24px',
            fontWeight: '900',
            background: 'linear-gradient(90deg, #00dbde 0%, #fc00ff 100%)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: '32px',
            opacity: 0.8,
            lineHeight: '1.5',
          }}
        >
          {description}
        </p>
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            alignItems: 'center',
          }}
        >
          <img
            src="https://yourdomain.com/logo.png"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              marginRight: '20px',
            }}
          />
          <span style={{ fontSize: '28px' }}>آکادمی شطرنج نعامی</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630, // Standard OG image dimensions
    }
  )
}