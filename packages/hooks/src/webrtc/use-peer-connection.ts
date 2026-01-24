import { useState, useEffect, useCallback, useRef } from "react";

/**
 * ICE server configuration
 */
export interface IceServer {
    urls: string | string[];
    username?: string;
    credential?: string;
}

/**
 * Options for the usePeerConnection hook
 */
export interface UsePeerConnectionOptions {
    /** ICE servers for STUN/TURN */
    iceServers?: IceServer[];
    /** ICE transport policy: "all" or "relay" */
    iceTransportPolicy?: RTCIceTransportPolicy;
    /** Bundle policy for media */
    bundlePolicy?: RTCBundlePolicy;
    /** Callback when remote track is received */
    onTrack?: (event: RTCTrackEvent) => void;
    /** Callback when ICE candidate is generated */
    onIceCandidate?: (candidate: RTCIceCandidate | null) => void;
    /** Callback when connection state changes */
    onConnectionStateChange?: (state: RTCPeerConnectionState) => void;
    /** Callback when data channel is received */
    onDataChannel?: (channel: RTCDataChannel) => void;
}

/**
 * Return type for the usePeerConnection hook
 */
export interface UsePeerConnectionReturn {
    /** The RTCPeerConnection instance */
    peerConnection: RTCPeerConnection | null;
    /** Current connection state */
    connectionState: RTCPeerConnectionState;
    /** Current ICE connection state */
    iceConnectionState: RTCIceConnectionState;
    /** Current ICE gathering state */
    iceGatheringState: RTCIceGatheringState;
    /** Current signaling state */
    signalingState: RTCSignalingState;
    /** Local session description */
    localDescription: RTCSessionDescription | null;
    /** Remote session description */
    remoteDescription: RTCSessionDescription | null;
    /** Remote streams received */
    remoteStreams: MediaStream[];
    /** Whether the API is supported */
    isSupported: boolean;
    /** Create an SDP offer */
    createOffer: (
        options?: RTCOfferOptions,
    ) => Promise<RTCSessionDescriptionInit | null>;
    /** Create an SDP answer */
    createAnswer: (
        options?: RTCAnswerOptions,
    ) => Promise<RTCSessionDescriptionInit | null>;
    /** Set the local description */
    setLocalDescription: (desc: RTCSessionDescriptionInit) => Promise<boolean>;
    /** Set the remote description */
    setRemoteDescription: (desc: RTCSessionDescriptionInit) => Promise<boolean>;
    /** Add an ICE candidate */
    addIceCandidate: (candidate: RTCIceCandidateInit) => Promise<boolean>;
    /** Add a track to the connection */
    addTrack: (
        track: MediaStreamTrack,
        ...streams: MediaStream[]
    ) => RTCRtpSender | null;
    /** Remove a track sender */
    removeTrack: (sender: RTCRtpSender) => void;
    /** Create a data channel */
    createDataChannel: (
        label: string,
        options?: RTCDataChannelInit,
    ) => RTCDataChannel | null;
    /** Close the connection */
    close: () => void;
    /** Restart ICE */
    restartIce: () => void;
}

const DEFAULT_ICE_SERVERS: IceServer[] = [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
];

/**
 * A React hook for managing RTCPeerConnection lifecycle.
 * Handles SDP negotiation, ICE candidates, and media tracks.
 *
 * @param options - Configuration options for the peer connection
 * @returns UsePeerConnectionReturn object with connection, states, and methods
 *
 * @example
 * ```tsx
 * const {
 *     peerConnection,
 *     connectionState,
 *     createOffer,
 *     setRemoteDescription,
 *     addIceCandidate,
 *     addTrack,
 * } = usePeerConnection({
 *     onIceCandidate: (candidate) => sendToRemote(candidate),
 *     onTrack: (event) => setRemoteStream(event.streams[0]),
 * });
 *
 * // Create and send offer
 * const offer = await createOffer();
 * sendToRemote({ type: "offer", sdp: offer });
 * ```
 */
export function usePeerConnection(
    options: UsePeerConnectionOptions = {},
): UsePeerConnectionReturn {
    const {
        iceServers = DEFAULT_ICE_SERVERS,
        iceTransportPolicy = "all",
        bundlePolicy = "balanced",
        onTrack,
        onIceCandidate,
        onConnectionStateChange,
        onDataChannel,
    } = options;

    const [peerConnection, setPeerConnection] =
        useState<RTCPeerConnection | null>(null);
    const [connectionState, setConnectionState] =
        useState<RTCPeerConnectionState>("new");
    const [iceConnectionState, setIceConnectionState] =
        useState<RTCIceConnectionState>("new");
    const [iceGatheringState, setIceGatheringState] =
        useState<RTCIceGatheringState>("new");
    const [signalingState, setSignalingState] =
        useState<RTCSignalingState>("stable");
    const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);

    // Store callbacks in refs to avoid dependency issues
    const onTrackRef = useRef(onTrack);
    const onIceCandidateRef = useRef(onIceCandidate);
    const onConnectionStateChangeRef = useRef(onConnectionStateChange);
    const onDataChannelRef = useRef(onDataChannel);

    onTrackRef.current = onTrack;
    onIceCandidateRef.current = onIceCandidate;
    onConnectionStateChangeRef.current = onConnectionStateChange;
    onDataChannelRef.current = onDataChannel;

    // Check if API is supported
    const isSupported =
        typeof window !== "undefined" && "RTCPeerConnection" in window;

    // Initialize peer connection
    useEffect(() => {
        if (!isSupported) return;

        const pc = new RTCPeerConnection({
            iceServers,
            iceTransportPolicy,
            bundlePolicy,
        });

        // Event handlers
        pc.onconnectionstatechange = () => {
            setConnectionState(pc.connectionState);
            onConnectionStateChangeRef.current?.(pc.connectionState);
        };

        pc.oniceconnectionstatechange = () => {
            setIceConnectionState(pc.iceConnectionState);
        };

        pc.onicegatheringstatechange = () => {
            setIceGatheringState(pc.iceGatheringState);
        };

        pc.onsignalingstatechange = () => {
            setSignalingState(pc.signalingState);
        };

        pc.onicecandidate = (event) => {
            onIceCandidateRef.current?.(event.candidate);
        };

        pc.ontrack = (event) => {
            onTrackRef.current?.(event);
            setRemoteStreams((prev) => {
                const newStreams = event.streams.filter(
                    (s) => !prev.some((p) => p.id === s.id),
                );
                return [...prev, ...newStreams];
            });
        };

        pc.ondatachannel = (event) => {
            onDataChannelRef.current?.(event.channel);
        };

        setPeerConnection(pc);

        return () => {
            pc.close();
        };
    }, [isSupported, iceTransportPolicy, bundlePolicy]); // eslint-disable-line react-hooks/exhaustive-deps

    // Create offer
    const createOffer = useCallback(
        async (
            offerOptions?: RTCOfferOptions,
        ): Promise<RTCSessionDescriptionInit | null> => {
            if (!peerConnection || peerConnection.signalingState === "closed")
                return null;

            try {
                const offer = await peerConnection.createOffer(offerOptions);
                await peerConnection.setLocalDescription(offer);
                return offer;
            } catch (err) {
                console.error("Failed to create offer:", err);
                return null;
            }
        },
        [peerConnection],
    );

    // Create answer
    const createAnswer = useCallback(
        async (
            answerOptions?: RTCAnswerOptions,
        ): Promise<RTCSessionDescriptionInit | null> => {
            if (!peerConnection || peerConnection.signalingState === "closed")
                return null;

            try {
                const answer = await peerConnection.createAnswer(answerOptions);
                await peerConnection.setLocalDescription(answer);
                return answer;
            } catch (err) {
                console.error("Failed to create answer:", err);
                return null;
            }
        },
        [peerConnection],
    );

    // Set local description
    const setLocalDescription = useCallback(
        async (desc: RTCSessionDescriptionInit): Promise<boolean> => {
            if (!peerConnection || peerConnection.signalingState === "closed")
                return false;

            try {
                await peerConnection.setLocalDescription(desc);
                return true;
            } catch (err) {
                console.error("Failed to set local description:", err);
                return false;
            }
        },
        [peerConnection],
    );

    // Set remote description
    const setRemoteDescription = useCallback(
        async (desc: RTCSessionDescriptionInit): Promise<boolean> => {
            if (!peerConnection || peerConnection.signalingState === "closed")
                return false;

            try {
                await peerConnection.setRemoteDescription(
                    new RTCSessionDescription(desc),
                );
                return true;
            } catch (err) {
                console.error("Failed to set remote description:", err);
                return false;
            }
        },
        [peerConnection],
    );

    // Add ICE candidate
    const addIceCandidate = useCallback(
        async (candidate: RTCIceCandidateInit): Promise<boolean> => {
            if (!peerConnection || peerConnection.signalingState === "closed")
                return false;

            try {
                await peerConnection.addIceCandidate(
                    new RTCIceCandidate(candidate),
                );
                return true;
            } catch (err) {
                console.error("Failed to add ICE candidate:", err);
                return false;
            }
        },
        [peerConnection],
    );

    // Add track
    const addTrack = useCallback(
        (
            track: MediaStreamTrack,
            ...streams: MediaStream[]
        ): RTCRtpSender | null => {
            if (!peerConnection) return null;

            // Check if track already exists
            const senders = peerConnection.getSenders();
            const existingSender = senders.find((s) => s.track === track);
            if (existingSender) {
                return existingSender;
            }

            try {
                return peerConnection.addTrack(track, ...streams);
            } catch (err) {
                console.error("Failed to add track:", err);
                return null;
            }
        },
        [peerConnection],
    );

    // Remove track
    const removeTrack = useCallback(
        (sender: RTCRtpSender): void => {
            if (!peerConnection) return;

            try {
                peerConnection.removeTrack(sender);
            } catch (err) {
                console.error("Failed to remove track:", err);
            }
        },
        [peerConnection],
    );

    // Create data channel
    const createDataChannel = useCallback(
        (
            label: string,
            channelOptions?: RTCDataChannelInit,
        ): RTCDataChannel | null => {
            if (!peerConnection) return null;

            try {
                return peerConnection.createDataChannel(label, channelOptions);
            } catch (err) {
                console.error("Failed to create data channel:", err);
                return null;
            }
        },
        [peerConnection],
    );

    // Close connection
    const close = useCallback(() => {
        if (peerConnection) {
            peerConnection.close();
        }
        setRemoteStreams([]);
    }, [peerConnection]);

    // Restart ICE
    const restartIce = useCallback(() => {
        if (peerConnection) {
            peerConnection.restartIce();
        }
    }, [peerConnection]);

    return {
        peerConnection,
        connectionState,
        iceConnectionState,
        iceGatheringState,
        signalingState,
        localDescription: peerConnection?.localDescription ?? null,
        remoteDescription: peerConnection?.remoteDescription ?? null,
        remoteStreams,
        isSupported,
        createOffer,
        createAnswer,
        setLocalDescription,
        setRemoteDescription,
        addIceCandidate,
        addTrack,
        removeTrack,
        createDataChannel,
        close,
        restartIce,
    };
}

export default usePeerConnection;
