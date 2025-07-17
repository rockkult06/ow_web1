'use client'

import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/analytics'

interface ConversionGoal {
  id: string
  name: string
  type: 'page_view' | 'button_click' | 'form_submit' | 'scroll_depth' | 'time_on_page'
  target: string
  value?: number
  completed: boolean
}

interface ConversionFunnel {
  id: string
  name: string
  steps: ConversionGoal[]
  currentStep: number
  completed: boolean
}

export function useConversionTracking() {
  const [conversionGoals, setConversionGoals] = useState<ConversionGoal[]>([
    {
      id: 'homepage_visit',
      name: 'Ana Sayfa Ziyareti',
      type: 'page_view',
      target: '/',
      completed: false
    },
    {
      id: 'product_view',
      name: 'Ürün Sayfası Görüntüleme',
      type: 'page_view',
      target: '/solutions',
      completed: false
    },
    {
      id: 'contact_click',
      name: 'İletişim Butonu Tıklama',
      type: 'button_click',
      target: 'contact',
      completed: false
    },
    {
      id: 'demo_request',
      name: 'Demo Talebi',
      type: 'form_submit',
      target: 'demo_form',
      completed: false
    },
    {
      id: 'scroll_depth',
      name: 'Sayfa Derinliği',
      type: 'scroll_depth',
      target: '75%',
      value: 75,
      completed: false
    },
    {
      id: 'time_on_page',
      name: 'Sayfa Zamanı',
      type: 'time_on_page',
      target: '2 minutes',
      value: 120,
      completed: false
    }
  ])

  const [conversionFunnels, setConversionFunnels] = useState<ConversionFunnel[]>([
    {
      id: 'awareness_funnel',
      name: 'Farkındalık Hunisi',
      steps: [
        { id: 'homepage_visit', name: 'Ana Sayfa', type: 'page_view', target: '/', completed: false },
        { id: 'product_view', name: 'Ürün Görüntüleme', type: 'page_view', target: '/solutions', completed: false },
        { id: 'contact_click', name: 'İletişim', type: 'button_click', target: 'contact', completed: false }
      ],
      currentStep: 0,
      completed: false
    },
    {
      id: 'conversion_funnel',
      name: 'Dönüşüm Hunisi',
      steps: [
        { id: 'demo_request', name: 'Demo Talebi', type: 'form_submit', target: 'demo_form', completed: false },
        { id: 'contact_form', name: 'İletişim Formu', type: 'form_submit', target: 'contact_form', completed: false }
      ],
      currentStep: 0,
      completed: false
    }
  ])

  // Track page views
  useEffect(() => {
    const currentPath = window.location.pathname
    
    conversionGoals.forEach(goal => {
      if (goal.type === 'page_view' && goal.target === currentPath && !goal.completed) {
        markGoalCompleted(goal.id)
      }
    })

    // Track funnel progress
    conversionFunnels.forEach(funnel => {
      funnel.steps.forEach((step, index) => {
        if (step.type === 'page_view' && step.target === currentPath && !step.completed) {
          markFunnelStepCompleted(funnel.id, index)
        }
      })
    })
  }, [])

  // Track scroll depth
  useEffect(() => {
    let scrollDepth = 0
    let maxScrollDepth = 0

    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      scrollDepth = (scrollTop / docHeight) * 100
      maxScrollDepth = Math.max(maxScrollDepth, scrollDepth)

      // Check for scroll depth goals
      conversionGoals.forEach(goal => {
        if (goal.type === 'scroll_depth' && goal.value && maxScrollDepth >= goal.value && !goal.completed) {
          markGoalCompleted(goal.id)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track time on page
  useEffect(() => {
    const startTime = Date.now()
    let timeCheckInterval: NodeJS.Timeout

    const checkTimeOnPage = () => {
      const timeOnPage = (Date.now() - startTime) / 1000 // seconds

      conversionGoals.forEach(goal => {
        if (goal.type === 'time_on_page' && goal.value && timeOnPage >= goal.value && !goal.completed) {
          markGoalCompleted(goal.id)
        }
      })
    }

    timeCheckInterval = setInterval(checkTimeOnPage, 1000)

    return () => clearInterval(timeCheckInterval)
  }, [])

  const markGoalCompleted = (goalId: string) => {
    setConversionGoals(prev => 
      prev.map(goal => 
        goal.id === goalId 
          ? { ...goal, completed: true }
          : goal
      )
    )

    const goal = conversionGoals.find(g => g.id === goalId)
    if (goal) {
      trackEvent('conversion_goal_completed', {
        goal_id: goalId,
        goal_name: goal.name,
        goal_type: goal.type,
        goal_target: goal.target
      })
    }
  }

  const markFunnelStepCompleted = (funnelId: string, stepIndex: number) => {
    setConversionFunnels(prev => 
      prev.map(funnel => {
        if (funnel.id === funnelId) {
          const updatedSteps = funnel.steps.map((step, index) => 
            index === stepIndex ? { ...step, completed: true } : step
          )
          
          const currentStep = Math.max(funnel.currentStep, stepIndex + 1)
          const completed = currentStep >= funnel.steps.length

          return {
            ...funnel,
            steps: updatedSteps,
            currentStep,
            completed
          }
        }
        return funnel
      })
    )

    const funnel = conversionFunnels.find(f => f.id === funnelId)
    if (funnel) {
      trackEvent('funnel_step_completed', {
        funnel_id: funnelId,
        funnel_name: funnel.name,
        step_index: stepIndex,
        step_name: funnel.steps[stepIndex]?.name,
        current_step: stepIndex + 1,
        total_steps: funnel.steps.length
      })
    }
  }

  const trackButtonClick = (buttonId: string, buttonName: string) => {
    conversionGoals.forEach(goal => {
      if (goal.type === 'button_click' && goal.target === buttonId && !goal.completed) {
        markGoalCompleted(goal.id)
      }
    })

    trackEvent('button_click', {
      button_id: buttonId,
      button_name: buttonName,
      page_location: window.location.pathname
    })
  }

  const trackFormSubmit = (formId: string, formName: string) => {
    conversionGoals.forEach(goal => {
      if (goal.type === 'form_submit' && goal.target === formId && !goal.completed) {
        markGoalCompleted(goal.id)
      }
    })

    trackEvent('form_submit', {
      form_id: formId,
      form_name: formName,
      page_location: window.location.pathname
    })
  }

  const getConversionRate = () => {
    const completedGoals = conversionGoals.filter(goal => goal.completed).length
    return (completedGoals / conversionGoals.length) * 100
  }

  const getFunnelConversionRate = (funnelId: string) => {
    const funnel = conversionFunnels.find(f => f.id === funnelId)
    if (!funnel) return 0

    const completedSteps = funnel.steps.filter(step => step.completed).length
    return (completedSteps / funnel.steps.length) * 100
  }

  return {
    conversionGoals,
    conversionFunnels,
    trackButtonClick,
    trackFormSubmit,
    markGoalCompleted,
    getConversionRate,
    getFunnelConversionRate
  }
}

// A/B Testing Hook
export function useABTesting() {
  const [variant, setVariant] = useState<'A' | 'B'>('A')
  const [testActive, setTestActive] = useState(false)

  useEffect(() => {
    // Simple A/B test assignment
    const testId = localStorage.getItem('ab_test_variant')
    if (testId) {
      setVariant(testId as 'A' | 'B')
    } else {
      const newVariant = Math.random() > 0.5 ? 'B' : 'A'
      localStorage.setItem('ab_test_variant', newVariant)
      setVariant(newVariant)
    }
    setTestActive(true)
  }, [])

  const trackABTestEvent = (eventName: string, parameters?: Record<string, any>) => {
    trackEvent(eventName, {
      ...parameters,
      ab_test_variant: variant,
      test_active: testActive
    })
  }

  return {
    variant,
    testActive,
    trackABTestEvent
  }
} 