import './components/md-button.js';
import './components/md-ripple.js';

const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
const baseUrl = 'https://www.googleapis.com/youtube/v3/playlistItems';
const CHANNEL_ID = 'UC-aF9X9tQMuWPM__L4X5NuQ';
const VIDEO_CACHE_KEY = `hawkster_videos_${CHANNEL_ID}`;
const VIDEO_CACHE_EXPIRY = 1000 * 60 * 60 * 6;
const memoryHistory = {};

async function fetchPage(playlistId, pageToken) {
    const params = new URLSearchParams({
        part: 'snippet',
        playlistId,
        maxResults: '50',
        key: apiKey,
    });
    if (pageToken) params.set('pageToken', pageToken);

    const response = await fetch(`${baseUrl}?${params}`);
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data;
}

async function getAllChannelVideos(channelId) {
    try {
        const cached = localStorage.getItem(VIDEO_CACHE_KEY);
        if (cached) {
            const parsed = JSON.parse(cached);
            if (parsed && Array.isArray(parsed.videos) && parsed.videos.length > 0) {
                if (Date.now() - parsed.timestamp < VIDEO_CACHE_EXPIRY) {
                    return parsed.videos;
                }
            }
        }
    } catch {}

    try {
        if (!channelId.startsWith('UC')) {
            throw new Error("invalid channel ID format, it must start with 'UC'.");
        }
        const uploadsPlaylistId = 'UU' + channelId.substring(2);

        let videos = [];
        let pageToken = '';

        while (true) {
            const data = await fetchPage(uploadsPlaylistId, pageToken);
            if (!data.items || data.items.length === 0) break;

            for (const item of data.items) {
                const title = item.snippet?.title;
                const videoId = item.snippet?.resourceId?.videoId;
                if (videoId && title && title !== 'Private video' && title !== 'Deleted video') {
                    videos.push({ id: videoId, title });
                }
            }

            pageToken = data.nextPageToken;
            if (!pageToken) break;
        }

        if (videos.length > 0) {
            try {
                localStorage.setItem(VIDEO_CACHE_KEY, JSON.stringify({
                    timestamp: Date.now(),
                    videos,
                }));
            } catch {}
            return videos;
        }
    } catch (error) {
        console.error("error fetching all videos:", error);
    }

    try {
        const fallback = localStorage.getItem(VIDEO_CACHE_KEY);
        if (fallback) return JSON.parse(fallback).videos || [];
    } catch {}

    return [];
}

function getPlayedVideos(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : (memoryHistory[key] || []);
    } catch {
        return memoryHistory[key] || [];
    }
}

function savePlayedVideos(key, list) {
    try {
        localStorage.setItem(key, JSON.stringify(list));
    } catch {
        memoryHistory[key] = list;
    }
}

function getNextUnplayedVideo(allVideos, storageKey) {
    if (!allVideos || allVideos.length === 0) return null;

    let played = getPlayedVideos(storageKey);
    let unplayed = allVideos.filter(v => !played.includes(v.id));

    if (unplayed.length === 0) {
        played = [];
        savePlayedVideos(storageKey, []);
        unplayed = [...allVideos];
    }

    const randomIndex = Math.floor(Math.random() * unplayed.length);
    const chosen = unplayed[randomIndex];

    played.push(chosen.id);
    savePlayedVideos(storageKey, played);

    return chosen;
}

function getGuessingRoundOptions(allVideos, correctVideo, count = 5) {
    const options = [correctVideo];
    const others = allVideos.filter(v => v.id !== correctVideo.id);
    const shuffledOthers = shuffle([...others]);
    for (let i = 0; i < shuffledOthers.length && options.length < count; i++) {
        options.push(shuffledOthers[i]);
    }
    return shuffle(options);
}

async function getRandomUpload(channelId) {
    const allVideos = await getAllChannelVideos(channelId);
    if (!allVideos || allVideos.length === 0) return null;
    return getNextUnplayedVideo(allVideos, 'hawkster_played_random');
}

async function getMultipleRandomUploads(channelId, count) {
    const allVideos = await getAllChannelVideos(channelId);
    if (!allVideos || allVideos.length === 0) return [];
    const correct = getNextUnplayedVideo(allVideos, 'hawkster_played_guessing');
    return getGuessingRoundOptions(allVideos, correct, count);
}

async function loadChannelPfp(channelId) {
    const pfpImg = document.getElementById('pfp');
    if (!pfpImg) return;

    const cached = sessionStorage.getItem(`yt_pfp_${channelId}`);
    if (cached) {
        pfpImg.src = cached;
        return;
    }

    try {
        const params = new URLSearchParams({
            part: 'snippet',
            id: channelId,
            key: apiKey,
        });
        const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?${params}`);
        const data = await res.json();
        const pfpUrl = data.items?.[0]?.snippet?.thumbnails?.high?.url
            || data.items?.[0]?.snippet?.thumbnails?.medium?.url
            || data.items?.[0]?.snippet?.thumbnails?.default?.url;

        if (pfpUrl) {
            pfpImg.src = pfpUrl;
            sessionStorage.setItem(`yt_pfp_${channelId}`, pfpUrl);
        }
    } catch (err) {
        console.error("error fetching channel pfp:", err);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    loadChannelPfp(CHANNEL_ID);
    getAllChannelVideos(CHANNEL_ID);
});

const playerR = document.getElementById('player-r');

function embedVideo(container, videoId) {
    const params = new URLSearchParams({
        autoplay: '1',
        controls: '0',
        modestbranding: '1',
        rel: '0',
        iv_load_policy: '3',
        playsinline: '1',
        disabletb: '1',
    });

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?${params}`;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    iframe.title = 'YouTube video player';
    iframe.frameBorder = '0';

    container.replaceChildren(iframe);
}

document.getElementById('random-vid-button').addEventListener("click", async () => {
    const video = await getRandomUpload(CHANNEL_ID);
    if (video) embedVideo(playerR, video.id);
});

// guessing game

const guessingContainer = document.getElementById('guessing');
const playerG = document.getElementById('player-g');
const guessOptions = document.getElementById('guess-options');
const guessResult = document.getElementById('guess-result');
const goButton = document.getElementById('goon');
const scoreDisplay = document.getElementById('guess-score');

let guessState = { score: 0, total: 0 };
let ytPlayer = null;
let ytReady = false;

function loadYTApi() {
    if (window.YT && window.YT.Player) {
        ytReady = true;
        return;
    }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
}

window.onYouTubeIframeAPIReady = () => {
    ytReady = true;
};

loadYTApi();

function waitForYT() {
    return new Promise(resolve => {
        if (ytReady) return resolve();
        const check = setInterval(() => {
            if (ytReady) { clearInterval(check); resolve(); }
        }, 100);
    });
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function updateScore() {
    scoreDisplay.textContent = guessState.total > 0
        ? `${guessState.score} / ${guessState.total}`
        : '';
}

async function startGuessRound() {
    guessingContainer.classList.remove('has-options', 'revealed');
    goButton.setAttribute('disabled', '');

    setTimeout(() => {
        if (!guessingContainer.classList.contains('has-options')) {
            guessResult.textContent = '';
            guessResult.className = 'guess-result';
            guessOptions.replaceChildren();
        }
    }, 300);

    const allVideos = await getAllChannelVideos(CHANNEL_ID);
    if (!allVideos || allVideos.length < 5) {
        guessResult.textContent = 'Could not fetch enough videos. Try again.';
        goButton.removeAttribute('disabled');
        return;
    }

    const correctVideo = getNextUnplayedVideo(allVideos, 'hawkster_played_guessing');
    const videos = getGuessingRoundOptions(allVideos, correctVideo, 5);

    await waitForYT();

    const playerDiv = document.createElement('div');
    playerDiv.id = 'yt-guess-player';
    playerG.replaceChildren(playerDiv);

    const randomStart = Math.floor(Math.random() * 120) + 10;
    let hasPlayedClip = false;

    if (ytPlayer) {
        ytPlayer.destroy();
        ytPlayer = null;
    }

    ytPlayer = new YT.Player('yt-guess-player', {
        videoId: correctVideo.id,
        width: '100%',
        height: '100%',
        playerVars: {
            autoplay: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            iv_load_policy: 3,
            playsinline: 1,
            disablekb: 1,
            start: randomStart,
            fs: 0,
        },
        events: {
            onReady: (event) => {
                event.target.setVolume(100);
                event.target.playVideo();
            },
            onStateChange: (event) => {
                if (event.data === YT.PlayerState.PLAYING && !hasPlayedClip) {
                    hasPlayedClip = true;
                    setTimeout(() => {
                        event.target.pauseVideo();
                        showOptions(videos, correctVideo);
                    }, 1000);
                } else if (event.data === YT.PlayerState.ENDED && !hasPlayedClip) {
                    hasPlayedClip = true;
                    showOptions(videos, correctVideo);
                }
            },
        },
    });
}

function showOptions(videos, correctVideo) {
    guessOptions.replaceChildren();
    const shuffled = shuffle([...videos]);

    for (const video of shuffled) {
        const btn = document.createElement('md-button');
        btn.setAttribute('variant', 'outline');
        btn.textContent = video.title;
        btn.dataset.videoId = video.id;

        btn.addEventListener('click', () => {
            handleGuess(video.id === correctVideo.id, correctVideo, btn);
        });

        guessOptions.appendChild(btn);
    }

    guessingContainer.classList.add('has-options');
}

function handleGuess(correct, correctVideo, clickedBtn) {
    guessState.total++;
    guessingContainer.classList.add('revealed');

    guessOptions.querySelectorAll('md-button').forEach(btn => {
        btn.setAttribute('disabled', '');
        if (btn.dataset.videoId === correctVideo.id) {
            btn.setAttribute('variant', 'filled');
        }
    });

    if (correct) {
        guessState.score++;
        guessResult.textContent = 'Correct!';
        guessResult.className = 'guess-result correct';
    } else {
        guessResult.textContent = 'Wrong!';
        guessResult.className = 'guess-result wrong';
        clickedBtn.setAttribute('variant', 'tonal');
        clickedBtn.style.setProperty('--md-sys-color-primary-container', 'var(--md-sys-color-error-container)');
        clickedBtn.style.setProperty('--md-sys-color-on-primary-container', 'var(--md-sys-color-on-error-container)');
    }

    if (ytPlayer && ytPlayer.playVideo) {
        ytPlayer.playVideo();
    }
    updateScore();
    goButton.removeAttribute('disabled');
    goButton.querySelector('span')?.remove();
    goButton.textContent = 'NEXT';
}

goButton.addEventListener("click", startGuessRound);


const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const newTab = tab.dataset.tab;
        document.querySelectorAll('.page').forEach(g => g.classList.remove('visible'));
        document.getElementById(newTab).classList.add('visible');

        if (newTab !== 'guessing' && ytPlayer) {
            ytPlayer.pauseVideo();
        }
        if (newTab !== 'random-vid') {
            playerR.replaceChildren();
        }
    });
});