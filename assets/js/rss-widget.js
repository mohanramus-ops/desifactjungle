(async () => {
    try {
        const feedUrl = "/feed.xml";  // Publii default RSS feed
        const res = await fetch(feedUrl);
        const xmlText = await res.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, "text/xml");

        const items = [...xml.querySelectorAll("item")].slice(0, 6);
        const list = document.getElementById("mfj-rss-list");

        if (!list) return;

        items.forEach(item => {
            const title = item.querySelector("title")?.textContent;
            const link  = item.querySelector("link")?.textContent;

            const li = document.createElement("li");
            li.innerHTML = `<a href="${link}">${title}</a>`;
            list.appendChild(li);
        });
    } catch (err) {
        console.error("RSS load error", err);
    }
})();
