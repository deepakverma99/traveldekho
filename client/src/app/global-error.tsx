"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, Compass, CloudRain } from "lucide-react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        Sentry.captureException(error);
    }, [error]);

    return (
        <html lang="en">
            <head>
                <style>{`
          @keyframes ping {
            75%, 100% {
              transform: scale(2);
              opacity: 0;
            }
          }
          @keyframes pulse {
            50% {
              opacity: .7;
              text-shadow: 0px 4px 20px rgba(239,68,68,0.4);
            }
          }
        `}</style>
            </head>
            <body
                style={{
                    margin: 0,
                    backgroundColor: "#FDFBF7",
                    fontFamily: "system-ui, sans-serif",
                }}
            >
                <div
                    style={{
                        minHeight: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <main
                        style={{
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "24px",
                            position: "relative",
                            zIndex: 10,
                        }}
                    >
                        <div
                            style={{
                                maxWidth: "600px",
                                width: "100%",
                                backgroundColor: "rgba(255,255,255,0.8)",
                                backdropFilter: "blur(16px)",
                                border: "1px solid rgba(255,255,255,0.5)",
                                borderRadius: "40px",
                                padding: "56px",
                                boxShadow: "0 20px 60px -15px rgba(0,0,0,0.05)",
                                textAlign: "center",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    padding: "32px",
                                    opacity: 0.05,
                                }}
                            >
                                <Compass size={128} color="#78350f" />
                            </div>
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    padding: "24px",
                                    opacity: 0.05,
                                }}
                            >
                                <CloudRain size={96} color="#111827" />
                            </div>

                            <div
                                style={{
                                    marginBottom: "40px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100%",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        marginBottom: "8px",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "relative",
                                            display: "flex",
                                            height: "16px",
                                            width: "16px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                animation:
                                                    "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                                                position: "absolute",
                                                display: "inline-flex",
                                                height: "100%",
                                                width: "100%",
                                                borderRadius: "50%",
                                                backgroundColor: "#f87171",
                                                opacity: 0.75,
                                            }}
                                        ></div>
                                        <div
                                            style={{
                                                position: "relative",
                                                display: "inline-flex",
                                                borderRadius: "50%",
                                                height: "16px",
                                                width: "16px",
                                                backgroundColor: "#ef4444",
                                            }}
                                        ></div>
                                    </div>
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "bold",
                                            color: "#ef4444",
                                            letterSpacing: "0.1em",
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        System Offline
                                    </span>
                                </div>

                                <div
                                    style={{
                                        fontSize: "48px",
                                        fontWeight: 900,
                                        letterSpacing: "-0.05em",
                                        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "#030712",
                                            fontFamily: "system-ui, sans-serif",
                                        }}
                                    >
                                        Travel
                                    </span>
                                    <span
                                        style={{
                                            color: "#f59e0b",
                                            fontFamily: "system-ui, sans-serif",
                                        }}
                                    >
                                        Dekho
                                    </span>
                                </div>
                            </div>

                            <h1
                                style={{
                                    fontSize: "36px",
                                    fontWeight: 900,
                                    color: "#030712",
                                    marginBottom: "16px",
                                    letterSpacing: "-0.025em",
                                    textTransform: "uppercase",
                                }}
                            >
                                System <span style={{ color: "#ef4444" }}>Failure</span>
                            </h1>

                            <p
                                style={{
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    color: "#6b7280",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    marginBottom: "40px",
                                    lineHeight: 1.625,
                                    maxWidth: "384px",
                                    margin: "0 auto 40px",
                                }}
                            >
                                A critical error occurred at the root level. Our engineers have
                                been alerted.
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "16px",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <button
                                    onClick={() => reset()}
                                    style={{
                                        height: "56px",
                                        padding: "0 40px",
                                        fontSize: "16px",
                                        fontWeight: 900,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.1em",
                                        boxShadow: "0 20px 25px -5px rgba(254, 226, 226, 0.5)",
                                        width: "100%",
                                        backgroundColor: "#030712",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "16px",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <RefreshCw style={{ marginRight: "8px" }} size={20} /> Try
                                    Again
                                </button>

                                <Link href="/" style={{ width: "100%", textDecoration: "none" }}>
                                    <button
                                        style={{
                                            height: "56px",
                                            padding: "0 40px",
                                            backgroundColor: "#fbbf24",
                                            color: "#111827",
                                            borderRadius: "16px",
                                            fontWeight: 900,
                                            fontSize: "14px",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.1em",
                                            width: "100%",
                                            border: "none",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            boxShadow: "0 20px 25px -5px rgba(253, 230, 138, 0.5)",
                                        }}
                                    >
                                        <Home style={{ marginRight: "8px" }} size={20} /> Go Home
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </main>
                </div>
            </body>
        </html>
    );
}