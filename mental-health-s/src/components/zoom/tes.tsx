import React from 'react';
import { ZoomMtg } from "@zoom/meetingsdk";

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

const ZoomMeeting = () => {
    const authEndpoint = ""; // Your authentication endpoint
    const sdkKey = ""; // Your Zoom SDK Key
    const meetingNumber = ""; // Meeting Number
    const passWord = ""; // Meeting Password
    const role = 0; // 0 for participant, 1 for host
    const userName = "React"; // User name
    const userEmail = ""; // User email
    const registrantToken = ""; // Registrant token if required
    const zakToken = ""; // ZAK token if required
    const leaveUrl = "http://localhost:5173"; // URL to redirect after leaving the meeting

    const getSignature = async () => {
        try {
            const req = await fetch(authEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    meetingNumber: meetingNumber,
                    role: role,
                }),
            });
            const res = await req.json();
            const signature = res.signature as string;
            startMeeting(signature);
        } catch (error) {
            console.error("Error fetching signature:", error);
        }
    };

    const startMeeting = (signature: string) => {
        document.getElementById("zmmtg-root")!.style.display = "block";

        ZoomMtg.init({
            leaveUrl: leaveUrl,
            patchJsMedia: true,
            leaveOnPageUnload: true,
            success: () => {
                ZoomMtg.join({
                    signature: signature,
                    sdkKey: sdkKey,
                    meetingNumber: meetingNumber,
                    passWord: passWord,
                    userName: userName,
                    userEmail: userEmail,
                    tk: registrantToken,
                    zak: zakToken,
                    /* eslint-disable  @typescript-eslint/no-explicit-any */
                    success: (success: any) => {
                        console.log("Successfully joined meeting:", success);
                    },
                    error: (error: any) => {
                        console.error("Error joining meeting:", error);
                    },
                });
            },
            error: (error: any) => {
                console.error("Error initializing Zoom SDK:", error);
            },
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="mb-4 text-2xl font-bold text-gray-800">Zoom Meeting SDK Sample</h1>
            <button
                onClick={getSignature}
                className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
            >
                Join Meeting
            </button>
            <div id="zmmtg-root" className="hidden"></div>
        </div>
    );
};

export default ZoomMeeting;




