# Healthwellnes-app
Repository for Health and Wellness App Project – Agile Sprint Tracking
# 🌿 Wellness App  

**Version:** 1.1  
**Author:** Joshua Kolomoni (ST10400797)  
**Platform:** Android (Kotlin)  
**Repository Type:** Final POE Submission  

---

## 📘 Overview  

The **Wellness App** is a mental health and wellbeing companion designed to support individuals living with mental illnesses by providing an accessible, secure, and user-friendly mobile platform.  

The app enables users to manage their emotional health through features like mood tracking, journaling, motivational quotes, and personalized settings. It was developed as part of the final Project of Evidence (POE) for the Android Development module, demonstrating skills in mobile development, cloud integration, and CI/CD automation.  

The app focuses on **data security, user accessibility, and cloud-based interaction**, ensuring that users’ sensitive information remains encrypted and synchronized across devices.  

---

## 🎯 Objectives  

By completing this project, I aimed to:
- Use **blob storage** to manage user-uploaded files and profile pictures.
- Integrate a **NoSQL database** (Firebase Firestore) for real-time data management.
- Implement **REST API** communication for dynamic data exchange.
- Prepare a fully working, Play Store–ready Android app.
- Utilize **GitHub Actions** for automated testing and build verification.

---

## 💡 Key Features  

| Feature | Description |
|----------|--------------|
| 🔐 **User Authentication** | Secure registration and login system using Firebase Authentication with password encryption. |
| 🌐 **Single Sign-On (SSO)** | Allows users to log in using their Google accounts for seamless access. |
| ⚙️ **User Settings Page** | Users can edit their profile information, change language, and update preferences. |
| ☁️ **REST API Integration** | Connects to an online REST API to retrieve motivational content and wellness tips. |
| 💾 **Offline Mode with Sync** | Users can record journal entries offline; data syncs automatically when reconnected (using RoomDB). |
| 🔔 **Push Notifications** | Implemented via Firebase Cloud Messaging to send mental health reminders and motivational alerts. |
| 🌍 **Multi-Language Support** | Supports **English** and **Zulu**, allowing users to switch languages in settings. |
| 🖼️ **Blob Storage** | Stores user profile images securely using Firebase Storage. |
| 🎨 **Custom App Icon & Assets** | Includes a professional icon and updated UI assets for a polished look. |
| 📱 **Mobile-Ready Design** | Tested and recorded on a physical Android device for production readiness. |

---

## 🏗️ System Architecture  

The **Wellness App** follows a **Cloud-Connected MVVM Architecture**:  
**Technologies Used:**  
- **Language:** Kotlin  
- **Database:** Firebase Firestore (NoSQL)  
- **Storage:** Firebase Storage (Blob Storage)  
- **Authentication:** Firebase Authentication (Email + Google Sign-In)  
- **Offline Storage:** RoomDB (SQLite)  
- **Notifications:** Firebase Cloud Messaging  
- **Version Control:** GitHub  
- **Automation:** GitHub Actions (Continuous Integration)  

---

## ⚙️ Installation Guide  

To run the app locally:

1. Clone the repository:  
   ```bash
   git clone https://github.com/<your-username>/wellness-app.git


