import { RegistryItem } from "@/lib/types";

export const FIBER_UI_HOOKS: RegistryItem[] = [
    // =========================================================================
    // Form
    // =========================================================================
    {
        name: "use-file-upload",
        type: "registry:hook",
        title: "useFileUpload",
        description:
            "A comprehensive hook for handling file uploads with drag-and-drop, validation, and previews.",
        categories: ["form"],
        files: [{ path: "form/use-file-upload.ts", type: "registry:hook" }],
    },

    // =========================================================================
    // DOM
    // =========================================================================
    {
        name: "use-click-outside",
        type: "registry:hook",
        title: "useClickOutside",
        description:
            "A hook that detects clicks outside of the specified element.",
        categories: ["dom"],
        files: [{ path: "dom/use-click-outside.ts", type: "registry:hook" }],
    },
    {
        name: "use-portal",
        type: "registry:hook",
        title: "usePortal",
        description:
            "A hook that manages a portal container in the DOM and returns a Portal component.",
        categories: ["dom"],
        files: [{ path: "dom/use-portal.ts", type: "registry:hook" }],
    },
    {
        name: "use-event-listener",
        type: "registry:hook",
        title: "useEventListener",
        description:
            "A type-safe hook for attaching event listeners to window, document, or any HTML element.",
        categories: ["dom"],
        files: [{ path: "dom/use-event-listener.ts", type: "registry:hook" }],
    },
    {
        name: "use-hover",
        type: "registry:hook",
        title: "useHover",
        description: "A hook that detects hover state of an element.",
        categories: ["dom"],
        registryDependencies: ["hooks/use-event-listener"],
        files: [{ path: "dom/use-hover.ts", type: "registry:hook" }],
    },
    {
        name: "use-focus",
        type: "registry:hook",
        title: "useFocus",
        description: "A hook that detects focus state of an element.",
        categories: ["dom"],
        registryDependencies: ["hooks/use-event-listener"],
        files: [{ path: "dom/use-focus.ts", type: "registry:hook" }],
    },
    {
        name: "use-key-press",
        type: "registry:hook",
        title: "useKeyPress",
        description: "A hook that detects when a specific key is pressed.",
        categories: ["dom"],
        registryDependencies: ["hooks/use-event-listener"],
        files: [{ path: "dom/use-key-press.ts", type: "registry:hook" }],
    },
    {
        name: "use-window-scroll",
        type: "registry:hook",
        title: "useWindowScroll",
        description: "A hook that tracks window scroll position.",
        categories: ["dom"],
        registryDependencies: ["hooks/use-event-listener"],
        files: [{ path: "dom/use-window-scroll.ts", type: "registry:hook" }],
    },
    {
        name: "use-window-size",
        type: "registry:hook",
        title: "useWindowSize",
        description: "A hook that tracks window dimensions.",
        categories: ["dom"],
        registryDependencies: ["hooks/use-event-listener"],
        files: [{ path: "dom/use-window-size.ts", type: "registry:hook" }],
    },
    {
        name: "use-online",
        type: "registry:hook",
        title: "useOnline",
        description: "A hook that monitors online/offline status.",
        categories: ["dom"],
        registryDependencies: ["hooks/use-event-listener"],
        files: [{ path: "dom/use-online.ts", type: "registry:hook" }],
    },
    {
        name: "use-combo-key-press",
        type: "registry:hook",
        title: "useComboKeyPress",
        description: "A hook that detects complex key combinations.",
        categories: ["dom"],
        registryDependencies: ["hooks/use-event-listener"],
        files: [{ path: "dom/use-combo-key-press.ts", type: "registry:hook" }],
    },

    // =========================================================================
    // Device
    // =========================================================================
    {
        name: "use-battery",
        type: "registry:hook",
        title: "useBattery",
        description: "A React hook for monitoring device battery status.",
        categories: ["device"],
        files: [{ path: "device/use-battery.ts", type: "registry:hook" }],
    },
    {
        name: "use-device-orientation",
        type: "registry:hook",
        title: "useDeviceOrientation",
        description: "A hook to access the device's physical orientation.",
        categories: ["device"],
        files: [
            { path: "device/use-device-orientation.ts", type: "registry:hook" },
        ],
    },
    {
        name: "use-geolocation",
        type: "registry:hook",
        title: "useGeolocation",
        description: "A React hook for accessing the Geolocation API.",
        categories: ["device"],
        files: [{ path: "device/use-geolocation.ts", type: "registry:hook" }],
    },
    {
        name: "use-media-devices",
        type: "registry:hook",
        title: "useMediaDevices",
        description:
            "A powerful hook for enumerating and managing connected media devices.",
        categories: ["device"],
        files: [{ path: "device/use-media-devices.ts", type: "registry:hook" }],
    },
    {
        name: "use-network",
        type: "registry:hook",
        title: "useNetwork",
        description: "A hook that monitors network connectivity status.",
        categories: ["device"],
        files: [{ path: "device/use-network.ts", type: "registry:hook" }],
    },
    {
        name: "use-wake-lock",
        type: "registry:hook",
        title: "useWakeLock",
        description: "A device hook for the Screen Wake Lock API.",
        categories: ["device"],
        files: [{ path: "device/use-wake-lock.ts", type: "registry:hook" }],
    },

    // =========================================================================
    // Storage
    // =========================================================================
    {
        name: "use-file-system",
        type: "registry:hook",
        title: "useFileSystem",
        description:
            "A hook for reading and writing files using the File System Access API.",
        categories: ["storage"],
        files: [{ path: "storage/use-file-system.ts", type: "registry:hook" }],
    },
    {
        name: "use-indexed-db",
        type: "registry:hook",
        title: "useIndexedDB",
        description:
            "A simplified hook for managing IndexedDB with async support.",
        categories: ["storage"],
        files: [{ path: "storage/use-indexed-db.ts", type: "registry:hook" }],
    },
    {
        name: "use-local-storage-state",
        type: "registry:hook",
        title: "useLocalStorageState",
        description: "A hook that synchronizes state with localStorage.",
        categories: ["storage"],
        files: [
            {
                path: "storage/use-local-storage-state.ts",
                type: "registry:hook",
            },
        ],
    },
    {
        name: "use-session-storage-state",
        type: "registry:hook",
        title: "useSessionStorageState",
        description: "A hook that synchronizes state with sessionStorage.",
        categories: ["storage"],
        files: [
            {
                path: "storage/use-session-storage-state.ts",
                type: "registry:hook",
            },
        ],
    },

    // =========================================================================
    // Utility
    // =========================================================================
    {
        name: "use-clipboard",
        type: "registry:hook",
        title: "useClipboard",
        description:
            "A utility hook for reading and writing to the system clipboard.",
        categories: ["utility"],
        files: [{ path: "utility/use-clipboard.ts", type: "registry:hook" }],
    },
    {
        name: "use-countdown",
        type: "registry:hook",
        title: "useCountdown",
        description: "A hook for creating flexible countdown timers.",
        categories: ["utility"],
        files: [{ path: "utility/use-countdown.ts", type: "registry:hook" }],
    },
    {
        name: "use-counter",
        type: "registry:hook",
        title: "useCounter",
        description:
            "A simple hook for managing a counter with upper/lower bounds.",
        categories: ["utility"],
        files: [{ path: "utility/use-counter.ts", type: "registry:hook" }],
    },
    {
        name: "use-debounced-callback",
        type: "registry:hook",
        title: "useDebouncedCallback",
        description: "A hook for debouncing callback functions.",
        categories: ["utility"],
        files: [
            {
                path: "utility/use-debounced-callback.ts",
                type: "registry:hook",
            },
        ],
    },
    {
        name: "use-debounced-state",
        type: "registry:hook",
        title: "useDebouncedState",
        description: "A hook for debouncing state values.",
        categories: ["utility"],
        files: [
            { path: "utility/use-debounced-state.ts", type: "registry:hook" },
        ],
    },
    {
        name: "use-eye-dropper",
        type: "registry:hook",
        title: "useEyeDropper",
        description:
            "A utility hook for selecting colors using the EyeDropper API.",
        categories: ["utility"],
        files: [{ path: "utility/use-eye-dropper.ts", type: "registry:hook" }],
    },
    {
        name: "use-is-mounted",
        type: "registry:hook",
        title: "useIsMounted",
        description: "A hook to check if the component is mounted (SSR safe).",
        categories: ["utility"],
        files: [{ path: "utility/use-is-mounted.ts", type: "registry:hook" }],
    },
    {
        name: "use-picture-in-picture",
        type: "registry:hook",
        title: "usePictureInPicture",
        description:
            "A utility hook for managing Picture-in-Picture mode for video.",
        categories: ["utility"],
        files: [
            {
                path: "utility/use-picture-in-picture.ts",
                type: "registry:hook",
            },
        ],
    },
    {
        name: "use-share",
        type: "registry:hook",
        title: "useShare",
        description: "A utility hook for invoking the native share sheet.",
        categories: ["utility"],
        files: [{ path: "utility/use-share.ts", type: "registry:hook" }],
    },
    {
        name: "use-throttled-callback",
        type: "registry:hook",
        title: "useThrottledCallback",
        description: "A hook for throttling callback functions.",
        categories: ["utility"],
        files: [
            {
                path: "utility/use-throttled-callback.ts",
                type: "registry:hook",
            },
        ],
    },
    {
        name: "use-throttled-state",
        type: "registry:hook",
        title: "useThrottledState",
        description: "A hook for throttling state values.",
        categories: ["utility"],
        files: [
            { path: "utility/use-throttled-state.ts", type: "registry:hook" },
        ],
    },
    {
        name: "use-timeout",
        type: "registry:hook",
        title: "useTimeout",
        description:
            "A React hook for managing setTimeout with automatic cleanup and manual controls.",
        categories: ["utility"],
        files: [{ path: "utility/use-timeout.ts", type: "registry:hook" }],
    },
    {
        name: "use-interval",
        type: "registry:hook",
        title: "useInterval",
        description:
            "A declarative React hook for setInterval that is stale-closure safe and pausable.",
        categories: ["utility"],
        files: [{ path: "utility/use-interval.ts", type: "registry:hook" }],
    },

    // =========================================================================
    // Speech
    // =========================================================================
    {
        name: "use-speech-recognition",
        type: "registry:hook",
        title: "useSpeechRecognition",
        description:
            "A React hook for speech-to-text conversion using the Web Speech API.",
        categories: ["speech"],
        files: [
            { path: "speech/use-speech-recognition.ts", type: "registry:hook" },
        ],
    },
    {
        name: "use-speech-synthesis",
        type: "registry:hook",
        title: "useSpeechSynthesis",
        description:
            "A React hook for text-to-speech synthesis using the Web Speech API.",
        categories: ["speech"],
        files: [
            { path: "speech/use-speech-synthesis.ts", type: "registry:hook" },
        ],
    },

    // =========================================================================
    // WebRTC
    // =========================================================================
    {
        name: "use-audio-level",
        type: "registry:hook",
        title: "useAudioLevel",
        description: "A visualization hook for analyzing audio volume.",
        categories: ["webrtc"],
        files: [{ path: "webrtc/use-audio-level.ts", type: "registry:hook" }],
    },
    {
        name: "use-data-channel",
        type: "registry:hook",
        title: "useDataChannel",
        description: "A React hook for managing WebRTC Data Channels.",
        categories: ["webrtc"],
        files: [{ path: "webrtc/use-data-channel.ts", type: "registry:hook" }],
    },
    {
        name: "use-peer-connection",
        type: "registry:hook",
        title: "usePeerConnection",
        description: "The core WebRTC hook for managing peer connections.",
        categories: ["webrtc"],
        files: [
            { path: "webrtc/use-peer-connection.ts", type: "registry:hook" },
        ],
    },
    {
        name: "use-screen-share",
        type: "registry:hook",
        title: "useScreenShare",
        description: "A simplified hook for capturing screen content.",
        categories: ["webrtc"],
        files: [{ path: "webrtc/use-screen-share.ts", type: "registry:hook" }],
    },
    {
        name: "use-track-toggle",
        type: "registry:hook",
        title: "useTrackToggle",
        description: "A media control hook for muting and unmuting tracks.",
        categories: ["webrtc"],
        files: [{ path: "webrtc/use-track-toggle.ts", type: "registry:hook" }],
    },
    {
        name: "use-user-media",
        type: "registry:hook",
        title: "useUserMedia",
        description:
            "A hook for accessing and managing the user's camera and microphone.",
        categories: ["webrtc"],
        files: [{ path: "webrtc/use-user-media.ts", type: "registry:hook" }],
    },
];
