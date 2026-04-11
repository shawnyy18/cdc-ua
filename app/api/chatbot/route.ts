import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const runtime = 'nodejs'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, history } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required', success: false },
        { status: 400 }
      )
    }

    if (!process.env.GOOGLE_AI_API_KEY) {
      return NextResponse.json(
        { error: 'AI service is not configured', success: false },
        { status: 503 }
      )
    }

    // System context for EcoKonek PH
    const systemContext = `You are EcoBot, the AI assistant for EcoKonek PH - an innovative e-waste donation and recycling platform in the Philippines.

🌱 PLATFORM OVERVIEW:
EcoKonek PH helps Filipinos responsibly dispose of old electronics while earning rewards and contributing to environmental sustainability.

📱 HOW IT WORKS:
1. Users donate old devices (smartphones, laptops, tablets, computers, etc.)
2. They select device condition (working/broken)
3. Choose a drop-off center in Pampanga
4. Earn eco-points and track CO₂ savings
5. View donation history and status (pending/accepted/rejected)

💚 KEY FEATURES:
• Dashboard - View eco stats, donations, achievements, leaderboard
• Donate Page - Submit device donations (3-step form)
• Community - Share eco-tips, connect with users, marketplace
• Profile - Manage account, view donation history, follower counts
• Marketplace - Buy/sell refurbished devices (for verified sellers)
• Eco-Points - Rewards for donations, displayed on leaderboard

🎯 REWARDS SYSTEM:
• Earn eco-points for each accepted donation
• Track total CO₂ saved from recycling
• Compete on public leaderboard
• Unlock achievements for milestones
• Follow other eco-warriors

📍 COLLECTION POINTS (CDC):
• CDC IT Department (Clark Freeport Zone)
• Additional collection points available in the submission form

🔒 PRIVACY:
• Users can set profiles to public/private
• Follow/unfollow other users
• View follower/following counts

⚠️ IMPORTANT RULES:
• Only electronics accepted (no general trash)
• Donations go through review (pending → accepted/rejected)
• Must be logged in to donate
• Points awarded only for accepted donations

RESPONSE STYLE:
• Be friendly, helpful, and encouraging about sustainability
• Use Filipino context when relevant
• Keep answers concise (2-3 sentences) unless detailed info requested
• Use emojis occasionally for engagement
• Focus on environmental impact and community building

`

    // Build a single user prompt that includes the system context and condensed history
    const safeHistory: Array<{ role: string; content: string }> = Array.isArray(history)
      ? (history as any[])
          .filter(h => h && typeof h.content === 'string' && h.content.trim())
          .slice(0, 50) // cap total messages from client
      : []

    // Exclude an initial assistant welcome message if present
    const trimmedHistory = safeHistory.length > 0 && safeHistory[0].role === 'assistant'
      ? safeHistory.slice(1)
      : safeHistory

    // Only keep the last 10 turns for brevity
    const recentHistory = trimmedHistory.slice(-10)

    let transcript = `${systemContext}\n\nConversation so far:`
    for (const msg of recentHistory) {
      const speaker = msg.role === 'assistant' ? 'Assistant' : 'User'
      transcript += `\n${speaker}: ${msg.content}`
    }
    const finalPrompt = `${transcript}\n\nUser: ${message}\nAssistant:`

    // Use REST API only (stable across environments): try v1 then v1beta
    const apiKey = process.env.GOOGLE_AI_API_KEY as string
    const restModels = [
      // v1 preferred
      { base: 'v1', model: 'gemini-1.5-flash-002' },
      { base: 'v1', model: 'gemini-1.5-pro-002' },
      { base: 'v1', model: 'gemini-1.5-flash' },
      { base: 'v1', model: 'gemini-1.5-pro' },
      { base: 'v1', model: 'gemini-1.0-pro' },
      // v1beta fallbacks
      { base: 'v1beta', model: 'gemini-1.5-flash' },
      { base: 'v1beta', model: 'gemini-1.5-pro' },
      { base: 'v1beta', model: 'gemini-1.0-pro' },
      { base: 'v1beta', model: 'gemini-pro' },
    ] as const

    let text: string | null = null
    let lastError: any = null
    for (const m of restModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/${m.base}/models/${m.model}:generateContent?key=${encodeURIComponent(apiKey)}`
        const r = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [ { role: 'user', parts: [{ text: finalPrompt }] } ]
          })
        })
        if (!r.ok) {
          const errBody = await r.text().catch(() => '')
          // Continue trying other models on 404/unsupported
          if (r.status === 404 || /not found|unsupported/i.test(errBody)) continue
          throw new Error(`REST ${m.base}/${m.model} ${r.status}: ${errBody}`)
        }
        const data = await r.json()
        const candidate = data?.candidates?.[0]
        const partText = candidate?.content?.parts?.[0]?.text || candidate?.content?.parts?.[0]?.inline_data || ''
        const altText = candidate?.content?.parts?.map((p: any) => p?.text).filter(Boolean).join('\n')
        text = (partText || altText || '').toString()
        if (text && text.trim()) break
      } catch (err) {
        lastError = err
        continue
      }
    }

    if (!text) {
      // As a final fallback, provide a rule-based helpful answer so the chatbot stays functional
      const q = (message || '').toLowerCase()
      const includes = (w: string) => q.includes(w)

      if (includes('donate') || includes('donation')) {
        text = 'You can donate your device on the Donate page. Choose the device type, condition, and a drop-off center in Pampanga, then submit. You’ll earn eco-points once the donation is accepted.'
      } else if (includes('eco') && (includes('point') || includes('reward'))) {
        text = 'Eco-points are rewards for accepted donations. They add to your total on the Dashboard and Leaderboard. More accepted donations = more points and achievements.'
      } else if (includes('drop-off') || includes('center') || includes('where')) {
        text = 'Submit your device at the CDC IT Department collection point in Clark Freeport Zone. More collection points may be available in the submission form.'
      } else if (includes('status') || includes('pending') || includes('evaluation') || includes('disposed')) {
        text = 'After submission, your asset goes through evaluation. Possible statuses: Pending Evaluation, Reallocated (reassigned within CDC), Donated (external), Disposed (e-waste), or Voided. Track it in your Dashboard.'
      } else if (includes('profile') || includes('follow') || includes('followers')) {
        text = 'Profiles can be public or private. You can follow other eco-warriors to connect; follower and following counts appear on profiles.'
      } else if (includes('market') || includes('sell') || includes('refurb')) {
        text = 'Verified sellers can list refurbished devices in the Marketplace. Buyers can browse safely through the platform.'
      } else if (includes('co2') || includes('carbon')) {
        text = 'We estimate CO₂ savings for accepted donations and show them on your Dashboard so you can track your environmental impact.'
      } else if (includes('leaderboard') || includes('rank')) {
        text = 'The Leaderboard highlights top eco-warriors based on eco-points earned from accepted donations.'
      } else {
        text = 'EcoKonek helps the CDC IT Department manage e-waste, earn eco-points, and track CO₂ savings. Ask me about submitting records, collection points, points, profile, or reports.'
      }
    }

    return NextResponse.json({
      success: true,
      reply: text,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Chatbot error:', error)
    
    // Provide helpful fallback response based on error
    let fallbackMessage = "I'm having trouble connecting right now. Here are some quick tips: "
    fallbackMessage += "📱 Donate electronics via the Donate page, "
    fallbackMessage += "💚 earn eco-points for accepted donations, "
    fallbackMessage += "🌱 track your impact on the Dashboard. "
    fallbackMessage += "Try asking me again in a moment!"

    // If API key is missing, provide specific message
    if (error.message?.includes('API key') || !process.env.GOOGLE_AI_API_KEY) {
      fallbackMessage = "The chatbot service is currently unavailable. Please contact support or visit our help section for assistance with e-waste donations."
    }

    return NextResponse.json(
      { 
        error: 'Failed to generate response', 
        success: false,
        details: error.message,
        fallbackReply: fallbackMessage
      },
      { status: 500 }
    )
  }
}
