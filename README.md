# AcademyHub 

An advanced, premium-grade educational management and learning experience mobile application built with React Native and Expo. AcademyHub streamlines student performance tracking, academic resources, communication, and fee operations into a unified, responsive interface.

---

## Project Objective
The primary objective of **AcademyHub** is to bridge the gap between educational institutions and students by providing an intuitive, offline-ready, and highly responsive mobile platform. It replaces fragmented management systems with automated routing layers, real-time performance metrics, and a structured learning ecosystem optimized for any Android or iOS device standard.

---

## Key Features
- **Smart Gateway Navigation:** Production-grade authentication guards that strictly anchor fresh sessions onto an optimized Landing Page before initializing dashboard layers.
- **Dynamic Performance Analytical Trackers:** Real-time modular grids visualizing academic progress, timeline charts, and badge metrics.
- **Centralized Academics Vault:** Structured distribution systems for quick-access to Notes, Assignments, Question Papers, and Recorded Lectures.
- **Premium Bottom Tab Navigation:** Custom-engineered fluid tab-bar system configured with strict screen overlays (`href: null` encapsulation) to mask internal navigational modules flawlessly.
- **Responsive Layout Architecture:** Adaptive design schemas leveraging dynamic safe area offsets, scroll views, and platform-specific styling configurations to prevent layout collisions across heterogeneous device screen heights.

---

## Technology Stack
- **Framework:** React Native (Expo SDK)
- **Navigation Engine:** Expo Router v3 (File-based Strict Dynamic Routing)
- **Programming Language:** TypeScript (TSX)
- **UI Components:** React Native Core Components with custom theme wrappers
- **Build System:** EAS (Expo Application Services) Cloud Native Engine

  ---

## Setup & Installation Guide

Follow these step-by-step instructions to set up the **AcademyHub** development environment on your local machine.

## Prerequisites

Before starting, ensure you have the following installed on your system:

- **Node.js (LTS Version)** – https://nodejs.org/
- **Git** – https://git-scm.com/
- **Visual Studio Code (VS Code)** – Recommended IDE
- **Expo Go App** installed on your Android/iOS device for testing

---

## Step 1: Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/MohdHassank/AcademyHub.git
cd AcademyHub
```

---

## Step 2: Install Dependencies

Navigate to the project root folder (where `package.json` exists) and run:

```bash
npm install
```

This will install all required project dependencies.

---



## Step 3: Install EAS CLI

EAS CLI is required for cloud builds and deployment.

```bash
npm install -g eas-cli
```

Verify installation:

```bash
eas --version
```

---

## Step 4: Login to Expo

Authenticate your Expo account:

```bash
eas login
```

Enter your Expo username/email and password when prompted.

---

## Step 5: Run the Application

Start the development server:

```bash
npx expo start --clear
```

---

## Testing on Mobile

### Android

1. Install **Expo Go** from Google Play Store.
2. Open Expo Go.
3. Scan the QR code displayed in the terminal/browser.

### iPhone (iOS)

1. Install **Expo Go** from App Store.
2. Open Camera.
3. Scan the QR code displayed by Expo.

---
