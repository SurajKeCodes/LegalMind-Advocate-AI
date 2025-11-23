# ⚖️ LegalMind AI

**LegalMind AI** is a professional, multi-agent legal assistant suite designed to democratize access to legal information. Built with **React 19**, **Tailwind CSS**, and the **Google Gemini API**, it features specialized AI personas, real-time case law research, and professional document analysis with "thinking" capabilities.

<!-- 🖼️ Project Screenshot Gallery (GitHub Safe) -->
<h2 align="center">📸 Project Snapshots</h2>

<p align="center">
  <table align="center" border="2" cellspacing="10" cellpadding="10" style="border-color:#00FFFF;">
    <tr>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/4c11ea5e-8abc-4e60-a8b9-6a22066e4707" alt="Screenshot 1" width="400"/>
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/e0e0e724-d242-49cb-a4f1-8ac52778bd0e" alt="Screenshot 2" width="400"/>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/b35d874a-801b-4b3c-929c-16b5442bddda" alt="Screenshot 3" width="400"/>
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/8bbaf299-0169-4128-9a02-dff91716f521" alt="Screenshot 4" width="400"/>
      </td>
    </tr>
  </table>
</p>



## ✨ Key Features

### 🤖 Specialized Legal Personas
LegalMind AI replaces generic chatbots with 10 specialized expert agents, each capable of handling specific legal domains:

*   **General Counsel**: For high-level legal concepts and advice.
*   **🔍 Case Law Researcher**: **Internet-connected** agent that searches for real-world case law, statutes (IPC/CrPC), and recent amendments.
*   **👮 Criminal Defense**: Urgent assistance regarding arrests, bail, FIRs, and rights against self-incrimination.
*   **📝 Contract Drafter**: Expert in drafting clauses, reviewing agreements, and identifying ambiguity.
*   **🏠 Real Estate**: Handles property disputes, RERA compliance, and rent agreements.
*   **Startup Specialist**: Advice on incorporation, equity splits, and IP protection.
*   *(Plus: Litigator, Family Law, Immigration, and Consumer Rights)*

### 🌐 Native Multilingual Support (India-Centric)
The AI is instructed to be fluent in **English**, **Hindi (हिंदी)**, and **Marathi (मराठी)**.
*   **Contextual Translation**: Instantly translate legal advice into local languages.
*   **Jargon Simplification**: Automatically explains complex legal terms (e.g., "Habeas Corpus") in simple language.

### 📄 Pro Document Analyzer
A dedicated mode for auditing legal documents using **Gemini 3.0 Pro**:
*   **Deep Reasoning**: Uses a `thinkingBudget` of 1024 tokens to perform deep logical analysis.
*   **Risk Detection**: Paste contracts or notices to identify loopholes and liability risks.
*   **Analysis Tools**: Pre-set prompts to "Find Loopholes", "Translate to Plain English", or "Check for Missing Clauses".

### 🎨 Modern "Glassmorphism" UI
*   **Visuals**: Dark-themed interface with ambient glows, blur effects, and smooth layout transitions.
*   **Animations**: Custom CSS animations for typing indicators, fade-ins, and staggered list reveals.
*   **Markdown Rendering**: Beautifully formats legal citations, headers, and lists.

---

## 🛠️ Tech Stack

*   **Frontend**: React 19, TypeScript
*   **Styling**: Tailwind CSS (Utility-first styling), Custom CSS Keyframes
*   **AI Models**:
    *   **Chat**: `gemini-2.5-flash` (Fast, efficient, low latency)
    *   **Analysis**: `gemini-3-pro-preview` (High reasoning capability)
*   **SDK**: `@google/genai` (Official Google GenAI SDK)
*   **Build**: Vite

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18 or higher)
*   A Google Gemini API Key (Get one at [aistudio.google.com](https://aistudiocdn.com))

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/legalmind-ai.git
    cd legalmind-ai
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory:
    ```env
    API_KEY=your_google_gemini_api_key_here
    ```

4.  **Run the application**
    ```bash
    npm run dev
    ```

---

## 📖 Usage Guide

### 1. The Sidebar
Use the sidebar to switch between **Tools** (Chat vs. Document Analyst) and **Specialists**.
*   **Tools**: Toggle between the chat interface and the document input screen.
*   **Specialists**: Select a persona (e.g., "Criminal Defense") to change the AI's personality and knowledge base instantly.

### 2. Chat Interface
*   **Typing**: Type your query in the input box.
*   **Quick Actions**: Use the pill-shaped buttons above the input bar to quickly "Translate to Hindi", "Draft Summary", or "Find Case Law".
*   **Grounding**: If using the **Researcher** persona, the AI will provide links to sources found via Google Search.

### 3. Document Analyzer
1.  Switch to "Document Analyst" mode.
2.  Paste legal text (Contracts, ToS, Notices) into the text area.
3.  Select an analysis goal (e.g., "Find Loopholes").
4.  Click **Analyze Document**. The AI will use the Pro model to generate a structured report.

---

### 🤝 Connect With Me  
<p align="left">
  <a href="https://linkedin.com/in/surajborkute" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
  <a href="mailto:surajborkute@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" />
  </a>
  <a href="https://wa.me/9518772281" target="_blank">
    <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" />
  </a>
  <a href="https://suraj-borkute-portfolio.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  </a>
</p>

---
## 🛡️ Disclaimer
**LegalMind AI is not a lawyer.** The information provided is for educational and informational purposes only. Always consult with a qualified attorney in your jurisdiction for professional legal counsel.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
