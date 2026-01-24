"use client";

import { useState, useRef } from "react";
import { usePeerConnection } from "@repo/hooks/webrtc/use-peer-connection";
import { useDataChannel } from "@repo/hooks/webrtc/use-data-channel";
import { Button } from "@repo/ui/components/button";
import {
    Copy,
    Check,
    Send,
    ArrowRight,
    MessageSquare,
    Clipboard,
} from "lucide-react";

/**
 * CROSS-TAB CHAT - Tab B (Callee/Answerer)
 *
 * Instructions:
 * 1. Paste the Offer SDP from Tab A
 * 2. Click "Create Answer" - this generates your answer SDP
 * 3. Copy the answer and paste it back in Tab A
 * 4. Now you can chat between tabs!
 */
export const Example2 = () => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [offerInput, setOfferInput] = useState("");
    const [answerSdp, setAnswerSdp] = useState("");
    const [copied, setCopied] = useState(false);
    const [message, setMessage] = useState("");
    const [iceCandidates, setIceCandidates] = useState<RTCIceCandidateInit[]>(
        [],
    );
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Peer connection (as the callee/answerer)
    const {
        peerConnection,
        connectionState,
        setRemoteDescription,
        createAnswer,
        addIceCandidate,
    } = usePeerConnection({
        onIceCandidate: (candidate) => {
            if (candidate) {
                setIceCandidates((prev) => [...prev, candidate.toJSON()]);
            }
        },
    });

    // Data channel (receive from offerer)
    const { send, messages, isOpen } = useDataChannel(peerConnection, {
        label: "chat",
        autoCreate: false, // We receive the channel from the offerer
    });

    // Step 1: Set Remote Offer and Create Answer
    const handleCreateAnswer = async () => {
        try {
            const parsed = JSON.parse(offerInput);

            // Set remote description (the offer)
            await setRemoteDescription(parsed.sdp);

            // Add ICE candidates from offer
            if (parsed.ice && Array.isArray(parsed.ice)) {
                for (const ice of parsed.ice) {
                    await addIceCandidate(ice);
                }
            }

            // Create answer
            const answer = await createAnswer();
            if (answer) {
                // Wait for ICE gathering
                await new Promise((resolve) => setTimeout(resolve, 1000));
                const fullAnswer = {
                    sdp: peerConnection?.localDescription,
                    ice: iceCandidates,
                };
                setAnswerSdp(JSON.stringify(fullAnswer, null, 2));
                setStep(2);
            }
        } catch {
            alert(
                "Invalid offer format. Make sure to paste the complete JSON from Tab A.",
            );
        }
    };

    // Copy SDP to clipboard
    const handleCopy = async () => {
        await navigator.clipboard.writeText(answerSdp);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Move to chat step
    const goToChat = () => {
        setStep(3);
    };

    // Send message
    const handleSend = () => {
        if (message.trim() && isOpen) {
            send(`Tab B: ${message}`);
            setMessage("");
        }
    };

    return (
        <div className="flex w-full max-w-lg flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
                        TAB B
                    </div>
                    <span className="text-sm font-medium">
                        Callee (Receives Offer)
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

            {/* Step 1: Paste Offer */}
            {step === 1 && (
                <div className="rounded-lg border p-4">
                    <h3 className="mb-2 font-medium">
                        Step 1: Paste Offer from Tab A
                    </h3>
                    <p className="text-muted-foreground mb-2 text-sm">
                        Copy the offer SDP from Tab A and paste it here.
                    </p>
                    <textarea
                        value={offerInput}
                        onChange={(e) => setOfferInput(e.target.value)}
                        placeholder="Paste the offer JSON here..."
                        className="bg-background mb-3 h-32 w-full rounded-md border p-2 font-mono text-xs"
                    />
                    <Button
                        onClick={handleCreateAnswer}
                        isDisabled={!offerInput.trim()}
                    >
                        <Clipboard className="mr-1 h-4 w-4" />
                        Create Answer
                    </Button>
                </div>
            )}

            {/* Step 2: Share Answer */}
            {step === 2 && (
                <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                            <h3 className="font-medium">
                                Your Answer (Copy This)
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
                            {answerSdp.slice(0, 500)}...
                        </pre>
                        <p className="text-muted-foreground mt-3 text-sm">
                            Copy this answer and paste it in Tab A, then click
                            below to start chatting.
                        </p>
                    </div>
                    <Button onClick={goToChat} className="w-full">
                        <ArrowRight className="mr-1 h-4 w-4" />
                        Go to Chat
                    </Button>
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
                                        String(msg.data).startsWith("Tab B")
                                            ? "ml-auto bg-green-500 text-white"
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
            <div className="text-muted-foreground rounded-lg bg-green-50 p-3 text-xs dark:bg-green-950/30">
                <strong className="text-green-600 dark:text-green-400">
                    This is Tab B (Callee):
                </strong>
                <ol className="mt-1 list-inside list-decimal space-y-0.5">
                    <li>Paste the offer from Tab A above</li>
                    <li>Click &quot;Create Answer&quot;</li>
                    <li>Copy your answer and paste it in Tab A</li>
                    <li>Click &quot;Go to Chat&quot; and start messaging!</li>
                </ol>
            </div>
        </div>
    );
};
