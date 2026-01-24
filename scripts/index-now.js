const key = "ed8a7b855b0344c5a89dae6b328e6f10";
const fs = require("fs");
const path = require("path");

async function submitToIndexNow() {
    try {
        const sitemapPath = path.join(__dirname, "./sitemaps/urllist.txt");
        const content = fs.readFileSync(sitemapPath, "utf-8");
        const urls = content
            .split("\n")
            .map((u) => u.trim())
            .filter((u) => u.length > 0);

        console.log(`Found ${urls.length} URLs to submit.`);

        if (urls.length === 0) {
            console.log("No URLs found.");
            return;
        }

        // host is required by IndexNow
        // deriving host from the first URL
        const host = new URL(urls[0]).hostname;

        const body = {
            host,
            key,
            urlList: urls,
            keyLocation: `https://${host}/${key}.txt`,
        };

        const endpoints = [
            "https://api.indexnow.org/indexnow",
            "https://indexnow.amazonbot.amazon/indexnow",
            "https://www.bing.com/indexnow",
            "https://searchadvisor.naver.com/indexnow",
            "https://search.seznam.cz/indexnow",
            "https://yandex.com/indexnow",
            "https://indexnow.yep.com/indexnow",
        ];

        console.log("Submitting to endpoints...");

        for (const endpoint of endpoints) {
            try {
                const response = await fetch(`${endpoint}?key=${key}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: JSON.stringify(body),
                });

                console.log(
                    `[${endpoint}] Status: ${response.status} ${response.statusText}`,
                );

                if (response.status >= 200 && response.status < 300) {
                    // Some endpoints return text, others JSON or empty body
                    try {
                        const text = await response.text();
                        if (text) console.log(`[${endpoint}] Response:`, text);
                    } catch (e) {
                        // ignore json parse error
                    }
                } else {
                    const text = await response.text();
                    console.error(`[${endpoint}] Error:`, text);
                }
            } catch (error) {
                console.error(`[${endpoint}] Request Failed:`, error.message);
            }
        }
    } catch (error) {
        console.error("Script failed:", error);
    }
}

submitToIndexNow();
