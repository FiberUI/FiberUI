"use client";

import { usePictureInPicture } from "@repo/hooks/utility/use-picture-in-picture";
import { Button } from "@repo/ui/components/button";
import { PictureInPicture, X } from "lucide-react";
import { useRef } from "react";

export function Example1() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { isActive, isSupported, toggle } = usePictureInPicture();

    return (
        <div className="flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-xl bg-black shadow-lg">
                <video
                    ref={videoRef}
                    className="aspect-video w-full"
                    src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                    controls
                    loop
                />

                {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white">
                        <div className="text-center">
                            <PictureInPicture className="mx-auto mb-2 h-12 w-12 opacity-50" />
                            <p className="font-medium">
                                Playing in Picture-in-Picture
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-2">
                {!isSupported && (
                    <div className="rounded bg-yellow-100 p-2 text-sm text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                        Picture-in-Picture is not supported in this browser.
                    </div>
                )}

                <Button
                    onClick={() => videoRef.current && toggle(videoRef.current)}
                    isDisabled={!isSupported}
                    className="gap-2 self-start"
                >
                    {isActive ? (
                        <>
                            <X className="h-4 w-4" />
                            Exit Picture-in-Picture
                        </>
                    ) : (
                        <>
                            <PictureInPicture className="h-4 w-4" />
                            Enter Picture-in-Picture
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
