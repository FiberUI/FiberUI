"use client";

import { useState } from "react";
import { usePeerConnection } from "@repo/hooks/webrtc/use-peer-connection";
import { Button } from "@repo/ui/components/button";
import { Copy, Check, ArrowRight, ArrowDown, RotateCcw } from "lucide-react";

/* MANUAL SIGNALING - Monitor States & Test Connectivity */
export const Example3 = () => {
    // We use a key to force re-mounting of the tester component
    // whenever the role changes or user clicks reset.
    // This ensures we get a fresh RTCPeerConnection instance (since closed PCs cannot be reopened).
    const [testerKey, setTesterKey] = useState(0);
    const [role, setRole] = useState<"offerer" | "answerer">("offerer");

    const handleRoleChange = (newRole: "offerer" | "answerer") => {
        setRole(newRole);
        setTesterKey((k) => k + 1);
    };

    const handleReset = () => {
        setTesterKey((k) => k + 1);
    };

    return (
        <div className="flex w-full max-w-lg flex-col gap-4">
            {/* Header / Mode Selection */}
            <div className="flex items-center justify-between rounded-lg border bg-zinc-50 p-3 dark:bg-zinc-900/50">
                <div className="text-sm font-medium">I want to:</div>
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant={role === "offerer" ? "default" : "outline"}
                        onClick={() => handleRoleChange("offerer")}
                    >
                        Call (Offer)
                    </Button>
                    <Button
                        size="sm"
                        variant={role === "answerer" ? "default" : "outline"}
                        onClick={() => handleRoleChange("answerer")}
                    >
                        Receive (Answer)
                    </Button>
                </div>
            </div>

            <ConnectionTester
                key={`${role}-${testerKey}`}
                role={role}
                onReset={handleReset}
            />
        </div>
    );
};

const ConnectionTester = ({
    role,
    onReset,
}: {
    role: "offerer" | "answerer";
    onReset: () => void;
}) => {
    const [remoteSdp, setRemoteSdp] = useState("");
    const [copied, setCopied] = useState(false);

    // We need to track ICE candidates for the manual copy-paste to work perfectly
    const [iceCandidates, setIceCandidates] = useState<RTCIceCandidateInit[]>(
        [],
    );

    const {
        connectionState,
        iceConnectionState,
        iceGatheringState,
        signalingState,
        localDescription,
        remoteDescription,
        createOffer,
        createAnswer,
        setRemoteDescription,
        addIceCandidate,
    } = usePeerConnection({
        onIceCandidate: (candidate) => {
            if (candidate) {
                setIceCandidates((prev) => [...prev, candidate.toJSON()]);
            }
        },
    });

    const handleCreateLocalDescription = async () => {
        setIceCandidates([]);
        let success = false;

        if (role === "offerer") {
            const offer = await createOffer();
            success = !!offer;
        } else {
            const answer = await createAnswer();
            success = !!answer;
        }

        if (success) {
            // Wait for ICE gathering to have a better chance of a complete SDP
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    };

    const handleSetRemoteDescription = async () => {
        try {
            const parsed = JSON.parse(remoteSdp);

            // Handle both raw SDP and the wrapper format
            // Wrapper: { sdp: RTCSessionDescriptionInit, ice: RTCIceCandidateInit[] }
            const description = parsed.sdp || parsed;

            const success = await setRemoteDescription(description);
            if (!success) {
                alert(
                    "Failed to set remote description. Check console for details.",
                );
                return;
            }

            // If using wrapper format, add ICE candidates
            if (parsed.ice && Array.isArray(parsed.ice)) {
                for (const ice of parsed.ice) {
                    await addIceCandidate(ice);
                }
            }
        } catch (e) {
            console.error(e);
            alert("Invalid SDP JSON. Please paste the full JSON object.");
        }
    };

    const handleCopySDP = async () => {
        if (localDescription) {
            // Bundle SDP + ICE for better compatibility
            const fullData = {
                sdp: localDescription,
                ice: iceCandidates,
            };
            await navigator.clipboard.writeText(
                JSON.stringify(fullData, null, 2),
            );
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const stateColor = (state: string) => {
        switch (state) {
            case "connected":
            case "complete":
            case "stable":
                return "text-green-500";
            case "checking":
            case "new":
            case "have-local-offer":
            case "have-remote-offer":
                return "text-yellow-500";
            case "failed":
            case "disconnected":
            case "closed":
                return "text-red-500";
            default:
                return "text-muted-foreground";
        }
    };

    return (
        <>
            {/* State Grid */}
            <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border p-3">
                    <div className="text-muted-foreground mb-1 text-xs">
                        Connection
                    </div>
                    <div
                        className={`font-mono text-sm ${stateColor(connectionState)}`}
                    >
                        {connectionState}
                    </div>
                </div>
                <div className="rounded-lg border p-3">
                    <div className="text-muted-foreground mb-1 text-xs">
                        ICE State
                    </div>
                    <div
                        className={`font-mono text-sm ${stateColor(iceConnectionState)}`}
                    >
                        {iceConnectionState}
                    </div>
                </div>
                <div className="rounded-lg border p-3">
                    <div className="text-muted-foreground mb-1 text-xs">
                        Gathering
                    </div>
                    <div
                        className={`font-mono text-sm ${stateColor(iceGatheringState)}`}
                    >
                        {iceGatheringState}
                    </div>
                </div>
                <div className="rounded-lg border p-3">
                    <div className="text-muted-foreground mb-1 text-xs">
                        Signaling
                    </div>
                    <div
                        className={`font-mono text-sm ${stateColor(signalingState)}`}
                    >
                        {signalingState}
                    </div>
                </div>
            </div>

            {/* Step 1: Remote SDP Input (Only for Answerer initially) */}
            {role === "answerer" && !remoteDescription && (
                <div className="rounded-lg border p-3">
                    <div className="mb-2 text-sm font-medium">
                        1. Paste Remote Offer
                    </div>
                    <textarea
                        value={remoteSdp}
                        onChange={(e) => setRemoteSdp(e.target.value)}
                        placeholder="Paste Offer JSON from other tab..."
                        className="bg-background h-24 w-full rounded-md border p-2 font-mono text-xs"
                    />
                    <Button
                        onClick={handleSetRemoteDescription}
                        isDisabled={!remoteSdp.trim()}
                        className="mt-2 w-full"
                    >
                        <ArrowDown className="mr-2 h-4 w-4" />
                        Set Remote Offer
                    </Button>
                </div>
            )}

            {/* Step 2: Create Local Description (Offer or Answer) */}
            {((role === "offerer" && !localDescription) ||
                (role === "answerer" &&
                    remoteDescription &&
                    !localDescription)) && (
                <div className="rounded-lg border p-3">
                    <div className="mb-2 text-sm font-medium">
                        {role === "offerer"
                            ? "1. Create Connection Offer"
                            : "2. Generate Answer"}
                    </div>
                    <Button
                        onClick={handleCreateLocalDescription}
                        className="w-full"
                    >
                        {role === "offerer" ? "Create Offer" : "Create Answer"}
                    </Button>
                </div>
            )}

            {/* Display Local SDP */}
            {localDescription && (
                <div className="rounded-lg border bg-blue-50/50 p-3 dark:bg-blue-950/20">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">
                            {role === "offerer"
                                ? "2. Your Offer (Copy This)"
                                : "3. Your Answer (Copy This)"}
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-muted-foreground text-[10px]">
                                {iceCandidates.length} Candidates
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCopySDP}
                                className="h-6 gap-1 px-2 text-xs"
                            >
                                {copied ? (
                                    <Check className="h-3 w-3" />
                                ) : (
                                    <Copy className="h-3 w-3" />
                                )}
                                {copied ? "Copied" : "Copy"}
                            </Button>
                        </div>
                    </div>
                    <div className="text-muted-foreground max-h-32 overflow-y-auto break-all rounded border bg-white p-2 font-mono text-xs dark:bg-black">
                        {JSON.stringify(localDescription)}
                    </div>
                </div>
            )}

            {/* Step 3: Remote SDP Input (Only for Offerer finally) */}
            {role === "offerer" && localDescription && !remoteDescription && (
                <div className="rounded-lg border p-3">
                    <div className="mb-2 text-sm font-medium">
                        3. Paste Remote Answer
                    </div>
                    <textarea
                        value={remoteSdp}
                        onChange={(e) => setRemoteSdp(e.target.value)}
                        placeholder="Paste Answer JSON from other tab..."
                        className="bg-background h-24 w-full rounded-md border p-2 font-mono text-xs"
                    />
                    <Button
                        onClick={handleSetRemoteDescription}
                        isDisabled={!remoteSdp.trim()}
                        className="mt-2 w-full"
                    >
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Connect
                    </Button>
                </div>
            )}

            {/* Reset */}
            <div className="flex justify-end">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onReset}
                    className="text-muted-foreground gap-1 text-xs"
                >
                    <RotateCcw className="h-3 w-3" />
                    Reset Demo
                </Button>
            </div>
        </>
    );
};
