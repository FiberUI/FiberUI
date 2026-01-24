import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Options for the useDataChannel hook
 */
export interface UseDataChannelOptions {
    /** Label for the data channel */
    label: string;
    /** RTCDataChannel configuration options */
    channelOptions?: RTCDataChannelInit;
    /** Whether to create the channel immediately (default: true for offerer) */
    autoCreate?: boolean;
    /** Callback when a message is received */
    onMessage?: (data: string | ArrayBuffer) => void;
    /** Callback when channel opens */
    onOpen?: () => void;
    /** Callback when channel closes */
    onClose?: () => void;
    /** Callback when error occurs */
    onError?: (error: Event) => void;
}

/**
 * Message with metadata
 */
export interface DataChannelMessage {
    /** Message data (string or binary) */
    data: string | ArrayBuffer;
    /** Timestamp when received */
    timestamp: number;
    /** Whether this is a binary message */
    isBinary: boolean;
}

/**
 * Return type for the useDataChannel hook
 */
export interface UseDataChannelReturn {
    /** The RTCDataChannel instance */
    channel: RTCDataChannel | null;
    /** Current ready state of the channel */
    readyState: RTCDataChannelState;
    /** Whether the channel is open and ready to send */
    isOpen: boolean;
    /** Send a string message */
    send: (data: string) => boolean;
    /** Send binary data */
    sendBinary: (data: ArrayBuffer | Blob) => boolean;
    /** Send JSON data */
    sendJSON: <T>(data: T) => boolean;
    /** Received messages history */
    messages: DataChannelMessage[];
    /** Most recent message */
    lastMessage: DataChannelMessage | null;
    /** Clear message history */
    clearMessages: () => void;
    /** Buffered amount of data waiting to be sent */
    bufferedAmount: number;
}

/**
 * A React hook for managing WebRTC data channels.
 * Provides P2P messaging for chat, file transfer, or game state.
 *
 * @param peerConnection - The RTCPeerConnection to use
 * @param options - Configuration options for the data channel
 * @returns UseDataChannelReturn object with channel, states, and methods
 *
 * @example
 * ```tsx
 * const { createDataChannel } = usePeerConnection();
 * const { send, messages, isOpen } = useDataChannel(peerConnection, {
 *     label: "chat",
 *     onMessage: (data) => console.log("Received:", data),
 * });
 *
 * // Send a message
 * if (isOpen) {
 *     send("Hello, peer!");
 * }
 * ```
 */
export function useDataChannel(
    peerConnection: RTCPeerConnection | null,
    options: UseDataChannelOptions,
): UseDataChannelReturn {
    const {
        label,
        channelOptions,
        autoCreate = true,
        onMessage,
        onOpen,
        onClose,
        onError,
    } = options;

    const [channel, setChannel] = useState<RTCDataChannel | null>(null);
    const [readyState, setReadyState] =
        useState<RTCDataChannelState>("connecting");
    const [messages, setMessages] = useState<DataChannelMessage[]>([]);
    const [bufferedAmount, setBufferedAmount] = useState(0);

    // Store callbacks in refs
    const onMessageRef = useRef(onMessage);
    const onOpenRef = useRef(onOpen);
    const onCloseRef = useRef(onClose);
    const onErrorRef = useRef(onError);

    onMessageRef.current = onMessage;
    onOpenRef.current = onOpen;
    onCloseRef.current = onClose;
    onErrorRef.current = onError;

    // Setup channel event handlers
    const setupChannel = useCallback((dc: RTCDataChannel) => {
        dc.onopen = () => {
            setReadyState("open");
            onOpenRef.current?.();
        };

        dc.onclose = () => {
            setReadyState("closed");
            onCloseRef.current?.();
        };

        dc.onerror = (event) => {
            onErrorRef.current?.(event);
        };

        dc.onmessage = (event) => {
            const message: DataChannelMessage = {
                data: event.data,
                timestamp: Date.now(),
                isBinary: event.data instanceof ArrayBuffer,
            };
            setMessages((prev) => [...prev, message]);
            onMessageRef.current?.(event.data);
        };

        dc.onbufferedamountlow = () => {
            setBufferedAmount(dc.bufferedAmount);
        };

        setChannel(dc);
        setReadyState(dc.readyState);
    }, []);

    // Create or receive data channel
    useEffect(() => {
        if (!peerConnection) return;

        // Handle incoming data channel from remote peer
        const handleDataChannel = (event: RTCDataChannelEvent) => {
            if (event.channel.label === label) {
                setupChannel(event.channel);
            }
        };

        peerConnection.addEventListener("datachannel", handleDataChannel);

        // Create channel if we're the offerer
        if (autoCreate && !channel) {
            try {
                const dc = peerConnection.createDataChannel(
                    label,
                    channelOptions,
                );
                setupChannel(dc);
            } catch (err) {
                console.error("Failed to create data channel:", err);
            }
        }

        return () => {
            peerConnection.removeEventListener(
                "datachannel",
                handleDataChannel,
            );
        };
    }, [
        peerConnection,
        label,
        channelOptions,
        autoCreate,
        channel,
        setupChannel,
    ]);

    // Send string message
    const send = useCallback(
        (data: string): boolean => {
            if (!channel || channel.readyState !== "open") return false;

            try {
                channel.send(data);
                setBufferedAmount(channel.bufferedAmount);
                return true;
            } catch (err) {
                console.error("Failed to send message:", err);
                return false;
            }
        },
        [channel],
    );

    // Send binary data
    const sendBinary = useCallback(
        (data: ArrayBuffer | Blob): boolean => {
            if (!channel || channel.readyState !== "open") return false;

            try {
                if (data instanceof Blob) {
                    // For Blob, we need to convert to ArrayBuffer
                    data.arrayBuffer().then((buffer) => {
                        channel.send(buffer);
                    });
                } else {
                    channel.send(data);
                }
                setBufferedAmount(channel.bufferedAmount);
                return true;
            } catch (err) {
                console.error("Failed to send binary data:", err);
                return false;
            }
        },
        [channel],
    );

    // Send JSON data
    const sendJSON = useCallback(
        <T>(data: T): boolean => {
            try {
                return send(JSON.stringify(data));
            } catch (err) {
                console.error("Failed to serialize JSON:", err);
                return false;
            }
        },
        [send],
    );

    // Clear messages
    const clearMessages = useCallback(() => {
        setMessages([]);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (channel) {
                channel.close();
            }
        };
    }, [channel]);

    return {
        channel,
        readyState,
        isOpen: readyState === "open",
        send,
        sendBinary,
        sendJSON,
        messages,
        lastMessage: messages[messages.length - 1] ?? null,
        clearMessages,
        bufferedAmount,
    };
}

export default useDataChannel;
