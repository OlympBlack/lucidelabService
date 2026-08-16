const API_BASE_URL = 'http://localhost:8000/api/v1';

// ── Types ──────────────────────────────────────────────────────────────────
export interface Realisation {
  id: number;
  title: string;
  category: string;
  client_name: string;
  description: string;
  image_url?: string;
  year?: string;
  is_featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  author?: string;
  image_url?: string;
  views_count?: number;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Service {
  id: number;
  code: string;
  title: string;
  subtitle?: string;
  description: string;
  details?: string[];
  is_active?: boolean;
}

export interface Partner {
  id: number;
  name: string;
  role?: string;
  testimonial?: string;
  logo_url?: string;
  rating?: number;
  is_active?: boolean;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  link_url?: string;
  is_active?: boolean;
}

export interface SocialLink {
  id: number;
  name: string;
  platform: string;
  url: string;
  icon?: string;
  is_active?: boolean;
  sort_order?: number;
}

// ── Helpers ────────────────────────────────────────────────────────────────
export const resolveImageUrl = (url?: string, category: string = 'LUCIDE LAB'): string => {
  if (!url || !url.trim()) {
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="220"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%23004C99"/><stop offset="1" stop-color="%23fd8604"/></linearGradient></defs><rect width="400" height="220" fill="url(%23g)"/><text x="50%25" y="46%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="28" font-family="sans-serif" font-weight="bold">${encodeURIComponent(category)}</text><text x="50%25" y="62%25" dominant-baseline="middle" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="14" font-family="sans-serif">LUCIDE LAB</text></svg>`;
  }
  const clean = url.trim();
  if (clean.startsWith('http://') || clean.startsWith('https://') || clean.startsWith('data:')) {
    return clean;
  }
  if (clean.startsWith('/storage') || clean.startsWith('storage')) {
    return `http://localhost:8000/${clean.replace(/^\//, '')}`;
  }
  if (clean.startsWith('/uploads') || clean.startsWith('uploads')) {
    return `http://localhost:8000/${clean.replace(/^\//, '')}`;
  }
  if (clean.startsWith('/assets/')) {
    return clean;
  }
  if (clean.startsWith('/')) {
    return `http://localhost:8000${clean}`;
  }
  return `/assets/images/${clean}`;
};

const jsonHeaders = { 'Content-Type': 'application/json', 'Accept': 'application/json' };

async function get<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (e) {
    console.warn('API GET error:', url, e);
    return null;
  }
}

async function post<T>(url: string, body: unknown): Promise<{ success: boolean; data?: T; message?: string; errors?: Record<string, string[]> }> {
  try {
    const res = await fetch(url, { method: 'POST', headers: jsonHeaders, body: JSON.stringify(body) });
    return await res.json();
  } catch (e) {
    console.error('API POST error:', url, e);
    return { success: false, message: 'Erreur de connexion au serveur.' };
  }
}

async function put<T>(url: string, body: unknown): Promise<{ success: boolean; data?: T; message?: string; errors?: Record<string, string[]> }> {
  try {
    const res = await fetch(url, { method: 'PUT', headers: jsonHeaders, body: JSON.stringify(body) });
    return await res.json();
  } catch (e) {
    console.error('API PUT error:', url, e);
    return { success: false, message: 'Erreur de connexion au serveur.' };
  }
}

async function del(url: string): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(url, { method: 'DELETE', headers: { Accept: 'application/json' } });
    return await res.json();
  } catch (e) {
    console.error('API DELETE error:', url, e);
    return { success: false, message: 'Erreur de connexion au serveur.' };
  }
}

// ── Public API ─────────────────────────────────────────────────────────────
export const api = {
  // Services
  async getServices(): Promise<Service[] | null> {
    return get<Service[]>(`${API_BASE_URL}/services`);
  },

  // Réalisations
  async getRealisations(): Promise<Realisation[] | null> {
    return get<Realisation[]>(`${API_BASE_URL}/realisations`);
  },

  // Blog
  async getBlogs(): Promise<Blog[] | null> {
    return get<Blog[]>(`${API_BASE_URL}/blogs`);
  },

  async getBlogBySlug(slug: string): Promise<Blog | null> {
    return get<Blog>(`${API_BASE_URL}/blogs/${slug}`);
  },

  // Settings
  async getSettings(): Promise<Record<string, string> | null> {
    return get<Record<string, string>>(`${API_BASE_URL}/settings`);
  },

  // Contact
  async sendContact(formData: { name: string; email: string; phone: string; service: string; subject?: string; message: string }) {
    return post(`${API_BASE_URL}/contact`, formData);
  },

  // ── Admin Auth ────────────────────────────────────────────────────────────
  async adminLogin(credentials: { email: string; password: string }) {
    return post(`${API_BASE_URL}/admin/login`, credentials);
  },

  // ── Admin — Réalisations CRUD ────────────────────────────────────────────
  async adminGetRealisations(): Promise<Realisation[] | null> {
    return get<Realisation[]>(`${API_BASE_URL}/admin/realisations`);
  },

  async createRealisation(data: Omit<Realisation, 'id' | 'created_at' | 'updated_at'>) {
    return post<Realisation>(`${API_BASE_URL}/admin/realisations`, data);
  },

  async updateRealisation(id: number, data: Partial<Realisation>) {
    return put<Realisation>(`${API_BASE_URL}/admin/realisations/${id}`, data);
  },

  async deleteRealisation(id: number) {
    return del(`${API_BASE_URL}/admin/realisations/${id}`);
  },

  // ── Admin — Blog CRUD ────────────────────────────────────────────────────
  async adminGetBlogs(): Promise<Blog[] | null> {
    return get<Blog[]>(`${API_BASE_URL}/admin/blogs`);
  },

  async createBlog(data: Omit<Blog, 'id' | 'slug' | 'created_at' | 'updated_at' | 'views_count'>) {
    return post<Blog>(`${API_BASE_URL}/admin/blogs`, data);
  },

  async updateBlog(id: number, data: Partial<Blog>) {
    return put<Blog>(`${API_BASE_URL}/admin/blogs/${id}`, data);
  },

  async deleteBlog(id: number) {
    return del(`${API_BASE_URL}/admin/blogs/${id}`);
  },

  // ── Admin — Services CRUD ────────────────────────────────────────────────
  async adminGetServices(): Promise<Service[] | null> {
    return get<Service[]>(`${API_BASE_URL}/admin/services`);
  },

  async createService(data: Partial<Service>) {
    return post<Service>(`${API_BASE_URL}/admin/services`, data);
  },

  async updateService(id: number, data: Partial<Service>) {
    return put<Service>(`${API_BASE_URL}/admin/services/${id}`, data);
  },

  async deleteService(id: number) {
    return del(`${API_BASE_URL}/admin/services/${id}`);
  },

  // ── Admin — Partners CRUD ────────────────────────────────────────────────
  async getPartners(): Promise<Partner[] | null> {
    return get<Partner[]>(`${API_BASE_URL}/partners`);
  },

  async adminGetPartners(): Promise<Partner[] | null> {
    return get<Partner[]>(`${API_BASE_URL}/admin/partners`);
  },

  async createPartner(data: Partial<Partner>) {
    return post<Partner>(`${API_BASE_URL}/admin/partners`, data);
  },

  async updatePartner(id: number, data: Partial<Partner>) {
    return put<Partner>(`${API_BASE_URL}/admin/partners/${id}`, data);
  },

  async deletePartner(id: number) {
    return del(`${API_BASE_URL}/admin/partners/${id}`);
  },

  // ── Admin — Announcements CRUD ──────────────────────────────────────────
  async getAnnouncements(): Promise<Announcement[] | null> {
    return get<Announcement[]>(`${API_BASE_URL}/announcements`);
  },

  // ── Social Links API ───────────────────────────────────────────────────
  async getSocialLinks(): Promise<SocialLink[] | null> {
    return get<SocialLink[]>(`${API_BASE_URL}/social-links`);
  },

  async adminGetSocialLinks(): Promise<SocialLink[] | null> {
    return get<SocialLink[]>(`${API_BASE_URL}/admin/social-links`);
  },

  async createSocialLink(data: Partial<SocialLink>) {
    return post<SocialLink>(`${API_BASE_URL}/admin/social-links`, data);
  },

  async updateSocialLink(id: number, data: Partial<SocialLink>) {
    return put<SocialLink>(`${API_BASE_URL}/admin/social-links/${id}`, data);
  },

  async deleteSocialLink(id: number) {
    return del(`${API_BASE_URL}/admin/social-links/${id}`);
  },

  async adminGetAnnouncements(): Promise<Announcement[] | null> {
    return get<Announcement[]>(`${API_BASE_URL}/admin/announcements`);
  },

  async createAnnouncement(data: Partial<Announcement>) {
    return post<Announcement>(`${API_BASE_URL}/admin/announcements`, data);
  },

  async updateAnnouncement(id: number, data: Partial<Announcement>) {
    return put<Announcement>(`${API_BASE_URL}/admin/announcements/${id}`, data);
  },

  async deleteAnnouncement(id: number) {
    return del(`${API_BASE_URL}/admin/announcements/${id}`);
  },

  // ── Admin — Media ────────────────────────────────────────────────────────
  async getAdminMedia() {
    return get<any[]>(`${API_BASE_URL}/admin/media`);
  },

  async deleteAdminMedia(path: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/delete-image`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ path })
      });
      return await res.json();
    } catch (e) {
      console.error('API DELETE error:', e);
      return { success: false, message: 'Erreur de connexion' };
    }
  },

  // ── Admin — Messages ─────────────────────────────────────────────────────
  async getAdminMessages() {
    return get(`${API_BASE_URL}/admin/messages`);
  },

  async deleteAdminMessage(id: number) {
    return del(`${API_BASE_URL}/admin/messages/${id}`);
  },

  async markAdminMessageRead(id: number) {
    return post(`${API_BASE_URL}/admin/messages/${id}/read`, {});
  },

  async markAllAdminMessagesRead() {
    return post(`${API_BASE_URL}/admin/messages/read-all`, {});
  },

  // ── Admin — Settings ─────────────────────────────────────────────────────
  async updateSettings(settings: Record<string, string>) {
    return post(`${API_BASE_URL}/admin/settings`, settings);
  },

  // ── Admin — Image Upload ──────────────────────────────────────────────────
  async uploadImage(file: File): Promise<{ success: boolean; url?: string; path?: string; message?: string }> {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${API_BASE_URL}/admin/upload-image`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      return await res.json();
    } catch (e) {
      console.error('Upload error:', e);
      return { success: false, message: 'Erreur lors de l\'upload.' };
    }
  },

  async deleteImage(path: string): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/delete-image`, {
        method: 'DELETE',
        headers: jsonHeaders,
        body: JSON.stringify({ path }),
      });
      return await res.json();
    } catch (e) {
      console.error('Delete image error:', e);
      return { success: false, message: 'Erreur lors de la suppression.' };
    }
  }
};

