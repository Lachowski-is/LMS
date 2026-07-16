# Learning Management System

An all-in-one, highly secure, AI-powered Learning Management System tailored for educational centers, academies, and private tutors in Egypt. This platform eliminates fragmented workflows (Zoom, WhatsApp groups, manual grading, and unprotected PDFs) by consolidating course delivery, live WebRTC streaming, AI grading infrastructure, and robust anti-piracy tools into a single, white-labeled, tenant-isolated ecosystem.

---

## Key Modules & Architecture

The platform operates on a **Multi-Tenant Isolated Database Architecture**. A single central routing database handles domain mapping, while every rented academy operates on a completely isolated database instance for maximum data security, performance stability, and compliance.

### 1. Classroom Module
Comprehensive learning administration framework mapped to custom user permissions:
* **Admins & Owners:** Full lifecycle course management, multiple teacher assignment per course, manual enrollment override controls, and global performance dashboards.
* **Teachers:** Module/lecture generation, multi-format media upload management (Secure Video Streams, PDFs, PPTX, ZIPs), and custom assessment creation.
* **Students:** Seamless interactive content consumption, progress tracking meters, and instant digital quiz/assignment interfaces.

### 2. Live Meetings (Secured Jitsi Integration)
Native, browser-based live streams designed to replace vulnerable third-party conferencing links:
* **JWT-Authenticated Gated Rooms:** Token-based validation completely blocks unauthorized entry. Students are safely queued in a virtual lobby until a verified teacher token initiates moderator status.
* **Granular Tracking:** Automatic system analytics capturing exact connection points, total attendance duration, and student drop-off behaviors.

### 3. Question Bank & Vision AI Extractor
Automated content creation tooling designed to save hundreds of administrative hours:
* Full question repositories organized by custom subject tags and flexible question types (MCQ, True/False, Written).
* **Vision AI Processing:** Integrated OCR and multimodal LLM processing allowing teachers to snapshot an old physical exam sheet or upload a document to instantly extract, format, and populate the database bank.

### 4. AI Workspace
* **For Educators:** Automated exam blueprinting from criteria tags, alongside an **AI Grading Draft Assistant** that evaluates written submissions, constructs a feedback rationale, and presents a grading draft for rapid teacher verification.
* **For Students (AI Tutor):** A retrieval-augmented generation (RAG) system running embeddings on specific course material (PDFs, DOCX, PPTX). It acts as an isolated, contextual tutor (similar to NotebookLM) restricted *strictly* to the teacher's verified curriculum.

---

## Non-Negotiable Security Framework (Anti-Piracy)

Built intentionally to protect the intellectual property and revenue streams of Egyptian tutors:

* **Strict 1-Device Session Locking:** Redis-backed token validation ensures that if an account logs in on a secondary device, the active session token on the primary device is blacklisted and invalidated in real time.
* **Dynamic Canvas Watermarking:** Injected using a specialized canvas element over video and documents (completely immune to CSS inspector deletion). It places moving, semi-transparent user strings containing the student's **Name, Registered Phone Number, IP Address, and Login Time** to deter hardware recordings.
* **Protected Video & Document Streams:** Encrypted HLS (HTTP Live Streaming) segmentation via FFmpeg prevents standard downloader extensions from grabbing the media cache. Documents are rendered inside isolated HTML5 canvases with right-click and printing shortcuts forcefully blocked.

---

## Analytics & Behavioral Tracking

Data collection uses an optimized websocket/beacon heartbeat mechanism designed to avoid database overhead while gathering precise metrics:
* **Time Tracking:** Real-time visibility tracking pauses time accumulation metrics automatically if the user shifts browser focus or minimizes tabs.
* **Predictive Performance Funnels:** Automatic dashboard flag alerts pinpointing "at-risk" students falling below completion rates or failing core competency quiz tags.

---

## Technology Stack & Requirements

* **Backend Framework:** Node.js (Express/NestJS) or .NET Core Enterprise Engine
* **Database Engine:** Microsoft SQL Server (T-SQL Scripts provided for routing and dynamic tenant creation schemas)
* **Caching & Session Broker:** Redis
* **Streaming Server:** Jitsi Meet Video Bridge (JWT Token Authentication Enabled)
* **Media Management:** FFmpeg for automated HLS transcoding / Bunny.net Storage Delivery API
* **AI Model Pipeline:** Multimodal API integration (Gemini 1.5 Pro / Claude 3.5 Sonnet) alongside a vector DB index for internal RAG lookups.

---

## Getting Started

### Database Provisioning
1. Run the `CentralRoutingDB` script to initialize the base tenant mapper engine on your root cluster.
2. Utilize the database template generation hooks within the backend workflow engine to programmatically spin up isolated instances whenever a new academy registers.
