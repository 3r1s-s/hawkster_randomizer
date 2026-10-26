async function getRandomUpload(channelId, apiKey) {
    try {
        if (!channelId.startsWith('UC')) {
            throw new Error("invalid channel ID format, it must start with 'UC'.");
        }
        const uploadsPlaylistId = 'UU' + channelId.substring(2);
        const baseUrl = 'https://googleapis.com';

        let url = `${baseUrl}?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${apiKey}`;
        let response = await fetch(url);
        let data = await response.json();

        if (data.error) throw new Error(data.error.message);

        const totalResults = data.pageInfo.totalResults;
        if (totalResults === 0) throw new Error("This channel has no public uploads.");

        const randomIndex = Math.floor(Math.random() * totalResults);

        const targetPage = Math.floor(randomIndex / 50);
        const indexOnTargetPage = randomIndex % 50;
        let nextPageToken = data.nextPageToken;

        for (let i = 1; i < targetPage; i++) {
            if (!nextPageToken) break;
            url = `${baseUrl}?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&pageToken=${nextPageToken}&key=${apiKey}`;
            response = await fetch(url);
            data = await response.json();
            nextPageToken = data.nextPageToken;
        }

        url = `${baseUrl}?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&pageToken=${nextPageToken}&key=${apiKey}`;
        response = await fetch(url);
        data = await response.json();

        const randomVideo = data.items[indexOnTargetPage];
        return randomVideo.snippet.resourceId.videoId;

    } catch (error) {
        console.error("error fetching video:", error);
        return null;
    }
}