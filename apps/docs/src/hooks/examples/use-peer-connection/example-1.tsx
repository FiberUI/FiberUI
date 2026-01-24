"use client";

import { useState, useRef, useEffect } from "react";
import { useUserMedia } from "@repo/hooks/webrtc/use-user-media";
import { usePeerConnection } from "@repo/hooks/webrtc/use-peer-connection";
import { useTrackToggle } from "@repo/hooks/webrtc/use-track-toggle";
import { Button } from "@repo/ui/components/button";
import {
    Copy,
    Check,
    ArrowRight,
    Video,
    VideoOff,
    Mic,
    MicOff,
    RotateCcw,
} from "lucide-react";

/**
 * REMOTE VIDEO CALL - Tab A (Caller)
 */
export const Example1 = () => {
    const [key, setKey] = useState(0);

    const handleReset = () => {
        setKey((k) => k + 1);
    };

    return <CallerComponent key={key} onReset={handleReset} />;
};

const CallerComponent = ({ onReset }: { onReset: () => void }) => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [offerSdp, setOfferSdp] = useState("");
    const [answerInput, setAnswerInput] = useState("");
    const [copied, setCopied] = useState(false);
    const [isStartingCall, setIsStartingCall] = useState(false);
    const [iceCandidates, setIceCandidates] = useState<RTCIceCandidateInit[]>(
        [],
    );

    // Video refs
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    // 1. Get User Media
    const {
        stream: localStream,
        start: startCamera,
        stop: stopCamera,
        isActive,
    } = useUserMedia();

    // 2. Mute Controls
    const { isAudioEnabled, isVideoEnabled, toggleAudio, toggleVideo } =
        useTrackToggle(localStream);

    // 3. Peer Connection (Caller)
    const {
        peerConnection,
        connectionState,
        createOffer,
        setRemoteDescription,
        addIceCandidate,
        addTrack,
        close: closeConnection,
    } = usePeerConnection({
        onIceCandidate: (candidate) => {
            if (candidate) {
                setIceCandidates((prev) => [...prev, candidate.toJSON()]);
            }
        },
        onTrack: (event) => {
            if (remoteVideoRef.current && event.streams[0]) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        },
    });

    // Attach local stream
    useEffect(() => {
        if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    // Create Offer
    const handleCreateOffer = async () => {
        setIsStartingCall(true);
        if (!localStream) {
            await startCamera();
        }
    };

    // Effect to create offer once stream is ready
    useEffect(() => {
        const create = async () => {
            if (isStartingCall && localStream) {
                // Add tracks
                localStream.getTracks().forEach((track) => {
                    addTrack(track, localStream);
                });

                // Create offer
                const offer = await createOffer();
                if (offer) {
                    // Wait for ICE gathering
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    const fullOffer = {
                        sdp: peerConnection?.localDescription,
                        ice: iceCandidates,
                    };
                    setOfferSdp(JSON.stringify(fullOffer, null, 2));
                    setStep(2);
                    setIsStartingCall(false);
                }
            }
        };

        void create();
    }, [
        isStartingCall,
        localStream,
        createOffer,
        peerConnection,
        iceCandidates,
        addTrack,
    ]);

    // Set Remote Answer
    const handleSetAnswer = async () => {
        try {
            const parsed = JSON.parse(answerInput);

            // Handle wrapper format
            const description = parsed.sdp || parsed;
            await setRemoteDescription(description);

            // Add ICE candidates
            if (parsed.ice && Array.isArray(parsed.ice)) {
                for (const ice of parsed.ice) {
                    await addIceCandidate(ice);
                }
            }
            setStep(3);
        } catch {
            alert("Invalid answer format.");
        }
    };

    // Utils
    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex w-full max-w-2xl flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white">
                        TAB A
                    </div>
                    <span className="text-sm font-medium">
                        Caller (Starts Call)
                    </span>
                </div>
                <div
                    className={`rounded-full px-2 py-0.5 text-xs ${
                        connectionState === "connected"
                            ? "bg-green-500/20 text-green-600"
                            : "bg-yellow-500/20 text-yellow-600"
                    }`}
                >
                    {connectionState}
                </div>
            </div>

            {/* Video Grid */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* Local Video */}
                <div className="relative aspect-video overflow-hidden rounded-lg bg-zinc-900">
                    {isActive && isVideoEnabled ? (
                        <video
                            ref={localVideoRef}
                            autoPlay
                            playsInline
                            muted
                            className="h-full w-full scale-x-[-1] object-cover"
                        />
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-2 text-zinc-500">
                            <VideoOff className="h-8 w-8" />
                            <span className="text-xs">
                                {isActive ? "Camera Off" : "Not Started"}
                            </span>
                        </div>
                    )}
                    <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
                        You
                    </span>

                    {/* Controls Overlay */}
                    {isActive && (
                        <div className="absolute bottom-2 right-2 flex gap-1">
                            <Button
                                size="icon"
                                variant={
                                    isAudioEnabled ? "secondary" : "destructive"
                                }
                                className="h-6 w-6"
                                onClick={toggleAudio}
                            >
                                {isAudioEnabled ? (
                                    <Mic className="h-3 w-3" />
                                ) : (
                                    <MicOff className="h-3 w-3" />
                                )}
                            </Button>
                            <Button
                                size="icon"
                                variant={
                                    isVideoEnabled ? "secondary" : "destructive"
                                }
                                className="h-6 w-6"
                                onClick={toggleVideo}
                            >
                                {isVideoEnabled ? (
                                    <Video className="h-3 w-3" />
                                ) : (
                                    <VideoOff className="h-3 w-3" />
                                )}
                            </Button>
                        </div>
                    )}
                </div>

                {/* Remote Video */}
                <div className="relative aspect-video overflow-hidden rounded-lg bg-zinc-900">
                    <video
                        ref={remoteVideoRef}
                        autoPlay
                        playsInline
                        className="h-full w-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
                        Remote
                    </span>
                    {connectionState !== "connected" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <span className="text-sm text-white">
                                {connectionState === "disconnected"
                                    ? "Peer Disconnected"
                                    : "Waiting for connection..."}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Workflow Steps */}
            <div className="space-y-4 rounded-lg border p-4">
                {step === 1 && (
                    <div className="text-center">
                        <Button
                            onClick={handleCreateOffer}
                            size="lg"
                            className="w-full sm:w-auto"
                        >
                            <Video className="mr-2 h-4 w-4" />
                            {isStartingCall
                                ? "Starting..."
                                : "Start Call (Create Offer)"}
                        </Button>
                        <p className="text-muted-foreground mt-2 text-xs">
                            This will turn on your camera and generate an offer.
                        </p>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label className="text-sm font-medium">
                                    1. Copy Offer (Send to Tab B - Example 2)
                                </label>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => copyToClipboard(offerSdp)}
                                    className="h-7 gap-1"
                                >
                                    {copied ? (
                                        <Check className="h-3 w-3" />
                                    ) : (
                                        <Copy className="h-3 w-3" />
                                    )}
                                    {copied ? "Copied" : "Copy"}
                                </Button>
                            </div>
                            <textarea
                                readOnly
                                value={offerSdp}
                                className="h-24 w-full rounded-md border bg-zinc-50 p-2 font-mono text-xs dark:bg-zinc-900"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                2. Paste Answer (From Tab B)
                            </label>
                            <textarea
                                value={answerInput}
                                onChange={(e) => setAnswerInput(e.target.value)}
                                placeholder="Paste the answer JSON here..."
                                className="bg-background h-24 w-full rounded-md border p-2 font-mono text-xs"
                            />
                        </div>

                        <Button
                            onClick={handleSetAnswer}
                            isDisabled={!answerInput.trim()}
                            className="w-full"
                        >
                            <ArrowRight className="mr-2 h-4 w-4" />
                            Connect Call
                        </Button>
                    </div>
                )}

                {step === 3 && (
                    <div className="flex items-center justify-center gap-2 text-green-600">
                        <Check className="h-5 w-5" />
                        <span className="font-medium">Call Connected!</span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                closeConnection();
                                stopCamera();
                                onReset();
                            }}
                            className="ml-4 gap-1"
                        >
                            <RotateCcw className="h-3 w-3" />
                            End Call
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
