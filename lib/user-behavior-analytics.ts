// Kullanıcı Davranışı Analizi Modülü
export interface UserSession {
  sessionId: string;
  userId?: string;
  url: string;
  device: string;
  browser: string;
  country: string;
  startedAt: Date;
  endedAt?: Date;
  events: UserEvent[];
}

export type UserEventType =
  | 'page_view'
  | 'scroll'
  | 'click'
  | 'hover'
  | 'input_focus'
  | 'input_change'
  | 'form_submit'
  | 'exit_intent';

export interface UserEvent {
  type: UserEventType;
  timestamp: Date;
  x?: number;
  y?: number;
  element?: string;
  value?: string;
  scrollDepth?: number;
  meta?: Record<string, any>;
}

export interface HeatmapDataPoint {
  x: number;
  y: number;
  count: number;
  element?: string;
}

export interface ScrollDepthData {
  url: string;
  maxDepth: number;
  avgDepth: number;
  sessions: number;
  distribution: number[]; // 0-100 arası yüzdelik dilimler
}

export interface ClickMapData {
  url: string;
  element: string;
  count: number;
  x: number;
  y: number;
}

export interface BehaviorAnalyticsReport {
  url: string;
  period: string;
  totalSessions: number;
  avgSessionDuration: number;
  bounceRate: number;
  avgScrollDepth: number;
  topClickedElements: ClickMapData[];
  heatmap: HeatmapDataPoint[];
  scrollDepth: ScrollDepthData;
  exitIntentRate: number;
  recommendations: string[];
}

export class UserBehaviorAnalytics {
  private sessions: UserSession[] = [];

  // Yeni oturum başlat
  startSession(session: Omit<UserSession, 'startedAt' | 'events'>): string {
    const sessionId = `sess_${Date.now()}_${Math.random()}`;
    this.sessions.push({
      ...session,
      sessionId,
      startedAt: new Date(),
      events: []
    });
    return sessionId;
  }

  // Oturuma event ekle
  addEvent(sessionId: string, event: Omit<UserEvent, 'timestamp'>): void {
    const session = this.sessions.find(s => s.sessionId === sessionId);
    if (session) {
      session.events.push({ ...event, timestamp: new Date() });
    }
  }

  // Oturumu sonlandır
  endSession(sessionId: string): void {
    const session = this.sessions.find(s => s.sessionId === sessionId);
    if (session) {
      session.endedAt = new Date();
    }
  }

  // Isı haritası verisi üret
  getHeatmap(url: string): HeatmapDataPoint[] {
    const points: Record<string, HeatmapDataPoint> = {};
    this.sessions.filter(s => s.url === url).forEach(session => {
      session.events.filter(e => e.type === 'click' && e.x !== undefined && e.y !== undefined).forEach(e => {
        const key = `${e.x}_${e.y}`;
        if (!points[key]) {
          points[key] = { x: e.x!, y: e.y!, count: 0, element: e.element };
        }
        points[key].count++;
      });
    });
    return Object.values(points);
  }

  // Scroll derinliği verisi üret
  getScrollDepth(url: string): ScrollDepthData {
    let total = 0, max = 0, sessions = 0;
    const distribution = Array(10).fill(0);
    this.sessions.filter(s => s.url === url).forEach(session => {
      const scrollEvents = session.events.filter(e => e.type === 'scroll' && e.scrollDepth !== undefined);
      if (scrollEvents.length > 0) {
        const maxDepth = Math.max(...scrollEvents.map(e => e.scrollDepth!));
        total += maxDepth;
        max = Math.max(max, maxDepth);
        sessions++;
        const bucket = Math.floor(maxDepth / 10);
        distribution[bucket]++;
      }
    });
    return {
      url,
      maxDepth: max,
      avgDepth: sessions ? total / sessions : 0,
      sessions,
      distribution
    };
  }

  // Click map verisi üret
  getClickMap(url: string): ClickMapData[] {
    const map: Record<string, ClickMapData> = {};
    this.sessions.filter(s => s.url === url).forEach(session => {
      session.events.filter(e => e.type === 'click' && e.element).forEach(e => {
        const key = e.element!;
        if (!map[key]) {
          map[key] = { url, element: e.element!, count: 0, x: e.x || 0, y: e.y || 0 };
        }
        map[key].count++;
      });
    });
    return Object.values(map);
  }

  // Davranışsal analiz raporu üret
  generateReport(url: string, period: string = '30d'): BehaviorAnalyticsReport {
    const relevantSessions = this.sessions.filter(s => s.url === url);
    const totalSessions = relevantSessions.length;
    const avgSessionDuration = totalSessions ?
      relevantSessions.reduce((sum, s) => sum + ((s.endedAt?.getTime() || Date.now()) - s.startedAt.getTime()), 0) / totalSessions / 1000 : 0;
    const bounceCount = relevantSessions.filter(s => s.events.length <= 1).length;
    const bounceRate = totalSessions ? (bounceCount / totalSessions) * 100 : 0;
    const avgScrollDepth = this.getScrollDepth(url).avgDepth;
    const topClickedElements = this.getClickMap(url).sort((a, b) => b.count - a.count).slice(0, 5);
    const heatmap = this.getHeatmap(url);
    const scrollDepth = this.getScrollDepth(url);
    const exitIntentCount = relevantSessions.reduce((sum, s) => sum + s.events.filter(e => e.type === 'exit_intent').length, 0);
    const exitIntentRate = totalSessions ? (exitIntentCount / totalSessions) * 100 : 0;
    const recommendations = this.generateRecommendations({
      bounceRate,
      avgScrollDepth,
      exitIntentRate,
      avgSessionDuration
    });
    return {
      url,
      period,
      totalSessions,
      avgSessionDuration,
      bounceRate,
      avgScrollDepth,
      topClickedElements,
      heatmap,
      scrollDepth,
      exitIntentRate,
      recommendations
    };
  }

  // Otomatik öneriler
  private generateRecommendations(metrics: { bounceRate: number; avgScrollDepth: number; exitIntentRate: number; avgSessionDuration: number; }): string[] {
    const recs: string[] = [];
    if (metrics.bounceRate > 50) recs.push('Hemen çıkma oranı yüksek, açılış içeriğini ve CTA alanlarını optimize edin.');
    if (metrics.avgScrollDepth < 40) recs.push('Kullanıcılar sayfanın altına inmiyor, içerik akışını ve başlıkları gözden geçirin.');
    if (metrics.exitIntentRate > 20) recs.push('Çıkış niyeti yüksek, pop-up veya özel tekliflerle kullanıcıyı tutmayı deneyin.');
    if (metrics.avgSessionDuration < 30) recs.push('Oturum süresi kısa, içerik etkileşimini artıracak görseller ve interaktif alanlar ekleyin.');
    if (recs.length === 0) recs.push('Kullanıcı davranışları sağlıklı görünüyor.');
    return recs;
  }
}

// Kullanıcı davranış analitiği için hook
export const useUserBehaviorAnalytics = () => {
  const analytics = new UserBehaviorAnalytics();
  return analytics;
}; 