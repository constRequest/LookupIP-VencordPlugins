import definePlugin from "@utils/types";

let clickHandler: ((e: MouseEvent) => void) | null = null;
const ipRegex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;

function isValidIP(ip: string): boolean {
    return ip.split(".").every(num => {
        const n = Number(num);
        return n >= 0 && n <= 255;
    });
}

 */
function openIPInfo(ip: string) {
    const url = `https://ipinfo.io/${ip}`;
    window.open(url, "_blank");
}

export default definePlugin({
    name: "Lookup IP",
    description: "Click on an IP address from a message to get information about them.",
    authors: [{ name: "Request", id: 0n }],

    start() {
        clickHandler = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (!target) return;

            const text = target.textContent;
            if (!text) return;

            const matches = text.match(ipRegex);
            if (!matches) return;

            const ip = matches.find(isValidIP);
            if (!ip) return;

            if ((target as HTMLAnchorElement).href) return;

            e.preventDefault();
            e.stopPropagation();

            openIPInfo(ip);
        };

        document.addEventListener("click", clickHandler);
    },

    stop() {
        if (clickHandler) {
            document.removeEventListener("click", clickHandler);
            clickHandler = null;
        }
    }
});
