// ===============================
// NRI Virtual Study Room
// app.js
// ===============================

// Video Grid
const videoGrid = document.getElementById("videoGrid");

// Add Participant Tile
function addParticipant(name) {

    const tile = document.createElement("div");

    tile.className = "video-tile";

    tile.innerHTML = `
        <div class="participant-info">
            <h5>${name}</h5>
            <span class="online-dot"></span>
        </div>
    `;

    videoGrid.appendChild(tile);
}

// Show current user
addParticipant("You");

// ===============================
// Camera + Microphone Access
// ===============================

let localStream;

async function startMedia() {

    try {

        localStream =
        await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });

        console.log("Camera and Microphone Enabled");

    } catch (error) {

        console.error(error);

        alert(
            "Please allow Camera and Microphone access."
        );
    }
}

startMedia();

// ===============================
// Screen Sharing
// ===============================

const screenBtn =
document.getElementById("screenBtn");

if(screenBtn){

screenBtn.addEventListener(
"click",
async () => {

    try {

        const screenStream =
        await navigator.mediaDevices.getDisplayMedia({
            video:true
        });

        console.log(
            "Screen Sharing Started"
        );

    } catch(error){

        console.error(error);

    }

});
}

// ===============================
// Mic Toggle
// ===============================

const micBtn =
document.getElementById("micBtn");

let micEnabled = true;

if(micBtn){

micBtn.addEventListener(
"click",
() => {

    if(!localStream) return;

    localStream
    .getAudioTracks()
    .forEach(track => {

        track.enabled =
        !track.enabled;

        micEnabled =
        track.enabled;

    });

    micBtn.innerHTML =
    micEnabled ?
    "🎤 Mic On" :
    "🔇 Mic Off";

});
}

// ===============================
// Camera Toggle
// ===============================

const camBtn =
document.getElementById("camBtn");

let camEnabled = true;

if(camBtn){

camBtn.addEventListener(
"click",
() => {

    if(!localStream) return;

    localStream
    .getVideoTracks()
    .forEach(track => {

        track.enabled =
        !track.enabled;

        camEnabled =
        track.enabled;

    });

    camBtn.innerHTML =
    camEnabled ?
    "📷 Camera On" :
    "🚫 Camera Off";

});
}

// ===============================
// Leave Room
// ===============================

const leaveBtn =
document.getElementById("leaveBtn");

if(leaveBtn){

leaveBtn.addEventListener(
"click",
() => {

    const confirmLeave =
    confirm(
        "Leave Study Room?"
    );

    if(confirmLeave){

        window.location.href =
        "index.html";

    }

});
}

// ===============================
// Demo Participants
// Remove after Socket.IO
// ===============================

setTimeout(() => {
    addParticipant("Student");
}, 2000);

setTimeout(() => {
    addParticipant("New Participant");
}, 4000);