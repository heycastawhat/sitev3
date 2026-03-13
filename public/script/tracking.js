// tracking.js

// --- Local Time ---
function updateTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-NZ', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Pacific/Auckland'
  });
  document.getElementById('time').textContent = `Time in NZ: ${timeStr}`;
}
updateTime();
setInterval(updateTime, 60000);

// --- Last.fm Tracker ---
const username = "castawhat";
const apiKey = "52356bf83c75abeb9be97262d3981b74";

async function fetchNowPlaying() {
  try {
    // request a few recent tracks so we can show last 3 or now-playing + history
    const res = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=5`);
    const data = await res.json();
    const tracks = data.recenttracks.track || [];

    // normalize into array of {artist, name, nowplaying}
    const parsed = tracks.map(t => ({
      artist: t.artist["#text"] || 'Unknown artist',
      name: t.name || 'Unknown track',
      nowplaying: !!(t["@attr"] && t["@attr"].nowplaying)
    }));

    const container = document.getElementById('lastfm');
    if (!container) return;

    // decide display mode
    const now = parsed.find(t => t.nowplaying);
    let html = '';

    if (now) {
      // show now playing + last 2 (excluding the now-playing item)
      html += `<strong>Now playing:</strong> ${escapeHtml(now.name)} — ${escapeHtml(now.artist)}<br>`;
      const others = parsed.filter(t => !t.nowplaying).slice(0,2);
      if (others.length) {
        html += `<small>Recently:</small><ul class="lastfm-list">`;
        others.forEach(o => {
          html += `<li>${escapeHtml(o.name)} — ${escapeHtml(o.artist)}</li>`;
        });
        html += `</ul>`;
      }
    } else {
      // no now playing: show last 3 played
      const three = parsed.slice(0,3);
      if (three.length) {
        html += `<strong>Last played:</strong><ul class="lastfm-list">`;
        three.forEach(t => {
          html += `<li>${escapeHtml(t.name)} — ${escapeHtml(t.artist)}</li>`;
        });
        html += `</ul>`;
      } else {
        html = 'No recent tracks found.';
      }
    }

    container.innerHTML = html;
  } catch (err) {
    console.error("Last.fm fetch failed:", err);
  }
}
fetchNowPlaying();
setInterval(fetchNowPlaying, 30000);

// small helper to avoid XSS when inserting text into HTML
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

