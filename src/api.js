export async function fetchImages(flower) {
    const response = await fetch(`image/${flower}/image.json`);
    const data = await response.json();
    return data.message;
}

export async function fetchText(flower) {
    const response = await fetch(`image/${flower}/text.json`);
    const data = await response.json();
    return data.message;
}

export async function fetchVideo(flower) {
    const response = await fetch(`image/${flower}/video.json`);
    const data = await response.json();
    return data.message;
}
