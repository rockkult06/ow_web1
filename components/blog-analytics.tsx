"use client"

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

interface BlogAnalyticsProps {
  postId: string
  postTitle: string
  postCategory: string
  postAuthor: string
}

export function BlogAnalytics({ postId, postTitle, postCategory, postAuthor }: BlogAnalyticsProps) {
  useEffect(() => {
    trackEvent('blog_post_view', {
      post_id: postId,
      post_title: postTitle,
      post_category: postCategory,
      post_author: postAuthor
    })
  }, [postId, postTitle, postCategory, postAuthor])

  return null
} 