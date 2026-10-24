const API_BASE = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

export async function loginAdmin(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Login failed');
  }
  return data;
}

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to upload file');
  }

  return res.json();
}

export async function fetchAllData() {
  const res = await fetch(`${API_BASE}/all`);
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export async function updateSection(sectionKey, data) {
  const res = await fetch(`${API_BASE}/sections/${sectionKey}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update ${sectionKey}`);
  return res.json();
}

export async function fetchHeader() {
  const res = await fetch(`${API_BASE}/header`);
  if (!res.ok) throw new Error('Failed to fetch header');
  return res.json();
}

export async function updateHeader(data) {
  const res = await fetch(`${API_BASE}/header`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update header');
  return res.json();
}

export async function fetchMeta() {
  const res = await fetch(`${API_BASE}/meta`);
  if (!res.ok) throw new Error('Failed to fetch meta tags');
  return res.json();
}

export async function updateMeta(data) {
  const res = await fetch(`${API_BASE}/meta`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update meta tags');
  return res.json();
}

export async function fetchHero() {
  const res = await fetch(`${API_BASE}/hero`);
  if (!res.ok) throw new Error('Failed to fetch hero');
  return res.json();
}

export async function updateHero(data) {
  const res = await fetch(`${API_BASE}/hero`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update hero');
  return res.json();
}

export async function fetchAbout() {
  const res = await fetch(`${API_BASE}/about`);
  if (!res.ok) throw new Error('Failed to fetch about');
  return res.json();
}

export async function updateAbout(data) {
  const res = await fetch(`${API_BASE}/about`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update about');
  return res.json();
}

export async function fetchOverview() {
  const res = await fetch(`${API_BASE}/overview`);
  if (!res.ok) throw new Error('Failed to fetch overview specs');
  return res.json();
}

export async function saveOverviewList(items) {
  const res = await fetch(`${API_BASE}/overview`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(items),
  });
  if (!res.ok) throw new Error('Failed to save overview specs');
  return res.json();
}

export async function fetchPricing() {
  const res = await fetch(`${API_BASE}/pricing`);
  if (!res.ok) throw new Error('Failed to fetch pricing plans');
  return res.json();
}

export async function savePricingList(items) {
  const res = await fetch(`${API_BASE}/pricing`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(items),
  });
  if (!res.ok) throw new Error('Failed to save pricing plans');
  return res.json();
}

export async function fetchFloorPlans() {
  const res = await fetch(`${API_BASE}/floorplans`);
  if (!res.ok) throw new Error('Failed to fetch floor plans');
  return res.json();
}

export async function saveFloorPlansList(items) {
  const res = await fetch(`${API_BASE}/floorplans`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(items),
  });
  if (!res.ok) throw new Error('Failed to save floor plans');
  return res.json();
}

export async function fetchAmenities() {
  const res = await fetch(`${API_BASE}/amenities`);
  if (!res.ok) throw new Error('Failed to fetch amenities');
  return res.json();
}

export async function saveAmenitiesList(data) {
  const res = await fetch(`${API_BASE}/amenities`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save amenities');
  return res.json();
}

export async function fetchDeveloper() {
  const res = await fetch(`${API_BASE}/developer`);
  if (!res.ok) throw new Error('Failed to fetch developer info');
  return res.json();
}

export async function updateDeveloper(data) {
  const res = await fetch(`${API_BASE}/developer`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update developer info');
  return res.json();
}

export async function fetchLocation() {
  const res = await fetch(`${API_BASE}/location`);
  if (!res.ok) throw new Error('Failed to fetch location settings');
  return res.json();
}

export async function updateLocation(data) {
  const res = await fetch(`${API_BASE}/location`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update location settings');
  return res.json();
}

export async function fetchGallery() {
  const res = await fetch(`${API_BASE}/gallery`);
  if (!res.ok) throw new Error('Failed to fetch gallery');
  return res.json();
}

export async function updateGallery(data) {
  const res = await fetch(`${API_BASE}/gallery`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update gallery');
  return res.json();
}

export async function fetchVideo() {
  const res = await fetch(`${API_BASE}/video`);
  if (!res.ok) throw new Error('Failed to fetch video');
  return res.json();
}

export async function updateVideo(data) {
  const res = await fetch(`${API_BASE}/video`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update video');
  return res.json();
}

export async function fetchConstruction() {
  const res = await fetch(`${API_BASE}/construction`);
  if (!res.ok) throw new Error('Failed to fetch construction');
  return res.json();
}

export async function updateConstruction(data) {
  const res = await fetch(`${API_BASE}/construction`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update construction');
  return res.json();
}

export async function fetchFaqs() {
  const res = await fetch(`${API_BASE}/faqs`);
  if (!res.ok) throw new Error('Failed to fetch FAQs');
  return res.json();
}

export async function saveFaqsList(items) {
  const res = await fetch(`${API_BASE}/faqs`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(items),
  });
  if (!res.ok) throw new Error('Failed to save FAQs');
  return res.json();
}

export async function fetchLeads() {
  const res = await fetch(`${API_BASE}/leads`);
  if (!res.ok) throw new Error('Failed to fetch leads');
  return res.json();
}

export async function submitLead(leadData) {
  const res = await fetch(`${API_BASE}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData),
  });
  if (!res.ok) throw new Error('Failed to submit enquiry');
  return res.json();
}

export async function deleteLead(id) {
  const res = await fetch(`${API_BASE}/leads/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete lead');
  return res.json();
}

export async function fetchPrivacy() {
  const res = await fetch(`${API_BASE}/privacy`);
  if (!res.ok) throw new Error('Failed to fetch privacy policy');
  return res.json();
}

export async function updatePrivacy(data) {
  const res = await fetch(`${API_BASE}/privacy`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update privacy policy');
  return res.json();
}

export async function fetchAdminProfile() {
  const res = await fetch(`${API_BASE}/auth/profile`);
  if (!res.ok) throw new Error('Failed to fetch admin profile');
  return res.json();
}

export async function updateAdminProfile(data) {
  const res = await fetch(`${API_BASE}/auth/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to update admin profile');
  return json;
}

export async function fetchSpecifications() {
  const res = await fetch(`${API_BASE}/specifications`);
  if (!res.ok) throw new Error('Failed to fetch specifications');
  return res.json();
}

export async function createSpecification(data) {
  const res = await fetch(`${API_BASE}/specifications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create specification');
  return res.json();
}

export async function updateSpecification(id, data) {
  const res = await fetch(`${API_BASE}/specifications/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update specification');
  return res.json();
}

export async function deleteSpecification(id) {
  const res = await fetch(`${API_BASE}/specifications/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete specification');
  return res.json();
}


