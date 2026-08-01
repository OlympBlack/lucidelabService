const API_BASE_URL = 'http://localhost:8000/api/v1';

export const api = {
  // Public APIs
  async getServices() {
    try {
      const res = await fetch(`${API_BASE_URL}/services`);
      const data = await res.json();
      return data.success ? data.data : [];
    } catch (e) {
      console.warn('API non joignable, utilisation des données fallback local:', e);
      return null;
    }
  },

  async getRealisations() {
    try {
      const res = await fetch(`${API_BASE_URL}/realisations`);
      const data = await res.json();
      return data.success ? data.data : [];
    } catch (e) {
      console.warn('API error:', e);
      return null;
    }
  },

  async getBlogs() {
    try {
      const res = await fetch(`${API_BASE_URL}/blogs`);
      const data = await res.json();
      return data.success ? data.data : [];
    } catch (e) {
      console.warn('API error:', e);
      return null;
    }
  },

  async getBlogBySlug(slug: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/blogs/${slug}`);
      const data = await res.json();
      return data.success ? data.data : null;
    } catch (e) {
      console.warn('API error:', e);
      return null;
    }
  },

  async getSettings() {
    try {
      const res = await fetch(`${API_BASE_URL}/settings`);
      const data = await res.json();
      return data.success ? data.data : null;
    } catch (e) {
      console.warn('API error:', e);
      return null;
    }
  },

  async sendContact(formData: { name: string; email: string; phone: string; service: string; subject?: string; message: string }) {
    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });
      return await res.json();
    } catch (e) {
      console.error('Contact API error:', e);
      return { success: false, message: 'Erreur de connexion au serveur API.' };
    }
  },

  // Admin APIs
  async adminLogin(credentials: { email: string; password: string }) {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(credentials)
      });
      return await res.json();
    } catch (e) {
      console.error('Admin Login error:', e);
      return { success: false, message: 'Impossible de se connecter au serveur backend Laravel.' };
    }
  },

  async getAdminMessages() {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/messages`);
      const data = await res.json();
      return data.success ? data.data : [];
    } catch (e) {
      console.warn('Admin API error:', e);
      return null;
    }
  },

  async updateSettings(settings: Record<string, string>) {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(settings)
      });
      return await res.json();
    } catch (e) {
      console.error('Update settings API error:', e);
      return { success: false };
    }
  }
};
