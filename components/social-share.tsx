"use client"

import { Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

interface SocialShareProps {
  url: string
  title: string
  description: string
  hashtags?: string[]
}

export function SocialShare({ url, title, description, hashtags = [] }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)
  const encodedHashtags = hashtags.map(tag => encodeURIComponent(tag)).join('%20')

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${encodedHashtags}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  }

  const handleShare = (platform: string) => {
    trackEvent('social_share', {
      platform,
      url,
      title,
      content_type: 'blog_post'
    })
    
    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      trackEvent('copy_link', {
        url,
        title,
        content_type: 'blog_post'
      })
      // Burada bir toast notification gösterebilirsiniz
    } catch (err) {
      console.error('Link kopyalanamadı:', err)
    }
  }

  return (
    <div className="flex items-center gap-4 mt-8 pt-8 border-t border-gray-200">
      <span className="text-sm font-medium text-gray-700">Paylaş:</span>
      
      <button
        onClick={() => handleShare('facebook')}
        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
        aria-label="Facebook'ta paylaş"
      >
        <Facebook className="w-5 h-5" />
      </button>
      
      <button
        onClick={() => handleShare('twitter')}
        className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
        aria-label="Twitter'da paylaş"
      >
        <Twitter className="w-5 h-5" />
      </button>
      
      <button
        onClick={() => handleShare('linkedin')}
        className="p-2 text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded-full transition-colors"
        aria-label="LinkedIn'de paylaş"
      >
        <Linkedin className="w-5 h-5" />
      </button>
      
      <button
        onClick={handleCopyLink}
        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-full transition-colors"
        aria-label="Linki kopyala"
      >
        <LinkIcon className="w-5 h-5" />
      </button>
    </div>
  )
} 