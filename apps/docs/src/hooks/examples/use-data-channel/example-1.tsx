"use client";

import { useState, useRef } from "react";
import { usePeerConnection } from "@repo/hooks/webrtc/use-peer-connection";
import { useDataChannel } from "@repo/hooks/webrtc/use-data-channel";
import { Button } from "@repo/ui/components/button";
import { Copy, Check, Send, ArrowRight, MessageSquare } from "lucide-react";

/**
 * CROSS-TAB CHAT - Tab A (Caller/Offerer)
 *
 * Instructions:
 * 1. Click "Create Offer" - this generates your offer SDP
 * 2. Copy the SDP and paste it in another tab's "Paste Offer" box
 * 3. Copy the Answer SDP from that tab and paste it here
 * 4. Now you can chat between tabs!
 */
export const Example1 = () => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [offerSdp, setOfferSdp] = useState("");
    const [answerInput, setAnswerInput] = useState("");
    const [copied, setCopied] = useState(false);
    const [message, setMessage] = useState("");
    const [iceCandidates, setIceCandidates] = useState<RTCIceCandidateInit[]>(
        [],
    );
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Peer connection (as the caller/offerer)
    const {
        peerConnection,
        connectionState,
        createOffer,
        setRemoteDescription,
        addIceCandidate,
    } = usePeerConnection({
        onIceCandidate: (candidate) => {
            if (candidate) {
                setIceCandidates((prev) => [...prev, candidate.toJSON()]);
            }
        },
    });

    // Data channel
    const { send, messages, isOpen } = useDataChannel(peerConnection, {
        label: "chat",
        autoCreate: true,
    });

    // Step 1: Create Offer
    const handleCreateOffer = async () => {
        const offer = await createOffer();
        if (offer) {
            // Wait a moment for ICE gathering to complete
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const fullOffer = {
                sdp: peerConnection?.localDescription,
                ice: iceCandidates,
            };
            setOfferSdp(JSON.stringify(fullOffer, null, 2));
            setStep(2);
        }
    };

    // Step 2: Set Remote Answer
    const handleSetAnswer = async () => {
        try {
            const parsed = JSON.parse(answerInput);
            await setRemoteDescription(parsed.sdp);

            // Add ICE candidates
            if (parsed.ice && Array.isArray(parsed.ice)) {
                for (const ice of parsed.ice) {
                    await addIceCandidate(ice);
                }
            }
            setStep(3);
        } catch {
            alert(
                "Invalid answer format. Make sure to paste the complete JSON.",
            );
        }
    };

    // Copy SDP to clipboard
    const handleCopy = async () => {
        await navigator.clipboard.writeText(offerSdp);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Send message
    const handleSend = () => {
        if (message.trim() && isOpen) {
            send(`Tab A: ${message}`);
            setMessage("");
        }
    };

    return (
        <div className="flex w-full max-w-lg flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white">
                        TAB A
                    </div>
                    <span className="text-sm font-medium">
                        Caller (Creates Offer)
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

            {/* Step 1: Create Offer */}
            {step === 1 && (
                <div className="rounded-lg border p-4">
                    <h3 className="mb-2 font-medium">Step 1: Create Offer</h3>
                    <p className="text-muted-foreground mb-3 text-sm">
                        Click the button to generate an SDP offer. You&apos;ll
                        copy this and paste it in Tab B.
                    </p>
                    <Button onClick={handleCreateOffer}>Create Offer</Button>
                </div>
            )}

            {/* Step 2: Share Offer & Get Answer */}
            {step === 2 && (
                <div className="space-y-4">
                    {/* Generated Offer */}
                    <div className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                            <h3 className="font-medium">
                                Your Offer (Copy This)
                            </h3>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCopy}
                                className="gap-1"
                            >
                                {copied ? (
                                    <Check className="h-3 w-3" />
                                ) : (
                                    <Copy className="h-3 w-3" />
                                )}
                                {copied ? "Copied!" : "Copy"}
                            </Button>
                        </div>
                        <pre className="max-h-32 overflow-auto rounded bg-zinc-100 p-2 text-xs dark:bg-zinc-900">
                            {offerSdp.slice(0, 500)}...
                        </pre>
                    </div>

                    {/* Paste Answer */}
                    <div className="rounded-lg border p-4">
                        <h3 className="mb-2 font-medium">
                            Paste Answer from Tab B
                        </h3>
                        <p className="text-muted-foreground mb-2 text-sm">
                            After pasting the offer in Tab B, copy the answer
                            and paste it here.
                        </p>
                        <textarea
                            value={answerInput}
                            onChange={(e) => setAnswerInput(e.target.value)}
                            placeholder="Paste the answer JSON here..."
                            className="bg-background mb-2 h-24 w-full rounded-md border p-2 font-mono text-xs"
                        />
                        <Button
                            onClick={handleSetAnswer}
                            isDisabled={!answerInput.trim()}
                        >
                            <ArrowRight className="mr-1 h-4 w-4" />
                            Connect
                        </Button>
                    </div>
                </div>
            )}

            {/* Step 3: Chat */}
            {step === 3 && (
                <div className="space-y-3">
                    {/* Messages */}
                    <div className="flex h-48 flex-col gap-1 overflow-y-auto rounded-lg border bg-zinc-50 p-3 dark:bg-zinc-900">
                        {messages.length === 0 ? (
                            <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                {isOpen
                                    ? "Connected! Send a message."
                                    : "Waiting for connection..."}
                            </div>
                        ) : (
                            messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`rounded px-2 py-1 text-sm ${
                                        String(msg.data).startsWith("Tab A")
                                            ? "ml-auto bg-blue-500 text-white"
                                            : "bg-white dark:bg-zinc-800"
                                    }`}
                                >
                                    {String(msg.data)}
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Type a message..."
                            className="bg-background flex-1 rounded-md border px-3 py-2 text-sm"
                            disabled={!isOpen}
                        />
                        <Button
                            size="icon"
                            onClick={handleSend}
                            isDisabled={!isOpen || !message.trim()}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Instructions */}
            <div className="text-muted-foreground rounded-lg bg-blue-50 p-3 text-xs dark:bg-blue-950/30">
                <strong className="text-blue-600 dark:text-blue-400">
                    How to test:
                </strong>
                <ol className="mt-1 list-inside list-decimal space-y-0.5">
                    <li>Open this example in two tabs side by side</li>
                    <li>
                        In Tab A: Click &quot;Create Offer&quot; and copy the
                        SDP
                    </li>
                    <li>
                        In Tab B: Paste the SDP and click &quot;Create
                        Answer&quot;
                    </li>
                    <li>Copy Tab B&apos;s answer and paste in Tab A</li>
                    <li>Chat between tabs!</li>
                </ol>
            </div>
        </div>
    );
};
