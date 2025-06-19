# 🌤️ SkyBox

**SkyBox** is a powerful and modern **Google Drive clone** — a full-featured **storage management and file sharing platform** that enables users to effortlessly **upload, organize, view, download, and share files**.

Built using the latest technologies including **Next.js 15**, **React 19**, **Appwrite**, and **TailwindCSS**, SkyBox delivers a seamless experience across devices with a clean, responsive, and intuitive user interface.

---

## 🚀 Features

- 🔐 **User Authentication with Appwrite**  
  Secure sign-up, login, and logout functionality using Appwrite’s authentication APIs.

- 📤 **File Uploads**  
  Upload a wide range of file types — documents, images, videos, audio, and more — with ease.

- 🗂️ **View & Manage Files**  
  Browse uploaded files, open in a new tab, rename, or delete with intuitive file controls.

- ⬇️ **Download Files**  
  Download files directly from your dashboard, ensuring quick access to your important data.

- 🔗 **File Sharing**  
  Instantly share files with anyone using shareable links for seamless collaboration.

- 📊 **Interactive Dashboard**  
  A dynamic dashboard displays:
  - Total and consumed storage
  - Recent uploads
  - File statistics grouped by type

- 🔍 **Global Search**  
  Find any file or shared item using a fast and comprehensive global search.

- ↕️ **Sorting Options**  
  Sort files by name, size, or upload date for efficient organization.

- 📱 **Modern Responsive Design**  
  Built with **TailwindCSS** and **ShadCN**, SkyBox adapts beautifully across desktops, tablets, and mobile devices.

---

## ⚙️ Tech Stack

| Technology     | Purpose                             |
|----------------|-------------------------------------|
| **React 19**   | Frontend UI and component logic     |
| **Next.js 15** | Full-stack framework with app router|
| **Appwrite**   | Backend-as-a-Service (BaaS) for auth, storage, etc. |
| **TailwindCSS**| Utility-first CSS framework         |
| **ShadCN**     | UI Components built on Radix UI     |
| **TypeScript** | Type safety and better DX           |

---

## 🧑‍💻 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/skybox.git
cd skybox

# Install dependencies
npm install

# Set up your environment variables for Appwrite (see .env.example)
cp .env.example .env.local

# Run the development server
npm run dev
